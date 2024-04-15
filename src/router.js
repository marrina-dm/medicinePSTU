import { Main } from "./components/main.js";
import { Doctors } from "./components/doctors.js";

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
        },
      },
      {
        route: "#/services",
        title: "Услуги",
        template: "templates/services.html",
        styles: "css/index.css",
        load: () => {
          new Main();
        },
      },
      {
        route: "#/about",
        title: "О клинике",
        template: "templates/about.html",
        styles: "css/about.css",
        load: () => {
          new Main();
        },
      },
      {
        route: "#/doctors",
        title: "Врачи",
        template: "templates/doctors.html",
        styles: "css/doctors.css",
        load: () => {
          new Doctors();
        },
      },
      {
        route: "#/doctor",
        title: "Врач",
        template: "templates/doctor.html",
        styles: "css/doctor.css",
        load: () => {
          new Main();
        },
      },
    ];
  }

  async openRoute() {
    const newRoute = this.routes.find(
      (item) => item.route === window.location.hash
    );

    if (!newRoute) {
      window.location.href = "#/";
      return;
    }

    document.getElementById("content").innerHTML = await fetch(
      newRoute.template
    ).then((response) => response.text());
    document.getElementById("styles").setAttribute("href", newRoute.styles);
    document.getElementById("page-title").innerText = newRoute.title;
    newRoute.load();
  }
}
