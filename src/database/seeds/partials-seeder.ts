import { Injectable } from '@nestjs/common';
import { SeedPartialDto } from '@core/dto';
import { SchoolPeriodEntity } from '@core/entities';
import { PartialsService, SchoolPeriodsService } from '@core/services';

@Injectable()
export class PartialsSeeder {
  constructor(private partialsService: PartialsService, private schoolPeriodsService: SchoolPeriodsService) {}

  async run() {
    await this.create();
  }

  async create() {
    const partials: SeedPartialDto[] = [];

    const schoolPeriods = (await this.schoolPeriodsService.findAll()).data;

    partials.push(
      {
        code: '1',
        name: 'Parcial 1',
      },
      {
        code: '2',
        name: 'Parcial 2',
      },
    );

    for (const item of partials) {
      await this.partialsService.create(item);
    }
  }
}
