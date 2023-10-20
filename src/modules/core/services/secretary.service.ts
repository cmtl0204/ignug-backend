import { Injectable } from '@nestjs/common';
const {PDFDocument} = require('pdfkit-table-ts')

@Injectable()
export class SecretaryService {

    async downloadReport(): Promise<Buffer> {
        const pdfBuffer: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
        align: 'center',
      });

       //imágenes
      const imageX = 100;
      const imageX2 = 400;
      const imagePath = './assets/images/core/institutions/logo.jpeg';
      const imagePath2 = './assets/images/core/institutions/logo.jpeg';
      const imageY = 30;
      const imageWidth = 100;
      const imageHeight = 100;

      //textos
      const matricula = '       MATRÍCULA:    ';
      const matriculaInfo = '2022-II-DS-1727620229';
      const folio = '   FOLIO: ';
      const folioInfo = "prueba";
      const matriculaX = 120;
      const folioX = 400;
      const textY = 200;
      const textY2 = 220;

       //Documento
      doc.image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });
      doc.image(imagePath2, imageX2, imageY, { width: imageWidth, height: imageHeight });
      doc.font('Helvetica-Bold').fontSize(25).text('Solicitud de Matrícula', { align: 'center' }, 160);
      doc.font('Times-Bold', 13);
      doc.text(matricula, matriculaX, textY);
      doc.text(folio, folioX, textY);
      doc.font('Times-Roman', 13).text(matriculaInfo, matriculaX, textY2);
      doc.text(folioInfo, folioX, textY2);
      doc.moveDown(6);
      doc
        .font('Times-Roman', 13)
        .text(
          `Yo, ABADEANO SOLORZANO FRANKLIN ANDRES, con cédula de ciudadanía N°1727620229, hago uso de mi cupo en la carrera TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE, en el periodo lectivo JUNIO 2021 - OCTUBRE 2021 con la inscripción en las siguientes asignaturas:`,
          80,
          280,
          { align: 'justify' },
        );

        const rows_subjects = [{code:"123",name:"gabriel"}];

        const subjects = [
          { code: 'CS101', name: 'Introduction to Computer Science', teacherHour: 3, practicalHour: 2, autonomousHour: 4 },
          { code: 'MATH202', name: 'Advanced Mathematics', teacherHour: 4, practicalHour: 1, autonomousHour: 3 },
          // Agrega más objetos Subject aquí si es necesario
        ];
        
        const workDays = [
          { name: 'Monday' },
          { name: 'Tuesday' },
          { name: 'Wednesday' },
          // Agrega más objetos WorkDay aquí si es necesario
        ];
        
        function getRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        const detailsList = [];
        
        for (let i = 0; i < 10; i++) {
          const randomSubject = subjects[getRandomNumber(0, subjects.length - 1)];
          const randomWorkDay = workDays[getRandomNumber(0, workDays.length - 1)];
          const randomDetails = getRandomNumber(1000, 9999);
          
          const details = {
            subject: randomSubject,
            workDay: randomWorkDay,
            details: randomDetails,
          };
          
          detailsList.push(details);
        }

        const table = {
          headers: ['Código', 'Asignatura', 'Periódo', 'Número de matrícula', 'Jornada', 'H. Docente', 'H. Práctica', 'H. Autónoma'],
          rows: rows_subjects,
        };
  
        doc.moveDown(2);
        doc.table(table, { align: 'center', columnsSize: [40, 100, 40, 60, 60, 50, 50, 50] });
        
            doc.fontSize(11).text('Con sentimiento de distinguida consideración', 80, 650);
      doc.moveDown(2);
      doc.text('Atentamente,');
      doc.moveDown(3);
      doc.font('Times-Bold', 12).text('SECRETARÍA ACADÉMICA');
      doc.text(`desarrollo`);

            //END DOCUMENT
            let buffer = [];
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })

            doc.end()

        });
        
        return pdfBuffer;
    }
}
