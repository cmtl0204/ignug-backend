import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from '@core/dto';
import { CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class InstitutionsSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService) {}

  async run() {
    await this.create();
  }

  async create() {}
}
