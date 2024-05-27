import $ from "jquery";

export class Script {
    static formInputs = $('.form-input');

    static forwardCall() {
        let popup = $('.popup');
        $('button.forward-call').click(function () {
            popup.fadeIn(300);
            popup.css('display', 'flex');
        });

        $(document).click(function (e) {
            if ($(e.target).is('.popup')) {
                popup.fadeOut(300);
            }
        });

        $('#forward-call-btn').click(function () {
            if (!Script.validForm()) {
                $('.form .container').hide();
                $('.success-message').show();
            }

            Script.formInputs.blur(function () {
                Script.validForm();
            });
        });

        if (window.location.hash === "#/") {
            $(".footer-title").hide();
            $(".footer-info dl").hide();
        } else {
            $(".footer-title").show();
            $(".footer-info dl").show();
        }

        this.relativePage();
    }

    static validForm() {
        let hasError = false;
        let checked = $('#checkbox').prop("checked");
        let inputColor = this.formInputs.css('border-color');
        let error = $('.error-input');
        let checkboxInput = $('.checkbox-input');

        error.hide();
        this.formInputs.css('border-color', inputColor);
        checkboxInput.css('color', 'rgb(66, 69, 81)');

        for (let input of this.formInputs) {
            let element = $(input);
            if (!element.val()) {
                element.css('border-color', 'red');
                element.parent('label').next().show();
                hasError = true;
            }
        }

        if (!checked) {
            checkboxInput.css('color', 'red');
            hasError = true;
        }

        return hasError;
    }

    static relativePage() {
        $('.menu-burger').click(function () {
            $('.header-menu').show();
        });
        $('.close').click(function () {
            $('.header-menu').hide();
        });
        $('.popup-close').click(function () {
            $('.popup').hide();
        });

        if ($('.menu-burger').css('display') === 'block') {
            $('.menu-link').click(function () {
                $('.header-menu').hide();
            });
        }
    }

    static processPrice(priceList, id) {
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