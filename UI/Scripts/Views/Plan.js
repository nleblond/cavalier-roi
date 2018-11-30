$(window).on('load', function () {

    //affichage de la modal de contact
    $('li a.contact').on('click', function () {
        $('#Div_Contact').ModalPopUp('open');
    });

});