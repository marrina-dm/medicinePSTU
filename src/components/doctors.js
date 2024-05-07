import {Script} from "../utils/script.js";
import $ from "jquery";

export class Doctors {
    constructor() {
        Script.forwardCall();

        Promise.all([
            'doctors.json'
        ].map(url => fetch('files/' + url).then(response => response.json())))
            .then(dataArray => {
                this.processData(dataArray);
            })
            .catch(error => console.log('Ошибка при загрузке данных: ' + error));
    }

    processData(data) {
        this.processDoctors(data[0]);
    }

    processDoctors(doctorsList) {
        const list = document.getElementById('doctors');

        doctorsList.forEach(data => {
            const li = document.createElement('li');
            li.className = 'specialist-item';

            const specialistLink = document.createElement('a');
            specialistLink.href = '#/specialist?id=' + data.id;
            specialistLink.className = 'specialist-link';

            const specImgBlock = document.createElement('div');
            specImgBlock.className = 'spec-img';
            const img = document.createElement('img');
            img.src = 'img/employees/' + data.image;
            specImgBlock.appendChild(img);

            const specInfo = document.createElement('div');
            specInfo.className = 'spec-info';

            const specName = document.createElement('h3');
            specName.className = 'spec-name';
            const dataName = data.name.split(' ');
            specName.innerHTML = `${dataName[0]}<br/>${dataName[1]} ${dataName[2]}`;
            specInfo.appendChild(specName);

            data.position.forEach(position => {
                const specPosition = document.createElement('p');
                specPosition.className = 'spec-position';
                position = position.charAt(0).toUpperCase() + position.slice(1);
                specPosition.innerText = position;
                specInfo.appendChild(specPosition);
            });

            const specDescription = document.createElement('p');
            specDescription.className = 'spec-description';
            specDescription.innerText = '';
            if (data.description) {
                data.description.forEach(description => {
                    description = description.charAt(0).toUpperCase() + description.slice(1);
                    specDescription.innerHTML += `${description}.<br/>`;
                });
            }

            const specAction = document.createElement('div');
            specAction.className = 'spec-action';
            const specBtn = document.createElement('button');
            specBtn.className = 'spec-btn';
            specBtn.className += ' btn';
            specBtn.innerText = 'Записаться';
            specBtn.onclick = function (event) {
                event.preventDefault();
                let popup = $('.popup');
                popup.fadeIn(300);
                popup.css('display', 'flex');
            }

            specAction.appendChild(specBtn);
            specInfo.appendChild(specDescription);
            specInfo.appendChild(specAction);
            specialistLink.appendChild(specImgBlock);
            specialistLink.appendChild(specInfo);
            li.appendChild(specialistLink);
            list.appendChild(li);
        });
    }
}