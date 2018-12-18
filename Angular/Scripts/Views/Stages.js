$(window).on('load', function () {

    $('.menu .stages').addClass('select');

    $('.reserver').each(function () {
        $(this).on('click', function () {
            $('#Div_CalendrierParDemiJournee').ModalPopUp('open');
        });
    });

});
