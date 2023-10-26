import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository, FindOptionsWhere, ILike, LessThan, SelectQueryBuilder} from 'typeorm';
import {UserEntity} from '@auth/entities';
import {CreateEnrollmentDto, FilterEnrollmentDto, PaginationDto, UpdateEnrollmentDto} from '@core/dto';
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
import {CatalogueCoreEnrollmentStateEnum, CatalogueCoreTypeEnum, CoreRepositoryEnum} from '@shared/enums';
import {ServiceResponseHttpModel} from '@shared/models';
import {CataloguesService} from "./catalogues.service";
import {EnrollmentStatesService} from "./enrollment-states.service";
import {EnrollmentDetailsService} from "./enrollment-details.service";

@Injectable()
export class EnrollmentsService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY)
        private repository: Repository<EnrollmentEntity>,
        private readonly enrollmentsStateService: EnrollmentStatesService,
        private readonly enrollmentDetailsService: EnrollmentDetailsService,
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
                enrollmentStates: true,
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
                career: true,
                parallel: true,
                enrollmentStates: true,
                student: true,
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

    async sendRequest(payload: CreateEnrollmentDto): Promise<EnrollmentEntity> {
        const newEntity = this.repository.create(payload);

        const catalogues = await this.cataloguesService.findCache();

        const requestSentState = catalogues.find(catalogue =>
            catalogue.code === CatalogueCoreEnrollmentStateEnum.REQUEST_SENT &&
            catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

        const newEntityCreated = await this.repository.save(newEntity);

        await this.enrollmentsStateService.create({
            enrollmentId: newEntityCreated.id,
            stateId: requestSentState.id,
            observation: newEntity.observation,
        });

        for (const item of payload.enrollmentDetails) {
            await this.enrollmentDetailsService.create(item);
        }

        return newEntity;
    }

    async approve(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOneBy({id});

        const catalogues = await this.cataloguesService.findCache();

        const approvedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueCoreEnrollmentStateEnum.APPROVED &&
            catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: approvedState.id,
            observation: payload.observation,
        });

        return enrollment;
    }

    async reject(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = await this.repository.findOneBy({id});

        const catalogues = await this.cataloguesService.findCache();

        const rejectedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueCoreEnrollmentStateEnum.REJECTED &&
            catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: rejectedState.id,
            observation: payload.observation,
        });

        return enrollment;
    }

    async enroll(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = this.repository.findOneBy({id});

        const catalogues = await this.cataloguesService.findCache();

        const enrolledState = catalogues.find(catalogue =>
            catalogue.code === CatalogueCoreEnrollmentStateEnum.ENROLLED &&
            catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: enrolledState.id,
            observation: payload.observation,
        });

        return enrollment;
    }

    async revoke(id: string, payload: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        const enrollment = this.repository.findOneBy({id});

        const catalogues = await this.cataloguesService.findCache();

        const revokedState = catalogues.find(catalogue =>
            catalogue.code === CatalogueCoreEnrollmentStateEnum.REVOKED &&
            catalogue.type === CatalogueCoreTypeEnum.ENROLLMENTS_STATE);

        await this.enrollmentsStateService.create({
            enrollmentId: id,
            stateId: revokedState.id,
            observation: payload.observation,
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

