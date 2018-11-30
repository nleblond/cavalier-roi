$(window).on('load', function () {

    //calendrier
    $('#Div_CalendrierParHeure').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_CalendrierParHeure .fermer').on('click', function () {
        $('#Div_CalendrierParHeure').ModalPopUp('close');
    });

    $("#Div_CalendrierParHeure .dates").datepicker();

});