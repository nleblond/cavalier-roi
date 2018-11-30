$(window).on('load', function () {

    //contact
    $('#Div_Contact').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top' });

    $('#Div_Contact .fermer').on('click', function () {
        $('#Div_Contact').ModalPopUp('close');
    });

});