import { Injectable, Res} from '@nestjs/common';
import {EnrollmentsService, StudentsService} from "@core/services";

const {PDFDocument} = require("pdfkit-table-ts");
const blobStream = require('blob-stream');

@Injectable()
export class EnrollmentReportsService {
    private imageHeaderPath = './resources/images/reports/header.png';
    private imageFooterPath = `./resources/images/reports/footer.png`;
    private imageHeaderWidth = 90;
    private imageHeaderHeight = 45;

    constructor(
        private readonly enrollmentsService: EnrollmentsService
    ) {
    }

    async generateEnrollmentCertificate(@Res() res: Response, id: string) {
        const enrollment = await this.enrollmentsService.findEnrollmentCertificateByEnrollment(id);

        const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
            align: 'center',
        });

        doc.pipe(res);
        const textX = 40;
        const textY = 80;
        const textW = 500;


        doc.text('1. Tipo de documento:', textX + 5, textY + 30);
        doc.image(
            this.imageHeaderPath, 25, 10,
            {
                align: 'center',
                width: this.imageHeaderWidth,
                height: this.imageHeaderHeight,
            },
        );

        doc.moveDown();

        const rows = [];

        enrollment.enrollmentDetails.forEach(enrollmentDetail => {
            const list = [
                enrollmentDetail.subject.code,
                enrollmentDetail.subject.name,
                enrollmentDetail.subject.academicPeriod.name,
                enrollmentDetail.number,
                enrollmentDetail.parallel.name,
                enrollmentDetail.enrollmentDetailStates[0].state.name
            ];
            rows.push(list);
        });

        const table = {
            headers: ['Código', 'Asignatura', 'Nivel', 'Num.', 'Paralelo', 'Estado'],
            rows: rows,
        };

        await doc.table(table, {align: 'center', columnsSize: [40, 200, 80, 30, 40, 50]});

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
        const textX = 40;
        const textY = 80;
        const textW = 500;


        doc.text('1. Tipo de documento:', textX + 5, textY + 30);
        doc.image(
            this.imageHeaderPath, 25, 10,
            {
                align: 'center',
                width: this.imageHeaderWidth,
                height: this.imageHeaderHeight,
            },
        );

        doc.end();
    }
}
