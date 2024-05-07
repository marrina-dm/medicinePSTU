import $ from "jquery";

export class Price {
    constructor() {
        $('.price-table-row').each((index, elem) => index % 2 === 1 ? $(elem).addClass('even') : $(elem).addClass('odd'));
        this.accordion();

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
        this.processPrice(data[0], 'students');
        this.processPrice(data[1], 'dantists');
        this.processPrice(data[2], 'prof');
        this.processPrice(data[3], 'lab');
        this.processPrice(data[4], 'complex');
        this.processPrice(data[5], 'therapy');
        this.processPrice(data[6], 'surgery');
        this.processPrice(data[7], 'phlebology');
        this.processPrice(data[8], 'urology');
        this.processPrice(data[9], 'oncology');
        this.processPrice(data[10], 'gynecology');
        this.processPrice(data[11], 'gastroenterology');
        this.processPrice(data[12], 'pulmonology');
        this.processPrice(data[13], 'otolaryngology');
        this.processPrice(data[14], 'ophthalmology');
        this.processPrice(data[15], 'neurology');
        this.processPrice(data[16], 'dermatovenerology');
        this.processPrice(data[17], 'endocrinology');
        this.processPrice(data[18], 'cardiology');
        this.processPrice(data[19], 'narcology');
        this.processPrice(data[20], 'psychotherapy');
        this.processPrice(data[21], 'cosmetology');
        this.processPrice(data[22], 'procedural');
        this.processPrice(data[23], 'physiotherapy');
        this.processPrice(data[24], 'ultrasound');
        this.processPrice(data[25], 'functional');
        this.processPrice(data[26], 'radiography');
        this.processPrice(data[27], 'other');
        this.processPrice(data[28], 'vpo');
    }

    processPrice(priceList, id) {
        const cell = document.getElementById(id);

        const table = document.createElement('table');
        table.className = 'price-table';
        cell.appendChild(table);

        priceList.forEach(priceData => {
            const row = table.insertRow();

            if (!parseInt(priceData.category)) {
                row.className = 'inner-row-title';
                let str = priceData.category;
                if (priceData.category.startsWith('main')) {
                    row.className += ' main';
                    str = str.substring(5);
                }
                const cell = row.insertCell();
                cell.className = 'table-title-inner-category';
                cell.colSpan = 3;
                cell.innerText = str;
            } else {
                row.className = 'inner-row';
                const cellName = row.insertCell();
                cellName.className = 'cell-name';
                cellName.innerText = priceData.name;

                const cellPrice = row.insertCell();
                cellPrice.className = 'cell-price';
                cellPrice.innerText = parseInt(priceData.price);

                const cellBtn = row.insertCell();
                cellBtn.className = 'cell-btn';
                cellBtn.innerHTML = '<button class="btn btn-transparent">Записаться</button>';
            }
        });

        $('.inner-row-title').next().children().css('border-top', 'none');
    }
}