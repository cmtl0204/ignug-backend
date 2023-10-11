import {Injectable} from '@nestjs/common';
import {SeedSchoolPeriodDto} from '@core/dto';
import {CatalogueEntity} from 'src/modules/core/entities/catalogue.entity';
import {CataloguesService, InstitutionsService, SchoolPeriodsService} from '@core/services';
import {CatalogueCoreTypeEnum} from '@shared/enums';

@Injectable()
export class SchoolPeriodSeeder {
    constructor(private schoolsPeriod: SchoolPeriodsService,
                private cataloguesService: CataloguesService,
                private institutionsService: InstitutionsService) {
    }

    async run() {
        await this.createSchoolPeriod();
    }

    private async createSchoolPeriod() {
        const schoolPeriods: SeedSchoolPeriodDto[] = [];

        const catalogues = await this.cataloguesService.findCache();
        const closeState = await catalogues.find((item: CatalogueEntity) => item.code === 'close' && item.type === CatalogueCoreTypeEnum.SCHOOL_PERIODS_STATE);
        const openState = await catalogues.find((item: CatalogueEntity) => item.code === 'open' && item.type === CatalogueCoreTypeEnum.SCHOOL_PERIODS_STATE);

        const institution = ((await this.institutionsService.findAll()).data)[0];
        for (let i = 1; i <= 10; i++) {
            const schoolPeriod: SeedSchoolPeriodDto = {
                institution: institution,
                code: `cod${i}`,
                codeSniese: `SP-SN-00${i}`,
                isVisible: true,
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
                state: i === 10 ? openState : closeState,
            };
            schoolPeriods.push(schoolPeriod);
        }
        for (const item of schoolPeriods) {
            await this.schoolsPeriod.create(item);
        }
    }
}
