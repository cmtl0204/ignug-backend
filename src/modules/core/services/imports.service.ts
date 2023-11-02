import {Injectable} from '@nestjs/common';
import {CareersService, InstitutionsService, LocationsService, StudentsService, TeachersService} from '@core/services';
import * as XLSX from 'xlsx';
import * as process from 'process';
import {join} from 'path';
import {RolesService, UsersService} from '@auth/services';
import {RoleEnum} from '@auth/enums';
import {RoleEntity} from '@auth/entities';

@Injectable()
export class ImportsService {
    constructor(
        private readonly locationsService: LocationsService,
        private readonly teachersService: TeachersService,
        private readonly studentsService: StudentsService,
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService,
        private readonly institutionsService: InstitutionsService,
        private readonly careersService: CareersService,
    ) {
    }

    async importStudents(): Promise<boolean> {
        const workbook = XLSX.readFile(join(process.cwd(), 'src/resources/imports/students.xlsx'));

        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        const roles = (await this.rolesService.findAll()).data as RoleEntity[];
        const studentRole = roles.find(role => role.code === RoleEnum.STUDENT);
        const users = (await this.usersService.findAll()).data;

        for (const item of dataExcel) {
            const identification = item['identificacion'].toString().length < 10 ? '0' + item['identificacion'].toString() : item['identificacion'].toString();

            let email = '';
            /*
            if (item['correo_institucional']?.toString().length === 0 || item['correo_institucional']?.toString() === undefined) {
              email = `${item['nombre1'].substring(0, 1)}`;
              email += item['nombre2']?.substring(0, 1) === undefined ? '' : item['nombre2']?.substring(0, 1);
              email += item['apellido2']?.substring(0, 1) === undefined ? '' : item['apellido2']?.substring(0, 1);
              email += `.${item['apellido1']}@yavirac.edu.ec`;
            } else {
              email = item['correo_institucional'];
            }
            */

            email = item['correo_institucional'];
            email = email.toLowerCase();

            let user = users.find(user => user.username === identification);

            if (user === undefined) {
                const institution = await this.institutionsService.findByCode(item['codigo_institucion']);
                const careers = (await this.careersService.findCareersByInstitution(institution.id)).data;
                const career = careers.find(career => career.code === item['codigo_carrera']);

                user = {
                    email: email,
                    identification: identification,
                    lastname: `${item['apellido1']} ${item['apellido2']}`,
                    name: `${item['nombre1']} ${item['nombre2']}`,
                    password: identification,
                    passwordChanged: false,
                    roles: [studentRole],
                    username: identification,
                };

                user = await this.usersService.create(user);

                await this.studentsService.create({
                    user: user,
                    careers: [career],
                });
            } else {
                if (user.roles.find(role => role.id === studentRole.id) === undefined) {
                    user.roles.push(studentRole);
                    await this.usersService.update(user.id, user);
                }
            }

            await this.studentsService.create({user});
        }

        return true;
    }

    async importTeachers(): Promise<boolean> {
        const workbook = XLSX.readFile(join(process.cwd(), 'src/resources/imports/teachers.xlsx'));

        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        const roles = (await this.rolesService.findAll()).data as RoleEntity[];
        const teacherRole = roles.find(role => role.code === RoleEnum.TEACHER);

        for (const item of dataExcel) {
            const identification = item['identificacion'].toString().length < 10 ? '0' + item['identificacion'].toString() : item['identificacion'].toString();

            const user = {
                email: item['correo_institucional'],
                identification: identification,
                lastname: `${item['apellido1']} ${item['apellido2']}`,
                name: `${item['nombre1']} ${item['nombre2']}`,
                password: identification,
                passwordChanged: false,
                roles: [teacherRole],
                username: identification,
            };

            const userCrated = await this.usersService.create(user);

            await this.teachersService.create({user: userCrated});
        }

        return true;
    }

    async importCountries(): Promise<boolean> {
        const workbook = XLSX.readFile(join(process.cwd(), 'storage/imports/countries.xlsx'));

        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        for (const item of dataExcel) {
            const location = {
                alpha3: item['alpha3'],
                code: item['codigo'],
                idTemp: item['alpha3'],
                level: 1,
                name: item['nombre'].toUpperCase()
            }

            await this.locationsService.create(location);
        }

        return true;
    }

    async importDPA(): Promise<boolean> {
        const workbook = XLSX.readFile(join(process.cwd(), 'storage/imports/dpa.xlsx'));

        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        for (const item of dataExcel) {
            let level = 0;
            let zone = null;
            if (item['tipo_id'] == 36) {
                level = 2;
            }
            if (item['tipo_id'] == 37) {
                level = 3;
            }
            if (item['tipo_id'] == 38) {
                level = 4;
            }

            if (item['tipo_zona']) {
                zone = item['tipo_zona'];
            }

            let parentId = null;

            if (item['padre_id']) {
                const parent = await this.locationsService.findByIdTemp(item['padre_id']);
                if (parent) {
                    parentId = parent.id;
                }
            }

            const location = {
                parentId,
                code: item['codigo'],
                latitude: item['latitud'],
                longitude: item['longitud'],
                level,
                name: item['nombre'],
                zone,
                idTemp: item['id'],
            }

            await this.locationsService.create(location);
        }

        return true;
    }
}
