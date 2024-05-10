import Swiper from "swiper/bundle";
import {Script} from "../utils/script.js";
import $ from "jquery";

export class Main {
    constructor() {
        new Swiper(".mySwiper", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">0' + (index + 1) + "</span>";
                },
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        new Swiper(".swiper-personal", {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: ".swiper-personal-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 5000,
            },
            loop: true,
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 75,
                },
            },
        });

        $("#services").click(() => (location.href = "#/services"));

        if (window.location.hash === "#/") {
            $(".footer-title").hide();
            $(".footer-info dl").hide();
        }

        Script.forwardCall();

        Promise.all([
            'doctors.json'
        ].map(url => fetch('files/' + url).then(response => response.json())))
            .then(dataArray => {
                this.fillSpecialists(dataArray);
            })
            .catch(error => console.log('Ошибка при загрузке данных: ' + error));
    }

    fillSpecialists(data) {
        const swiperWrapper = document.getElementById('swiper-wrapper');
        data[0].forEach(doctor => {
            const swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';

            const specialistLink = document.createElement('a');
            specialistLink.href = '#/specialist?id=' + doctor.id;
            specialistLink.className = 'personal-link';

            const specImgBlock = document.createElement('div');
            specImgBlock.className = 'spec-img';
            const img = document.createElement('img');
            img.src = 'img/employees/' + doctor.image;
            specImgBlock.appendChild(img);

            const specName = document.createElement('p');
            specName.className = 'personal-name';
            specName.innerText = doctor.name;

            specialistLink.appendChild(specImgBlock);
            specialistLink.appendChild(specName);

            doctor.position.forEach(position => {
                const specPosition = document.createElement('p');
                specPosition.className = 'personal-specialization';
                position = position.charAt(0).toUpperCase() + position.slice(1);
                specPosition.innerText = position;
                specialistLink.appendChild(specPosition);
            });

            swiperSlide.appendChild(specialistLink);
            swiperWrapper.appendChild(swiperSlide);
        });
    }
}
