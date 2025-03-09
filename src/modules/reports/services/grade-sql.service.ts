import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CareerEntity,
  CatalogueEntity, EnrollmentDetailEntity, EnrollmentDetailStateEntity,
  EnrollmentEntity,
  EnrollmentStateEntity, InformationStudentEntity, LocationEntity,
  OriginAddressEntity, ResidenceAddressEntity,
  StudentEntity, TeacherDistributionEntity,
} from '@core/entities';
import { CatalogueEnrollmentStateEnum, CatalogueTypeEnum, CoreRepositoryEnum } from '@shared/enums';
import { UserEntity } from '@auth/entities';
import { CataloguesService } from '@core/services';
import { PrinterService } from './printer.service';

@Injectable()
export class GradeSqlService {
  constructor(
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly repository: Repository<StudentEntity>,
    @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY) private readonly teacherDistributionRepository: Repository<TeacherDistributionEntity>,
    private readonly cataloguesService: CataloguesService,
  ) {
  }

  async findGradesReportByTeacherDistribution(teacherDistributionId: string) {
    const teacherDistribution = await this.teacherDistributionRepository.findOneBy({id: teacherDistributionId});

    const enrollmentDetails = await this.findEnrollmentDetails(teacherDistribution);

    return enrollmentDetails.map(enrollmentDetail => {
      const partial1 = enrollmentDetail.grades.find(grade => grade.partial.code === '1');
      const partial2 = enrollmentDetail.grades.find(grade => grade.partial.code === '2');
      const partial3 = enrollmentDetail.grades.find(grade => grade.partial.code === '3');

      return {
        'Numero_Documento': enrollmentDetail.enrollment.student.user.identification,
        'Apellidos': enrollmentDetail.enrollment.student.user.lastname,
        'Nombres': enrollmentDetail.enrollment.student.user.name,
        'Asignatura': enrollmentDetail.subject.name,
        'Parcial1': partial1?.value,
        'Parcial2': partial2?.value,
        'Examen_Final': partial3?.value,
        'Progreso': enrollmentDetail.finalAttendance,
        'Calificacion_Final': enrollmentDetail.finalGrade,
        'Estado_Academico': enrollmentDetail.academicState?.name,
      };
    });
  }

  async findSocioeconomicForm(id: string): Promise<StudentEntity> {
    const student = await this.repository.findOne({
      relations: {
        careers: true,
        informationStudent: {
          ancestralLanguageName: true,
          consumeNewsType: true,
          contactEmergencyKinship: true,
          degreeSuperior: true,
          disabilityType: true,
          economicContribution: true,
          electricServiceBlackout: true,
          electronicDevice: true,
          familyIncome: true,
          familyKinshipCatastrophicIllness: true,
          familyKinshipDisability: true,
          familyProperties: true,
          foreignLanguageName: true,
          homeFloor: true,
          homeOwnership: true,
          homeRoof: true,
          homeType: true,
          homeWall: true,
          indigenousNationality: true,
          internetType: true,
          isAncestralLanguage: true,
          isCatastrophicIllness: true,
          isDegreeSuperior: true,
          isDependsEconomically: true,
          isDisability: true,
          isDiscrimination: true,
          isElectricService: true,
          isElectronicDevice: true,
          isFamilyCatastrophicIllness: true,
          isFamilyDisability: true,
          isFamilyEconomicAid: true,
          isFamilyEmigrant: true,
          isFamilyProperties: true,
          isFamilyVehicle: true,
          isForeignLanguage: true,
          isGenderViolence: true,
          isHasChildren: true,
          isHouseHead: true,
          isInjuries: true,
          isInternet: true,
          isLostGratuity: true,
          isPhoneService: true,
          isPrivateSecurity: true,
          isSewerageService: true,
          isSocialSecurity: true,
          isStudyOtherCareer: true,
          isWaterService: true,
          isWork: true,
          monthlySalary: true,
          pandemicPsychologicalEffect: true,
          sewerageServiceType: true,
          socialGroup: true,
          studentLive: true,
          town: true,
          typeDiscrimination: true,
          typeGenderViolence: true,
          typeInjuries: true,
          typeSchool: true,
          typeStudyOtherCareer: true,
          universityCareer: true,
          waterServiceType: true,
          workingHours: true,
        },
        user: {
          identificationType: true,
          maritalStatus: true,
          nationality: true,
          sex: true,
          gender: true,
          ethnicOrigin: true,
          originAddress: {
            country: true,
            province: true,
            canton: true,
            parish: true,
          },
          residenceAddress: {
            country: true,
            province: true,
            canton: true,
            parish: true,
          },
        },
      },
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return student;
  }

  async findStudentCard(id: string, careerId: string, schoolPeriodId: string): Promise<StudentEntity[]> {
    const catalogues = await this.cataloguesService.findCache();
    const enrollmentStateEnrolled = catalogues.find(catalogue => catalogue.code === CatalogueEnrollmentStateEnum.ENROLLED && catalogue.type === CatalogueTypeEnum.ENROLLMENT_STATE);

    const student = await this.repository.find({
      relations: {
        informationStudent: { town: true, indigenousNationality: true },
        enrollments: { career: true, schoolPeriod: true },
        user: {
          ethnicOrigin: true,
          sex: true,
          residenceAddress: {
            province: true,
            canton: true,
          },
        },
      },
      where: {
        id,
        enrollments: {
          careerId: careerId,
          schoolPeriodId: schoolPeriodId,
          enrollmentStates: { stateId: enrollmentStateEnrolled.id },
        },
      },
    });

    if (!student.length) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return student;
  }
}
