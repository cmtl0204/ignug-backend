import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCatalogueDto, UpdateCatalogueDto } from '@core/dto';
import { CataloguesService } from '@core/services';

@ApiTags('catalogues')
@Controller('catalogues')
export class CataloguesController {
  constructor(private readonly cataloguesService: CataloguesService) {}

  @Post()
  create(@Body() createCatalogueDto: CreateCatalogueDto) {
    return this.cataloguesService.create(createCatalogueDto);
  }

  @Get()
  findAll() {
    return this.cataloguesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cataloguesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatalogueDto: UpdateCatalogueDto,
  ) {
    return this.cataloguesService.update(+id, updateCatalogueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cataloguesService.remove(+id);
  }
}
