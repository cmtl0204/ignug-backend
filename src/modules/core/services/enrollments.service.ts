import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository, FindOptionsWhere, ILike, LessThan, SelectQueryBuilder, Not} from 'typeorm';
import {UserEntity} from '@auth/entities';
import {
    CreateEnrollmentDto,
    FilterEnrollmentDto,
    PaginationDto,
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
    EnrollmentDetailStatesService, SchoolPeriodsService, TeacherDistributionsService
} from "@core/services";
import {
    CatalogueEnrollmentStateEnum,
    CatalogueSchoolPeriodTypeEnum,
    CatalogueTypeEnum,
    CoreRepositoryEnum
} from '@shared/enums';
import {ServiceResponseHttpModel} from '@shared/models';
import {isAfter, isBefore} from "date-fns";

@Injectable()
export class EnrollmentsService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY)
        private repository: Repository<EnrollmentEntity>,
        private readonly enrollmentsStateService: EnrollmentStatesService,
        private readonly enrollmentDetailsService: EnrollmentDetailsService,
        private readonly enrollmentDetailStatesService: EnrollmentDetailStatesService,
        private readonly cataloguesService: CataloguesService,
        private readonly schoolPeriodsService: SchoolPeriodsService,
        private readonly teacherDistributionsService: TeacherDistributionsService,
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
            throw new NotFoundException('Matrícula no encontrada');
        }

        entity.academicPeriodId = payload.academicPeriod.id;
        entity.parallelId = payload.parallel.id;
        entity.typeId = payload.type.id;
        entity.workdayId = payload.workday.id;
        entity.date = payload.date;
        entity.observation = payload.observation;

        return await this.repository.save(entity);
    }

    async updateEnrolled(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException('Matrícula no encontrada');
        }

        entity.parallelId = payload.parallel.id;
        entity.workdayId = payload.workday.id;

        return await this.repository.save(entity);
    }

    async updateApproved(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException('Matrícula no encontrada');
        }

        entity.parallelId = payload.parallel.id;
        entity.workdayId = payload.workday.id;

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
                    enrollmentDetailStates: {state: true}
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
        const openSchoolPeriod = await this.schoolPeriodsService.findOpenSchoolPeriod();

        const enrollment = await this.repository.findOne({
            relations: {
                academicPeriod: true,
                parallel: true,
                workday: true,
                schoolPeriod: true,
                enrollmentStates: {
                    state: true
                }
            },
            where: {studentId, schoolPeriodId: openSchoolPeriod.id}
        });

        return enrollment;
    }

    async sendRegistration(userId: string, payload: any): Promise<EnrollmentEntity> {
        // return await this.repository.manager.transaction(async (transactionalEntityManager) => {
        let enrollment = await this.repository.findOne({
            relations: {enrollmentStates: {state: true}, enrollmentDetails: true},
            where: {
                studentId: payload.student.id,
                schoolPeriodId: payload.schoolPeriod.id
            }
        });

        const enrollmentTotal = await this.findTotalEnrollments(enrollment?.id, payload.parallel.id, payload.schoolPeriod.id, payload.workday.id);
        const capacity = await this.teacherDistributionsService.findCapacity(payload.parallel.id, payload.schoolPeriod.id, payload.workday.id);

        if (capacity <= enrollmentTotal) {
            throw new BadRequestException(`No existen cupos disponibles en la jornada ${payload.workday.name} en el paralelo ${payload.parallel.name}`);
        }

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

        if (!enrollment.enrollmentStates || enrollment.enrollmentStates?.length === 0) {
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

        if (enrollment?.enrollmentDetails)
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

    async sendRequest(userId: string, id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        // return await this.repository.manager.transaction(async (transactionalEntityManager) => {
        let enrollment = await this.repository.findOne({
            relations: {enrollmentDetails: {enrollmentDetailStates: true}, enrollmentStates: true},
            where: {id}
        });

        if (!enrollment)
            enrollment = this.repository.create();

        enrollment.applicationsAt = new Date();

        enrollment = await this.repository.save(enrollment);

        await this.enrollmentsStateService.removeAll(enrollment.enrollmentStates);

        const catalogues = await this.cataloguesService.findCache();

        const registeredState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.REQUEST_SENT &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: enrollment.id,
            stateId: registeredState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        for (const item of enrollment.enrollmentDetails) {
            const registeredState = catalogues.find(catalogue =>
                catalogue.code === CatalogueEnrollmentStateEnum.REQUEST_SENT &&
                catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

            await this.enrollmentDetailStatesService.removeAll(item.enrollmentDetailStates);

            await this.enrollmentDetailStatesService.create({
                enrollmentDetailId: item.id,
                stateId: registeredState.id,
                userId,
                date: new Date(),
                observation: payload.observation,
            });
        }

        return enrollment;
        // });
    }

    async approve(id: string, userId: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {enrollmentDetails: {enrollmentDetailStates: true}, enrollmentStates: {state: true}},
            where: {id}
        });

        if (!enrollment) {
            throw new NotFoundException('Matrícula no encontrada');
        }

        const catalogues = await this.cataloguesService.findCache();

        const approvedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueEnrollmentStateEnum.APPROVED &&
            catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

        // await this.enrollmentsStateService.removeRequestSent(enrollment.enrollmentStates);
        // await this.enrollmentsStateService.removeRejected(enrollment.enrollmentStates);
        await this.enrollmentsStateService.removeAll(enrollment.enrollmentStates);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: approvedState.id,
            userId,
            date: new Date(),
            observation: payload.observation,
        });

        for (const item of enrollment.enrollmentDetails) {
            const registeredState = catalogues.find(catalogue =>
                catalogue.code === CatalogueEnrollmentStateEnum.APPROVED &&
                catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

            await this.enrollmentDetailStatesService.removeAll(item.enrollmentDetailStates);

            await this.enrollmentDetailStatesService.create({
                enrollmentDetailId: item.id,
                stateId: registeredState.id,
                userId,
                date: new Date(),
                observation: payload.observation,
            });
        }

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

        // await this.enrollmentsStateService.removeRequestSent(enrollment.enrollmentStates);
        // await this.enrollmentsStateService.removeApproved(enrollment.enrollmentStates);
        await this.enrollmentsStateService.removeAll(enrollment.enrollmentStates);

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
            relations: {
                enrollmentDetails: {enrollmentDetailStates: true},
                enrollmentStates: true,
                schoolPeriod: true,
                career: true,
                academicPeriod: true,
                student: {user: true}
            },
            where: {id}
        });

        enrollment.date = new Date();

        enrollment.code =
            `${enrollment.schoolPeriod.code}-${enrollment.career.acronym}-${enrollment.student.user.identification}`;

        enrollment.folio =
            `${enrollment.schoolPeriod.code}-${enrollment.career.acronym}-${enrollment.academicPeriod.code}`;

        await this.repository.save(enrollment);

        await this.enrollmentsStateService.removeAll(enrollment.enrollmentStates);

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

        for (const item of enrollment.enrollmentDetails) {
            const registeredState = catalogues.find(catalogue =>
                catalogue.code === CatalogueEnrollmentStateEnum.ENROLLED &&
                catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

            await this.enrollmentDetailStatesService.removeAll(item.enrollmentDetailStates);

            await this.enrollmentDetailStatesService.create({
                enrollmentDetailId: item.id,
                stateId: registeredState.id,
                userId,
                date: new Date(),
                observation: payload.observation,
            });
        }

        return enrollment;
    }

    async revoke(id: string, userId: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {enrollmentDetails: {enrollmentDetailStates: true}, enrollmentStates: true},
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

        for (const item of enrollment.enrollmentDetails) {
            const registeredState = catalogues.find(catalogue =>
                catalogue.code === CatalogueEnrollmentStateEnum.REVOKED &&
                catalogue.type === CatalogueTypeEnum.ENROLLMENTS_STATE);

            await this.enrollmentDetailStatesService.removeAll(item.enrollmentDetailStates);

            await this.enrollmentDetailStatesService.create({
                enrollmentDetailId: item.id,
                stateId: registeredState.id,
                userId,
                date: new Date(),
                observation: payload.observation,
            });
        }
        return enrollment;
    }

    async findTotalEnrollments(enrollmentId: string, parallelId: string, schoolPeriodId: string, workdayId: string): Promise<number> {
        const catalogues = await this.cataloguesService.findCache();
        const states = catalogues.filter((item: CatalogueEntity) => item.type === CatalogueTypeEnum.ENROLLMENTS_STATE);
        const state = states.find((item: CatalogueEntity) => item.code === CatalogueEnrollmentStateEnum.REGISTERED);

        let total = [];
        if (enrollmentId) {
            total = await this.repository.find({
                where: {
                    id: Not(enrollmentId),
                    workdayId,
                    parallelId,
                    schoolPeriodId,
                    enrollmentStates: {stateId: state.id}
                }
            });
        } else {
            total = await this.repository.find({
                where: {
                    workdayId,
                    parallelId,
                    schoolPeriodId,
                    enrollmentStates: {stateId: state.id}
                }
            });
        }

        return total.length;
    }

    private async getType(schoolPeriod: SchoolPeriodEntity) {
        const currentDate = new Date();

        const catalogues = await this.cataloguesService.findCache();

        let codeType = CatalogueSchoolPeriodTypeEnum.ESPECIAL;

        /*
        console.log('currentDate', currentDate);
        console.log('schoolPeriod.ordinaryStartedAt', schoolPeriod.ordinaryStartedAt);
        console.log('new Date(schoolPeriod.ordinaryStartedAt)', new Date(schoolPeriod.ordinaryStartedAt));

        console.log('schoolPeriod.ordinaryEndedAt', schoolPeriod.ordinaryEndedAt);
        console.log('new Date(schoolPeriod.ordinaryEndedAt)', new Date(schoolPeriod.ordinaryEndedAt));

        console.log('schoolPeriod.extraOrdinaryStartedAt', schoolPeriod.extraOrdinaryStartedAt);
        console.log('new Date(schoolPeriod.extraOrdinaryStartedAt)', new Date(schoolPeriod.extraOrdinaryStartedAt));

        console.log('schoolPeriod.extraOrdinaryEndedAt', schoolPeriod.extraOrdinaryEndedAt);
        console.log('new Date(schoolPeriod.extraOrdinaryEndedAt)', new Date(schoolPeriod.extraOrdinaryEndedAt));

        console.log('schoolPeriod.especialStartedAt', schoolPeriod.especialStartedAt);
        console.log('new Date(schoolPeriod.especialStartedAt)', new Date(schoolPeriod.especialStartedAt));

        console.log('schoolPeriod.especialEndedAt', schoolPeriod.especialEndedAt);
        console.log('new Date(schoolPeriod.especialEndedAt)', new Date(schoolPeriod.especialEndedAt));

        console.log('isAfter(currentDate, new Date(schoolPeriod.ordinaryStartedAt))', isAfter(currentDate, new Date(schoolPeriod.ordinaryStartedAt)));
        console.log('isBefore(currentDate, new Date(schoolPeriod.ordinaryEndedAt))', isBefore(currentDate, new Date(schoolPeriod.ordinaryEndedAt)))
        console.log('isAfter(currentDate, new Date(schoolPeriod.extraOrdinaryStartedAt))', isAfter(currentDate, new Date(schoolPeriod.extraOrdinaryStartedAt)))
        console.log('isBefore(currentDate, new Date(schoolPeriod.extraOrdinaryEndedAt))', isBefore(currentDate, new Date(schoolPeriod.extraOrdinaryEndedAt)))
        console.log('isAfter(currentDate, new Date(schoolPeriod.especialStartedAt))', isAfter(currentDate, new Date(schoolPeriod.especialStartedAt)))
        console.log('isBefore(currentDate, new Date(schoolPeriod.especialEndedAt))', isBefore(currentDate, new Date(schoolPeriod.especialEndedAt)))
         */

        if (isAfter(currentDate, new Date(schoolPeriod.ordinaryStartedAt)) && isBefore(currentDate, new Date(schoolPeriod.ordinaryEndedAt))) {
            codeType = CatalogueSchoolPeriodTypeEnum.ORDINARY;
        }

        if (isAfter(currentDate, new Date(schoolPeriod.extraOrdinaryStartedAt)) && isBefore(currentDate, new Date(schoolPeriod.extraOrdinaryEndedAt))) {
            codeType = CatalogueSchoolPeriodTypeEnum.EXTRAORDINARY;
        }

        if (isAfter(currentDate, new Date(schoolPeriod.especialStartedAt)) && isBefore(currentDate, new Date(schoolPeriod.especialEndedAt))) {
            codeType = CatalogueSchoolPeriodTypeEnum.ESPECIAL;
        }

        const type = catalogues.find(type => {
            return type.code === codeType && type.type === CatalogueTypeEnum.ENROLLMENTS_TYPE;
        });

        return type.id;
    }

    async findEnrollmentCertificateByEnrollment(id: string): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOne({
            relations: {
                academicPeriod: true,
                career: {institution: true},
                parallel: true,
                workday: true,
                schoolPeriod: true,
                enrollmentDetails: {
                    parallel: true,
                    subject: {academicPeriod: true},
                    enrollmentDetailStates: {state: true}
                },
                enrollmentStates: {
                    state: true
                },
                student: {user: true}
            },
            where: {id}
        });

        return enrollment;
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

