import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {
    EnrollmentDetailEntity,
    EnrollmentEntity,
    GradeEntity,
    PartialEntity,
    StudentEntity, SubjectEntity,
    TeacherDistributionEntity
} from '@core/entities';
import {CoreRepositoryEnum} from '@shared/enums';
import {join} from 'path';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class GradesService {

    constructor(
        @Inject(CoreRepositoryEnum.GRADE_REPOSITORY) private readonly gradeRepository: Repository<GradeEntity>,
        @Inject(CoreRepositoryEnum.PARTIAL_REPOSITORY) private readonly partialRepository: Repository<PartialEntity>,
        @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly studentRepository: Repository<StudentEntity>,
        @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY) private readonly enrollmentRepository: Repository<EnrollmentEntity>,
        @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY) private readonly enrollmentDetailRepository: Repository<EnrollmentDetailEntity>,
        @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY) private readonly teacherDistributionRepository: Repository<TeacherDistributionEntity>,
        @Inject(CoreRepositoryEnum.SUBJECT_REPOSITORY) private readonly subjectRepository: Repository<SubjectEntity>,
    ) {
    }

    async createGrades(file: Express.Multer.File, payload: any) {
        try {
            const path = join(process.cwd(), 'storage/imports', file.filename);

            const workbook = XLSX.readFile(path);
            const workbookSheets = workbook.SheetNames;
            const sheet = workbookSheets[0];
            const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

            for (const item of dataExcel) {
                const student = await this.studentRepository.findOne({
                    where: {user: {identification: item['Numero_Documento']}}
                });

                const enrollment = await this.enrollmentRepository.findOne({
                    relations: {enrollmentDetails: {grades: true}},
                    where: {studentId: student.id, schoolPeriodId: payload.schoolPeriodId}
                });

                const enrollmentDetail = await this.enrollmentDetailRepository.findOne({where: {subjectId: payload.subjectId}});

                const partials = await this.partialRepository.find();
                const partial1 = partials.find(partial => partial.code === '1');
                const partial2 = partials.find(partial => partial.code === '2');
                const partial3 = partials.find(partial => partial.code === '3');
                const partial4 = partials.find(partial => partial.code === '4');

                let grade1 = await this.gradeRepository.findOne({
                    where: {
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial1.id
                    }
                });

                let grade2 = await this.gradeRepository.findOne({
                    where: {
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial2.id
                    }
                });

                let grade3 = await this.gradeRepository.findOne({
                    where: {
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial3.id
                    }
                });

                let grade4 = await this.gradeRepository.findOne({
                    where: {
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial4.id
                    }
                });

                if (grade1) {
                    grade1.value = item['Nota1'];
                } else {
                    grade1 = this.gradeRepository.create({
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial1.id,
                        value: item['Nota1'],
                    });
                }

                if (grade2) {
                    grade2.value = item['Nota2'];
                } else {
                    grade2 = this.gradeRepository.create({
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial2.id,
                        value: item['Nota2'],
                    });
                }

                if (grade3) {
                    grade3.value = item['Nota3'];
                } else {
                    grade3 = this.gradeRepository.create({
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial3.id,
                        value: item['Nota3'],
                    });
                }

                if (grade4) {
                    grade4.value = item['Nota4'];
                } else {
                    grade4 = this.gradeRepository.create({
                        enrollmentDetailId: enrollmentDetail.id,
                        partialId: partial4.id,
                        value: item['Nota4'],
                    });
                }

                const finalGrade = item['Nota1'] + item['Nota2'] + item['Nota3'] + item['Nota4'];

                await this.gradeRepository.save(grade1);
                await this.gradeRepository.save(grade2);
                await this.gradeRepository.save(grade3);
                await this.gradeRepository.save(grade4);

                enrollmentDetail.finalGrade = finalGrade / 4;
                enrollmentDetail.finalAttendance = item['Asistencia'];

                await this.enrollmentDetailRepository.update(enrollmentDetail.id, enrollmentDetail);
            }

            fs.unlinkSync(join(process.cwd(), 'storage/imports', file.filename));
            return true;
        } catch (err) {
            console.error('Something wrong happened removing the file', err);
        }
    }
}
