import { Inject, Injectable, Res } from '@nestjs/common';
import { CareersService, EnrollmentsService, SubjectsService } from '@core/services';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CareerEntity, CatalogueEntity,
  EnrollmentEntity, EnrollmentStateEntity,
  StudentEntity,
} from '@core/entities';
import { UserEntity } from '@auth/entities';
import * as XLSX from 'xlsx';
import * as qr from 'qrcode';
import { join } from 'path';
import { CoreRepositoryEnum } from '@shared/enums';

const { PDFDocument } = require('pdfkit-table-ts');
const blobStream = require('blob-stream');

@Injectable()
export class EnrollmentReportsService {
  private imageHeaderPath = './resources/images/reports/header.png';
  private imageFooterPath = `./resources/images/reports/footer.png`;
  private imageHeaderWidth = 110;
  private imageHeaderHeight = 80;

  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly careersService: CareersService,
    private readonly subjectsService: SubjectsService,
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY) private readonly studentRepository: Repository<StudentEntity>,
    @Inject(CoreRepositoryEnum.ENROLLMENT_REPOSITORY) private readonly enrollmentRepository: Repository<EnrollmentEntity>) {
  }

  async generateEnrollmentCertificate(@Res() res: Response, id: string) {
    const enrollment = await this.enrollmentsService.findEnrollmentCertificateByEnrollment(id);

    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      align: 'center',
    });

    doc.pipe(res);
    const textX = 50;
    const textY = 80;
    const textW = 500;

    const enrollmentCode = `${enrollment.schoolPeriod.shortName}-${enrollment.career.acronym}-${enrollment.student.user.identification}`;
    const text = `Este certificado reconoce que el estudiante: ${enrollment.student.user.name} ${enrollment.student.user.lastname} con el número de identificación ${enrollment.student.user.identification}, previo al cumplimiento de los requisitos legales ha sido matriculado en la Universidad Intercultural de las Nacionalidades y Pueblos Indígenas Amawtay Wasi, en la carrera de ${enrollment.career.name}, en el periodo académico ${enrollment.schoolPeriod.name}, en las siguientes asignaturas:`;
    const currentDate = new Date();
    const day = format(currentDate, 'd', { locale: es }); // Formato numérico del día
    const formattedDate = format(currentDate, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
    const fechaCompleta = `${formattedDate.replace('dd', day)}`;
    //Inicio del Documento
    doc.image(this.imageHeaderPath, 35, 20, {
      align: 'center',
      width: this.imageHeaderWidth,
      height: this.imageHeaderHeight,
    });


    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(18).text('CERTIFICADO DE MATRÍCULA', textX + 120);
    doc.moveDown();

    doc.font('Helvetica-Bold');
    doc.fontSize(11);
    doc.text('MATRICULA:  ' + enrollmentCode, textX);
    doc.moveDown();
    doc.font('Times-Roman');
    doc.fontSize(11);
    doc.text(`Quito, ${fechaCompleta}`);

    doc.font('Times-Roman');
    doc.fontSize(11);
    doc.lineGap(7);
    doc.text(text, textX, textY + 130, {
      width: 460,
      align: 'justify',
    });
    doc.moveDown(2);

    const rows = [];

    enrollment.enrollmentDetails.forEach(enrollmentDetail => {
      const list = [
        enrollmentDetail.subject.code,
        enrollmentDetail.subject.name,
        enrollmentDetail.subject.academicPeriod.name,
        enrollmentDetail.number,
        enrollmentDetail.parallel.name,
        enrollmentDetail.enrollmentDetailStates[0].state.name,
      ];
      rows.push(list);
    });

    const table = {
      headers: ['Código', 'Asignatura', 'Nivel', 'Num.', 'Paralelo', 'Estado'],
      rows: rows,
    };

    await doc.table(table, { align: 'center', columnsSize: [40, 200, 80, 30, 40, 50] });

    doc.moveDown();
    doc.font('Helvetica').fontSize(8).text('Revisado por: A. M.', textX + 355);

    const qrData = `http://localhost:3000/api/v1/enrollment-reports/${enrollment.studentId}/certificate`;
    const qrImageBuffer = await qr.toBuffer(qrData, {
      errorCorrectionLevel: 'H',
      type: 'png',
      margin: 1,
      scale: 6,
    });

    // doc.image(qrImageBuffer, textX + 180, textY + 390, { width: 100 });

    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('SECRETARIA GENERAL', textX + 160, textY + 570);
    doc.moveDown();
    doc.text('UNIVERSIDAD INTERCULTURAL DE LAS NACIONALIDADES Y PUEBLOS INDÍGENAS AMAWTAY WASI', textX + 5, textY + 590, { align: 'center' });
    //doc.font('Helvetica').fontSize(8).text('Revisado por: A. M.', textX + 355, textY + 630);

    //Footer: Add page number
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; //Dumb: Have to remove bottom margin in order to write into it

    doc
      .fontSize('6')
      .text(
        `Dir. Av. Colón E5-56 y Juan León Mera, Edif. Ave María, Torre B. TELF: 022232000 / 022230500 MAIL: informacion@uaw.edu.ec`,
        50,
        doc.page.height - oldBottomMargin / 2 - 20,
        { align: 'center' },
      );

    doc.text(`Universidad Intercultural de las Nacionalidades y Pueblos Indígenas Amawtay Wasi`, 20, doc.page.height - oldBottomMargin / 2 - 10, {
      align: 'center',
    });

    doc.end();
  }

  async generateEnrollmentApplication(@Res() res: Response, id: string) {
    const enrollment = await this.enrollmentsService.findEnrollmentCertificateByEnrollment(id);

    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      align: 'center',
    });

    doc.pipe(res);
    const textX = 50;
    const textY = 80;
    const textW = 500;

    const text = `Yo, ${enrollment.student.user.name} ${enrollment.student.user.lastname} con el número de identificación ${enrollment.student.user.identification}, hago uso de mi cupo en la ${enrollment.career.institution.name}, en el programa académico de ${enrollment.career.name}. Para el período lectivo ${enrollment.schoolPeriod.name}. Contando con la inscripción en las siguientes asignaturas:`;
    const currentDate = new Date();
    const day = format(currentDate, 'd', { locale: es }); // Formato numérico del día
    const formattedDate = format(currentDate, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
    const fechaCompleta = `${formattedDate.replace('dd', day)}`;
    //Inicio del Documento
    doc.image(this.imageHeaderPath, 35, 20, {
      align: 'center',
      width: this.imageHeaderWidth,
      height: this.imageHeaderHeight,
    });

    doc.moveDown();
    doc.font('Times-Roman');
    doc.fontSize(11);
    doc.text(`Quito, ${fechaCompleta}`, textX + 320);
    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(18).text('SOLICITUD DE MATRÍCULA', textX + 100);
    doc.moveDown();

    doc.font('Times-Roman');
    doc.fontSize(11);
    doc.lineGap(7);
    doc.text(text, textX, textY + 130, {
      width: 460,
      align: 'justify',
    });
    doc.moveDown(2);

    const rows = [];

    enrollment.enrollmentDetails.forEach(enrollmentDetail => {
      const list = [
        enrollmentDetail.subject.code,
        enrollmentDetail.subject.name,
        enrollmentDetail.subject.academicPeriod.name,
        enrollmentDetail.number,
        enrollmentDetail.parallel.name,
        enrollmentDetail.enrollmentDetailStates[0].state.name,
      ];
      rows.push(list);
    });

    const table = {
      headers: ['Código', 'Asignatura', 'Nivel', 'Num.', 'Paralelo', 'Estado'],
      rows: rows,
    };

    await doc.table(table, { align: 'center', columnsSize: [60, 200, 80, 30, 40, 50] });

    doc.moveDown();
    doc.font('Times-Roman');
    doc.fontSize(11);
    doc.text(`Atentamente,`, textX, textY + 520);
    doc.text(`${enrollment.student.user.name} ${enrollment.student.user.lastname}`, textX, textY + 570);
    doc.text(`C.C. ${enrollment.student.user.identification}`, textX);

    //Footer: Add page number
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; //Dumb: Have to remove bottom margin in order to write into it

    doc
      .fontSize('6')
      .text(
        `Dir. Av. Colón E5-56 y Juan León Mera, Edif. Ave María, Torre B. TELF: 022232000 / 022230500 MAIL: informacion@uaw.edu.ec`,
        50,
        doc.page.height - oldBottomMargin / 2 - 20,
        { align: 'center' },
      );

    doc.text(`Universidad Intercultural de las Nacionalidades y Pueblos Indígenas Amawtay Wasi`, 20, doc.page.height - oldBottomMargin / 2 - 10, {
      align: 'center',
    });

    doc.end();
  }

  async generateEnrollmentsByCareer(careerId: string, schoolPeriodId: string) {
    const data = await this.enrollmentsService.reportEnrollmentsByCareer(careerId, schoolPeriodId);

    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Estudiantes');
    const path = join(process.cwd(), 'storage/reports/enrollments', Date.now() + '.xlsx'); //review path
    XLSX.writeFile(newWorkbook, path);

    return path;
  }

  async generateEnrollmentsBySchoolPeriod(schoolPeriodId: string) {
    const data = await this.reportEnrollmentsBySchoolPeriod(schoolPeriodId);

    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Estudiantes');
    const path = join(process.cwd(), 'storage/reports/enrollments', Date.now() + '.xlsx'); //review path
    XLSX.writeFile(newWorkbook, path);

    return path;
  }

  async generateAcademicRecordByStudent(@Res() res: Response, studentId: string, careerId: string) {
    const enrollments = await this.enrollmentsService.findAcademicRecordByStudent(studentId, careerId);
    const careers = await this.careersService.findOne(careerId);
    const student = await this.studentRepository.findOne({
        where: { id: studentId },
        relations: { user: true },
      },
    );


    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      align: 'center',
    });

    doc.image(this.imageHeaderPath, 35, 20, {
      align: 'center',
      width: this.imageHeaderWidth,
      height: this.imageHeaderHeight,
    });

    doc.moveDown('2');

    doc.pipe(res);
    const title = `UNIVERSIDAD INTERCULTURAL DE LAS NACIONALIDADES Y PUEBLOS INDÍGENAS AMAWTAY WASI`;
    const career = `${careers.name}`;
    doc
      .fontSize('12')
      .font('Helvetica-Bold')
      .text(title, {
        align: 'center',
      });

    doc.moveDown();

    doc
      .font('Times-Roman')
      .fontSize('9')
      .text(career, {
        align: 'center',
      });

    doc.moveDown();

    doc
      .font('Times-Roman')
      .fontSize('8')
      .text(careers.codeSniese, {
        align: 'center',
      });

    doc.moveDown();

    doc
      .font('Times-Roman')
      .fontSize('9')
      .text(`PROGRAMA DE RECONOCIMIENTO DE TRAYECTORIAS DE LOS CONOCIMIENTOS Y EXPERIENCIAS DE LAS SABIAS Y SABIOS 
    `, {
        align: 'center',
      });

    doc.moveDown();

    doc
      .font('Helvetica-Bold')
      .fontSize('20')
      .text(`RÉCORD ACADÉMICO`, {
        align: 'center',
      });

    doc.moveDown();

    doc
      .font('Times-Bold')
      .fontSize('10')
      .text(`Nombre: `, {
        continued: true,
      })
      .font('Times-Roman')
      .text(`${student.user.name} ${student.user.lastname}`);

    doc
      .font('Times-Bold')
      .fontSize('10')
      .text(`Cédula: `, {
        continued: true,
      })
      .font('Times-Roman')
      .text(student.user.identification);

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
    doc
      .font('Times-Bold')
      .fontSize('10')
      .text(`Fecha: `, {
        continued: true,
      })
      .font('Times-Roman')
      .text(formattedDate);

    const finalGrade = [];

    enrollments.forEach(enrollment => {
      enrollment.enrollmentDetails.forEach(enrollmentDetail => {


        const list = [
          enrollmentDetail.finalGrade,
        ];
        finalGrade.push(list);
      });
    });

    doc
      .font('Times-Bold')
      .fontSize('10')
      .text(`Promedio: `, {
        continued: true,
      })
      .font('Times-Roman')
      .text(finalGrade[0]);

    doc.moveDown('2');

    const rows = [];

    enrollments.forEach(enrollment => {
      enrollment.enrollmentDetails.forEach(enrollmentDetail => {


        const list = [
          enrollment.schoolPeriod.shortName,
          enrollmentDetail.subject.code,
          enrollmentDetail.subject.name,
          enrollmentDetail.subject.academicPeriod.name,
          enrollmentDetail.number,
          enrollmentDetail.grades,
          enrollmentDetail.enrollmentDetailState.state.name,
        ];
        rows.push(list);
      });
    });

    const table = {
      headers: ['PAO', 'Código Asignatura', 'Asignatura', 'Nivel', 'Num. Matrícula', 'Calificación', 'Estado'],
      rows: rows,
    };

    await doc.table(table, { align: 'center', columnsSize: [40, 60, 160, 50, 50, 50, 50] });

    doc.moveDown();

    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;

    const sectionWidth = doc.page.width / 2 - 50;
    const sectionHeight = 20;

    const yPositionSections = doc.page.height - oldBottomMargin / 2 - 100;

    doc
      .font('Times-Bold')
      .fontSize('12')
      .text(
        'DIRECCIÓN DE CARRERA',
        50,
        yPositionSections,
        { width: sectionWidth, align: 'center' },
      );

    doc
      .font('Times-Bold')
      .fontSize('12')
      .text(
        'SECRETARIA DE CARRERA',
        doc.page.width / 2 + 50,
        yPositionSections,
        { width: sectionWidth, align: 'left' }, // Modificado para centrar
      );

    doc
      .font('Times-Bold')
      .fontSize('12')
      .text(
        `UNIVERSIDAD INTERCULTURAL DE LAS NACIONALIDADES Y PUEBLOS INDÍGENAS AMAWTAY WASI`,
        doc.page.width / 4 - 70,
        yPositionSections + sectionHeight + 10,
        { align: 'center' },
      );

    doc
      .fontSize('7')
      .text(
        `Dir. Av. Colón E5-56 y Juan León Mera, Edif. Ave María, Torre B. TELF: 022232000 / 022230500 MAIL: informacion@uaw.edu.ec Universidad Intercultural de las Nacionalidades y Pueblos Indígenas Amawtay Wasi`,
        80,
        doc.page.height - oldBottomMargin / 2 - 40,
        { align: 'center' },
      );

    doc.end();
  }

  private async reportEnrollmentsBySchoolPeriod(schoolPeriodId: string): Promise<any[]> {
    const queryBuilder: SelectQueryBuilder<EnrollmentEntity> = this.enrollmentRepository.createQueryBuilder('enrollments');
    queryBuilder.select(
      [
        'careers.code as "Código de Carrera"',
        'careers.name as "Carrera"',
        'users.identification  as "Número de Documento"',
        'users.lastname  as "Apellidos"',
        'users.name  as "Nombres"',
        'parallels.name as "Paralelo"',
        'academic_periods.name as "Nivel"',
        'types.name as "Tipo de Matricula"',
        'enrollments.date as " Fecha de Matricula"',
        'enrollments.applications_at as "Fecha de envio de solicitud"',
        'enrollments.socioeconomic_category as "Nivel Socioeconómico"',
        'enrollments.socioeconomic_percentage as "Porcentaje Socioeconómico"',
        'enrollments.socioeconomic_score as "Puntaje Socioeconómico"',
        'states.name as "Estado"',
      ])
      .innerJoin(EnrollmentStateEntity, 'enrollment_states', 'enrollment_states.enrollment_id = enrollments.id')
      .leftJoin(CatalogueEntity, 'types', 'types.id = enrollments.type_id')
      .innerJoin(CatalogueEntity, 'states', 'states.id = enrollment_states.state_id')
      .innerJoin(CatalogueEntity, 'parallels', 'parallels.id = enrollments.parallel_id')
      .innerJoin(CatalogueEntity, 'academic_periods', 'academic_periods.id = enrollments.academic_period_id')
      .innerJoin(CareerEntity, 'careers', 'careers.id = enrollments.career_id')
      .innerJoin(StudentEntity, 'students', 'students.id = enrollments.student_id')
      .innerJoin(UserEntity, 'users', 'users.id = students.user_id')
      .where('enrollments.school_period_id = :schoolPeriodId and enrollment_states.deleted_at is null', {
        schoolPeriodId,
      })
      .orderBy('careers.name, academic_periods.code, parallels.code, users.lastname, users.name');

    return await queryBuilder.getRawMany();
  }
}