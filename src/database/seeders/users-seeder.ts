import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CatalogueTypeEnum } from '@shared/enums';
import { SeedUserDto } from '@auth/dto';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';
import { RolesService, UsersService } from '@auth/services';
import { CareerEntity, CatalogueEntity, InstitutionEntity } from '@core/entities';
import { CareersService, CataloguesService, InstitutionsService } from '@core/services';

@Injectable()
export class UsersSeeder {
  private bloodTypes: CatalogueEntity[] = [];
  private ethnicOrigins: CatalogueEntity[] = [];
  private genders: CatalogueEntity[] = [];
  private identificationTypes: CatalogueEntity[] = [];
  private maritalStatus: CatalogueEntity[] = [];
  private sexes: CatalogueEntity[] = [];
  private roles: RoleEntity[] = [];
  private institutions: InstitutionEntity[] = [];
  private careers: CareerEntity[] = [];

  constructor(
    private careersService: CareersService,
    private rolesService: RolesService,
    private usersService: UsersService,
    private cataloguesService: CataloguesService,
    private institutionsService: InstitutionsService,
  ) {}

  async run() {
    await this.loadRoles();
    await this.loadInstitutions();
    await this.loadCareers();
    await this.loadCatalogues();
    await this.createUsers();
    await this.createStudentUsers();
    await this.createTeacherUsers();
  }

  async loadCareers() {
    this.careers = (await this.careersService.findByInstitution(this.institutions[0].id)).data;
  }

  async loadRoles() {
    this.roles = (await this.rolesService.findAll()).data as RoleEntity[];
  }

  async loadInstitutions() {
    this.institutions = (await this.institutionsService.findAll()).data;
  }

  async loadCatalogues() {
    const catalogues = (await this.cataloguesService.findAll()).data as CatalogueEntity[];

    this.bloodTypes = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.BLOOD_TYPE);

    this.ethnicOrigins = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.ETHNIC_ORIGIN);

    this.genders = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.GENDER);

    this.identificationTypes = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.IDENTIFICATION_TYPE);

    this.maritalStatus = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.MARITAL_STATUS);

    this.sexes = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.SEX);
  }

  async createUsers() {
    const users: SeedUserDto[] = [];

    const adminRole = this.roles.find(role => role.code === RoleEnum.ADMIN);
    const coordinatorAdministrativeRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE);
    const coordinatorCareerRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_CAREER);
    const rectorRole = this.roles.find(role => role.code === RoleEnum.RECTOR);

    const institution = this.institutions.find(institution => institution.code === 'cod1');

    users.push(
      {
        bloodType: this.bloodTypes[faker.helpers.rangeToNumber({ min: 0, max: this.bloodTypes.length - 1 })],
        ethnicOrigin:
          this.ethnicOrigins[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.ethnicOrigins.length - 1,
            })
          ],
        gender: this.genders[faker.helpers.rangeToNumber({ min: 0, max: this.genders.length - 1 })],
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        maritalStatus:
          this.maritalStatus[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.maritalStatus.length - 1,
            })
          ],
        sex: this.sexes[faker.helpers.rangeToNumber({ min: 0, max: this.sexes.length - 1 })],
        birthdate: faker.date.birthdate(),
        email: 'admin@gmail.com',
        identification: '123456781',
        institutions: [],
        lastname: 'Perez',
        name: 'Admin',
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [adminRole],
        username: 'admin',
        careers: [],
      },
      {
        bloodType: this.bloodTypes[faker.helpers.rangeToNumber({ min: 0, max: this.bloodTypes.length - 1 })],
        ethnicOrigin:
          this.ethnicOrigins[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.ethnicOrigins.length - 1,
            })
          ],
        gender: this.genders[faker.helpers.rangeToNumber({ min: 0, max: this.genders.length - 1 })],
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        maritalStatus:
          this.maritalStatus[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.maritalStatus.length - 1,
            })
          ],
        sex: this.sexes[faker.helpers.rangeToNumber({ min: 0, max: this.sexes.length - 1 })],
        birthdate: faker.date.birthdate(),
        email: 'coordinator_administrative@gmail.com',
        identification: '123456782',
        institutions: [],
        lastname: 'Administrative',
        name: 'Coordinator',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorAdministrativeRole],
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        username: 'coordinator_administrative',
        careers: [],
      },
      {
        bloodType: this.bloodTypes[faker.helpers.rangeToNumber({ min: 0, max: this.bloodTypes.length - 1 })],
        ethnicOrigin:
          this.ethnicOrigins[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.ethnicOrigins.length - 1,
            })
          ],
        gender: this.genders[faker.helpers.rangeToNumber({ min: 0, max: this.genders.length - 1 })],
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        maritalStatus:
          this.maritalStatus[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.maritalStatus.length - 1,
            })
          ],
        sex: this.sexes[faker.helpers.rangeToNumber({ min: 0, max: this.sexes.length - 1 })],
        birthdate: faker.date.birthdate(),
        email: 'coordinator_career@gmail.com',
        identification: '123456783',
        institutions: [institution],
        lastname: 'Career',
        name: 'Coordinator',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorCareerRole],
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        username: 'coordinator_career',
        careers: this.careers,
      },
      {
        bloodType: this.bloodTypes[faker.helpers.rangeToNumber({ min: 0, max: this.bloodTypes.length - 1 })],
        ethnicOrigin:
          this.ethnicOrigins[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.ethnicOrigins.length - 1,
            })
          ],
        gender: this.genders[faker.helpers.rangeToNumber({ min: 0, max: this.genders.length - 1 })],
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        maritalStatus:
          this.maritalStatus[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.maritalStatus.length - 1,
            })
          ],
        sex: this.sexes[faker.helpers.rangeToNumber({ min: 0, max: this.sexes.length - 1 })],
        birthdate: faker.date.birthdate(),
        email: 'rector@gmail.com',
        identification: '123456784',
        institutions: [institution],
        lastname: 'Perez',
        name: 'Rector',
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [rectorRole],
        username: 'rector',
        careers: [],
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }

  async createStudentUsers() {
    const users: SeedUserDto[] = [];

    const studentRole = this.roles.find(role => role.code === RoleEnum.STUDENT);
    const institution = this.institutions.find(institution => institution.code === 'cod1');

    for (let i = 0; i < 10; i++) {
      const identification = faker.string.numeric(10);
      users.push({
        bloodType: this.bloodTypes[faker.helpers.rangeToNumber({ min: 0, max: this.bloodTypes.length - 1 })],
        ethnicOrigin:
          this.ethnicOrigins[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.ethnicOrigins.length - 1,
            })
          ],
        gender: this.genders[faker.helpers.rangeToNumber({ min: 0, max: this.genders.length - 1 })],
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        maritalStatus:
          this.maritalStatus[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.maritalStatus.length - 1,
            })
          ],
        sex: this.sexes[faker.helpers.rangeToNumber({ min: 0, max: this.sexes.length - 1 })],
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        identification: identification,
        institutions: [institution],
        lastname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [studentRole],
        username: identification,
        careers: [],
      });
    }

    for (const user of users) {
      await this.usersService.create(user);
    }
  }

  async createTeacherUsers() {
    const users: SeedUserDto[] = [];

    const teacherRole = this.roles.find(role => role.code === RoleEnum.TEACHER);
    const institution = this.institutions.find(institution => institution.code === 'cod1');

    for (let i = 0; i < 10; i++) {
      const identification = faker.string.numeric(10);
      users.push({
        bloodType: this.bloodTypes[faker.helpers.rangeToNumber({ min: 0, max: this.bloodTypes.length - 1 })],
        ethnicOrigin:
          this.ethnicOrigins[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.ethnicOrigins.length - 1,
            })
          ],
        gender: this.genders[faker.helpers.rangeToNumber({ min: 0, max: this.genders.length - 1 })],
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        maritalStatus:
          this.maritalStatus[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.maritalStatus.length - 1,
            })
          ],
        sex: this.sexes[faker.helpers.rangeToNumber({ min: 0, max: this.sexes.length - 1 })],
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        identification: identification,
        institutions: [institution],
        lastname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [teacherRole],
        username: identification,
        careers: [],
      });
    }

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
