import { Injectable } from '@nestjs/common';
import { CataloguesSeeder } from './catalogues-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(private cataloguesSeeder: CataloguesSeeder) {
    this.run();
  }

  run() {
    this.cataloguesSeeder.run();
  }
}
