import { Injectable } from '@nestjs/common';
import { SchoolPeriodDto } from '@core/dto';
import { CatalogueEntity } from 'src/modules/core/entities/catalogue.entity';
import { SchoolPeriodsService } from '@core/services';

@Injectable()
export class SchoolPeriodSeeder {
    constructor(private schoolsPeriod: SchoolPeriodsService) { }

    async run() {
        await this.createSchoolPeriod();
    }

    async createSchoolPeriod() {
        const schoolPeriod: SchoolPeriodDto[] = [];

        for (let i = 1; i <= 10; i++) {
            const testSchoolPeriodDto: SchoolPeriodDto = {
                code: `cod${i}`,
                codeSniese: `SP-SN-00${i}`,
                isVisible: i % 2 === 0,
                name: `Test School Period ${i}`,
                shortName: `TSP${i}`,
                startedAt: new Date(`2023-01-${i < 10 ? '0' + i : i}`),
                endedAt: new Date(`2023-06-${i < 10 ? '0' + i : i}`),
                ordinaryStartedAt: new Date(`2023-01-${i < 10 ? '0' + i : i}`),
                ordinaryEndedAt: new Date(`2023-05-${i < 10 ? '0' + i : i}`),
                extraOrdinaryStartedAt: new Date(`2023-02-${i < 10 ? '0' + i : i}`),
                extraOrdinaryEndedAt: new Date(`2023-02-${i < 10 ? '0' + i : i}`),
                especialStartedAt: new Date(`2023-03-${i < 10 ? '0' + i : i}`),
                especialEndedAt: new Date(`2023-03-${i < 10 ? '0' + i : i}`),
                state: new CatalogueEntity
            };
            schoolPeriod.push(testSchoolPeriodDto);
          }
          for (const item of schoolPeriod) {
            await this.schoolsPeriod.create(item);
          }
    }
}
