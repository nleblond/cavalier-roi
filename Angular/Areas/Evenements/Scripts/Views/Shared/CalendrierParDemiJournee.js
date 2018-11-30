$(window).on('load', function () {

    //calendrier
    $('#Div_CalendrierParDemiJournee').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_CalendrierParDemiJournee .fermer').on('click', function () {
        $('#Div_CalendrierParDemiJournee').ModalPopUp('close');
    });

    $("#Div_CalendrierParDemiJournee .dates").datepicker();

});