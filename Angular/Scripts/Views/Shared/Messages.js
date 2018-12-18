$(window).on('load', function () {

    //message
    $('#Div_Message').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'center' });

    $('#Div_Message .fermer').on('click', function () {
        $('#Div_Message').ModalPopUp('close');
    });

});