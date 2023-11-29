import {Injectable} from '@nestjs/common';
import {faker} from '@faker-js/faker';
import {CatalogueTypeEnum} from '@shared/enums';
import {SeedUserDto} from '@auth/dto';
import {RoleEntity} from '@auth/entities';
import {RoleEnum} from '@auth/enums';
import {RolesService, UsersService} from '@auth/services';
import {CareerEntity, CatalogueEntity, InstitutionEntity} from '@core/entities';
import {CareersService, CataloguesService, InstitutionsService} from '@core/services';
import * as XLSX from "xlsx";
import {join} from "path";

@Injectable()
export class UsersSeeder {
    private identificationTypes: CatalogueEntity[] = [];
    private roles: RoleEntity[] = [];
    private institutions: InstitutionEntity[] = [];
    private careers: CareerEntity[] = [];

    constructor(
        private careersService: CareersService,
        private rolesService: RolesService,
        private usersService: UsersService,
        private cataloguesService: CataloguesService,
        private institutionsService: InstitutionsService,
    ) {
    }

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
        this.careers = (await this.careersService.findCareersByInstitution(this.institutions[0].id)).data;
    }

    async loadRoles() {
        this.roles = (await this.rolesService.findAll()).data as RoleEntity[];
    }

    async loadInstitutions() {
        this.institutions = (await this.institutionsService.findAll()).data;
    }

    async loadCatalogues() {
        const catalogues = (await this.cataloguesService.findAll()).data as CatalogueEntity[];

        this.identificationTypes = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.IDENTIFICATION_TYPE);

    }

    async createUsers() {
        const users: SeedUserDto[] = [];

        const adminRole = this.roles.find(role => role.code === RoleEnum.ADMIN);
        const coordinatorAdministrativeRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE);
        const coordinatorCareerRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_CAREER);
        const rectorRole = this.roles.find(role => role.code === RoleEnum.RECTOR);
        const reviewerRole = this.roles.find(role => role.code === RoleEnum.REVIEWER);
        const secretaryRole = this.roles.find(role => role.code === RoleEnum.SECRETARY);

        const institution = this.institutions[0];

        users.push(
            {
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '123456781',
                institutions: [],
                email: 'admin@correo.com',
                lastname: 'Perez',
                name: 'Admin',
                password: '12345678',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [adminRole],
                username: 'admin',
                careers: [],
            },
            {
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '123456782',
                institutions: [],
                email: 'coordinator_administrative@correo.com',
                lastname: 'Administrative',
                name: 'Coordinator',
                password: '12345678',
                passwordChanged: false,
                roles: [coordinatorAdministrativeRole],
                personalEmail: faker.internet.email(),
                username: 'coordinator_administrative',
                careers: [],
            },
            {
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '123456783',
                institutions: [institution],
                email: 'coordinator_career@correo.com',
                lastname: 'Career',
                name: 'Coordinator',
                password: '12345678',
                passwordChanged: false,
                roles: [coordinatorCareerRole],
                personalEmail: faker.internet.email(),
                username: 'coordinator_career',
                careers: this.careers,
            },
            {
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '123456784',
                institutions: [institution],
                email: 'rector@correo.com',
                lastname: 'Perez',
                name: 'Rector',
                password: '12345678',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [rectorRole],
                username: 'rector',
                careers: [],
            },
            {
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '123456785',
                institutions: [institution],
                email: 'reviewer@correo.com',
                lastname: 'Perez',
                name: 'Reviewer',
                password: '12345678',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [reviewerRole],
                username: 'reviewer',
                careers: [this.careers[0]],
            },
            {
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '123456786',
                institutions: [institution],
                email: 'secretary@correo.com',
                lastname: 'Perez',
                name: 'Secretary',
                password: '12345678',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [secretaryRole],
                username: 'secretary',
                careers: this.careers,
            },
            {
                identificationType: this.identificationTypes[0],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '1711191567',
                institutions: [institution],
                email: 'diana.aguayo@uaw.edu.ec',
                lastname: 'AGUAYO RAMÍREZ',
                name: 'DIANA ESTEFANÍA',
                password: '1711191567',
                passwordChanged: false,
                personalEmail: 'diana.aguayo@uaw.edu.ec',
                roles: [reviewerRole],
                username: '1711191567',
                careers: this.careers,
            },
            {
                identificationType: this.identificationTypes[0],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '1723532014',
                institutions: [institution],
                email: 'angie.pillajo@uaw.edu.ec',
                lastname: 'PILLAJO MORILLO',
                name: 'ANGIE ISABEL',
                password: '1723532014',
                passwordChanged: false,
                personalEmail: 'angie.pillajo@uaw.edu.ec',
                roles: [reviewerRole],
                username: '1723532014',
                careers: this.careers,
            },
            {
                identificationType: this.identificationTypes[0],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '1725967648',
                institutions: [institution],
                email: 'nadia.tandayamo@uaw.edu.ec',
                lastname: 'TANDAYAMO ACERO',
                name: 'NADIA OLIVIA',
                password: '1725967648',
                passwordChanged: false,
                personalEmail: 'nadia.tandayamo@uaw.edu.ec',
                roles: [reviewerRole],
                username: '1725967648',
                careers: this.careers,
            },
            {
                identificationType: this.identificationTypes[0],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '1711982627',
                institutions: [institution],
                email: 'nicolas.cabezas@uaw.edu.ec',
                lastname: 'CABEZAS BAQUE',
                name: 'NICOLÁS ALFONSO',
                password: '1711982627',
                passwordChanged: false,
                personalEmail: 'nicolas.cabezas@uaw.edu.ec',
                roles: [reviewerRole],
                username: '1711982627',
                careers: this.careers,
            },
            {
                identificationType: this.identificationTypes[0],
                birthdate: faker.date.birthdate(),
                cellPhone: '',
                identification: '1721877270',
                institutions: [institution],
                email: 'diego.yanez@uaw.edu.ec',
                lastname: 'YANEZ FLORES',
                name: 'DIEGO ALEXANDER',
                password: '1721877270',
                passwordChanged: false,
                personalEmail: 'diego.yanez@uaw.edu.ec',
                roles: [secretaryRole, reviewerRole, coordinatorCareerRole],
                username: '1721877270',
                careers: this.careers,
            },
        );

        for (const user of users) {
            await this.usersService.create(user);
        }
    }

    async createStudentUsers() {
        const workbook = XLSX.readFile(join(process.cwd(), 'src/database/seeders/files/students.xlsx'));

        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        const users: SeedUserDto[] = [];
        const studentRole = this.roles.find(role => role.code === RoleEnum.STUDENT);
        const institution = this.institutions[0];

        for (const item of dataExcel) {
            users.push({
                identificationType: this.identificationTypes[0],
                birthdate: item['birthdate'],
                cellPhone: item['cell_phone'],
                identification: item['identification'],
                institutions: [institution],
                email: item['personal_email'],
                lastname: item['lastname'],
                name: item['name'],
                password: '12345678',
                passwordChanged: false,
                personalEmail: item['personal_email'],
                roles: [studentRole],
                username: item['identification'],
                careers: [this.careers.find(career => career.code === item['career_code'])],
            });
        }


        for (const user of users) {
            await this.usersService.create(user);
        }
    }

    async createTeacherUsers() {
        const users: SeedUserDto[] = [];

        const teacherRole = this.roles.find(role => role.code === RoleEnum.TEACHER);
        const institution = this.institutions[0];

        for (let i = 0; i < 10; i++) {
            const identification = 'teacher' + i;
            users.push({
                identificationType:
                    this.identificationTypes[
                        faker.helpers.rangeToNumber({
                            min: 0,
                            max: this.identificationTypes.length - 1,
                        })
                        ],
                birthdate: faker.date.birthdate(),
                cellPhone: '0987654321',
                identification: identification,
                institutions: [institution],
                email: faker.internet.email(),
                lastname: faker.person.lastName(),
                name: faker.person.firstName(),
                password: '12345678',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [teacherRole],
                username: identification,
                careers: [this.careers[faker.helpers.rangeToNumber({min: 0, max: this.careers.length - 1,})]],
            });
        }

        for (const user of users) {
            await this.usersService.create(user);
        }
    }
}
