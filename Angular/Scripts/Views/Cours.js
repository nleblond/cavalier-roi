$(window).on('load', function () {

    $('.menu .cours').addClass('select');

    $('.reserver').each(function () {
        $(this).on('click', function () {
            $('#Div_CalendrierParHeure').ModalPopUp('open');
        });
    });

});
