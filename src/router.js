import { Main } from "./components/main.js";
import { Doctors } from "./components/doctors.js";
import {Specialist} from "./components/specialist.js";
import {Price} from "./components/price.js";

export class Router {
  constructor() {
    this.routes = [
      {
        route: "#/",
        title: "Главная",
        template: "templates/index.html",
        styles: "css/index.css",
        load: () => {
          new Main();
        }
      },
      {
        route: "#/services",
        title: "Услуги",
        template: "templates/services.html",
        styles: "css/index.css",
        load: () => {
          new Main();
        }
      },
      {
        route: "#/about",
        title: "О клинике",
        template: "templates/about.html",
        styles: "css/about.css",
        load: () => {
          new Main();
        }
      },
      {
        route: "#/doctors",
        title: "Врачи",
        template: "templates/doctors.html",
        styles: "css/doctors.css",
        load: () => {
          new Doctors();
        }
      },
      {
        route: "#/specialist",
        title: "Врач",
        template: "templates/specialist.html",
        styles: "css/specialist.css",
        load: () => {
          new Specialist();
        }
      },
      {
        route: "#/price",
        title: "Цены",
        template: "templates/price.html",
        styles: "css/price.css",
        load: () => {
          new Price();
        }
      }
    ];
  }

  async openRoute() {
    const newRoute = this.routes.find(
      (item) => item.route === window.location.hash.split("?")[0]);

    if (!newRoute) {
      window.location.href = "#/";
      return;
    }

    document.getElementById("content").innerHTML = await fetch(
      newRoute.template
    ).then((response) => response.text());
    document.getElementById("styles").setAttribute("href", newRoute.styles);
    document.getElementById("page-title").innerText = newRoute.title;
    window.scrollTo(0, 0);
    newRoute.load();
  }
}
