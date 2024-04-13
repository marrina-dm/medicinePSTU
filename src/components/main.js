import Swiper from 'swiper/bundle';
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
                }
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
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
                }
            }
        });

        $('#services').click(() => location.href = '#/services');

        if (window.location.hash === '#/') {
            $('.footer-title').hide();
            $('.footer-info dl').hide();
        }

        Script.forwardCall();
    }
}