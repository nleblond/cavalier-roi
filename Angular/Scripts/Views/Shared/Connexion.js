var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

$(window).on('load', function () {

    //contact
    $('#Div_Connexion').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_Connexion .fermer').on('click', function () {
        $('#Div_Connexion').ModalPopUp('close');
    });

    //date de naissance
    $('.naissance').datepicker();

    //connexion
    $('.connexion .valider').on('click', function () {
        ConnectEleve();
        return false;
    });

    //inscription
    $('.inscription .valider').on('click', function () {
        AddEleve();
        return false;
    });

    //réinitialisation
    $('.reinitialisation .valider').on('click', function () {
        ReinitEleve();
        return false;
    });

    $('.connexion .email').focus();

});


function ConnectEleve() {

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if (($('.connexion .email').val() == '') || (!isEmail($('.connexion .email').val()))) {
        _AlertMessage = 'Merci de saisir un email/identifiant valide !';
        _AlertObject = $('.connexion .email');
        _Valid = false;
    }
    else if ($('.connexion .password').val() == '') {
        _AlertMessage = 'Merci de saisir un mot de passe !';
        _AlertObject = $('.connexion .password');
        _Valid = false;
    }

    if (_Valid) {

        var _Params = {};
        _Params._Email = $('.connexion .email').val();
        _Params._Password = $('.connexion .password').val();

        $.ajax({
            type: 'POST',
            url: '/ConnectEleve',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data) {
                    document.location.href = document.location.href;
                }
                else {
                    alert('Les identifiants sont incorrects, merci de recommencer !');
                    $('.connexion .email').focus();
                }
            },
            error: function (xhr, textStatus) {
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }
                else if (textStatus == 'error') {
                    alert('Une erreur est survenue : ' + data.textStatus);
                }
            },
            complete: function () { }
        });
    }
    else {
        alert(_AlertMessage);
        _AlertObject.focus();
    }
}



function ReinitEleve() {

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if (($('.reinitialisation .email').val() == '') || (!isEmail($('.reinitialisation .email').val()))) {
        _AlertMessage = 'Merci de saisir un email/identifiant valide !';
        _AlertObject = $('.reinitialisation .email');
        _Valid = false;
    }

    if (_Valid) {

        var _Params = {};
        _Params._Email = $('.reinitialisation .email').val();
        _Params._Password = null;

        $.ajax({
            type: 'POST',
            url: '/ReinitEleve',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data) {
                    alert('La demande a été traitée, merci de consulter votre boite mail !');
                }
                else {
                    alert('La demande n\'a pas pu être traitée, merci de recommencer !');
                    $('.reinitialisation .email').focus();
                }
            },
            error: function (xhr, textStatus) {
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }
                else if (textStatus == 'error') {
                    alert('Une erreur est survenue : ' + data.textStatus);
                }
            },
            complete: function () { }
        });
    }
    else {
        alert(_AlertMessage);
        _AlertObject.focus();
    }
}





function AddEleve() {

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if (($('.inscription .email').val() == '') || (!isEmail($('.inscription .email').val()))) {
        _AlertMessage = 'Merci de saisir un email/identifiant valide !';
        _AlertObject = $('.inscription .email');
        _Valid = false;
    }
    if ($('.inscription .password').val() == '') {
        _AlertMessage = 'Merci de saisir un mot de passe !';
        _AlertObject = $('.inscription .password');
        _Valid = false;
    }
    if ($('.inscription .nom').val() == '') {
        _AlertMessage = 'Merci de saisir un nom !';
        _AlertObject = $('.inscription .nom');
        _Valid = false;
    }
    else if ($('.inscription .prenom').val() == '') {
        _AlertMessage = 'Merci de saisir un prénom !';
        _AlertObject = $('.inscription .prenom');
        _Valid = false;
    }
    else if ($('.inscription .sexe').val() == '') {
        _AlertMessage = 'Merci de sélectionner un sexe!';
        _AlertObject = $('.inscription .sexe');
        _Valid = false;
    }
    else if ($('.inscription .naissance').val() == '') {
        _AlertMessage = 'Merci de sélectionner une date de naissance !';
        _AlertObject = $('.inscription .naissance');
        _Valid = false;
    }
    else if (($('.inscription .fixe').val() == '') && ($('.inscription .portable').val() == '')) {
        _AlertMessage = 'Merci de saisir un téléphone fixe ou portable !';
        _AlertObject = $('.inscription .fixe');
        _Valid = false;
    }

    if (_Valid) {

        var _Params = {};
        _Params.Nom = $('.inscription .nom').val();
        _Params.Prenom = $('.inscription .prenom').val();
        _Params.Email = $('.inscription .email').val();
        _Params.Password = $('.inscription .password').val();
        _Params.DtNaissance = $('.inscription .naissance').val();
        _Params.Sexe = $('.inscription .sexe').val();
        _Params.Club = $('.inscription .club').val();
        _Params.Photo = null; //$('.inscription .photo').val();
        _Params.Fixe = $('.inscription .fixe').val();
        _Params.Portable = $('.inscription .portable').val();
        _Params.Commentaire = $('.inscription .commentaire').val();
        _Params.License = $('.inscription .license').val();
        _Params.Classement = $('.inscription .classement').val();

        $.ajax({
            type: 'POST',
            url: _WsUrl + 'Eleves/AddEleve',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data) {
                    alert('La demande a été traitée, merci de consulter votre boite mail !');
                }
                else {
                    alert('La demande n\'a pas pu être traitée, merci de recommencer !');
                    $('.inscription .email').focus();
                }
            },
            error: function (xhr, textStatus) {
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }
                else if (textStatus == 'error') {
                    alert('Une erreur est survenue : ' + data.textStatus);
                }
            },
            complete: function () { }
        });
    }
    else {
        alert(_AlertMessage);
        _AlertObject.focus();
    }
}
