import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CatalogueCoreTypeEnum } from '@shared/enums';
import { SeedUserDto } from '@auth/dto';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';
import { RolesService, UsersService } from '@auth/services';
import { CatalogueEntity } from '@core/entities';
import { CataloguesService } from '@core/services';

@Injectable()
export class UsersSeeder {
  private bloodTypes: CatalogueEntity[] = [];
  private ethnicOrigins: CatalogueEntity[] = [];
  private genders: CatalogueEntity[] = [];
  private identificationTypes: CatalogueEntity[] = [];
  private maritalStatus: CatalogueEntity[] = [];
  private sexes: CatalogueEntity[] = [];
  private roles: RoleEntity[] = [];

  constructor(private rolesService: RolesService, private usersService: UsersService, private cataloguesService: CataloguesService) {}

  async run() {
    await this.loadRoles();
    await this.loadCatalogues();
    await this.createUsers();
    await this.createStudentUsers();
    await this.createTeacherUsers();
  }

  async loadRoles() {
    this.roles = (await this.rolesService.findAll()).data as RoleEntity[];
  }

  async loadCatalogues() {
    const catalogues = (await this.cataloguesService.findAll()).data as CatalogueEntity[];

    this.bloodTypes = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.BLOOD_TYPE);

    this.ethnicOrigins = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ETHNIC_ORIGIN);

    this.genders = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.GENDER);

    this.identificationTypes = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.IDENTIFICATION_TYPE);

    this.maritalStatus = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.MARITAL_STATUS);

    this.sexes = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.SEX);
  }

  async createUsers() {
    const users: SeedUserDto[] = [];

    const adminRole = this.roles.find(role => role.code === RoleEnum.ADMIN);
    const coordinatorAdministrativeRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE);
    const coordinatorCareerRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_CAREER);
    const rectorRole = this.roles.find(role => role.code === RoleEnum.RECTOR);

    users.push(
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'admin@gmail.com',
        identification: '123456781',
        lastname: 'Perez',
        name: 'Admin',
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [adminRole],
        username: 'admin',
      },
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'coordinator_administrative@gmail.com',
        identification: '123456782',
        lastname: 'Perez',
        name: 'Coordinator Administrative',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorAdministrativeRole],
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        username: 'coordinator_administrative',
      },
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'coordinator_career@gmail.com',
        identification: '123456783',
        lastname: 'Perez',
        name: 'Coordinator Career',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorCareerRole],
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        username: 'coordinator_career',
      },
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'rector@gmail.com',
        identification: '123456784',
        lastname: 'Perez',
        name: 'Rector',
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [rectorRole],
        username: 'rector',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }

  async createStudentUsers() {
    const users: SeedUserDto[] = [];

    const studentRole = this.roles.find(role => role.code === RoleEnum.STUDENT);

    for (let i = 0; i < 10; i++) {
      const identification = faker.string.numeric(10);
      users.push({
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        identification: identification,
        lastname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [studentRole],
        username: identification,
      });
    }

    for (const user of users) {
      await this.usersService.create(user);
    }
  }

  async createTeacherUsers() {
    const users: SeedUserDto[] = [];

    const teacherRole = this.roles.find(role => role.code === RoleEnum.TEACHER);

    for (let i = 0; i < 10; i++) {
      const identification = faker.string.numeric(10);
      users.push({
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length * 1234562)],
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        identification: identification,
        lastname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [teacherRole],
        username: identification,
      });
    }

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
