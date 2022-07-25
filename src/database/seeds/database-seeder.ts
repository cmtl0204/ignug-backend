import { Injectable } from '@nestjs/common';
import { CataloguesSeeder } from './catalogues-seeder';
import { UsersSeeder } from './users-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private cataloguesSeeder: CataloguesSeeder,
    private usersSeeder: UsersSeeder,
  ) {
    this.run();
  }

  run() {
    this.cataloguesSeeder.run();
    this.usersSeeder.run();
  }
}
