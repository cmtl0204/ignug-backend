import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfKit-table');
import { EnrollmentsService } from './enrollments.service';

@Injectable()
export class PDFService {
  constructor(private enrollmentsService: EnrollmentsService) { }
  async generarPDF(): Promise<Buffer> {
    let data = (await this.enrollmentsService.findEnrollmentCertificateByStudent('2014518036','cod1'))
    console.log(data) 
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument(
        {
          size: "A4",
          bufferPages: true,
          align: 'center'
        })

      //imágenes
      const imageX = 100;
      const imageX2 = 400;
      /* const imagePath = './src/modules/core/services/prueba.png'
      const imagePath2 = './src/modules/core/services/prueba.png' */
      const imageY = 30;
      const imageWidth = 100;
      const imageHeight = 100;

      //textos
      const matricula = '       MATRÍCULA:    '
      const matriculaInfo = '2022-II-DS-1727620229'
      const folio = '   FOLIO: '
      const folioInfo = `${data.folio}`
      const matriculaX = 120
      const folioX = 400
      const textY = 200
      const textY2 = 220

      //Documento
      /* doc.image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });
      doc.image(imagePath2, imageX2, imageY, { width: imageWidth, height: imageHeight }); */
      doc.font('Helvetica-Bold').fontSize(25).text('Certificado de Matrícula', { align: 'center' }, 160);
      doc.font('Times-Bold', 13);
      doc.text(matricula, matriculaX, textY);
      doc.text(folio, folioX, textY);
      doc.font('Times-Roman', 13).text(matriculaInfo, matriculaX, textY2);
      doc.text(folioInfo, folioX, textY2);
      doc.moveDown(6);
      doc.font('Times-Roman', 13).text(`CERTIFICO que, ${data.student.user.name} ${data.student.user.lastname}, con cédula de ciudadanía N° ${data.student.user.identification}, previo cumpliento de los requisitos legales, se encuentra matriculado/a en ${data.academicPeriod.name} periodo académico de la carrera ${data.curriculum.career.name}, para el periodo lectivo ${data.schoolPeriod.name} con la inscripción en las siguientes asignaturas`, 80, 280, { align: 'justify' })

      const rows_subjects = [];
      data.enrollmentDetails.forEach((details)=>{
        const list = [details.subject.code,details.subject.name,data.academicPeriod.name,details.number,data.workday.name,details.subject.teacherHour,details.subject.practicalHour,details.subject.autonomousHour];
        rows_subjects.push(list);
      })
      const table = {
        headers: ['Código', 'Asignatura', 'Periódo', 'Número de matrícula', 'Jornada', 'H. Docente', 'H. Práctica', 'H. Autónoma'],
        rows: rows_subjects,
        
      };
        
      doc.moveDown(2);
      doc.table(table, { align: 'center', columnsSize: [40, 100, 40, 60, 60, 50, 50, 50]});
      doc.fontSize(11).text('Con sentimiento de distinguida consideración', 80, 650);
      doc.moveDown(2);
      doc.text('Atentamente,');
      doc.moveDown(3);
      doc.font('Times-Bold', 12).text('SECRETARÍA ACADÉMICA');
      doc.text(`${data.curriculum.career.institution.name}`);

      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
      doc.end()
    })

    return pdfBuffer;

  }
}
