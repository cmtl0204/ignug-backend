import { Injectable } from '@nestjs/common';
import { CreateSchoolPeriodDto, CreatePartialDto } from '@core/dto';
import { PartialsService, SchoolPeriodsService} from '@core/services';
import { SchoolPeriodEntity } from '@core/entities';

@Injectable()
export class PartialsSeeder {
  constructor(private partialsService: PartialsService, 
    private schoolPeriodsService: SchoolPeriodsService) {}

  async run() {
    await this.create();
  }

  async create() {
    const partials: CreatePartialDto[] = [];

    const schoolPeriods = (await this.schoolPeriodsService.findAll()).data;

    const schoolPeriod = schoolPeriods.find((schoolPeriod: SchoolPeriodEntity) => schoolPeriod.code === 'cod1');

    partials.push(
      {
        date: new Date('2023-05-15'),
        value: 1,
        schoolPeriod: schoolPeriod,
      },
      {
        date: new Date('2023-08-15'),
        value: 2,
        schoolPeriod: schoolPeriod,
      },
      
    );
    for (const item of partials) {
      await this.partialsService.create(item);
    }
  }
}
  