import Swiper from "swiper/bundle";
import {Script} from "../utils/script.js";
import $ from "jquery";
import {UrlManager} from "../utils/url-manager.js";
import "magnific-popup";

export class Specialist {
    routeParams = null;

    constructor() {
        new Swiper(".swiper-doctors", {
            slidesPerView: 3,
            spaceBetween: 78,
            autoplay: {
                delay: 5000,
            },
            loop: true,
            pagination: {
                el: ".swiper-doctors-pagination",
                clickable: true,
            }
        });

        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            }
        });

        $("#nav-other").click(() => (location.href = "#/doctors"));

        if (window.location.hash === "#/") {
            $(".footer-title").hide();
            $(".footer-info dl").hide();
        }

        Script.forwardCall();

        document.getElementById('spec-btn').onclick = function (event) {
            event.preventDefault();
            let popup = $('.popup');
            popup.fadeIn(300);
            popup.css('display', 'flex');
        }

        this.routeParams = UrlManager.getQueryParams();
        if (this.routeParams.id) {
            Promise.all([
                'doctors.json'
            ].map(url => fetch('files/' + url).then(response => response.json())))
                .then(dataArray => {
                    this.fillPage(dataArray);
                })
                .catch(error => console.log('Ошибка при загрузке данных: ' + error));
        }
    }

    fillPage(data) {
        const specialist = data[0].find(item => item.id === +this.routeParams.id);

        const specialistImage = document.getElementById('specialist-image');
        specialistImage.src = 'img/employees/' + specialist.image;

        const specialistName = document.getElementById('specialist-name');
        const specName = specialist.name.split(' ');
        specialistName.innerHTML = `<span class="big">${specName[0]}</span> ${specName[1]} ${specName[2]}`;

        const specialization = document.getElementById("specialization");

        specialist.position.forEach(position => {
            const newNode = document.createElement("dd");
            newNode.className = 'description-text';
            newNode.innerText = position.charAt(0).toUpperCase() + position.slice(1);
            const nextSibling = specialization.nextSibling;
            specialization.parentNode.insertBefore(newNode, nextSibling);
        });

        if (specialist.description) {
            const dlElement = document.getElementById('description');
            const descriptionName = document.createElement('dt');
            descriptionName.className = 'description-name';
            descriptionName.innerText = 'Квалификационная категория';

            dlElement.appendChild(descriptionName);
            specialist.description.forEach(description => {
                const newNode = document.createElement("dd");
                newNode.className = 'description-text';
                newNode.innerText = description;

                dlElement.appendChild(newNode);
            });
        }

        if (specialist.experience) {
            document.getElementById('experience').innerText = `Стаж: ${specialist.experience}`;
        }


        const educations = specialist.education.reverse();
        const educationBlock = document.getElementById('education-block');

        educations.forEach(education => {
            const eduInfoBlock = document.createElement("div");
            eduInfoBlock.className = 'edu-info';

            const progressBarBlock = document.createElement("div");
            progressBarBlock.className = 'progress-bar';

            const img = document.createElement("img");
            img.src = 'img/icons/education.svg';

            const line = document.createElement("div");
            line.className = 'line';

            progressBarBlock.appendChild(img);
            progressBarBlock.appendChild(line);
            eduInfoBlock.appendChild(progressBarBlock);

            const eduUniverseBlock = document.createElement("div");
            eduUniverseBlock.className = 'edu-universe';

            const universeTitle = document.createElement("h4");
            universeTitle.className = 'universe-title';
            universeTitle.innerText = education.name;

            const universeYear = document.createElement("div");
            universeYear.className = 'universe-year';
            universeYear.innerText = education.year;

            const universePosition = document.createElement("div");
            universePosition.className = 'universe-position';
            universePosition.innerText = education.direction;

            const eduType = document.createElement("div");
            eduType.className = 'edu-type';
            eduType.innerText = 'Базовое образование';

            eduUniverseBlock.appendChild(universeTitle);
            eduUniverseBlock.appendChild(universeYear);
            eduUniverseBlock.appendChild(universePosition);
            eduUniverseBlock.appendChild(eduType);
            eduInfoBlock.appendChild(eduUniverseBlock);

            educationBlock.appendChild(eduInfoBlock);
        });

        const swiperWrapper = document.getElementById('swiper-wrapper');
        data[0].forEach(doctor => {
            if (doctor.id !== +this.routeParams.id) {
                const swiperSlide = document.createElement('div');
                swiperSlide.className = 'swiper-slide';
                const specialistItem = document.createElement('div');
                specialistItem.className = 'specialist-item';

                const specialistLink = document.createElement('a');
                specialistLink.href = '#/specialist?id=' + doctor.id;
                specialistLink.className = 'specialist-link';

                const specImgBlock = document.createElement('div');
                specImgBlock.className = 'spec-img';
                const img = document.createElement('img');
                img.src = 'img/employees/' + doctor.image;
                specImgBlock.appendChild(img);

                const specInfo = document.createElement('div');
                specInfo.className = 'spec-info';

                const specName = document.createElement('h3');
                specName.className = 'spec-name';
                const dataName = doctor.name.split(' ');
                specName.innerHTML = `${dataName[0]}<br/>${dataName[1]} ${dataName[2]}`;
                specInfo.appendChild(specName);

                doctor.position.forEach(position => {
                    const specPosition = document.createElement('p');
                    specPosition.className = 'spec-position';
                    position = position.charAt(0).toUpperCase() + position.slice(1);
                    specPosition.innerText = position;
                    specInfo.appendChild(specPosition);
                });

                const specDescription = document.createElement('p');
                specDescription.className = 'spec-description';
                specDescription.innerText = '';
                if (doctor.description) {
                    doctor.description.forEach(description => {
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
                specialistItem.appendChild(specialistLink);
                swiperSlide.appendChild(specialistItem);
                swiperWrapper.appendChild(swiperSlide);
            }
        });
    }
}
