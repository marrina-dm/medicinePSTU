import {UrlManager} from "../utils/url-manager";
import {Script} from "../utils/script";
import $ from "jquery";
import Swiper from "swiper";

export class Service {
    constructor() {
        Script.forwardCall();

        this.routeParams = UrlManager.getQueryParams();
        if (this.routeParams.id) {
            Promise.all([
                'services.json'
            ].map(url => fetch('files/' + url).then(response => response.json())))
                .then(dataArray => {
                    this.fillPage(dataArray);
                })
                .catch(error => console.log('Ошибка при загрузке данных: ' + error));
        }

        $('.swiper-wrapper').magnificPopup({
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

        new Swiper(".swiper-gallery", {
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
            },
            loop: true,
            pagination: {
                el: ".swiper-gallery-pagination",
                clickable: true,
            }
        });
    }

    fillPage(data) {
        const service = data[0].find(item => item.id === +this.routeParams.id);

        if (!service) {
            $('#service').hide();
            const message = document.createElement('p');
            message.className = 'message';
            message.innerText = 'Информация о данной услуге временно недоступна';
            document.getElementById('content').appendChild(message);
            return;
        }

        const banner = document.getElementById('banner');
        banner.style.backgroundImage = "url('img/banners/service/" + service.banner + "')";

        const bannerTitle = document.getElementById('banner-title');
        bannerTitle.innerText = service.title;

        document.querySelector('.main-description .container').innerHTML = service.mainDescription;

        document.getElementById('advantage-title').innerHTML = service.advantageTitle;
        document.getElementById('advantage-description').innerHTML = service.advantageDescription;

        const descriptionContainer = document.getElementById('description-container');
        if (service.description.mainTitle) {
            const mainTitle = document.createElement('h3');
            mainTitle.className = 'main-title';
            mainTitle.innerText = service.description.mainTitle;
            descriptionContainer.appendChild(mainTitle);
        }

        service.description.text.forEach(description => {
            if (description.title) {
                const miniTitle = document.createElement('h4');
                miniTitle.className = 'mini-title';
                miniTitle.innerText = description.title;
                descriptionContainer.appendChild(miniTitle);
            }

            const paragraph = document.createElement('p');
            paragraph.innerHTML = description.paragraph;
            descriptionContainer.appendChild(paragraph);
        });

        const swiperWrapper = document.getElementById('swiper-wrapper');

        service.images.forEach(image => {
            const link = document.createElement('a');
            link.href = "img/services/" + image;
            link.className = 'swiper-slide';

            const img = document.createElement('img');
            img.src = "img/services/" + image;

            link.appendChild(img);
            swiperWrapper.appendChild(link);
        });

        const priceTable = document.getElementById('price-table');
        service.price.forEach(price => {
            const tableRow = document.createElement('tr');
            tableRow.className = 'price-table-row ui-accordion-header';

            const tableTd = document.createElement('td');
            tableTd.colSpan = 3;
            tableTd.className = 'table-title-category';

            const tableTitle = document.createElement('span');
            tableTitle.innerText = price.title;
            tableTitle.id = 'table-title-category';

            const iconElement = document.createElement('span');
            iconElement.className = 'ui-accordion-header-icon';

            tableTd.appendChild(tableTitle);
            tableTd.appendChild(iconElement);
            tableRow.appendChild(tableTd);
            priceTable.appendChild(tableRow);

            const rowContent = document.createElement('tr');
            rowContent.className = 'ui-accordion-content';

            const td = document.createElement('td');
            td.colSpan = 3;
            td.className = 'price-element';
            td.id = price.price;

            rowContent.appendChild(td);
            priceTable.appendChild(rowContent);

            Promise.all([
                price.price + '.json'
            ].map(url => fetch('files/' + url).then(response => response.json())))
                .then(dataArray => {
                    Script.processPrice(dataArray[0], price.price);
                })
                .catch(error => console.log('Ошибка при загрузке данных: ' + error));
        });

        document.getElementById('invitation-text').innerHTML = service.invitation;

        if (service.rules) {
            this.sectionRules(service.rules);
        }
    }

    sectionRules(rules) {
        const rulesBlock = document.getElementById('rules');

        const sectionRules = document.createElement('section');
        sectionRules.className = 'rules';

        const containerBlock = document.createElement('div');
        containerBlock.className = 'container';

        rules.forEach(rule => {
            if (rule.title) {
                const title = document.createElement('h3');
                title.className = 'rule-title';
                title.innerHTML = rule.title;
                containerBlock.appendChild(title);
            }

            if (rule.text) {
                const block = document.createElement('div');
                block.innerHTML = rule.text;
                containerBlock.appendChild(block);
            }

            if (rule.accordions) {
                const rulesAccordion = document.createElement('div');
                rulesAccordion.className = 'ui-accordion rules-accordion';

                rule.accordions.forEach(accordion => {
                    const uiAccordionHeader = document.createElement('div');
                    uiAccordionHeader.className = 'ui-accordion-header';

                    const rulesTitle = document.createElement('h4');
                    rulesTitle.className = 'rules-title';
                    rulesTitle.innerText = accordion.header;

                    const headerIcon = document.createElement('span');
                    headerIcon.className = 'ui-accordion-header-icon';

                    uiAccordionHeader.appendChild(rulesTitle);
                    uiAccordionHeader.appendChild(headerIcon);

                    const uiAccordionContent = document.createElement('div');
                    uiAccordionContent.className = 'ui-accordion-content';
                    uiAccordionContent.innerHTML = accordion.content;
                    uiAccordionContent.style.display = 'none';

                    rulesAccordion.appendChild(uiAccordionHeader);
                    rulesAccordion.appendChild(uiAccordionContent);

                    this.accordion(uiAccordionHeader);
                });

                containerBlock.appendChild(rulesAccordion);
            }
        });

        sectionRules.appendChild(containerBlock);
        rulesBlock.appendChild(sectionRules);
    }

    accordion(accordion) {
        $(accordion).click(function () {
            $(this).next().toggle();
            $(this).toggleClass('ui-accordion-header-active');
            return false;
        }).next().hide();
    }
}