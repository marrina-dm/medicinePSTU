import $ from "jquery";

export class Script {
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


        let formInputs = $('.form-input');
        let inputColor = formInputs.css('border-color');
        let error = $('.error-input');
        let checkboxInput = $('.checkbox-input');


        formInputs.blur(function () {
            error.hide();
            formInputs.css('border-color', inputColor);
            checkboxInput.css('color', 'rgb(66, 69, 81)');
            let checked = $('#checkbox').prop("checked");

            for (let input of formInputs) {
                let element = $(input);
                if (!element.val()) {
                    element.css('border-color', 'red');
                    element.parent('label').next().show();
                }
            }

            if (!checked) {
                checkboxInput.css('color', 'red');
            }
        });

        $('#forward-call-btn').click(function () {
            let hasError = false;
            let checked = $('#checkbox').prop("checked");

            error.hide();
            formInputs.css('border-color', inputColor);
            checkboxInput.css('color', 'rgb(66, 69, 81)');

            for (let input of formInputs) {
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

            if (!hasError) {
                $('.forward-call').hide();
                $('.success-message').show();
            }
        });
    }
}