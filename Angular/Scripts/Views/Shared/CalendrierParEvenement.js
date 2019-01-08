var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

$(window).on('load', function () {

    //calendrier
    $('#Div_CalendrierParEvenement').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_CalendrierParEvenement .fermer').on('click', function () {
        CloseCalendrierParEvenement();
        return false;
    });

    //paiement par psp
    $('#Div_CalendrierParEvenement input[type="button"].psp').on('click', function () {
        alert('paiement paypal');
        AddParticipationParEvenement();
        AddAllReservationsParEvenement();

        $('#Div_CalendrierParEvenement .paiement').hide();
        $('#Div_CalendrierParEvenement .confirmation').show();
        $('#Div_CalendrierParEvenement .confirmation .confirmation2').show();

        return false;
    });

    //autre paiement
    $('#Div_CalendrierParEvenement input[type="button"].autre').on('click', function () {
        AddParticipationParEvenement();
        AddAllReservationsParEvenement();

        $('#Div_CalendrierParEvenement .paiement').hide();
        $('#Div_CalendrierParEvenement .confirmation').show();
        $('#Div_CalendrierParEvenement .confirmation .confirmation1').show();

        return false;
    });

});



function OpenCalendrierParEvenement(_EvenementId, _EvenementLibelle, _EleveId, _Prix) {

    ClearCalendrierParEvenement();

    $('#Div_CalendrierParEvenement .titre').html(_EvenementLibelle);

    $('#Div_CalendrierParEvenement #Hidden_EvenementId').val(_EvenementId);
    $('#Div_CalendrierParEvenement #Hidden_EvenementLibelle').val(_EvenementLibelle);
    $('#Div_CalendrierParEvenement #Hidden_EleveId').val(_EleveId);
    $('#Div_CalendrierParEvenement #Hidden_Prix').val(_Prix);

    if ((_Prix.toString() == '') || (_Prix == null)) { //participation gratuite + toutes les réservations

        AddParticipation();
        AddAllReservations();

        $('#Div_CalendrierParEvenement .confirmation').show();
        $('#Div_CalendrierParEvenement .confirmation .confirmation3').show();

    }
    else { //participation payante + toutes les réservations

        $('#Div_CalendrierParEvenement .paiement').show();

    }
   
    $('#Div_CalendrierParEvenement').ModalPopUp('open');

}



function ClearCalendrierParEvenement() {
    $('#Div_CalendrierParEvenement .titre').html('');

    $('#Div_CalendrierParEvenement #Hidden_EvenementId').val('');
    $('#Div_CalendrierParEvenement #Hidden_EvenementLibelle').val('');
    $('#Div_CalendrierParEvenement #Hidden_EleveId').val('');
    $('#Div_CalendrierParEvenement #Hidden_Prix').val('');

    $('#Div_CalendrierParEvenement .paiement').hide();
    $('#Div_CalendrierParEvenement .confirmation').hide();
    $('#Div_CalendrierParEvenement .confirmation .confirmation1').hide();
    $('#Div_CalendrierParEvenement .confirmation .confirmation2').hide();
    $('#Div_CalendrierParEvenement .confirmation .confirmation3').hide();
    $('#Div_CalendrierParEvenement .confirmation .confirmation4').hide();

}


function CloseCalendrierParEvenement() {
    ClearCalendrierParEvenement();
    $('#Div_CalendrierParEvenement').ModalPopUp('close');
}









function AddParticipationParEvenement() {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParEvenement #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParEvenement #Hidden_EleveId').val();

    $.ajax({
        type: 'POST',
        url: _WsUrl + 'Eleves/AddParticipation',
        headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
        dataType: 'json',
        data: JSON.stringify(_Participation),
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) { },
        success: function (data) {
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

function AddAllReservationsParEvenement() {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParEvenement #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParEvenement #Hidden_EleveId').val();

    $.ajax({
        type: 'POST',
        url: _WsUrl + 'Eleves/AddAllReservations',
        headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
        dataType: 'json',
        data: JSON.stringify(_Participation),
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) { },
        success: function (data) {
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
