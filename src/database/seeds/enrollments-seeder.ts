import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from '@core/dto';
import { StudentsService, SubjectsService } from '@core/services';
import { EnrollmentsService } from 'src/modules/core/services';

@Injectable()
export class EnrollmentSeeder {
  constructor(private studentsService: StudentsService, private subjectService: SubjectsService, private enrollmentsService: EnrollmentsService) {}

 /* async run() {
    await this.createEnrollments();
    await this.createEnrollmentDetails();
  }

  async createEnrollments() {
    const enrollments: CreateEnrollmentDto[] = [];

    enrollments.push(
      {
        code: 'cod1',
        date: new Date('2023-08-14'),
        application_at: new Date('2023-08-14'),
        folio: ' ',
        subject: null,
      },
      {
        code: 'cod2',
        date: '11/08/2023',
        application_at: '09/08/2023',
        folio: ' ',
      },
    );

    for (const enrollment of enrollments) {
      const enrollCrated = await this.enrollmentsService.create(enrollment);
      await this.studentsService.create({ user: enrollCrated });
    }
  }

  async createEnrollmentDetails() {
    const enrollmentDetails: CreateEnrollmentDto[] = [];

    enrollmentDetails.push(
      {
        code: 'cod1',
        date: new Date('2023-08-14'),
        application_at: new Date('2023-08-14'),
        folio: ' ',
        subject: null,
      },
      {
        code: 'cod2',
        date: '11/08/2023',
        application_at: '09/08/2023',
        folio: ' ',
      },
    );

    for (const enrollment of enrollmentDetails) {
      const enrollCrated = await this.enrollmentsService.create(enrollment);
      await this.studentsService.create({ user: enrollCrated });
    }
  }*/
}
