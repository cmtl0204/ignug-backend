import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CatalogueEntity,
  EnrollmentDetailEntity,
  EnrollmentEntity,
  GradeEntity,
  PartialEntity, PartialPermissionEntity,
  StudentEntity, SubjectEntity,
  TeacherDistributionEntity,
} from '@core/entities';
import { CatalogueTypeEnum, CoreRepositoryEnum } from '@shared/enums';
import { join } from 'path';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

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
export class GradesService {
  private gradeErrors: ErrorModel[] = [];
  private attendanceErrors: ErrorModel[] = [];
  private partialPermissionErrors: ErrorModel[] = [];
  private row = 1;
  private partialEnabled1 = false;
  private partialEnabled2 = false;
  private partialEnabled3 = false;
  private partialEnabled4 = false;
  private partials: PartialEntity[] = [];
  private partial1!: PartialEntity;
  private partial2!: PartialEntity;
  private partial3!: PartialEntity;
  private partial4!: PartialEntity;
  private approved!: CatalogueEntity;
  private failed!: CatalogueEntity;

  constructor(
    @Inject(CoreRepositoryEnum.CATALOGUE_REPOSITORY) private readonly catalogueRepository: Repository<CatalogueEntity>,
    @Inject(CoreRepositoryEnum.GRADE_REPOSITORY) private readonly gradeRepository: Repository<GradeEntity>,
    @Inject(CoreRepositoryEnum.PARTIAL_REPOSITORY) private readonly partialRepository: Repository<PartialEntity>,
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly studentRepository: Repository<StudentEntity>,
    @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY) private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY) private readonly enrollmentDetailRepository: Repository<EnrollmentDetailEntity>,
    @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY) private readonly teacherDistributionRepository: Repository<TeacherDistributionEntity>,
    @Inject(CoreRepositoryEnum.PARTIAL_PERMISSION_REPOSITORY) private readonly partialPermissionRepository: Repository<PartialPermissionEntity>,
  ) {
  }

  async loadAcademicStates() {
    const academicStates = await this.catalogueRepository.find({ where: { type: CatalogueTypeEnum.ENROLLMENTS_ACADEMIC_STATE } });
    this.approved = academicStates.find(academicState => academicState.code === 'a');
    this.failed = academicStates.find(academicState => academicState.code === 'r');
  }

  async loadPartials() {
    this.partials = await this.partialRepository.find();
    this.partial1 = this.partials.find(partial => partial.code === '1');
    this.partial2 = this.partials.find(partial => partial.code === '2');
    this.partial3 = this.partials.find(partial => partial.code === '3');
    this.partial4 = this.partials.find(partial => partial.code === '4');
  }

  async loadPartialPermissions(teacherDistributionId: string) {
    const partialPermissions = await this.partialPermissionRepository.find({ where: { teacherDistributionId } });

    for (const partialPermission of partialPermissions) {
      if (partialPermission.partialId === this.partial1.id) {
        this.partialEnabled1 = partialPermission.enabled;
      }

      if (partialPermission.partialId === this.partial2.id) {
        this.partialEnabled2 = partialPermission.enabled;
      }

      if (partialPermission.partialId === this.partial3.id) {
        this.partialEnabled3 = partialPermission.enabled;
      }

      if (partialPermission.partialId === this.partial4.id) {
        this.partialEnabled4 = partialPermission.enabled;
      }
    }
  }

  async importGrades(file: Express.Multer.File, payload: any) {
    try {
      const path = join(process.cwd(), 'storage/imports', file.filename);

      const workbook = XLSX.readFile(path);
      const workbookSheets = workbook.SheetNames;
      const sheet = workbookSheets[0];
      const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

      const teacherDistribution = await this.teacherDistributionRepository.findOneBy({ id: payload.teacherDistributionId });

      await this.loadAcademicStates();
      await this.loadPartials();
      await this.loadPartialPermissions(teacherDistribution.id);

      this.row = 1;

      for (const item of dataExcel) {
        this.row++;
        let identification = item[ColumnsEnum.IDENTIFICATION];

        if (identification) identification = identification.trim();

        const student = await this.studentRepository.findOne({
          where: { user: { identification: identification } },
        });

        if (!student) continue;

        this.checkErrors(item);

        const enrollment = await this.enrollmentRepository.findOne({
          where: { studentId: student.id, schoolPeriodId: teacherDistribution.schoolPeriodId },
        });

        const enrollmentDetail = await this.enrollmentDetailRepository.findOne({
          where: { enrollmentId: enrollment.id, subjectId: teacherDistribution.subjectId },
        });

        await this.saveGrades(item, enrollmentDetail);

        await this.saveAttendance(item, enrollmentDetail);

        await this.saveAcademicState(enrollmentDetail);
      }

      await this.generateErrorReport(teacherDistribution.id);

      fs.unlinkSync(join(process.cwd(), 'storage/imports', file.filename));

      if ((this.gradeErrors.concat(this.attendanceErrors, this.partialPermissionErrors)).length > 0)
        throw new BadRequestException();

    } catch (err) {
      console.log('err', err);
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

  async saveGrades(item: any, enrollmentDetail: EnrollmentDetailEntity) {
    if (this.gradeErrors.length === 0) {
      const grades = await this.gradeRepository.find({
        where: { enrollmentDetailId: enrollmentDetail.id },
      });

      let grade1 = grades.find(grade => grade.partialId === this.partial1.id);
      let grade2 = grades.find(grade => grade.partialId === this.partial2.id);
      let grade3 = grades.find(grade => grade.partialId === this.partial3.id);
      let grade4 = grades.find(grade => grade.partialId === this.partial4.id);

      if (grade1) {
        grade1.value = parseFloat(String(grade1.value));

        if (grade1.value != item[ColumnsEnum.GRADE_1]) {
          if (this.partialEnabled1) {
            grade1.value = item[ColumnsEnum.GRADE_1];
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_1);
          }
        }
      } else {
        if (item[ColumnsEnum.GRADE_1] || item[ColumnsEnum.GRADE_1] == 0) {
          if (this.partialEnabled1) {
            grade1 = this.gradeRepository.create({
              enrollmentDetailId: enrollmentDetail.id,
              partialId: this.partial1.id,
              value: item[ColumnsEnum.GRADE_1],
            });
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_1);
          }
        }
      }

      if (grade2) {
        grade2.value = parseFloat(String(grade2.value));
        if (grade2.value != item[ColumnsEnum.GRADE_2]) {
          if (this.partialEnabled2) {
            grade2.value = item[ColumnsEnum.GRADE_2];
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_2);
          }
        }
      } else {
        if (item[ColumnsEnum.GRADE_2] || item[ColumnsEnum.GRADE_2] == 0) {
          if (this.partialEnabled2) {
            grade2 = this.gradeRepository.create({
              enrollmentDetailId: enrollmentDetail.id,
              partialId: this.partial2.id,
              value: item[ColumnsEnum.GRADE_2],
            });
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_2);
          }
        }
      }

      if (grade3) {
        grade3.value = parseFloat(String(grade3.value));
        if (grade3.value != item[ColumnsEnum.GRADE_3]) {
          if (this.partialEnabled3) {
            grade3.value = item[ColumnsEnum.GRADE_3];
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_3);
          }
        }
      } else {
        if (item[ColumnsEnum.GRADE_3] || item[ColumnsEnum.GRADE_3] == 0) {
          if (this.partialEnabled3) {
            grade3 = this.gradeRepository.create({
              enrollmentDetailId: enrollmentDetail.id,
              partialId: this.partial3.id,
              value: item[ColumnsEnum.GRADE_3],
            });
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_3);
          }
        }
      }

      if (grade4) {
        grade4.value = parseFloat(String(grade4.value));
        if (grade4.value != item[ColumnsEnum.GRADE_4]) {
          if (this.partialEnabled4) {
            grade4.value = item[ColumnsEnum.GRADE_4];
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_4);
          }
        }
      } else {
        if (item[ColumnsEnum.GRADE_4] || item[ColumnsEnum.GRADE_4] == 0) {
          if (this.partialEnabled4) {
            grade4 = this.gradeRepository.create({
              enrollmentDetailId: enrollmentDetail.id,
              partialId: this.partial4.id,
              value: item[ColumnsEnum.GRADE_4],
            });
          } else {
            this.addPartialPermissionError(ColumnsEnum.GRADE_4);
          }
        }
      }

      if (grade1)
        await this.gradeRepository.save(grade1);

      if (grade2)
        await this.gradeRepository.save(grade2);

      if (grade3)
        await this.gradeRepository.save(grade3);

      if (grade4)
        await this.gradeRepository.save(grade4);

      await this.enrollmentDetailRepository.update(enrollmentDetail.id, enrollmentDetail);
    }
  }

  async saveAttendance(item: any, enrollmentDetail: EnrollmentDetailEntity) {
    if (this.attendanceErrors.length === 0 && (item[ColumnsEnum.ATTENDANCE] || item[ColumnsEnum.ATTENDANCE] == 0)) {
      enrollmentDetail.finalAttendance = item[ColumnsEnum.ATTENDANCE];

      await this.enrollmentDetailRepository.update(enrollmentDetail.id, enrollmentDetail);
    }
  }

  async saveAcademicState(enrollmentDetail: EnrollmentDetailEntity) {
    const grades = await this.gradeRepository.find({
      where: { enrollmentDetailId: enrollmentDetail.id },
    });

    const grade1 = grades.find(grade => grade.partialId === this.partial1.id);
    const grade2 = grades.find(grade => grade.partialId === this.partial2.id);
    const grade3 = grades.find(grade => grade.partialId === this.partial3.id);
    const grade4 = grades.find(grade => grade.partialId === this.partial4.id);

    if (grade1 && grade2 && grade3 && grade4) {
      grade1.value = parseFloat(String(grade1.value));
      grade2.value = parseFloat(String(grade2.value));
      grade3.value = parseFloat(String(grade3.value));
      grade4.value = parseFloat(String(grade4.value));

      const finalGradeTotal = grade1.value + grade2.value + grade3.value + grade4.value;

      if (this.partials.length)
        enrollmentDetail.finalGrade = finalGradeTotal / this.partials.length;

      await this.enrollmentDetailRepository.update(enrollmentDetail.id, enrollmentDetail);

      enrollmentDetail = await this.enrollmentDetailRepository.findOneBy({ id: enrollmentDetail.id });

      const finalGrade = parseFloat(String(enrollmentDetail.finalGrade));
      const finalAttendance = parseFloat(String(enrollmentDetail.finalAttendance));

      if (finalAttendance || finalAttendance == 0) {
        if (finalGrade >= 6) {
          if (finalAttendance >= 75) {
            enrollmentDetail.academicStateId = this.approved.id;
          } else {
            enrollmentDetail.academicStateId = this.failed.id;
            enrollmentDetail.academicObservation = 'Pierde por Asistencia';
          }
        } else {
          enrollmentDetail.academicStateId = this.failed.id;

          if (finalAttendance >= 75) {
            enrollmentDetail.academicObservation = 'Pierde por Nota';
          } else {
            enrollmentDetail.academicObservation = 'Pierde por Nota y Asistencia';
          }
        }

        await this.enrollmentDetailRepository.update(enrollmentDetail.id, enrollmentDetail);
      }
    }
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
