import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit-table')

@Injectable()
export class SecretaryService {

    async downloadReport(): Promise<Buffer> {
        const pdfBuffer: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument({
                size: "LETTER",
                bufferPages: true
            })
            // Aqui modificamos el pdf
            /*doc.text("PDF GENERADO EN NUESTRO SERVIDOR");
            doc.moveDown();
            doc.text("Este definitivamente no es un pedeefe");
           // triangulo
            doc
            .save()
            .moveTo(100, 150)
            .lineTo(100, 250)
            .lineTo(200, 250)
            .fill('#FF3300');
          */

            // Agregar título al PDF
            doc.fontSize(14).text('SOLICITUD DE MATRÍCULA', { align: 'center' });
            doc.fontSize(10).text(`Fecha: ${new Date().toISOString().split('T')[0]}`, { align: 'right' });
            doc.moveDown();
        
            // Agregar el contenido del solicitante y sus detalles
            const solicitante = {
              nombre: 'ABADEANO SOLORZANO FRANKLIN ANDRES',
              cedula: 'C.C. 1727620229',
              carrera: 'TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE',
              periodo: 'JUNIO 2021 - OCTUBRE 2021',
            };
        
            doc.fontSize(12).text(`Yo, ${solicitante.nombre}, con cédula de ciudadanía N° ${solicitante.cedula}, hago uso de mi cupo en la carrera ${solicitante.carrera}, en el periodo lectivo ${solicitante.periodo} con la inscripción en las siguientes asignaturas:`, { align: 'justify' });
        
            doc.moveDown();
            doc.fontSize(12).text('Con sentimiento de distinguida consideración.', { align: 'right' });
            doc.moveDown();
            const encabezadoTabla = ['CÓDIGO', 'ASIGNATURA', 'PERÍODO', 'CÓDIGO DE MATRÍCULA', 'JORNADA', 'H. DOCENTES', 'H. PRÁCTICAS', 'H. AUTÓNOMAS'];
            const contenidoTabla = [
              ['CS101', 'Introducción a la Programación', 'JUNIO 2021 - OCTUBRE 2021', 'MAT202109', 'Mañana', '4', '2', '8'],
              ['CS201', 'Estructuras de Datos', 'JUNIO 2021 - OCTUBRE 2021', 'MAT202110', 'Tarde', '3', '1', '6'],
              ['CS301', 'Programación Avanzada', 'JUNIO 2021 - OCTUBRE 2021', 'MAT202111', 'Noche', '4', '2', '8'],
              ['CS401', 'Bases de Datos', 'JUNIO 2021 - OCTUBRE 2021', 'MAT202112', 'Mañana', '3', '1', '6'],
              ['CS501', 'Diseño de Interfaces', 'JUNIO 2021 - OCTUBRE 2021', 'MAT202113', 'Tarde', '4', '2', '8'],
            ];

    /*doc.table([encabezadoTabla, ...contenidoTabla], {
      prepareHeader: () => doc.font('Helvetica-Bold'),
      prepareRow: (row, rowIndex) => doc.font('Helvetica').fontSize(12),
      bottomMargin: 30,
    });*/
            doc.moveDown();
            doc.fontSize(12).text('Atentamente,', { align: 'right' });
            doc.moveDown();
            doc.fontSize(12).text(solicitante.nombre, { align: 'right' });
            doc.fontSize(12).text(solicitante.cedula, { align: 'right' });

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
