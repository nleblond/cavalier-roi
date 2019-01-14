var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

$(window).on('load', function () {

    $('.menu .moncompte').addClass('select');


    //date de naissance
    $('.infos .naissance').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        yearRange: '-100:+0'
    });



    //informations (modifier)
    $('.infos .valider').on('click', function () {
        UpdEleve();
        return false;
    });

    //cours
    $('.cours .formule').each(function () {

        var _Formule = $(this);

        //créditer
        _Formule.find('.actions span.crediter').on('click', function () {
            var _ParticipationId = _Formule.find('.actions input[type="hidden"]').val();
            var _ParticipationQuantiteObject = _Formule.find('.quantite');
            var _ParticipationReserverObject = _Formule.find('input[type="button"].reserver');
            UpdParticipation(_ParticipationId, _ParticipationQuantiteObject, _ParticipationReserverObject);
            return false;
        });

        //supprimer
        _Formule.find('.actions span.supprimer').on('click', function () {
            var _ParticipationId = $(this).parent().find('input[type=hidden]').val();
            var _ParticipationObjectToDelete = _Formule;
            DelParticipation(_ParticipationId, _ParticipationObjectToDelete);
            return false;
        });

        //réserver
        _Formule.find('.actions input.reserver').on('click', function () {

            var _Connected = CheckConnectedEleve();
            if (_Connected == true) {
                var _EvenementId = $(this).data('evenementid');
                var _EvenementLibelle = $(this).data('evenementlibelle');
                var _EleveId = $(this).data('eleveid');
                var _Quantite = $(this).data('quantite');
                var _Jour = $(this).data('jour');
                var _Prix = $(this).data('prix');

                OpenCalendrierParHeure(_EvenementId, _EvenementLibelle, _EleveId, _Quantite, _Jour, _Prix);
            }
            else {
                OpenConnexion();
            }

            return false;
        });

        //supprimer une réservation
        _Formule.find('.dates span.supprimer').on('click', function () {
            var _ReservationId = $(this).parent().find('input[type=hidden]').val();
            var _ReservationObjectToDelete = $(this).parents('.reservation');
            var _ParticipationQuantiteObjectToUpdate = $(this).parents('.formule').find('.quantite');
            DelReservation(_ReservationId, _ReservationObjectToDelete, _ParticipationQuantiteObjectToUpdate);
            return false;
        });

    });

    //stages
    $('.stages .formule').each(function () {

        var _Formule = $(this);

        //supprimer
        _Formule.find('.actions span.supprimer').on('click', function () {
            var _ParticipationId = $(this).parent().find('input[type=hidden]').val();
            var _ParticipationObjectToDelete = _Formule;
            DelParticipation(_ParticipationId, _ParticipationObjectToDelete);
            return false;
        });

    });

    //tournois
    $('.tournois .formule').each(function () {

        var _Formule = $(this);

        //supprimer
        _Formule.find('.actions span.supprimer').on('click', function () {
            var _ParticipationId = $(this).parent().find('input[type=hidden]').val();
            var _ParticipationObjectToDelete = _Formule;
            DelParticipation(_ParticipationId, _ParticipationObjectToDelete);
            return false;
        });

    });
    

});


function UpdEleve() {

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if ($('.infos .nom').val() == '') {
        _AlertMessage = 'Merci de saisir un nom !';
        _AlertObject = $('.nom');
        _Valid = false;
    }
    else if ($('.infos .prenom').val() == '') {
        _AlertMessage = 'Merci de saisir un prénom !';
        _AlertObject = $('.infos .prenom');
        _Valid = false;
    }
    else if (($('.infos .email').val() == '') || (!isEmail($('.infos .email').val()))) {
        _AlertMessage = 'Merci de saisir un email/identifiant valide !';
        _AlertObject = $('.infos .email');
        _Valid = false;
    }
    else if ($('.infos .password').val() == '') {
        _AlertMessage = 'Merci de saisir un mot de passe !';
        _AlertObject = $('.infos .password');
        _Valid = false;
    }

    if (_Valid) {

        var _Params = {};
        _Params.Id = $('.infos .id').val();
        _Params.Nom = $('.infos .nom').val();
        _Params.Prenom = $('.infos .prenom').val();
        _Params.Email = $('.infos .email').val();
        _Params.Password = $('.infos .password').val();
        _Params.DtNaissance = $('.infos .naissance').val();
        _Params.Sexe = $('.infos .sexe').val();
        _Params.Club = $('.infos .club').val();
        _Params.Photo = $('.infos .photo').val();
        _Params.Fixe = $('.infos .fixe').val();
        _Params.Portable = $('.infos .portable').val();
        _Params.Commentaire = $('.infos .commentaire').val();
        _Params.License = $('.infos .license').val();
        _Params.Classement = $('.infos .classement').val();
        _Params.Suivi = $('.infos .suivi').val();

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





function UpdParticipation(_Id, _QuantiteObject, _ReserverObject) {

    var _AlertMessage;
    var _Valid = true;
    var _Quantite = _QuantiteObject.val();

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
                alert('La quantité disponible a bien été modifiée !');
                _ReserverObject.data('quantite', _Quantite);
                if (parseInt(_Quantite) > 0) {
                    _ReserverObject.show();
                }
                else {
                    _ReserverObject.hide();
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
        _QuantiteObject.focus();
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
