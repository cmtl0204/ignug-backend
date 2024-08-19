import {Content, TDocumentDefinitions} from 'pdfmake/interfaces';
import {StudentEntity} from '@core/entities';
import {format} from "date-fns";
import {es} from "date-fns/locale";

const avatar: Content = {
    image: './assets/avatars/unisex.png',
    width: 210,
    height: 210,
    absolutePosition: {x: 165, y: 178},
};

export const integralEvaluationReport = (data: any): TDocumentDefinitions => {
    const schoolPeriod = data.schoolPeriod.shortName;
    const identification = data.evaluated.identification;
    const names = data.evaluated.name;
    const lastName = data.evaluated.lastname;

    let career = 'No tiene una carrera principal asignada';

    if (data.evaluated.teacher.careerToTeachers.length > 0) {
        career = data.evaluated.teacher.careerToTeachers[0].career.name;
    }

    return {
        pageSize: {
            width: 540,
            height: 960,
        },

        pageMargins: [0, 0, 0, 0],

        content: [
            {
                image: './resources/images/reports/header.png',
                width: 130,
                height: 100,
                absolutePosition: {x: 180, y: 10},
            },

            {
                text: 'VICERRECTORADO ACADÉMICO INTERCULTURAL Y COMUNITARIO',
                fontSize: 12,
                color: '#0082CB',
                absolutePosition: {y: 120},
                alignment: 'center',
            },
            {
                text: 'REPORTE DE EVALUACIÓN INTEGRAL DE DESEMPEÑO DOCENTE',
                fontSize: 12,
                color: '#0082CB',
                absolutePosition: {y: 155},
                alignment: 'center',
            },

            {
                text: 'Proceso:',
                fontSize: 10,
                absolutePosition: {x: 50, y: 200},
                alignment: 'left',
            },
            {
                text: 'Evaluación integral de desempeño del personal académico:',
                fontSize: 10,
                absolutePosition: {x: 100, y: 200},
                alignment: 'left',
            },

            {
                text: 'PAO:',
                fontSize: 10,
                absolutePosition: {x: 50, y: 220},
                alignment: 'left',
            },
            {
                text: data.schoolPeriod.name,
                fontSize: 10,
                absolutePosition: {x: 100, y: 220},
                alignment: 'left',
            },

            {
                text: 'Docente:',
                fontSize: 10,
                absolutePosition: {x: 50, y: 240},
                alignment: 'left',
            },
            {
                text: `${data.evaluated.lastname} ${data.evaluated.name}`,
                fontSize: 10,
                absolutePosition: {x: 100, y: 240},
                alignment: 'left',
            },

            {
                text: 'Carrera:',
                fontSize: 10,
                absolutePosition: {x: 50, y: 260},
                alignment: 'left',
            },
            {
                text: career,
                fontSize: 10,
                absolutePosition: {x: 100, y: 260},
                alignment: 'left',
            },

            {
                text: 'Fecha:',
                fontSize: 10,
                absolutePosition: {x: 50, y: 280},
                alignment: 'left',
            },
            {
                text: format(new Date(), 'dd \'de\' MMMM \'de\' yyyy', {locale: es}),
                fontSize: 10,
                absolutePosition: {x: 100, y: 280},
                alignment: 'left',
            },

            {
                table: {
                    headerRows: 1,
                    widths: [300, 50, 50],

                    body: [
                        ['', {text: 'Cuantitativa', bold: true}, {text: 'Cualitativa', bold: true}],
                        ['Resultado evaluación de desempeño personal académico', '92.11', 'Destacado'],
                    ]
                },
                absolutePosition: {x: 50, y: 300},

                fontSize: 10
            },

            {
                table: {
                    headerRows: 1,
                    widths: [300, 50, 50],

                    body: [
                        [
                            {text: 'Evaluación del desempeño', bold: true},
                            {text: '%', bold: true},
                            {text: 'Resultado', bold: true}
                        ],
                        ['Cuestionario para la autoevaluación docente ', '10%', '10.00'],
                        ['Cuestionario para la coevaluación por parte de pares académicos', '25%', '25.00'],
                        ['Cuestionario para hetero evaluación', '40%', '35.37'],
                        ['Cuestionario para la evaluación de las autoridades al personal académico', '25%', '21.74'],
                        [{text: 'TOTAL', bold: true}, '100%', '92.11'],
                    ]
                },
                absolutePosition: {x: 50, y: 370},
                fontSize: 10
            },

            {
                text: 'De acuerdo al Reglamento de Carrera y Escalafón del profesor e investigador de la Universidad Amawtay Wasi, el artículo 129.- Reconsideración, señala que “el personal académico que esté en desacuerdo con los resultados de su evaluación, podrá solicitar la reconsideración de la resolución al director de la Comisión de Evaluación Interna, en el término de cinco días laborables”.',
                fontSize: 8,
                absolutePosition: {x: 50, y: 490},
                alignment: 'left',
            },
        ],
    };
};
