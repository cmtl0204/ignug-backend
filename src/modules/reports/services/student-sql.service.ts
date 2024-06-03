import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CareerEntity, CatalogueEntity, EnrollmentEntity, EnrollmentStateEntity, StudentEntity } from '@core/entities';
import { CoreRepositoryEnum } from '@shared/enums';
import { UserEntity } from '@auth/entities';

@Injectable()
export class StudentSqlService {
  constructor(
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly repository: Repository<StudentEntity>,
  ) {
  }

  async findSocioeconomicFormAll(schoolPeriodId: string) {
    const queryBuilder: SelectQueryBuilder<StudentEntity> = this.repository.createQueryBuilder('students');

    queryBuilder.select(
      [
        'students.id as "Código de Carrera"',
        'states.name as "Estado"',
        'types.name as "Tipo"',
      ])
      .innerJoin(EnrollmentEntity, 'enrollments', 'enrollments.student_id = students.id')
      .innerJoin(EnrollmentStateEntity, 'enrollment_states', 'enrollment_states.enrollment_id = enrollments.id')
      .innerJoin(CatalogueEntity, 'states', 'states.id = enrollment_states.state_id')
      .innerJoin(CatalogueEntity, 'types', 'types.id = enrollments.type_id')
      .where('enrollments.school_period_id = :schoolPeriodId and enrollment_states.deleted_at is null', {
        schoolPeriodId,
      });
      // }).orderBy('careers.name, academic_periods.code, parallels.code, users.lastname, users.name');

    return await queryBuilder.getRawMany();
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
            parrish: true,
          },
          residenceAddress: {
            country: true,
            province: true,
            canton: true,
            parrish: true,
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
}
