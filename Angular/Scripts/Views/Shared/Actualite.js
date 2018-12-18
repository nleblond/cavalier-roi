$(window).on('load', function () {

    $('#Div_Actu').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });


    $('#Div_Actu .fermer').on('click', function () {
        $('#Div_Actu').ModalPopUp('close');
    });


    //initilisation des actualités de la page pour les affichier dans la modal
    $('.actu').each(function () {
        $(this).on('click', function () {

            var _Id = $(this).find('.info_id').html();
            var _Titre = $(this).find('.info_titre').html();
            var _Texte = $(this).find('.info_texte').html();
            var _DtDebut = $(this).find('.info_publication').html();
            var _DtCreation = $(this).find('.info_modification').html();
            var _DtModification = $(this).find('.info_creation').html();
            var _Logo = $(this).find('.info_logo').html();
            var _Full = $(this).find('.info_full').html();
            var _Horizontale = $(this).find('.info_horizontale').html();
            var _Script = $(this).find('.info_script').html();


            $('#Div_Actu .titre').removeClass('alone');

            $('#Div_Actu .titre span').html(_Titre);
            $('#Div_Actu .texte span').html(_Texte);

            var _Dates = _DtCreation;
            if (_DtModification != null && _DtModification != '') { _Dates = _Dates + ' - ' + _DtModification; }
            if (_DtDebut != null && _DtDebut != '') { _Dates = _Dates + ' - ' + _DtDebut; }
            $('#Div_Actu .texte label').html(_Dates);

            if (_Logo != null && _Logo != '') {
                $('#Div_Actu img.logo').attr('src', '/Content/Images/Contenus/' + _Id + '/' + _Logo).show();
            }
            else {
                $('#Div_Actu img.logo').attr('src', '').hide();
            }

            if (_Full != null && _Full != '') {
                $('#Div_Actu img.full').attr('src', '/Content/Images/Contenus/' + _Id + '/' + _Full).show();
            }
            else {
                $('#Div_Actu img.full').attr('src', '').hide();
            }

            if (_Horizontale != null && _Horizontale != '') {
                $('#Div_Actu img.horizontale').attr('src', '/Content/Images/Contenus/' + _Id + '/' + _Horizontale).show();
            }
            else {
                $('#Div_Actu img.horizontale').attr('src', '').hide();
                $('#Div_Actu .titre').addClass('alone');
            }

            if (_Script != null && _Script != '') {
                $('#Div_Actu div.script').html(_Script).show();
            }
            else {
                $('#Div_Actu div.script').attr('src', '').hide();
            }

            $('#Div_Actu').ModalPopUp('open');
        });
    });

});