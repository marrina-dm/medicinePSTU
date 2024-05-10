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
                $('.forward-call').hide();
                $('.success-message').show();
            }

            Script.formInputs.blur(function () {
                Script.validForm();
            });
        });

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
        })
    }
}