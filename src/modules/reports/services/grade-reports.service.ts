import { Inject, Injectable, Res } from '@nestjs/common';
import { CareersService, EnrollmentsService, StudentsService, SubjectsService } from '@core/services';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CareerEntity, CatalogueEntity,
  CurriculumEntity,
  EnrollmentDetailEntity,
  EnrollmentEntity,
  InformationStudentEntity,
  SchoolPeriodEntity,
  StudentEntity, TeacherDistributionEntity,
} from '@core/entities';
import { UserEntity } from '@auth/entities';
import * as XLSX from 'xlsx';
import * as qr from 'qrcode';
import { join } from 'path';
import { CoreRepositoryEnum } from '@shared/enums';

@Injectable()
export class GradeReportsService {
  private imageHeaderPath = './resources/images/reports/header.png';
  private imageFooterPath = `./resources/images/reports/footer.png`;
  private imageHeaderWidth = 110;
  private imageHeaderHeight = 80;

  constructor(
    @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY) private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY) private readonly teacherDistributionRepository: Repository<TeacherDistributionEntity>,
    @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY) private readonly enrollmentDetailRepository: Repository<EnrollmentDetailEntity>,
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly studentRepository: Repository<StudentEntity>) {
  }


  async generateGradesByTeacherDistribution(teacherDistributionId: string) {
    const teacherDistribution = await this.teacherDistributionRepository.findOneBy({ id: teacherDistributionId });

    const enrollmentDetails = await this.findEnrollmentDetails(teacherDistribution);

    const data = enrollmentDetails.map(enrollmentDetail => {
      return {
        'Numero_Documento': enrollmentDetail.enrollment.student.user.identification,
        'Apellidos': enrollmentDetail.enrollment.student.user.lastname,
        'Nombres': enrollmentDetail.enrollment.student.user.name,
        'Asignatura': enrollmentDetail.subject.name,
        'Parcial1': enrollmentDetail.grades[0]?.value,
        'Parcial2': enrollmentDetail.grades[1]?.value,
        'Parcial3': enrollmentDetail.grades[2]?.value,
        'Parcial4': enrollmentDetail.grades[3]?.value,
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

  async findEnrollmentDetails(teacherDistribution: TeacherDistributionEntity) {
    return await this.enrollmentDetailRepository.find({
      relations: {
        academicState: true,
        attendances: { partial: true },
        grades: { partial: true },
        parallel: true,
        enrollmentDetailState: { state: true },
        subject: { academicPeriod: true },
        type: true,
        workday: true,
        enrollment: { student: { user: true } },
      },
      where: {
        enrollment: { schoolPeriodId: teacherDistribution.schoolPeriodId },
        parallelId: teacherDistribution.parallelId,
        subjectId: teacherDistribution.subjectId,
        workdayId: teacherDistribution.workdayId,
      },
      order: { enrollment: { student: { user: { lastname: 'asc', name: 'asc' } } } },
    });
  }

  async generateErrorReport(teacherDistributionId: string) {
    return join(process.cwd(), 'storage/reports/grades', teacherDistributionId + '.xlsx'); //review path
  }
}
