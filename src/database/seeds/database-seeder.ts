import { Injectable } from '@nestjs/common';
import { CataloguesSeeder } from './catalogues-seeder';
import { UsersSeeder } from './users-seeder';
import { RolesSeeder } from './roles-seeder';
import { MenusSeeder } from './menus-seeder';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private cataloguesSeeder: CataloguesSeeder,
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
    private menusSeeder: MenusSeeder,
  ) {}

  async run() {
    await this.cataloguesSeeder.run();
    await this.rolesSeeder.run();
    await this.usersSeeder.run();
    await this.menusSeeder.run();
    this.createUploadsDirectories();
  }

  createUploadsDirectories() {
    const date = new Date();
    for (let i = date.getFullYear(); i < date.getFullYear() + 100; i++) {
      const path = `${join(process.cwd())}/src/resources/uploads/${i}`;
      fs.mkdir(path, (err) => {
        if (err) {
          // console.log(err);
        }
        // console.log('Created Directory Year');
      });

      for (let j = 1; j <= 12; j++) {
        const path = `${join(process.cwd())}/src/resources/uploads/${i}/${j}`;
        fs.mkdir(path, (err) => {
          if (err) {
            // console.log(err);
          }
          // console.log('Created Directory Month');
        });
      }
    }
  }
}
