import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository, FindOptionsWhere, ILike, LessThan, SelectQueryBuilder} from 'typeorm';
import {UserEntity} from '@auth/entities';
import {
    CreateEnrollmentDto, EnrollmentsDetailDto,
    FilterEnrollmentDto,
    PaginationDto,
    SendRegistrationDto,
    UpdateEnrollmentDto
} from '@core/dto';
import {
    CareerEntity,
    CatalogueEntity,
    CurriculumEntity,
    EnrollmentDetailEntity,
    EnrollmentEntity,
    InformationStudentEntity,
    SchoolPeriodEntity,
    StudentEntity,
    GradeEntity,
    SubjectEntity
} from '@core/entities';
import {
    CataloguesService,
    EnrollmentStatesService,
    EnrollmentDetailsService,
    EnrollmentDetailStatesService
} from "@core/services";
import {
    CatalogueEnrollmentStateEnum,
    CatalogueSchoolPeriodStateEnum, CatalogueSchoolPeriodTypeEnum,
    CatalogueTypeEnum,
    CoreRepositoryEnum
} from '@shared/enums';
import {ServiceResponseHttpModel} from '@shared/models';
import {isAfter, isBefore} from "date-fns";
import {en} from "@faker-js/faker";

@Injectable()
export class EnrollmentsService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY)
        private repository: Repository<EnrollmentEntity>,
        private readonly enrollmentsStateService: EnrollmentStatesService,
        private readonly enrollmentDetailsService: EnrollmentDetailsService,
        private readonly enrollmentDetailStatesService: EnrollmentDetailStatesService,
        private readonly cataloguesService: CataloguesService,
    ) {
    }

    async create(payload: CreateEnrollmentDto): Promise<EnrollmentEntity> {
        const newSubject = this.repository.create(payload);

        return await this.repository.save(newSubject);
    }

    async findAll(params?: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
        //Pagination & Filter by search
        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }

        //Other filters
        // if (params.code) {
        //   return this.filterByCode(params.code);
        // }

        //All
        const data = await this.repository.findAndCount({
            relations: {career: true},
        });

        return {data: data[0], pagination: {totalItems: data[1], limit: 10}};
    }

    async findOne(id: string): Promise<EnrollmentEntity> {
        const entity = await this.repository.findOne({
            relations: {
                academicPeriod: true,
                career: true,
                enrollmentStates: {state: true},
                parallel: true,
                student: {user: true},
                type: true,
                workday: true,
            },
            where: {id},
        });

        if (!entity) {
            throw new NotFoundException('Matricula no encontrada');
        }

        return entity;
    }

    async update(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException('Subject not found');
        }

        entity.academicPeriodId = payload.academicPeriod.id;
        entity.parallelId = payload.parallel.id;
        entity.typeId = payload.type.id;
        entity.workdayId = payload.workday.id;
        entity.date = payload.date;
        entity.folio = payload.folio;
        entity.observation = payload.observation;

        return await this.repository.save(entity);
    }

    async remove(id: string): Promise<EnrollmentEntity> {
        const subject = await this.repository.findOneBy({id});

        if (!subject) {
            throw new NotFoundException('Subject not found');
        }

        return await this.repository.save(subject);
    }

    async removeAll(payload: EnrollmentEntity[]): Promise<EnrollmentEntity[]> {
        return await this.repository.softRemove(payload);
    }

    private async paginateAndFilter(params: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
        let where: FindOptionsWhere<EnrollmentEntity> | FindOptionsWhere<EnrollmentEntity>[];
        where = {};
        let {page, search} = params;
        const {limit} = params;

        if (search) {
            search = search.trim();
            page = 0;
            where = [];
            where.push({code: ILike(`%${search}%`)});
        }

        const response = await this.repository.findAndCount({
            relations: {career: true},
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
        });

        return {
            data: response[0],
            pagination: {limit, totalItems: response[1]},
        };
    }

    private async paginateAndFilterByCareer(careerId: string, params: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
        const where: FindOptionsWhere<EnrollmentEntity>[] = [];

        let {page, search} = params;

        const {limit} = params;

        if (search) {
            search = search.trim();
            page = 0;

            where.push(
                {
                    careerId,
                    schoolPeriodId: params.schoolPeriodId,
                    student: {
                        user: {
                            identification: ILike(`%${search}%`),
                        }
                    }
                },
                {
                    careerId,
                    schoolPeriodId: params.schoolPeriodId,
                    student: {
                        user: {
                            name: ILike(`%${search}%`),
                        }
                    }
                },
                {
                    careerId,
                    schoolPeriodId: params.schoolPeriodId,
                    student: {
                        user: {
                            lastname: ILike(`%${search}%`),
                        }
                    }
                },
            );
        } else {
            if (params.academicPeriodId) {
                where.push(
                    {
                        careerId,
                        schoolPeriodId: params.schoolPeriodId,
                        academicPeriodId: params.academicPeriodId,
                    }
                );
            } else {
                where.push(
                    {
                        careerId,
                        schoolPeriodId: params.schoolPeriodId,
                    }
                );
            }
        }

        const response = await this.repository.findAndCount({
            relations: {
                academicPeriod: true,
                parallel: true,
                enrollmentStates: {state: true},
                student: {user: true},
                type: true,
                workday: true,
            },
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
        });

        return {
            data: response[0],
            pagination: {limit, totalItems: response[1]},
        };
    }

    private async filterByCode(code: string): Promise<ServiceResponseHttpModel> {
        const where: FindOptionsWhere<EnrollmentEntity> = {};

        if (code) {
            where.code = LessThan(code);
        }

        const response = await this.repository.findAndCount({
            relations: {career: true},
            where,
        });

        return {
            data: response[0],
            pagination: {limit: 10, totalItems: response[1]},
        };
    }

    async findEnrollmentCertificateByStudent(identificationUser: string, codeSchoolPeriod: string) {
        const enrollmentCertificate = await this.repository.findOne({
            relations: {
                academicPeriod: true,
                enrollmentDetails: true,
                career: true,
                workday: true,
                schoolPeriod: true,
            },
            where: {student: {user: {identification: identificationUser}}, schoolPeriod: {code: codeSchoolPeriod}},
        });

        if (!enrollmentCertificate) {
            throw new NotFoundException('Matricula no encontrada');
        }
        return enrollmentCertificate;
    }

    async exportCuposByEnrollments(): Promise<any[]> {
        const queryBuilder: SelectQueryBuilder<EnrollmentEntity> = this.repository.createQueryBuilder('exportCupos');
        queryBuilder.select(
            [
                "enrollment_state.name",
                "CareerEntity.name",
                "CurriculumEntity.name",
                "UserEntity.identification",
                "UserEntity.lastname",
                "UserEntity.name",
                "sex_student.name",
                "UserEntity.email",
                "UserEntity.phone",
                "enrollment_type.name",
                "SchoolPeriodEntity.code_sniese",
                "enrollment_workday.name",
                "enrollment_parallel.name"
            ])
            .innerJoin(StudentEntity, "StudentEntity.id = EnrollmentEntity.student_id")
            .innerJoin(InformationStudentEntity, "StudentEntity.id = Information_studentEntity.student_id")
            .innerJoin(UserEntity, "UserEntity.id = StudentEntity.user_id")
            .innerJoin(EnrollmentDetailEntity, "EnrollmentEntity.id = EnrollmentDetailEntity.enrollment_id")
            .innerJoin(SchoolPeriodEntity, "SchoolPeriodEntity.id = EnrollmentEntity.school_period_id")
            .innerJoin(CurriculumEntity, "CurriculumEntity.id = EnrollmentEntity.curriculum_id")
            .innerJoin(CareerEntity, "CareerEntity.id = EnrollmentEntity.career_Id")
            .innerJoin(CatalogueEntity, "gender_student", "users.gender_id = gender_student.id")
            .innerJoin(CatalogueEntity, "sex_student", "UserEntity.sex_id = sex_student.id")
            .innerJoin(CatalogueEntity, "enrollment_state", "enrollment_state.id = EnrollmentEntity.state_id")
            .innerJoin(CatalogueEntity, "enrollment_parallel", "EnrollmentDetailEntity.parallel_id = enrollment_parallel.id")
            .innerJoin(CatalogueEntity, "enrollment_type", "EnrollmentDetailEntity.type_id = enrollment_type.id")
            .innerJoin(CatalogueEntity, "enrollment_workday", "EnrollmentDetailEntity.workday_id = enrollment_workday.id");
        const result = await queryBuilder.getRawMany();
        return result;
    }

    async exportCuposDetalladosByEnrollments(): Promise<any[]> {
        const queryBuilder: SelectQueryBuilder<EnrollmentEntity> = this.repository.createQueryBuilder('exportCuposAsignatura');

        queryBuilder
            .select([
                "enrollment_state.name",
                "CareerEntity.name",
                "CurriculumEntity.name",
                "UserEntity.identification",
                "UserEntity.lastname",
                "UserEntity.name",
                "UserEntity.email",
                "UserEntity.phone",
                "subjects.code",
                "subjects.name",
                "EnrollmentDetailEntity.number",
                "SchoolPeriodEntity.code_sniese",
                "SchoolPeriodEntity.school_period_id",
                "enrollment_parallel.name",
                "enrollment_type.name",
                "GradeEntity.value",
                "EnrollmentDetailEntity.final_grade",
                "EnrollmentDetailEntity.final_attendance",
                "enrollment_academic_state.code",
                "academic_period.name"

            ])
            .innerJoin(StudentEntity, "StudentEntity.id = EnrollmentEntity.student_id")
            .innerJoin(InformationStudentEntity, "StudentEntity.id = Information_studentEntity.student_id")
            .innerJoin(UserEntity, "UserEntity.id = StudentEntity.user_id")
            .innerJoin(EnrollmentDetailEntity, "EnrollmentEntity.id = EnrollmentDetailEntity.enrollment_id")
            .innerJoin(CatalogueEntity, "academic_period", "academic_period.id = enrollmentEntity.academic_period_id")
            .innerJoin(CatalogueEntity, "enrollment_state", "enrollment_state.id = EnrollmentEntity.state_id")
            .innerJoin(CatalogueEntity, "enrollment_parallel", "EnrollmentDetailEntity.parallel_id = enrollment_parallel.id")
            .innerJoin(CatalogueEntity, "enrollment_type", "EnrollmentDetailEntity.type_id = enrollment_type.id")
            .innerJoin(CatalogueEntity, "enrollment_workday", "EnrollmentDetailEntity.workday_id = enrollment_workday.id")
            .innerJoin(CatalogueEntity, "enrollment_academic_state", "enrollment_academic_state.id = EnrollmentDetailEntity.academic_state_id")
            .innerJoin(CurriculumEntity, "CurriculumEntity.id = EnrollmentEntity.curriculum_id")
            .innerJoin(CareerEntity, "CareerEntity.id = EnrollmentEntity.career_Id")
            .innerJoin(SchoolPeriodEntity, "SchoolPeriodEntity.id = EnrollmentEntity.school_period_id")
            .innerJoin(GradeEntity, "enrollment_detail_id = enrollmentDetailsEntity.id")
            .innerJoin(SubjectEntity, "subjects.id = enrollment_details.subject_id")

        const result = await queryBuilder.getRawMany();
        return result;
    }

    async findstudentGrade(identificationUser: string, codeSchoolPeriod: string) {
        const studentGrade = await this.repository.findOne({
            relations: ['academicPeriod', 'enrollmentDetails', 'career', 'workday', 'schoolPeriod'],
            where: {student: {user: {identification: identificationUser}}, schoolPeriod: {code: codeSchoolPeriod}},
        });

        if (!studentGrade) {
            throw new NotFoundException('Matricula no encontrada');
        }

        return studentGrade
    }

    async findEnrollmentsByCareer(careerId: string, params?: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
        //Pagination & Filter by search
        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilterByCareer(careerId, params);
        }
    }

    async findEnrollmentsByStudent(studentId: string): Promise<EnrollmentDetailEntity[]> {
        const enrollments = await this.repository.find({
            relations: {
                enrollmentDetails: {
                    subject: {type: true},
                    academicState: true,
                    enrollmentDetailStates: {state:true}
                }
            },
            where: {studentId}
        });

        const enrollmentDetails = [];

        for (const item of enrollments) {
            enrollmentDetails.push(...item.enrollmentDetails);
        }

        if (enrollmentDetails.length === 0) {
            return [];
        }

        return enrollmentDetails;
    }

    async findEnrollmentByStudent(studentId: string): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {
                enrollmentStates: {
                    state: true
                }
            },
            where: {studentId}
        });


        return enrollment;
    }

    async sendRegistration(userId: string, payload: any): Promise<EnrollmentEntity> {
        console.log(payload.enrollmentDetails);
        // return await this.repository.manager.transaction(async (transactionalEntityManager) => {
        let enrollment = await this.repository.findOne({
            relations: {enrollmentStates: true, enrollmentDetails: true},
            where: {
                studentId: payload.student.id,
                schoolPeriodId: payload.schoolPeriod.id
            }
        });

        if (!enrollment) {
            enrollment = this.repository.create();
        }

        enrollment.academicPeriodId = payload.academicPeriod.id;
        enrollment.careerId = payload.career.id;
        enrollment.parallelId = payload.parallel.id;
        enrollment.schoolPeriodId = payload.schoolPeriod.id;
        enrollment.studentId = payload.student.id;
        enrollment.typeId = await this.getType(payload.schoolPeriod);
        enrollment.workdayId = payload.workday.id;
        enrollment.applicationsAt = new Date();

        enrollment = await this.repository.save(enrollment);
        // if (enrollment?.id) {
        //     console.log('update');
        //     await this.repository.update(enrollment.id, enrollment);
        // } else {
        //     console.log('create');
        //     enrollment = await this.repository.save(enrollment);
        // }

        const catalogues = await this.cataloguesService.findCache();

        if (enrollment.enrollmentStates?.length === 0) {
            const registeredState = catalogues.find(catalogue =>
                catalogue.code === CatalogueEnrollmentStateEnum.REGISTERED &&
                catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);
            await this.enrollmentsStateService.create({
                enrollmentId: enrollment.id,
                stateId: registeredState.id,
                userId,
                date: new Date(),
                observation: payload.observation,
            });
        }

        console.log(enrollment.enrollmentDetails);
        if (enrollment.enrollmentDetails)
            await this.enrollmentDetailsService.removeAll(enrollment.enrollmentDetails);

        for (const item of payload.enrollmentDetails) {
            const enrollmentDetail: any = {
                enrollmentId: enrollment.id,
                parallelId: enrollment.parallelId,
                subjectId: item.id,
                typeId: enrollment.typeId,
                workdayId: enrollment.workdayId,
                number: 1,
            }

            const enrollmentDetailCreated = await this.enrollmentDetailsService.create(enrollmentDetail);

            const registeredState = catalogues.find(catalogue =>
                catalogue.code === CatalogueEnrollmentStateEnum.REGISTERED &&
                catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

            await this.enrollmentDetailStatesService.create({
                enrollmentDetailId: enrollmentDetailCreated.id,
                stateId: registeredState.id,
                userId,
                date: new Date(),
                observation: payload.observation,
            });
        }

        return enrollment;
        // });
    }

    async sendRequest(userId: string, payload: CreateEnrollmentDto): Promise<EnrollmentEntity> {
        // return await this.repository.manager.transaction(async (transactionalEntityManager) => {
        let enrollment = await this.repository.findOne({
            where: {
                studentId: payload.student.id,
                schoolPeriodId: payload.schoolPeriod.id
            }
        });

        if (!enrollment)
            enrollment = this.repository.create();

        enrollment.applicationsAt = new Date();

        enrollment = await this.repository.save(enrollment);

        const catalogues = await this.cataloguesService.findCache();

        const registeredState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.REGISTERED &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: enrollment.id,
            stateId: registeredState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        for (const item of payload.enrollmentDetails) {
            await this.enrollmentDetailsService.create(item);
        }

        return enrollment;
        // });
    }

    async approve(id: string, userId: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {enrollmentStates: {state: true}},
            where: {id}
        });

        if (!enrollment) {
            throw new NotFoundException('Matrícula no encontrada');
        }

        const catalogues = await this.cataloguesService.findCache();

        const approvedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.APPROVED &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.removeRejected(enrollment.enrollmentStates);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: approvedState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        return enrollment;
    }

    async reject(id: string, userId: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {enrollmentStates: {state: true}},
            where: {id}
        });

        if (!enrollment) {
            throw new NotFoundException('Matrícula no encontrada');
        }

        const catalogues = await this.cataloguesService.findCache();

        const rejectedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.REJECTED &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.removeRequestSent(enrollment.enrollmentStates);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: rejectedState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        return enrollment;
    }

    async enroll(id: string, userId: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {enrollmentStates: true},
            where: {id}
        });

        enrollment.date = new Date();
        enrollment.code =
            `${payload.schoolPeriod.code}-${payload.career.acronym}-${payload.student.user.identification}`;
        enrollment.folio =
            `${payload.schoolPeriod.code}-${payload.career.acronym}-${payload.academicPeriod.code}`;

        await this.repository.save(enrollment);

        const catalogues = await this.cataloguesService.findCache();

        const enrolledState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.ENROLLED &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: enrolledState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        return enrollment;
    }

    async revoke(id: string, userId: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {enrollmentStates: true},
            where: {id}
        });

        const catalogues = await this.cataloguesService.findCache();

        const revokedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.REVOKED &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.removeAll(enrollment.enrollmentStates);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: revokedState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        return enrollment;
    }

    private async getType(schoolPeriod: SchoolPeriodEntity) {
        const currentDate = new Date();

        const catalogues = await this.cataloguesService.findCache();
        let codeType = CatalogueSchoolPeriodTypeEnum.ESPECIAL;

        if (isAfter(currentDate, schoolPeriod.ordinaryStartedAt) && isBefore(currentDate, schoolPeriod.ordinaryEndedAt)) {
            codeType = CatalogueSchoolPeriodTypeEnum.ORDINARY;
        }

        if (isAfter(currentDate, schoolPeriod.extraOrdinaryStartedAt) && isBefore(currentDate, schoolPeriod.extraOrdinaryEndedAt)) {
            codeType = CatalogueSchoolPeriodTypeEnum.EXTRAORDINARY;
        }

        if (isAfter(currentDate, schoolPeriod.especialStartedAt) && isBefore(currentDate, schoolPeriod.especialEndedAt)) {
            codeType = CatalogueSchoolPeriodTypeEnum.ESPECIAL;
        }

        const type = catalogues.find(type => {
            return type.code === codeType && type.type === CatalogueTypeEnum.ENROLLMENTS_TYPE;
        });

        return type.id;
    }
}

// anular matricula
// totales de estado de matricula (matriculados, anulados, en proceso...)
// editar matricula
// obtener una matricula

// eliminar un detalle
// anular por asignatura
// obtener un detalle de matricula
// editar detalle matricula

