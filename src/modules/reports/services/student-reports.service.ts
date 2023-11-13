import {Inject, Injectable, Res} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CareerEntity, StudentEntity} from '@core/entities';
import {CoreRepositoryEnum} from '@shared/enums';
import {format} from "date-fns";
import {StudentsService} from "@core/services";

const {PDFDocument} = require("pdfkit-table-ts");
const blobStream = require('blob-stream');

@Injectable()
export class StudentReportsService {
    constructor(
        private readonly studentsService: StudentsService
    ) {
    }

    async generateSocioeconomicForm(@Res() res: Response, id: string) {
        const response = (await this.studentsService.findOne(id)) as StudentEntity;

        const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
            align: 'center',
        });

        doc.pipe(res);

        //Documento
        const textX = 40;
        const textY = 80;
        const textW = 500;
        const fontsize = 9;

        doc.font('Helvetica-Bold').fontSize(10).text('MATRÍCULA', 250, textY);

        doc.rect(textX, textY + 20, textW, 675); //Rectangulo grande
        doc.rect(textX, textY + 45, textW, 0.1);
        doc.rect(textX + 250, textY + 45, 0.1, 25);
        doc.rect(textX + 370, textY + 45, 0.1, 25);
        doc.rect(textX, textY + 70, textW, 0.1);
        doc.rect(textX, textY + 95, textW, 0.1);
        doc.rect(textX + 250, textY + 95, 0.1, 50);
        doc.rect(textX + 250, textY + 120, textW - 250, 0.1);
        doc.rect(textX, textY + 145, textW, 0.1);
        doc.rect(textX, textY + 170, textW, 0.1);
        doc.rect(textX + 250, textY + 170, 0.1, 25);
        doc.rect(textX + 360, textY + 170, 0.1, 25);
        doc.rect(textX, textY + 195, textW, 0.1);
        doc.rect(textX, textY + 220, textW, 0.1);
        doc.rect(textX, textY + 245, textW, 0.1);
        doc.rect(textX + 250, textY + 245, 0.1, 25);
        doc.rect(textX, textY + 270, textW, 0.1);
        doc.rect(textX + 250, textY + 270, 0.1, 25);
        doc.rect(textX + 360, textY + 270, 0.1, 25);
        doc.rect(textX, textY + 295, textW, 0.1);
        doc.rect(textX + 170, textY + 295, 0.1, 25);
        doc.rect(textX + 330, textY + 295, 0.1, 25);
        doc.rect(textX, textY + 320, textW, 0.1);
        doc.rect(textX, textY + 345, textW, 0.1);
        doc.rect(textX + 170, textY + 345, 0.1, 25);
        doc.rect(textX + 330, textY + 345, 0.1, 25);
        doc.rect(textX, textY + 370, textW, 0.1);
        doc.rect(textX, textY + 395, textW, 0.1);
        doc.rect(textX + 250, textY + 395, 0.1, 50);
        doc.rect(textX, textY + 420, textW, 0.1);
        doc.rect(textX, textY + 445, textW, 0.1);
        doc.rect(textX, textY + 470, textW, 0.1);
        doc.rect(textX + 250, textY + 470, 0.1, 25);
        doc.rect(textX, textY + 495, textW, 0.1);
        doc.rect(textX, textY + 520, textW, 0.1);
        doc.rect(textX + 250, textY + 520, 0.1, 25);
        doc.rect(textX, textY + 545, textW, 0.1);
        doc.rect(textX, textY + 570, textW, 0.1);
        doc.rect(textX + 250, textY + 570, 0.1, 100);
        doc.rect(textX, textY + 595, textW, 0.1);
        doc.rect(textX, textY + 620, textW, 0.1);
        doc.rect(textX, textY + 645, textW, 0.1);
        doc.rect(textX, textY + 670, textW, 0.1);
        doc.stroke();

        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('1. Tipo de documento de identificación:', textX + 5, textY + 25);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('2. Numero de documento de identificación:', textX + 5, textY + 50);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('3. Sexo:', textX + 255, textY + 50);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('4. Genero:', textX + 375, textY + 50);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('5. Apellidos y nombres del estudiante:', textX + 5, textY + 75);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('6. Correo electronico:', textX + 5, textY + 100);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('7. No. Celular:', textX + 255, textY + 100);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('8. No. Convencional:', textX + 255, textY + 125);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('9. Dirección:', textX + 5, textY + 150);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('10. En caso de emergencia contactar a:', textX + 5, textY + 175);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('11. Parentesco:', textX + 255, textY + 175);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('12. Nro Contacto:', textX + 365, textY + 175);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('13. Etnia:', textX + 5, textY + 200);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('14. En caso de escoger etnia indigena u otro especifique su nacionalidad:', textX + 5, textY + 225);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('15. Habla algun idioma ancestral:', textX + 5, textY + 250);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('16. Fecha de nacimiento:', textX + 5, textY + 275);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('16.1. Edad:', textX + 255, textY + 275);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('17. Tipo de sangre:', textX + 365, textY + 275);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('18. Pais de nacionalidad:', textX + 5, textY + 300);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('19. Provincia de nacimiento:', textX + 175, textY + 300);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('20. Canton de nacimiento:', textX + 335, textY + 300);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('21. Categoria migratoria:', textX + 5, textY + 325);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('22. Pais de residencia:', textX + 5, textY + 350);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('23. Provincia de residencia:', textX + 175, textY + 350);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('24. Canton de residencia:', textX + 335, textY + 350);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('25. Estado civil:', textX + 5, textY + 375);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('26. Tiene alguna discapacidad:', textX + 5, textY + 400);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('27. Nro Carnet CONADIS:', textX + 255, textY + 400);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('28. Porcentaje de discapacidad:', textX + 5, textY + 425);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('29. TIpo:', textX + 255, textY + 425);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('30. Tipo de colegio:', textX + 5, textY + 450);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('31. Tipo de bachillerato:', textX + 5, textY + 475);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('32. Año graduación:', textX + 255, textY + 475);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('33. Posee algun titulo de educacion superior:', textX + 5, textY + 500);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('34. Fecha inicio carrera:', textX + 5, textY + 525);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('35. Fecha de matricula:', textX + 255, textY + 525);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('36. Tipo de matricula:', textX + 5, textY + 550);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('37. Periodo /ciclo academico:', textX + 5, textY + 575);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('38. Año del periodo academico:', textX + 255, textY + 575);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('39. Periodo /ciclo academico:', textX + 5, textY + 600);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('40. Paralelo:', textX + 255, textY + 600);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('41. Nombre de la carrera:', textX + 5, textY + 625);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('42. Titulo que otorga la carrera:', textX + 255, textY + 625);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('43. Tipo de carrera:', textX + 5, textY + 650);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('44. Modalidad de la carrera:', textX + 255, textY + 650);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('45. Jornada en la que estudia:', textX + 5, textY + 675);


        if (response) {
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.identificationType?.name, textX + 185, textY + 25);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.identification, textX + 190, textY + 50);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.sex?.name, textX + 300, textY + 50);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.gender?.name, textX + 425, textY + 50);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user?.name} ${response?.user.lastname}`, textX + 170, textY + 75);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.email}`, textX + 105, textY + 100);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.cellPhone}`, textX + 320, textY + 100);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.phone}`, textX + 350, textY + 125);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.residenceAddress}`, textX + 60, textY + 150);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.informationStudent.contactEmergencyName}`, textX + 175, textY + 175);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.contactEmergencyKinship?.name, textX + 325, textY + 175);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.contactEmergencyPhone, textX + 440, textY + 175);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.ethnicOrigin?.name, textX + 50, textY + 200);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isAncestralLanguage?.name, textX + 150, textY + 250);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.birthdate, textX + 115, textY + 275);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text('18', textX + 305, textY + 275);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text('A+', textX + 450, textY + 275);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.nationality?.name, textX + 115, textY + 300);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.province?.name, textX + 300, textY + 300);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.parrish?.name, textX + 450, textY + 300);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isFamilyEmigrant, textX + 115, textY + 325);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.nationality?.name, textX + 115, textY + 350);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.province?.name, textX + 300, textY + 350);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.parrish?.name, textX + 450, textY + 350);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.maritalStatus?.name, textX + 85, textY + 375);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.province?.name, textX + 145, textY + 400);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.parrish?.name, textX + 375, textY + 400);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.province?.name, textX + 145, textY + 425);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.parrish?.name, textX + 295, textY + 425);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 95, textY + 450);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 110, textY + 475);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 350, textY + 475);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isDegreeSuperior?.name, textX + 205, textY + 500);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 115, textY + 525);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 360, textY + 525);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 105, textY + 550);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 135, textY + 575);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 395, textY + 575);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 135, textY + 600);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 315, textY + 600);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 115, textY + 625);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 390, textY + 625);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 95, textY + 650);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 380, textY + 650);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 135, textY + 675);
        }

        doc.addPage()
        doc.rect(textX, textY, textW, 350); //Rectangulo grande
        doc.rect(textX + 250, textY, 0.1, 50);
        doc.rect(textX, textY + 25, textW, 0.1);
        doc.rect(textX, textY + 50, textW, 0.1);
        doc.rect(textX, textY + 75, textW, 0.1);
        doc.rect(textX, textY + 100, textW, 0.1);
        doc.rect(textX, textY + 125, textW, 0.1);
        doc.rect(textX, textY + 150, textW, 0.1);
        doc.rect(textX, textY + 175, textW, 0.1);
        doc.rect(textX, textY + 200, textW, 0.1);
        doc.rect(textX, textY + 225, textW, 0.1);
        doc.rect(textX, textY + 250, textW, 0.1);
        doc.rect(textX, textY + 275, textW, 0.1);
        doc.rect(textX, textY + 300, textW, 0.1);
        doc.rect(textX, textY + 325, textW, 0.1);
        doc.rect(textX + 250, textY + 325, 0.1, 25);
        doc.stroke();

        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('46. Ha repetido alguna materia:', textX + 5, textY + 10);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('47. Ha perdido la gratuidad:', textX + 255, textY + 10);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('48. Ha realizado practicas preprofesionales:', textX + 5, textY + 35);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('49. Nro. Horas practicas preprofesionales:', textX + 255, textY + 35);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('50. Tipo de instituto en el que realizo las practicas preprofesinales:', textX + 5, textY + 60);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('51. Sector economico en el que realizo las practicas preprofesinales:', textX + 5, textY + 85);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('52. Ha participado en algún proyecto de vinculacion con la sociedad en el instituto:', textX + 5, textY + 110);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('53. Cual es el acalce del proyecto de vinculacion de la sociedad:', textX + 5, textY + 135);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('54. El estudiante se ecuentra dedicado a:', textX + 5, textY + 160);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('55. Cual es el nombre de la empresa donde labora:', textX + 5, textY + 185);

        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('56. indique cual es el sector economico de la empresa:', textX + 5, textY + 210);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('57. Para que emplea sus ingresos economicos el estudiante:', textX + 5, textY + 235);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('58. Usted o algún miembro de su familia recibe el bono del desarrollo humano:', textX + 5, textY + 260);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('59. Nivel de formacion del padre:', textX + 5, textY + 285);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('60. Nivel de formacion de la madre:', textX + 5, textY + 310);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('61. Ingresos del hogar:', textX + 5, textY + 335);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('62. Numero de miebros del hogar:', textX + 255, textY + 335);

        if (response) {
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isLostGratuity, textX + 150, textY + 10);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isLostGratuity, textX + 250, textY + 10);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isExecutedPractice, textX + 150, textY + 35);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.practiceHours, textX + 250, textY + 35);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.practiceHours, textX + 250, textY + 60);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.practiceHours, textX + 250, textY + 85);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.practiceHours, textX + 250, textY + 110);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isWork, textX + 250, textY + 135);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.workPosition, textX + 250, textY + 160);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.workingHours, textX + 250, textY + 185);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.workAddress, textX + 250, textY + 210);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.economicContribution, textX + 250, textY + 235);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyCatastrophicIllness, textX + 50, textY + 260);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyCatastrophicIllness, textX + 50, textY + 285);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.economicAmount, textX + 20, textY + 310);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.membersHouseNumber, textX + 250, textY + 310);
        }

        doc.rect(textX + 40, textY + 480, 160, 0.1);
        doc.rect(textX + 310, textY + 480, 140, 0.1);
        doc.rect(textX + 140, textY + 580, 220, 0.1);
        doc.stroke();

        doc.font('Helvetica-Bold').fontSize(10).text('COORDINACIÓN ACADÉMICA', textX + 50, textY + 500);
        doc.font('Helvetica-Bold').fontSize(10).text('ESTUDIANTE', textX + 350, textY + 500);
        doc.font('Helvetica-Bold').fontSize(10).text('ASISTENTE COORDINACIÓN ACADÉMICA', textX + 150, textY + 600);

        const currentDate = format(new Date(), 'yyyy-MM-dd H:mm:ss');
        doc.text(`Generado el ${currentDate}`, 20, doc.page.height - 90, {align: 'left'});
//    doc.image(this.imageFooterPathGolden, 20, doc.page.height - 80, {width: 550, height: 20});
        doc.end();

    }
}
