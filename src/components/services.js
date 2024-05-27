import $ from "jquery";
import {Script} from "../utils/script";

export class Services {
    formInputs = null;
    constructor() {
        this.formInputs = $('.base-input');
        this.accordion();
        Script.forwardCall();

        $('#process-btn').click(() => {
            if (!this.validForm()) {
                $('#form-container').hide();
                $('.form-msg').show();
            }

            this.formInputs.blur(() => {
                this.validForm();
            });
        });
    }

    accordion() {
        $('#department-accordion .ui-accordion-header').click(function () {
            $(this).next().toggle();
            $(this).toggleClass('ui-accordion-header-active');
            return false;
        }).next().hide();
    }

    validForm() {
        let hasError = false;
        let inputColor = this.formInputs.css('border-color');
        let error = $('.error-base-input');

        error.hide();
        this.formInputs.css('border-color', inputColor);

        for (let input of this.formInputs) {
            let element = $(input);
            if (!element.val()) {
                element.css('border-color', 'red');
                element.parent('label').next().show();
                hasError = true;
            }
        }

        return hasError;
    }
}