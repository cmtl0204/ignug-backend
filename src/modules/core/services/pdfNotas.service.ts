import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfKit-table');
import { EnrollmentsDetailService } from './enrollments-detail.service';
import { EnrollmentDetailEntity } from '../entities/enrollment-detail.entity';

@Injectable()
export class PDFNotas {
  constructor(private enrollmentsDetailService: EnrollmentsDetailService) {}
  async generarPDF(): Promise<Buffer> {
    let data = await this.enrollmentsDetailService.findOne('01747b43-b835-455d-846e-a429f595fc69');

    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        align: 'center',
      });

      doc.font('Helvetica-Bold').fontSize(25).text('Calificaciones de las Asignaturas', { align: 'center' }, 160);
      doc.font('Times-Bold', 13);
      doc
        .font('Times-Roman', 13)
        .text(
          `El estudiante ${data.enrollment.student.user.name} con la cédula ${data.enrollment.student.user.identification} en ${data.enrollment.academicPeriod.name} periódo académico a obtenido las siguientes calificaciones`,
          80,
          280,
          { align: 'justify' },
        );

      const rows_grades = [];
      const list = [
        data.subject.name,
        data.finalGrade,
        data.finalGrade,
        data.finalAttendance,
        data.finalAttendance,
        data.finalGrade,
        data.finalAttendance,
        data.academicState.name,
      ];
      rows_grades.push(list);

      const table = {
        headers: [
          'Asignaturas',
          'Nota Parcial 1',
          'Nota Parcial 2',
          'Asistencia Parcial 1',
          'Asistencia Parcial 2',
          'Nota Final',
          'Asistencia Final',
          'Estado Académico',
        ],
        rows: rows_grades,
      };

      doc.font('Times-Bold', 12).text('SECRETARÍA ACADÉMICA');
      doc.table(table, { align: 'center', columnsSize: [40, 100, 40, 60, 60, 50, 50, 50] });
      // doc.text(`${data.enrollment.curriculum.career.institution.name}`);

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}
