import {Content, TDocumentDefinitions} from "pdfmake/interfaces";
import {StudentEntity} from "@core/entities";
import {format} from "date-fns";

const avatar: Content = {
    image: './assets/avatars/1718226148350.jpg',
    width: 210,
    height: 210,
    absolutePosition: {x: 165, y: 178},
}
export const studentCardReport = (data: StudentEntity): TDocumentDefinitions => {
    const identification = data.user.identification;
    const names = data.user.name;
    const lastName = data.user.lastname;
    const career = 'CARRERA DE ' + data.enrollment.career.name;

    console.log(identification.length);
    return {
        pageSize: {
            width: 540,
            height: 960
        },
        pageMargins: [0, 0, 0, 0],
        background: [
            {
                image: './resources/images/reports/student-card.png',
                width: 540,
                height: 960,
                absolutePosition: {x: 0, y: 0},
                opacity: 1
            }
        ],
        content: [
            avatar,
            {
                text: identification,
                fontSize: 30,
                color: '#0082CB',
                absolutePosition: {x: 0, y: 450},
                alignment: 'center'
            },
            {
                text: names,
                fontSize: 30,
                color: '#0082CB',
                bold: true,
                absolutePosition: {x: 0, y: 500},
                alignment: 'center'
            },
            {
                text: lastName,
                fontSize: 30,
                color: '#0082CB',
                bold: true,
                absolutePosition: {x: 0, y: 550},
                alignment: 'center'
            },
            {
                text: career,
                fontSize: 18,
                color: '#0082CB',
                absolutePosition: {x: 10, y: 610},
                alignment: 'center',
            },
            {
                qr: 'https://siaaw.uaw.edu.ec/auth/authentication/login',
                fit: 120,
                absolutePosition: {x: 370, y: 700},
            }
        ],

    };
}
