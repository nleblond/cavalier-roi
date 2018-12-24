var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

$(window).on('load', function () {

    $('.menu .moncompte').addClass('select');

    //créditer
    $('.cours .formule').each(function () {
        var _Formule = $(this);
        $(this).find('span.crediter').on('click', function () {
            UpdParticipation(_Formule.find('.id').val(), _Formule.find('.quantite').val(), _Formule.find('.quantite'));
            return false;
        })
    });


    //valider (modifier)
    $('.infos .valider').on('click', function () {
        UpdEleve();
        return false;
    });


    //date de naissance
    $('.naissance').datepicker();


    //suppression des participations
    $('.actions span.supprimer').each(function () {
        $(this).on('click', function () {
            var _ParticipationId = $(this).parent().find('input[type=hidden]').val();
            var _ParticipationObject = $(this).parents('.formule');
            DelParticipation(_ParticipationId, _ParticipationObject);
            return false;
        });
    });


    //suppression des réservations
    $('.dates span.supprimer').each(function () {
        $(this).on('click', function () {
            var _ReservationId = $(this).parent().find('input[type=hidden]').val();
            var _ReservationObject = $(this).parents('.reservation');
            var _ParticipationQuantiteObject = $(this).parents('.formule').find('.quantite');
            DelReservation(_ReservationId, _ReservationObject, _ParticipationQuantiteObject);
            return false;
        });
    });

});


function UpdEleve() {

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if ($('.nom').val() == '') {
        _AlertMessage = 'Merci de saisir un nom !';
        _AlertObject = $('.nom');
        _Valid = false;
    }
    else if ($('.prenom').val() == '') {
        _AlertMessage = 'Merci de saisir un prénom !';
        _AlertObject = $('.prenom');
        _Valid = false;
    }
    else if (($('.email').val() == '') || (!isEmail($('.email').val()))) {
        _AlertMessage = 'Merci de saisir un email/identifiant valide !';
        _AlertObject = $('.email');
        _Valid = false;
    }
    else if ($('.password').val() == '') {
        _AlertMessage = 'Merci de saisir un mot de passe !';
        _AlertObject = $('.password');
        _Valid = false;
    }

    if (_Valid) {

        var _Params = {};
        _Params.Id = $('.id').val();
        _Params.Nom = $('.nom').val();
        _Params.Prenom = $('.prenom').val();
        _Params.Email = $('.email').val();
        _Params.Password = $('.password').val();
        _Params.DtNaissance = $('.naissance').val();
        _Params.Sexe = $('.sexe').val();
        _Params.Club = $('.club').val();
        _Params.Photo = $('.photo').val();
        _Params.Fixe = $('.fixe').val();
        _Params.Portable = $('.portable').val();
        _Params.Commentaire = $('.commentaire').val();
        _Params.License = $('.license').val();
        _Params.Classement = $('.classement').val();
        _Params.Suivi = $('.suivi').val();

        $.ajax({
            type: 'POST',
            url: _WsUrl + 'Eleves/UpdEleve',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                alert('Les modifications ont bien été effectuées !')
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





function UpdParticipation(_Id, _Quantite, _AlertObject) {

    var _AlertMessage;
    var _Valid = true;
    if ((_Quantite == '') || (!isInteger(_Quantite))) {
        _AlertMessage = 'Merci de saisir une quantité disponible valide !';
        _Valid = false;
    }
    if (_Valid) {

        var _Params = {};
        _Params.Id = _Id;
        _Params.Quantite = _Quantite;

        $.ajax({
            type: 'POST',
            url: _WsUrl + 'Eleves/UpdParticipation',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                alert('La quantité disponible a bien été modifiée !')
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







function DelParticipation(_Id, _ParticipationObject, _ParticipationQuantiteObject) {

    if (confirm('Voulez-vous vraiment supprimer cette participation ?')) {

        var _Params = {};
        _Params.Id = _Id;

        $.ajax({
            type: 'POST',
            url: _WsUrl + 'Eleves/DelParticipation',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                _ParticipationObject.remove();
                alert('La participation a bien été supprimée !')
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





function DelReservation(_Id, _ReservationObject, _ParticipationQuantiteObject) {

    if (confirm('Voulez-vous vraiment supprimer cette reservation ?')) {

        var _Params = {};
        _Params.Id = _Id;

        $.ajax({
            type: 'POST',
            url: _WsUrl + 'Eleves/DelReservation',
            headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                _ReservationObject.remove();
                _ParticipationQuantiteObject.val(parseInt(_ParticipationQuantiteObject.val()) + 1);
                alert('La réservation a bien été supprimée !')
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
