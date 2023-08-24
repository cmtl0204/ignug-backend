import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from '@core/dto';
import { EnrollmentsDetailService } from 'src/modules/core/services';
import { GradesService } from 'src/modules/core/services/grades.service';
import { EnrollmentDetailEntity } from '@core/entities';
import { faker } from '@faker-js/faker';

@Injectable()
export class GradeSeeder {
  private enrollmentDetails: EnrollmentDetailEntity[] = [];

  constructor(private enrollmentDetailService: EnrollmentsDetailService, private gradeService: GradesService) {}

  async run() {
    await this.loadEnrollmentsDetail();
    await this.createGrades();
  }

  private async loadEnrollmentsDetail() {
    this.enrollmentDetails = (await this.enrollmentDetailService.findAll()).data as EnrollmentDetailEntity[];
  }

  private async createGrades() {
    const grades: CreateGradeDto[] = [];

    this.enrollmentDetails.forEach(enrollmentDetail => {
      grades.push({
        value: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        enrollmentDetail: enrollmentDetail,
        partial: null,
      });
    });

    for (const grade of grades) {
      await this.gradeService.create(grade);
    }
  }
}
