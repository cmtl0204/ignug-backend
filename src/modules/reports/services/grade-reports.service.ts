import {Inject, Injectable, Res} from '@nestjs/common';
import {CataloguesService, } from '@core/services';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {
    EnrollmentDetailEntity,
    EnrollmentEntity,
    StudentEntity,
    TeacherDistributionEntity,
} from '@core/entities';
import * as XLSX from 'xlsx';
import {join} from 'path';
import {CatalogueEnrollmentStateEnum, CatalogueTypeEnum, CoreRepositoryEnum} from '@shared/enums';

@Injectable()
export class GradeReportsService {
    private imageHeaderPath = './resources/images/reports/header.png';
    private imageFooterPath = `./resources/images/reports/footer.png`;
    private imageHeaderWidth = 110;
    private imageHeaderHeight = 80;

    constructor(
        private readonly cataloguesService: CataloguesService,
        @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY) private readonly enrollmentRepository: Repository<EnrollmentEntity>,
        @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY) private readonly teacherDistributionRepository: Repository<TeacherDistributionEntity>,
        @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY) private readonly enrollmentDetailRepository: Repository<EnrollmentDetailEntity>,
        @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly studentRepository: Repository<StudentEntity>) {
    }


    async generateGradesByTeacherDistribution(teacherDistributionId: string) {
        const teacherDistribution = await this.teacherDistributionRepository.findOneBy({id: teacherDistributionId});

        const enrollmentDetails = await this.findEnrollmentDetails(teacherDistribution);


        const data = enrollmentDetails.map(enrollmentDetail => {
            const partial1 = enrollmentDetail.grades.find(grade => grade.partial.code === '1');
            const partial2 = enrollmentDetail.grades.find(grade => grade.partial.code === '2');
            const partial3 = enrollmentDetail.grades.find(grade => grade.partial.code === '3');
            const partial4 = enrollmentDetail.grades.find(grade => grade.partial.code === '4');

            return {
                'Numero_Documento': enrollmentDetail.enrollment.student.user.identification,
                'Apellidos': enrollmentDetail.enrollment.student.user.lastname,
                'Nombres': enrollmentDetail.enrollment.student.user.name,
                'Asignatura': enrollmentDetail.subject.name,
                'Parcial1': partial1?.value,
                'Parcial2': partial2?.value,
                'Parcial3': partial3?.value,
                'Parcial4': partial4?.value,
                'Asistencia': enrollmentDetail.finalAttendance,
                'Nota_Final': enrollmentDetail.finalGrade,
                'Estado_Academico': enrollmentDetail.academicState?.name,
            };
        });

        const newWorkbook = XLSX.utils.book_new();
        const newSheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Estudiantes');
        const path = join(process.cwd(), 'storage/reports/enrollments', Date.now() + '.xlsx'); //review path
        XLSX.writeFile(newWorkbook, path);

        return path;
    }

    async findTeacherDistribution(teacherDistributionId: string) {
        return await this.teacherDistributionRepository.findOne({
            relations: {
                parallel: true,
                workday: true,
                subject: {curriculum: {career: true}},
                schoolPeriod: true,
                teacher: {user: true}
            },
            where: {id: teacherDistributionId},
        });
    }

    async findEnrollmentDetails(teacherDistribution: TeacherDistributionEntity) {
        const catalogues = await this.cataloguesService.findCache();
        const enrollmentStateEnrolled = catalogues.find(catalogue => catalogue.code === CatalogueEnrollmentStateEnum.ENROLLED && catalogue.type === CatalogueTypeEnum.ENROLLMENT_STATE);

        return await this.enrollmentDetailRepository.find({
            relations: {
                academicState: true,
                attendances: {partial: true},
                grades: {partial: true},
                parallel: true,
                enrollmentDetailState: {state: true},
                subject: {academicPeriod: true},
                type: true,
                workday: true,
                enrollment: {student: {user: true}},
            },
            where: {
                enrollment: {
                    schoolPeriodId: teacherDistribution.schoolPeriodId,
                    enrollmentState: {stateId: enrollmentStateEnrolled.id}
                },
                parallelId: teacherDistribution.parallelId,
                subjectId: teacherDistribution.subjectId,
                workdayId: teacherDistribution.workdayId,
            },
            order: {enrollment: {student: {user: {lastname: 'asc', name: 'asc'}}}},
        });
    }

    async generateErrorReport(teacherDistributionId: string) {
        return join(process.cwd(), 'storage/reports/grades', teacherDistributionId + '.xlsx'); //review path
    }
}
