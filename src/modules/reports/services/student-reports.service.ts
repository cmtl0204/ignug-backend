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
        doc.rect(textX + 180, textY + 20, 0.1, 50);
        doc.rect(textX, textY + 45, textW, 0.1);
        doc.rect(textX + 400, textY + 45, 0.1, 25);
        doc.rect(textX, textY + 70, textW, 0.1);
        doc.rect(textX, textY + 95, textW, 0.1);
        doc.rect(textX + 290, textY + 70, 0.1, 75);
        doc.rect(textX, textY + 120, textW, 0.1);
        doc.rect(textX + 145, textY + 120, 0.1, 50);
        doc.rect(textX + 380, textY + 120, 0.1, 25);
        doc.rect(textX, textY + 145, textW, 0.1);
        doc.rect(textX + 315, textY + 145, 0.1, 25);
        doc.rect(textX, textY + 170, textW, 0.1);
        doc.rect(textX + 245, textY + 170, 0.1, 125);
        doc.rect(textX, textY + 195, textW, 0.1);
        doc.rect(textX, textY + 220, textW, 0.1);
        doc.rect(textX + 245, textY + 245, textW - 245, 0.1);
        doc.rect(textX, textY + 270, textW, 0.1);
        doc.rect(textX, textY + 295, textW, 0.1);
        doc.rect(textX + 135, textY + 295, 0.1, 25);
        doc.rect(textX + 275, textY + 295, 0.1, 25);
        doc.rect(textX, textY + 320, textW, 0.1);
        doc.rect(textX + 170, textY + 320, 0.1, 25);
        doc.rect(textX + 330, textY + 320, 0.1, 25);
        doc.rect(textX, textY + 345, textW, 0.1);
        doc.rect(textX + 245, textY + 345, 0.1, 25);
        doc.rect(textX, textY + 370, textW, 0.1);
        doc.rect(textX, textY + 395, textW, 0.1);
        doc.rect(textX + 250, textY + 395, 0.1, 25);
        doc.rect(textX, textY + 420, textW, 0.1);
        doc.rect(textX + 190, textY + 420, 0.1, 25);
        doc.rect(textX, textY + 445, textW, 0.1);
        doc.rect(textX + 150, textY + 445, 0.1, 25);
        doc.rect(textX + 295, textY + 445, 0.1, 25);
        doc.rect(textX, textY + 470, textW, 0.1);
        doc.rect(textX + 250, textY + 470, 0.1, 75);
        doc.rect(textX, textY + 495, textW, 0.1);
        doc.rect(textX, textY + 520, textW, 0.1);
        doc.rect(textX, textY + 545, textW, 0.1);
        doc.rect(textX, textY + 595, textW, 0.1);
        doc.rect(textX + 105, textY + 595, 0.1, 25);
        doc.rect(textX + 235, textY + 595, 0.1, 25);
        doc.rect(textX + 345, textY + 595, 0.1, 25);
        doc.rect(textX, textY + 620, textW, 0.1);
        doc.rect(textX, textY + 645, textW, 0.1);
        doc.rect(textX + 250, textY + 645, 0.1, 25);
        doc.rect(textX, textY + 670, textW, 0.1);
        doc.rect(textX + 195, textY + 670, 0.1, 25);
        doc.rect(textX + 345, textY + 670, 0.1, 25);
        doc.stroke();

        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('1. Tipo de documento:', textX + 5, textY + 30);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('2. Apellidos y nombres del estudiante:', textX + 190, textY + 30);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('3. Numero de documento', textX + 5, textY + 55);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('4. Fecha de nacimiento:', textX + 190, textY + 55);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('5. Edad:', textX + 405, textY + 55);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('6. Correo electronico institucional:', textX + 5, textY + 75);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('7. Correo electronico personal:', textX + 5, textY + 100);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('8. No. Celular:', textX + 300, textY + 75);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('9. No. Convencional:', textX + 300, textY + 100);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('10. Estado civil:', textX + 5, textY + 125);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('11. Nacionalidad:', textX + 150, textY + 125);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('12. Sexo:', textX + 300, textY + 125);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('13. Genero:', textX + 385, textY + 125);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('14. Autoidentificación:', textX + 5, textY + 150);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('14.1 Nacionalidad indigena:', textX + 150, textY + 150);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('14.2 Pueblo al que pertenece:', textX + 320, textY + 150);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('15. Habla alguna lengua ancestral:', textX + 5, textY + 175);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('15.1 Indique la lengua ancestral:', textX + 250, textY + 175);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('16. Habla alguna lengua extranjera:', textX + 5, textY + 200);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('16.1 Indique la lengua extranjera:', textX + 250, textY + 200);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('17. Nombre contacto de emergencia:', textX + 5, textY + 240);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('18. Numero contacto de emergencia:', textX + 250, textY + 225);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('19. Parentesco:', textX + 250, textY + 250);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('20. El estudiante trabaja?:', textX + 5, textY + 275);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('20.1 Cargo que desempeña:', textX + 250, textY + 275);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('20.2 Sueldo mensual:', textX + 5, textY + 300);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('20.3 Horario de trabajo:', textX + 140, textY + 300);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('20.4 Domicilia de trabajo:', textX + 280, textY + 300);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('21. Tiene hijos:', textX + 5, textY + 325);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('21.1 Cuatos hijos:', textX + 175, textY + 325);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('22. Es jefe de hogar:', textX + 335, textY + 325);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('23. Esta afiliado al seguro social:', textX + 5, textY + 350);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('24. Posee seguro de salud privada:', textX + 250, textY + 350);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('26. Tiene alguna discapacidad:', textX + 5, textY + 375);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('26.1 TIpo:', textX + 180, textY + 375);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('26.2 Porcentaje de discapacidad:', textX + 300, textY + 375);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('27. TIene alguna enfermedad catastrofica:', textX + 5, textY + 400);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('27.1 Tipo de enfermedad:', textX + 255, textY + 400);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('28. Tipo de colegio:', textX + 5, textY + 425);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('29. En su trayectoria universitaria a realizado:', textX + 200, textY + 425);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('30. Posee otro titulo:', textX + 5, textY + 450);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('30.1 Que titulo posee:', textX + 155, textY + 450);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('31. Estudia otra carrera:', textX + 300, textY + 450);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('31.1 Nombre de la carrera:', textX + 5, textY + 475);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('31.2 Tipo de carrera:', textX + 255, textY + 475);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('39. Cuenta con equipo tecnologico:', textX + 5, textY + 500);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('39.1 Dispositivo tecnologico:', textX + 255, textY + 500);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('40. Posee cobertura a internet:', textX + 5, textY + 525);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('40.1 Tipo de cobertura que utiliza:', textX + 255, textY + 525);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('Lugar de residencia', textX + 200, textY + 565);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('41. Pais:', textX + 5, textY + 600);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('42. Provincia:', textX + 110, textY + 600);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('43. Canton:', textX + 240, textY + 600);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('44. Parroquia:', textX + 350, textY + 600);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('45. Comunidad de procedencia:', textX + 5, textY + 625);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('46. Calle principal:', textX + 5, textY + 650);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('47. Calle secundaria:', textX + 255, textY + 650);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('48. Numero de casa:', textX + 5, textY + 675);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('49. Longitud:', textX + 200, textY + 675);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('50. Latitud:', textX + 350, textY + 675);

        if (response) {
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.identificationType?.name, textX + 105, textY + 30);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.identification, textX + 120, textY + 55);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.name} ${response?.user.lastname}`, textX + 360, textY + 30);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.birthdate, textX + 295, textY + 55);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text('25', textX + 450, textY + 55);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.personalEmail}`, textX + 155, textY + 75);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.email}`, textX + 140, textY + 100);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.cellPhone}`, textX + 360, textY + 75);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.phone}`, textX + 390, textY + 100);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.maritalStatus?.name}`, textX + 75, textY + 125);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(`${response?.user.nationality?.name}`, textX + 225, textY + 125);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.sex?.name, textX + 340, textY + 125);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.gender?.name, textX + 435, textY + 125);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.ethnicOrigin?.name, textX + 105, textY + 150);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.indigenousNationality?.name, textX + 265, textY + 150);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.town?.name, textX + 440, textY + 150);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isAncestralLanguage?.name, textX + 155, textY + 175);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.ancestralLanguageName?.name, textX + 390, textY + 175);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isForeignLanguage?.name, textX + 160, textY + 200);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.foreignLanguageName?.name, textX + 395, textY + 200);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.contactEmergencyName, textX + 165, textY + 240);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.contactEmergencyPhone, textX + 415, textY + 225);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.contactEmergencyKinship?.name, textX + 320, textY + 250);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isWork?.name, textX + 120, textY + 275);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.workPosition, textX + 375, textY + 275);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.monthlySalary?.name, textX + 105, textY + 300);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.workingHours?.name, textX + 250, textY + 300);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.workAddress, textX + 395, textY + 300);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isHasChildren?.name, textX + 75, textY + 325);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.childrenTotal, textX + 255, textY + 325);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.homeOwnership?.name, textX + 255, textY + 325);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isSocialSecurity?.name, textX + 150, textY + 350);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isPrivateSecurity?.name, textX + 400, textY + 350);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isDisability?.name, textX + 140, textY + 375);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.disabilityType?.name, textX + 225, textY + 375);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.disabilityPercentage, textX + 440, textY + 375);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isCatastrophicIllness?.name, textX + 185, textY + 400);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.catastrophicIllness, textX + 365, textY + 400);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeSchool?.name, textX + 90, textY + 425);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.universityCareer?.name, textX + 400, textY + 425);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isDegreeSuperior?.name, textX + 100, textY + 450);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.degreeSuperior?.name, textX + 250, textY + 450);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isStudyOtherCareer?.name, textX + 410, textY + 450);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.nameStudyOtherCareer, textX + 135, textY + 475);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeStudyOtherCareer?.name, textX + 365, textY + 475);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isElectronicDevice?.name, textX + 115, textY + 500);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.electronicDevice?.name, textX + 390, textY + 500);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isInternet?.name, textX + 95, textY + 525);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.internetType?.name, textX + 380, textY + 525);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.country?.name + 'Ecuador', textX + 45, textY + 600);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.province?.name + 'Pichincha', textX + 160, textY + 600);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.canton?.name + 'Quio', textX + 285, textY + 600);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.parrish?.name + 'Ecuador', textX + 395, textY + 600);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.community + 'Ecuador', textX + 155, textY + 625);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.mainStreet + 'calle1', textX + 100, textY + 650);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.secondaryStreet + 'calle2', textX + 355, textY + 650);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.number + 'casa n', textX + 100, textY + 675);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.longitude + 'longitud', textX + 260, textY + 675);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.latitude + 'latitud', textX + 400, textY + 675);
        }

        doc.addPage();
        doc.rect(textX, textY, textW, 675); //Rectangulo grande
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
        doc.rect(textX, textY + 350, textW, 0.1);
        doc.rect(textX, textY + 375, textW, 0.1);
        doc.rect(textX, textY + 400, textW, 0.1);
        doc.rect(textX, textY + 425, textW, 0.1);
        doc.rect(textX, textY + 450, textW, 0.1);
        doc.rect(textX, textY + 475, textW, 0.1);
        doc.rect(textX, textY + 500, textW, 0.1);
        doc.rect(textX, textY + 525, textW, 0.1);
        doc.rect(textX, textY + 550, textW, 0.1);
        doc.rect(textX, textY + 575, textW, 0.1);
        doc.rect(textX, textY + 600, textW, 0.1);
        doc.rect(textX, textY + 625, textW, 0.1);
        doc.rect(textX, textY + 650, textW, 0.1);
        doc.stroke();

        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('Lugar de residencia:', textX + 200, textY + 10);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('51. Pais:', textX + 5, textY + 35);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('52. Provincia:', textX + 110, textY + 35);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('53. Canton:', textX + 240, textY + 35);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('54. Parroquia:', textX + 350, textY + 35);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('55. Comunidad de procedencia:', textX + 5, textY + 60);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('56. Calle principal:', textX + 5, textY + 85);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('57. Calle secundaria:', textX + 255, textY + 85);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('58. Numero de casa:', textX + 5, textY + 110);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('59. Longitud:', textX + 200, textY + 110);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('60. Latitud:', textX + 350, textY + 110);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('61. Ingresos del hogar:', textX + 5, textY + 135);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('62. Numero de miebros del hogar:', textX + 255, textY + 135);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('63. Depende economicamente de otra persona:', textX + 5, textY + 160);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('64. Dispone de vehiculo propio:', textX + 5, textY + 185);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('65. Tiene otras propiedades:', textX + 175, textY + 185);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('65.1 Cuales:', textX + 340, textY + 185);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('66. Algun miembro de su familia tiene una enfermedad catastrofica:', textX + 5, textY + 210);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('66.1 Quien:', textX + 5, textY + 235);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('66.2 Tipo de enfermedad:', textX + 255, textY + 235);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('67. Algun miembro de su familia presenta alguna discapacidad:', textX + 5, textY + 260);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('67.1 Porcentaje de discapacidad:', textX + 5, textY + 285);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('67.2 Especifique quien:', textX + 255, textY + 285);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('68. Con quien vive el estudiante:', textX + 5, textY + 310);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('69. La vivienda en la que habita el estudiante es:', textX + 210, textY + 310);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('70. Tipo de vivienda:', textX + 5, textY + 335);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('71. Tipo de techo:', textX + 200, textY + 335);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('72. Tipo de piso:', textX + 200, textY + 360);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('73. Tipo de pared:', textX + 200, textY + 385);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('74. Posee servicio de basico de agua:', textX + 5, textY + 410);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('74.1 Que tipo de agua consume:', textX + 255, textY + 410);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('75. Posee luz en su domicilio:', textX + 5, textY + 435);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('76. Frecuencia de apagones:', textX + 255, textY + 435);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('77. Posee servicio de telefono:', textX + 5, textY + 460);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('78. Posee servicio de alcantarillado:', textX + 5, textY + 485);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('78.1 Tipo de alcantarillado:', textX + 255, textY + 485);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('79. Recibe aportes de:', textX + 5, textY + 510);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('80. Recibe bono, beca:', textX + 180, textY + 510);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('81. Consume noticias:', textX + 350, textY + 510);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('82. Algun miembro de su familia es emigrante:', textX + 5, textY + 535);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('83. Efectos psicosociales:', textX + 5, textY + 560);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('84. Victima de violencia de genero:', textX + 5, textY + 585);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('84.1 Tipo de violencia:', textX + 255, textY + 585);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('85. A intentado hacerse daño:', textX + 5, textY + 610);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('85.1 Tipo de autolesiones:', textX + 255, textY + 610);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('86. A sido disciminado:', textX + 5, textY + 635);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('86.1 Cual es el motivo:', textX + 255, textY + 635);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('87. Tribu urbana:', textX + 5, textY + 660);
        doc
            .font('Helvetica-Bold')
            .fontSize(fontsize)
            .text('88. Informacion adicional del estudiante:', textX + 255, textY + 660);

        if (response) {
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.country?.name + 'Ecuador', textX + 45, textY + 35);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.province?.name + 'Pichincha', textX + 160, textY + 35);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.canton?.name + 'Quio', textX + 285, textY + 35);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.parrish?.name + 'Ecuador', textX + 395, textY + 35);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.community + 'Ecuador', textX + 155, textY + 60);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.mainStreet + 'calle1', textX + 100, textY + 85);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.secondaryStreet + 'calle2', textX + 355, textY + 85);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.number + 'casa n', textX + 100, textY + 110);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.longitude + 'longitud', textX + 260, textY + 110);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.user.originAddress?.latitude + 'latitud', textX + 400, textY + 110);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.economicAmount, textX + 100, textY + 135);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.membersHouseNumber, textX + 400, textY + 135);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isDependsEconomically?.name, textX + 255, textY + 160);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isFamilyVehicle?.name, textX + 150, textY + 185);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isFamilyProperties?.name, textX + 300, textY + 185);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyProperties?.name, textX + 500, textY + 185);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isFamilyCatastrophicIllness?.name, textX + 550, textY + 210);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyKinshipCatastrophicIllness?.name, textX + 150, textY + 235);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyCatastrophicIllness, textX + 380, textY + 235);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isFamilyDisability?.name, textX + 450, textY + 260);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyKinshipDisability?.name, textX + 450, textY + 285);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.familyDisabilityPercentage, textX + 150, textY + 285);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.studentLive?.name, textX + 150, textY + 310);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.homeOwnership?.name, textX + 450, textY + 310);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.homeType?.name, textX + 150, textY + 235);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.homeRoof?.name, textX + 350, textY + 260);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.homeFloor?.name, textX + 350, textY + 285);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.homeWall?.name, textX + 350, textY + 310);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isWaterService?.name, textX + 180, textY + 335);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.waterServiceType?.name, textX + 450, textY + 335);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isElectricService?.name, textX + 150, textY + 360);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.electricServiceBlackout?.name, textX + 450, textY + 360);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isPhoneService?.name, textX + 180, textY + 385);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isSewerageService?.name, textX + 180, textY + 410);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.sewerageServiceType?.name, textX + 450, textY + 410);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text('recibe aportes de ', textX + 100, textY + 510);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text('recibe bono', textX + 280, textY + 510);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.consumeNewsType?.name, textX + 450, textY + 510);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isFamilyEmigrant?.name, textX + 450, textY + 535);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.pandemicPsychologicalEffect?.name, textX + 150, textY + 560);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isGenderViolence?.name, textX + 150, textY + 585);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeGenderViolence?.name, textX + 450, textY + 585);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isInjuries?.name, textX + 150, textY + 610);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeInjuries?.name, textX + 450, textY + 610);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.isDiscrimination?.name, textX + 150, textY + 635);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.typeDiscrimination?.name, textX + 450, textY + 635);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.socialGroup?.name, textX + 150, textY + 660);
            doc
                .font('Times-Roman')
                .fontSize(fontsize)
                .text(response?.informationStudent.additionalInformation, textX + 450, textY + 660);
        }

        // Firmas
        // doc.rect(textX + 40, textY + 480, 160, 0.1);
        // doc.rect(textX + 310, textY + 480, 140, 0.1);
        // doc.rect(textX + 140, textY + 580, 220, 0.1);
        // doc.stroke();

        // doc
        //   .font('Helvetica-Bold')
        //   .fontSize(10)
        //   .text('COORDINACIÓN ACADÉMICA', textX + 50, textY + 500);
        // doc
        //   .font('Helvetica-Bold')
        //   .fontSize(10)
        //   .text('ESTUDIANTE', textX + 350, textY + 500);
        // doc
        //   .font('Helvetica-Bold')
        //   .fontSize(10)
        //   .text('ASISTENTE COORDINACIÓN ACADÉMICA', textX + 150, textY + 600);

        // const currentDate = format(new Date(), 'yyyy-MM-dd H:mm:ss');
        // doc.text(`Generado el ${currentDate}`, 20, doc.page.height - 90, { align: 'left' });
        // doc.image(this.imageFooterPathGolden, 20, doc.page.height - 80, {width: 550, height: 20});
        doc.end();
    }
}
