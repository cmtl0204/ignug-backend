import { Injectable, Res } from '@nestjs/common';
import { EnrollmentsService, StudentsService } from '@core/services';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const { PDFDocument } = require('pdfkit-table-ts');
const blobStream = require('blob-stream');

@Injectable()
export class EnrollmentReportsService {
  private imageHeaderPath = './resources/images/reports/header.png';
  private imageFooterPath = `./resources/images/reports/footer.png`;
  private imageHeaderWidth = 110;
  private imageHeaderHeight = 65;

  constructor(private readonly enrollmentsService: EnrollmentsService) {}

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
    const text = `Este certificado reconoce que el estudiante: ${enrollment.student.user.name} ${enrollment.student.user.lastname} con el numero de identificación ${enrollment.student.user.identification} ha sido oficialmente matriculado en la Universidad Intercultural de las Nacionalidades y Pueblos Indígenas Amawtay Wasi, en el programa académico de ${enrollment.career.name}. Este certificado confirma la matriculación del estudiante para el período académico ${enrollment.schoolPeriod.name}. Contando con la inscripción en las siguientes asignaturas: `;
    const currentDate = new Date();
    const day = format(currentDate, 'd', { locale: es }); // Formato numérico del día
    const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
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
    doc.text(`Quito, ${fechaCompleta}`,textX + 320);
    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(18).text('CERTIFICADO DE MATRÍCULA', textX + 100);
    doc.moveDown();

    doc.font('Helvetica-Bold');
    doc.fontSize(11);
    doc.text('MATRICULA:  ' + enrollmentCode, textX);


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

    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('SECRETARIA ACADEMICA', textX + 150, textY + 570);
    doc.moveDown();
    doc.text('UNIVERSIDAD INTERCULTURAL DE LAS NACIONALIDADES Y PUEBLOS INDÍGENAS AMAWTAY WASI', textX + 5, textY + 590, { align: 'center' });
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
    const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
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
    doc.text(`Quito, ${fechaCompleta}`,textX + 320);
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
    doc.text(`C.C. ${enrollment.student.user.identification}`, textX );

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
}
