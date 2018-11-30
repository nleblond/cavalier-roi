$(window).on('load', function () {

    $('.actu').eq(0).on('click', function () {
        $('#Div_Actu .titre').removeClass('alone');
        $('#Div_Actu .titre span').html('SORTIE DU NOUVEAU SITE');
        $('#Div_Actu .texte span').html('Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum');
        $('#Div_Actu img.full').attr('src', '../Content/Images/Actu_Bandeau.jpg').show();
        $('#Div_Actu img.logo').attr('src', '../Content/Images/Actu_Logo.jpeg').show();
        $('#Div_Actu img.photo').attr('src', '../Content/Images/Map.jpg').show();
        $('#Div_Actu').ModalPopUp('open');
    });

    $('.actu').eq(1).on('click', function () {
        $('#Div_Actu .titre').removeClass('alone');
        $('#Div_Actu .titre span').html('INTERVIEW : KASPAROV');
        $('#Div_Actu .texte span').html('Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum');
        $('#Div_Actu img.full').attr('src', '../Content/Images/Actu_Kasparov_Bandeau.jpg').show();
        $('#Div_Actu img.logo').hide();
        $('#Div_Actu img.photo').attr('src', '../Content/Images/2.jfif').show();
        $('#Div_Actu').ModalPopUp('open');
    });

    $('.actu').eq(2).on('click', function () {
        $('#Div_Actu .titre').addClass('alone');
        $('#Div_Actu .titre span').html('LES RELATIONS ENTRE ECHECS ET JEUX VIDEOS');
        $('#Div_Actu .texte span').html('Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum \
                Lorem ipsum Lorem ipsum Lorem ipsum');
        $('#Div_Actu img.full').hide();
        $('#Div_Actu img.logo').hide();
        $('#Div_Actu img.photo').attr('src', '../Content/Images/4.jpg').show();
        $('#Div_Actu').ModalPopUp('open');
    });

});