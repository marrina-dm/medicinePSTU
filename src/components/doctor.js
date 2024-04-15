import Swiper from "swiper/bundle";
import { Script } from "../utils/script.js";
import $ from "jquery";

export class Main {
  constructor() {
    new Swiper(".swiper-doctors", {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 100,
      loop: true,
      loopedSlides: 7,
      watchSlidesVisibility: true,
      rewind: true,
      pagination: {
        el: ".swiper-doctors-pagination",
        clickable: true,
      },
    });

    $("#services").click(() => (location.href = "#/services"));

    if (window.location.hash === "#/") {
      $(".footer-title").hide();
      $(".footer-info dl").hide();
    }

    Script.forwardCall();
  }
}
