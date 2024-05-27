import $ from "jquery";
import {Script} from "../utils/script";

export class Price {
    constructor() {
        $('.price-table-row').each((index, elem) => index % 2 === 1 ? $(elem).addClass('even') : $(elem).addClass('odd'));
        this.accordion();
        Script.forwardCall();

        Promise.all([
            'students.json',
            'dantists.json',
            'prof.json',
            'lab.json',
            'complex.json',
            'therapy.json',
            'surgery.json',
            'phlebology.json',
            'urology.json',
            'oncology.json',
            'gynecology.json',
            'gastroenterology.json',
            'pulmonology.json',
            'otolaryngology.json',
            'ophthalmology.json',
            'neurology.json',
            'dermatovenerology.json',
            'endocrinology.json',
            'cardiology.json',
            'narcology.json',
            'psychotherapy.json',
            'cosmetology.json',
            'procedural.json',
            'physiotherapy.json',
            'ultrasound.json',
            'functional.json',
            'radiography.json',
            'other.json',
            'vpo.json',
        ].map(url => fetch('files/' + url).then(response => response.json())))
            .then(dataArray => {
                this.processData(dataArray);
            })
            .catch(error => console.log('Ошибка при загрузке данных: ' + error));
    }

    accordion() {
        $('#accordion .ui-accordion-header').click(function () {
            $(this).next().toggle('slow');
            $(this).toggleClass('ui-accordion-header-active');
            return false;
        }).next().hide();
    }

    processData(data) {
        Script.processPrice(data[0], 'students');
        Script.processPrice(data[1], 'dantists');
        Script.processPrice(data[2], 'prof');
        Script.processPrice(data[3], 'lab');
        Script.processPrice(data[4], 'complex');
        Script.processPrice(data[5], 'therapy');
        Script.processPrice(data[6], 'surgery');
        Script.processPrice(data[7], 'phlebology');
        Script.processPrice(data[8], 'urology');
        Script.processPrice(data[9], 'oncology');
        Script.processPrice(data[10], 'gynecology');
        Script.processPrice(data[11], 'gastroenterology');
        Script.processPrice(data[12], 'pulmonology');
        Script.processPrice(data[13], 'otolaryngology');
        Script.processPrice(data[14], 'ophthalmology');
        Script.processPrice(data[15], 'neurology');
        Script.processPrice(data[16], 'dermatovenerology');
        Script.processPrice(data[17], 'endocrinology');
        Script.processPrice(data[18], 'cardiology');
        Script.processPrice(data[19], 'narcology');
        Script.processPrice(data[20], 'psychotherapy');
        Script.processPrice(data[21], 'cosmetology');
        Script.processPrice(data[22], 'procedural');
        Script.processPrice(data[23], 'physiotherapy');
        Script.processPrice(data[24], 'ultrasound');
        Script.processPrice(data[25], 'functional');
        Script.processPrice(data[26], 'radiography');
        Script.processPrice(data[27], 'other');
        Script.processPrice(data[28], 'vpo');
    }
}