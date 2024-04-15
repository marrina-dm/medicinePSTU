import Swiper from "swiper/bundle";
import { Script } from "../utils/script.js";
import $ from "jquery";

export class Doctor {
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

    $("#nav-other").click(() => (location.href = "#/doctors"));

    if (window.location.hash === "#/") {
      $(".footer-title").hide();
      $(".footer-info dl").hide();
    }

    Script.forwardCall();
  }
}
