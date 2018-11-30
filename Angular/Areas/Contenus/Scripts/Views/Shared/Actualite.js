$(window).on('load', function () {

    $('#Div_Actu').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });


    $('#Div_Actu .fermer').on('click', function () {
        $('#Div_Actu').ModalPopUp('close');
    });

});