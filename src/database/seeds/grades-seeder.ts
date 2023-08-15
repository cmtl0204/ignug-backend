import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from '@core/dto';
import { CataloguesService, SubjectsService } from '@core/services';
import { EnrollmentsService, EnrollmentsDetailService } from 'src/modules/core/services';
import { GradesService } from 'src/modules/core/services/grades.service';
import { EnrollmentDetailEntity } from '@core/entities';

@Injectable()
export class GradeSeeder {
  private enrollmentsDetail: EnrollmentDetailEntity[] = [];

  constructor(
    private enrollmentDetailService: EnrollmentsDetailService,
    private gradeService: GradesService,
    ) { }

  async run() {
    await this.createGrades();
    await this.loadEnrollmentsDetail();
  }

  async loadEnrollmentsDetail() {
    this.enrollmentsDetail = (await this.enrollmentDetailService.findAll()).data as EnrollmentDetailEntity[];
  }

  async createGrades() {
    const grades: CreateGradeDto[] = [];

    const enrollmentDetail1 = this.enrollmentsDetail.find((enrollmentsDetail: EnrollmentDetailEntity) => enrollmentsDetail.id === '1');

    grades.push(
      {
        createdAt: new Date('2023-08-14'),
        updatedAt: new Date('2023-08-14'),
        deletedAt: new Date('2023-08-14'),
        value: 5,
        enrollmentDetail: null
      },
      {
        createdAt: new Date('2023-08-16'),
        updatedAt: new Date('2023-08-16'),
        deletedAt: new Date('2023-08-16'),
        value: 6,
        enrollmentDetail: null
      },
      {
        createdAt: new Date('2023-08-13'),
        updatedAt: new Date('2023-08-13'),
        deletedAt: new Date('2023-08-13'),
        value: 7,
        enrollmentDetail: null
      },
    );

    for (const grade of grades) {
      await this.gradeService.create(grade);
    }
  }
}

