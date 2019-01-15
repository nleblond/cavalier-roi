var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

var _UrlToRedirect = '';
var _CallBackAction = '';

$(window).on('load', function () {

    //contact
    $('#Div_Connexion').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_Connexion .fermer').on('click', function () {
        $('#Div_Connexion').ModalPopUp('close');
    });

    //date de naissance
    $('#Div_Connexion .inscription .naissance').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        yearRange: '-100:+0'
    });

    //connexion
    $('#Div_Connexion .connexion .valider').on('click', function () {
        ConnectEleve();
        return false;
    });

    //inscription
    $('#Div_Connexion .inscription .valider').on('click', function () {
        AddEleve();
        return false;
    });

    //réinitialisation
    $('#Div_Connexion .reinitialisation .valider').on('click', function () {
        ReinitEleve();
        return false;
    });

});




function OpenConnexion(_UrlToRedirect, _CallBackAction) {

    $('#Div_Connexion').ModalPopUp('open');

    //animations des actions
    var params = {
        'load': 0,
        'open': 1,
        'close': 0
    };
    $('#Div_Connexion .accordeon').Accordeon(params);

    if ((_UrlToRedirect != null) && (_UrlToRedirect != '') && (_UrlToRedirect != undefined)) {
        this._UrlToRedirect = _UrlToRedirect;
    }

    if ((_CallBackAction != null) && (_CallBackAction != null) && (_CallBackAction != undefined)) {
        this._CallBackAction = _CallBackAction;
    }
    
}


function CloseConnexion() {

    this._UrlToRedirect = '';
    this._CallBackAction = '';

    $('#Div_Connexion').ModalPopUp('close');
}




function CheckConnectedEleve() {

    var _Result = false;
    $.ajax({
        type: 'POST',
        url: '/CheckConnectedEleve',
        async: false,
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) { },
        success: function (data) {
            _Result = data;
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
    return _Result;
}



function ConnectEleve() {

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if (isEmail($('.connexion .email').val()) == false) {
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
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            async: false,
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data) {
                    if (_UrlToRedirect != '') {
                        document.location.href = _UrlToRedirect;
                    }
                    else if (_CallBackAction != '') {
                        eval(_CallBackAction);
                    }
                    else {
                        document.location.href = document.location.href;
                    }
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
    if (isEmail($('.reinitialisation .email').val()) == false) {
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
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            async: false,
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data) {
                    alert('Votre demande de réinitialisation de mot de passe a bien été prise en compte, merci de consulter votre boite mail !');
                    $('#Div_Connexion .header').eq(0).click();
                }
                else {
                    alert('Votre demande de réinitialisation de mot de passe n\'a pas pu être prise en compte, merci de recommencer !');
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
    if (isEmail($('.inscription .email').val()) == false) {
        _AlertMessage = 'Merci de saisir un email/identifiant valide !';
        _AlertObject = $('.inscription .email');
        _Valid = false;
    }
    else if ($('.inscription .password').val() == '') {
        _AlertMessage = 'Merci de saisir un mot de passe !';
        _AlertObject = $('.inscription .password');
        _Valid = false;
    }
    else if ($('.inscription .nom').val() == '') {
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
        _Params._Nom = $('.inscription .nom').val();
        _Params._Prenom = $('.inscription .prenom').val();
        _Params._Email = $('.inscription .email').val();
        _Params._Password = $('.inscription .password').val();
        _Params._DtNaissance = $('.inscription .naissance').val();
        _Params._Sexe = $('.inscription .sexe').val();
        _Params._Club = $('.inscription .club').val();
        _Params._Photo = null; //$('.inscription .photo').val();
        _Params._Fixe = $('.inscription .fixe').val();
        _Params._Portable = $('.inscription .portable').val();
        _Params._Commentaire = $('.inscription .commentaire').val();
        _Params._License = $('.inscription .license').val();
        _Params._Classement = $('.inscription .classement').val();

        $.ajax({
            type: 'POST',
            url: '/AddEleve',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            async: false,
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data) {
                    alert('Votre inscription a bien été prise en compte, merci de consulter votre boite mail !');
                    $('#Div_Connexion .header').eq(0).click();
                }
                else {
                    alert('Votre inscription n\'a pas pu être prise en compte, merci de recommencer !');
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
