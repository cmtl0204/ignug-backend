import { Injectable } from '@nestjs/common';
import { CreateClassroomDto, SeedClassroomDto } from '@core/dto';
import { ClassroomsService, EnrollmentsDetailService, EnrollmentsService } from '@core/services';
import { EnrollmentDetailEntity, EnrollmentEntity } from '@core/entities';
import { faker } from '@faker-js/faker';

@Injectable()
export class ClassroomSeeder {
  private enrollmentsDetail: EnrollmentDetailEntity[] = [];

  constructor(private classroomsService: ClassroomsService) {}

  async run() {
    await this.create();
  }

  async create() {
    const classrooms: SeedClassroomDto[] = [];

    classrooms.push(
      {
        capacity: faker.helpers.rangeToNumber({ min: 10, max: 50 }),
        code: 'cod1',
        name: 'Aula 1',
        location: 'Primer piso',
        state: null,
        type: null,
      },
      {
        capacity: faker.helpers.rangeToNumber({ min: 10, max: 50 }),
        code: 'cod2',
        name: 'Aula 2',
        location: 'Segundo piso',
        state: null,
        type: null,
      },
    );

    for (const item of classrooms) {
      await this.classroomsService.create(item);
    }
  }
}
