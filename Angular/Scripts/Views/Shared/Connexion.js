$(window).on('load', function () {

    //contact
    $('#Div_Connexion').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_Connexion .fermer').on('click', function () {
        $('#Div_Connexion').ModalPopUp('close');
    });


});