import { Injectable } from '@nestjs/common';
import { StudentsService, TeachersService } from '@core/services';
import * as XLSX from 'xlsx';
import * as process from 'process';
import { join } from 'path';
import { RolesService, UsersService } from '@auth/services';
import { RoleEnum } from '@auth/enums';
import { RoleEntity } from '@auth/entities';

@Injectable()
export class ImportsService {
  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private rolesService: RolesService,
  ) {}

  async importStudents(): Promise<boolean> {
    const workbook = XLSX.readFile(
      join(process.cwd(), 'src/resources/imports/students.xlsx'),
    );

    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const roles = (await this.rolesService.findAll()).data as RoleEntity[];
    const studentRole = roles.find((role) => role.code === RoleEnum.STUDENT);
    const users = (await this.usersService.findAll()).data;

    for (const item of dataExcel) {
      const identification =
        item['identificacion'].toString().length < 10
          ? '0' + item['identificacion'].toString()
          : item['identificacion'].toString();

      let email = '';
      if (
        item['correo_institucional']?.toString().length === 0 ||
        item['correo_institucional']?.toString() === undefined
      ) {
        email = `${item['nombre1'].substring(0, 1)}`;
        email +=
          item['nombre2']?.substring(0, 1) === undefined
            ? ''
            : item['nombre2']?.substring(0, 1);
        email +=
          item['apellido2']?.substring(0, 1) === undefined
            ? ''
            : item['apellido2']?.substring(0, 1);
        email += `.${item['apellido1']}@yavirac.edu.ec`;
      } else {
        email = item['correo_institucional'];
      }

      email = email.toLowerCase();

      let user = users.find((user) => user.username === identification);

      if (user === undefined) {
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
      } else {
        if (
          user.roles.find((role) => role.id === studentRole.id) === undefined
        ) {
          user.roles.push(studentRole);
          await this.usersService.update(user.id, user);
        }
      }

      await this.studentsService.create({ user });
    }

    return true;
  }

  async importTeachers(): Promise<boolean> {
    const workbook = XLSX.readFile(
      join(process.cwd(), 'src/resources/imports/teachers.xlsx'),
    );

    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const roles = (await this.rolesService.findAll()).data as RoleEntity[];
    const teacherRole = roles.find((role) => role.code === RoleEnum.TEACHER);

    for (const item of dataExcel) {
      const identification =
        item['identificacion'].toString().length < 10
          ? '0' + item['identificacion'].toString()
          : item['identificacion'].toString();

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

      await this.teachersService.create({ user: userCrated });
    }

    return true;
  }
}
