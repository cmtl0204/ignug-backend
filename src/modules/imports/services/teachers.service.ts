import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CareerEntity,
  CatalogueEntity,
  EnrollmentDetailEntity,
  EnrollmentEntity,
  GradeEntity, InstitutionEntity,
  PartialEntity, PartialPermissionEntity,
  StudentEntity, SubjectEntity,
  TeacherDistributionEntity, TeacherEntity,
} from '@core/entities';
import { AuthRepositoryEnum, CatalogueTypeEnum, CoreRepositoryEnum } from '@shared/enums';
import { join } from 'path';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { CreateUserDto, SeedUserDto } from '@auth/dto';
import { RoleEnum } from '@auth/enums';
import { faker } from '@faker-js/faker';
import { RoleEntity, UserEntity } from '@auth/entities';
import { RolesService, UsersService } from '@auth/services';
import { CareersService, CataloguesService, InstitutionsService } from '@core/services';
import * as Bcrypt from 'bcrypt';

enum ColumnsEnum {
  IDENTIFICATION = 'Numero_Documento',
  GRADE_1 = 'Parcial1',
  GRADE_2 = 'Parcial2',
  GRADE_3 = 'Parcial3',
  GRADE_4 = 'Parcial4',
  ATTENDANCE = 'Asistencia',
}

interface ErrorModel {
  row: number;
  column: string;
  observation: string;
}

@Injectable()
export class TeachersService {
  private gradeErrors: ErrorModel[] = [];
  private attendanceErrors: ErrorModel[] = [];
  private partialPermissionErrors: ErrorModel[] = [];
  private row = 1;
  private identificationTypes: CatalogueEntity[] = [];
  private roles: RoleEntity[] = [];
  private institutions: InstitutionEntity[] = [];
  private careers: CareerEntity[] = [];

  constructor(
    private readonly careersService: CareersService,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
    private readonly cataloguesService: CataloguesService,
    private readonly institutionsService: InstitutionsService,
    @Inject(CoreRepositoryEnum.CATALOGUE_REPOSITORY) private readonly catalogueRepository: Repository<CatalogueEntity>,
    @Inject(AuthRepositoryEnum.USER_REPOSITORY) private readonly userRepository: Repository<UserEntity>,
    @Inject(CoreRepositoryEnum.TEACHER_REPOSITORY) private readonly teacherRepository: Repository<TeacherEntity>,
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly studentRepository: Repository<StudentEntity>,
    @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY) private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY) private readonly enrollmentDetailRepository: Repository<EnrollmentDetailEntity>,
    @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY) private readonly teacherDistributionRepository: Repository<TeacherDistributionEntity>,
    @Inject(CoreRepositoryEnum.PARTIAL_PERMISSION_REPOSITORY) private readonly partialPermissionRepository: Repository<PartialPermissionEntity>,
  ) {
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

  async importTeachers(file: Express.Multer.File, payload: any) {
    try {
      await this.loadInstitutions();
      await this.loadCareers();
      await this.loadRoles();
      await this.loadCatalogues();

      const teacherRole = this.roles.find(role => role.code === RoleEnum.TEACHER);
      const institution = this.institutions[0];

      const path = join(process.cwd(), 'storage/imports', file.filename);

      const workbook = XLSX.readFile(path);
      const workbookSheets = workbook.SheetNames;
      const sheet = workbookSheets[1];
      const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

      this.row = 1;

      for (const item of dataExcel) {
        this.row++;

        const career = this.careers.find(career => career.code === item['Codigo_Carrera']);

        let user: any = await this.userRepository.findOne({ where: { identification: item['Numero_Documento'] } });

        if (!user) {
          user =
            {
              identificationType: this.identificationTypes[0],
              identification: item['Numero_Documento'],
              institutions: [institution],
              email: item['Correo_Institucional'],
              lastname: item['Apellidos'],
              name: item['Nombres'],
              password: await Bcrypt.hash(item['Numero_Documento'], 10),
              passwordChanged: false,
              personalEmail: item['Correo_Institucional'],
              roles: [teacherRole],
              username: item['Numero_Documento'],
              careers: [career],
            };
        }

        const userCreated = await this.userRepository.save(user);

        let teacher: any = await this.teacherRepository.findOne({ where: { userId: userCreated.id } });

        if (!teacher) {
          teacher = this.teacherRepository.create();
          teacher.userId = userCreated.id;
          await this.teacherRepository.save(teacher);
        }
      }

      fs.unlinkSync(join(process.cwd(), 'storage/imports', file.filename));

      if ((this.gradeErrors.concat(this.attendanceErrors, this.partialPermissionErrors)).length > 0)
        throw new BadRequestException();

    } catch (err) {
      throw new BadRequestException('Problemas al subir el archivo, por favor verifique los errores');
    }
  }

  checkErrors(item: any) {
    this.validateGrade(item[ColumnsEnum.GRADE_1], ColumnsEnum.GRADE_1);
    this.validateGrade(item[ColumnsEnum.GRADE_2], ColumnsEnum.GRADE_2);
    this.validateGrade(item[ColumnsEnum.GRADE_3], ColumnsEnum.GRADE_3);
    this.validateGrade(item[ColumnsEnum.GRADE_4], ColumnsEnum.GRADE_4);

    this.validateAttendance(item[ColumnsEnum.ATTENDANCE]);
  }

  validateGrade(value: number, column: string) {
    if (value || value == 0) {
      if (isNaN(value)) {
        this.gradeErrors.push({
          row: this.row,
          column,
          observation: `${column} no válida`,
        });

        return;
      }

      const grade = Number(value);

      if (grade < 0) {
        this.gradeErrors.push({
          row: this.row,
          column,
          observation: `${column} no puede ser menor a 0`,
        });
      }

      if (grade > 10) {
        this.gradeErrors.push({
          row: this.row,
          column,
          observation: `${column} no puede ser mayor a 10`,
        });
      }
    }
  }

  validateAttendance(value: number) {
    if (value) {
      if (isNaN(value)) {
        this.attendanceErrors.push({
          row: this.row,
          column: ColumnsEnum.ATTENDANCE,
          observation: `${ColumnsEnum.ATTENDANCE} no válida`,
        });

        return;
      }

      const attendance = Number(value);

      if (attendance < 0) {
        this.attendanceErrors.push({
          row: this.row,
          column: ColumnsEnum.ATTENDANCE,
          observation: `${ColumnsEnum.ATTENDANCE} no puede ser menor a 0`,
        });
      }

      if (attendance > 100) {
        this.attendanceErrors.push({
          row: this.row,
          column: ColumnsEnum.ATTENDANCE,
          observation: `${ColumnsEnum.ATTENDANCE} no puede ser mayor a 100`,
        });
      }
    }
  }

  addPartialPermissionError(column: string) {
    this.partialPermissionErrors.push({
      row: this.row,
      column,
      observation: `No se puede cambiar la ${column}, el parcial se encuentra bloqueado`,
    });
  }

  async generateErrorReport(teacherDistributionId: string) {
    const errors = this.gradeErrors.concat(this.attendanceErrors, this.partialPermissionErrors);

    const data = errors.map(error => {
      return {
        'Fila': error.row,
        'Columna': error.column,
        'Observación': error.observation,
      };
    });

    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Errores');
    const path = join(process.cwd(), 'storage/reports/grades', teacherDistributionId + '.xlsx'); //review path
    XLSX.writeFile(newWorkbook, path);

    return path;
  }
}
