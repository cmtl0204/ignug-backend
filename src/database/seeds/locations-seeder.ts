import { Injectable } from '@nestjs/common';
import { LocationsService } from '@core/services';
import * as XLSX from 'xlsx';
import { join } from 'path';

@Injectable()
export class LocationsSeeder {
  constructor(private locationsService: LocationsService) {}

  async run() {
    await this.importDPA();
  }

  async importDPA(): Promise<boolean> {
    const workbook = XLSX.readFile(join(process.cwd(), 'src/database/seeds/files/dpa.xlsx'));

    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    for (const item of dataExcel) {
      let parent = null;
      if (item['padre_id'] !== undefined) {
        parent = await this.locationsService.findByIdTemp(item['padre_id']);
      }

      await this.locationsService.create({
        parent: parent,
        code: item['codigo'],
        name: item['nombre'],
        latitude: item['latitud'],
        longitude: item['longitud'],
        level: item['tipo_id'] === 35 ? 1 : item['tipo_id'] === 36 ? 2 : item['tipo_id'] === 37 ? 3 : 4,
        zone: item['tipo_zona'],
        idTemp: item['id'],
      });
    }

    return true;
  }
}
