import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from '@core/dto';
import { StudentsService, SubjectsService } from '@core/services';
import { EnrollmentService } from 'src/modules/core/services'

@Injectable()
export class EnrollmentSeeder {
    constructor(
    private studentsService: StudentsService,
    private subjectService: SubjectsService,
    ) {}

    async run() {
        await this.createEnrollment();
    }

    async createEnrollment() {
        const enrolls: CreateEnrollmentDto[] = [];

    enrolls.push(
        {
            code: 'M001',
            date: '04/08/2023',
            application_at: '29/07/2023',
            folio: ' '
        },
        {
            code: 'M002',
            date: '11/08/2023',
            application_at: '09/08/2023',
            folio: ' '
        },
        {
            code: 'M003',
            date: '15/07/2023',
            application_at: '13/07/2023',
            folio: ' '
        },
        {
            code: 'M004',
            date: '07/08/2023',
            application_at: '07/08/2023',
            folio: ' '
        }
    );

    for (const enroll of enrolls) {
        const enrollCrated = await this.enrollmentService.create(enroll);
        await this.studentsService.create({ user: enrollCrated });
    }
    }
}
