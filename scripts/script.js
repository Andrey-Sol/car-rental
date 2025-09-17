
$(document).ready(function () {

    new WOW().init();

    $('.car-slider').slick({
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    arrows: false,
                }
            },
        ]
    });

    const sliderNav = $('.reviews-slider-nav');
    $('.reviews-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        appendArrows: sliderNav,
        prevArrow: '<div class="prev-arrow"></div>',
        nextArrow: '<div class="next-arrow"></div>',
        appendDots: sliderNav,
        dotsClass: 'reviews-slider-dots',
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    const menu = $('#menu');
    const burger = $('#burger');
    const orderForm = $('#modal-order');
    const callForm = $('#modal-call');
    const callFormInputs = $('#call-form');
    const orderFormInputs = $('#order-form');
    const callSuccessMessage = $('#call-success-message');
    const orderSuccessMessage = $('#order-success-message');

    // Меню
    burger.click(function () {
        menu.show();
        burger.hide();
    });
    $('#menu-close').click(function () {
        menu.hide();
        burger.show();
    });
    menu.click(function () {
        menu.hide();
        burger.show();
    });

    // Заказ звонка
    $('#call-button').click(function () {
        callFormInputs.show();
        callSuccessMessage.hide();
        callForm.show();
        callFormInputs[0].reset();
    })
    $('#call-form-close').click(function () {
        callForm.hide();
    })

    // Форма заказа
    $('#form-button').click(function () {
        orderForm.show();
        orderSuccessMessage.hide();
        orderFormInputs.show();
        orderFormInputs[0].reset();
    });
    $('.rent-button').click(function () {
        orderForm.show();
        orderSuccessMessage.hide();
        orderFormInputs.show();
        orderFormInputs[0].reset();
    })
    $('#order-form-close').click(function () {
        orderForm.hide();
    })

    // Валидация формы звонка
    $('#call-form-button').click(function () {
        const nameInput = $('#call-name-input');
        const phoneInput = $('#call-phone-input');
        const nameErrorPlaceholder = $('#call-name-error-placeholder');
        const phoneErrorPlaceholder = $('#call-phone-error-placeholder');
        let hasError = false;

        $('.form-error').hide();
        $('.call-form-input').removeClass('input-error');
        nameErrorPlaceholder.show();
        phoneErrorPlaceholder.show();

        if (!nameInput.val()) {
            $('#call-name-error').show();
            nameErrorPlaceholder.hide();
            nameInput.addClass('input-error');
            hasError = true;
        }
        if (!phoneInput.val()) {
            $('#call-phone-error').show();
            phoneErrorPlaceholder.hide();
            phoneInput.addClass('input-error');
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: { name: nameInput.val(), phone: phoneInput.val() }
            })
                .done(function( msg ) {
                    if (msg.success) {
                        alert('Ошибка сервера');
                    } else {
                        callFormInputs.hide();
                        callSuccessMessage.show();
                    }
                })
        }
    })

    // Валидация формы заказа
    $('#order-form-button').click(function () {
        const carSelect = $('#car-select');
        const carErrorPlaceholder = $('#order-car-error-placeholder');
        const termStartInput = $('.term-start-input');
        const termStartErrorPlaceholder = $('#term-start-error-placeholder');
        const termEndInput = $('.term-end-input');
        const termEndErrorPlaceholder = $('#term-end-error-placeholder');
        const driveFromSelect = $('#drive-from-select');
        const driveErrorPlaceholder = $('#order-drive-error-placeholder');
        const nameInput = $('#order-name-input');
        const nameErrorPlaceholder = $('#order-name-error-placeholder');
        const phoneInput = $('#order-phone-input');
        const phoneErrorPlaceholder = $('#order-phone-error-placeholder');
        const emailInput = $('#order-email-input');
        const emailErrorPlaceholder = $('#order-email-error-placeholder');
        let hasError = false;

        $('.form-error').hide();
        $('.order-form-input').removeClass('input-error');
        $('.term-input').removeClass('input-error');
        $('.order-select').removeClass('input-error');

        carErrorPlaceholder.show();
        termStartErrorPlaceholder.show();
        termEndErrorPlaceholder.show();
        driveErrorPlaceholder.show();
        nameErrorPlaceholder.show();
        phoneErrorPlaceholder.show();
        emailErrorPlaceholder.show();

        if (!carSelect.val()) {
            $('#order-car-error').show();
            carErrorPlaceholder.hide();
            carSelect.addClass('input-error');
            hasError = true;
        }
        if (!termStartInput.val()) {
            $('#order-start-error').show();
            termStartErrorPlaceholder.hide();
            termStartInput.addClass('input-error');
            hasError = true;
        }
        if (!termEndInput.val()) {
            $('#order-end-error').show();
            termEndErrorPlaceholder.hide();
            termEndInput.addClass('input-error');
            hasError = true;
        }
        if (!driveFromSelect.val()) {
            $('#order-drive-error').show();
            driveErrorPlaceholder.hide();
            driveFromSelect.addClass('input-error');
            hasError = true;
        }
        if (!nameInput.val()) {
            $('#order-name-error').show();
            nameErrorPlaceholder.hide();
            nameInput.addClass('input-error');
            hasError = true;
        }
        if (!phoneInput.val()) {
            $('#order-phone-error').show();
            phoneErrorPlaceholder.hide();
            phoneInput.addClass('input-error');
            hasError = true;
        }
        if (!emailInput.val()) {
            $('#order-email-error').show();
            emailErrorPlaceholder.hide();
            emailInput.addClass('input-error');
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    car: carSelect.val(),
                    termStart: termStartInput.val(),
                    termEnd: termEndInput.val(),
                    driveFrom: driveFromSelect.val(),
                    name: nameInput.val(),
                    phone: phoneInput.val(),
                    email: emailInput.val(),
                }
            })
                .done(function( msg ) {
                    if (msg.success) {
                        orderFormInputs.hide();
                        orderSuccessMessage.show();
                    } else {
                        alert('Ошибка сервера');
                    }
                })
        }
    })
});
