var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

//variables paypal
var _Total = '';
var _Description = 'Paiement pour réservation';
var _Note = "Pour plus d'informations sur ce paiement, n'hésitez pas à contacter l'École du cavalier roi à paypal@cavalier-roi.fr";
var _Item = '';
var _Price = '';
var _Reservations = '';

$(window).on('load', function () {

    //calendrier
    $('#Div_CalendrierParEvenement').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_CalendrierParEvenement .fermer').on('click', function () {
        CloseCalendrierParEvenement();
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



function OpenCalendrierParEvenement(_EvenementId, _EvenementLibelle, _EleveId, _Prix, _DtDebut, _DtFin) {

    //variables paypal
    this._Total = _Prix.toString().replace(',', '.');
    this._Price = _Prix.toString().replace(',', '.');
    this._Item = _EvenementLibelle;
    this._Reservations = 'du ' + _DtDebut + ' au ' + _DtFin;

    ClearCalendrierParEvenement();

    $('#Div_CalendrierParEvenement .titre').html(_EvenementLibelle);

    $('#Div_CalendrierParEvenement #Hidden_EvenementId').val(_EvenementId);
    $('#Div_CalendrierParEvenement #Hidden_EvenementLibelle').val(_EvenementLibelle);
    $('#Div_CalendrierParEvenement #Hidden_EleveId').val(_EleveId);
    $('#Div_CalendrierParEvenement #Hidden_Prix').val(_Prix);

    if ((_Prix.toString() == '') || (_Prix == null)) { //participation gratuite + toutes les réservations

        AddParticipationParEvenement();
        AddAllReservationsParEvenement();

        $('#Div_CalendrierParEvenement .paiement').hide();
        $('#Div_CalendrierParEvenement .confirmation').show();
        $('#Div_CalendrierParEvenement .confirmation .confirmation3').show();

    }
    else { //participation payante + toutes les réservations
        $('#Div_CalendrierParEvenement .paiement').show();
        $('#Div_CalendrierParEvenement .confirmation').hide();
    }

    $('#Div_CalendrierParEvenement').ModalPopUp('open');

    //accordeon des paiements
    var params = {
        'load': 0,
        'open': 1,
        'close': 0
    };
    $('#Div_CalendrierParEvenement .paiement .accordeon').Accordeon(params);

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









function AddParticipationParEvenement(_PaymentId) {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParEvenement #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParEvenement #Hidden_EleveId').val();
    _Participation.PaymentId = (_PaymentId == undefined || _PaymentId == null ? '' : _PaymentId);

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

function AddAllReservationsParEvenement(_PaymentId) {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParEvenement #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParEvenement #Hidden_EleveId').val();
    _Participation.PaymentId = (_PaymentId == undefined || _PaymentId == null ? '' : _PaymentId);

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













paypal.Button.render({

    env: "sandbox", // sandbox | production

    //lenikopirate@gmail.com
    client: {
        sandbox: "AQTHpzCaxK8eC7QzC7nJC44a78S40anHoyzopm6OceNuoPog21uoyWYfUlFTlk_5m71kz-4p1D4WippM",
        production: "Ad8wWcW6tQWVhQTQMSORbuN-p0Zv7NT78-Fqrw3xDb45zVjKl87A4iHDYhUwAd_drfuRmo5WaqbLfyL4"
    },

    style: {
        label: 'pay',
        tagline: false,
        fundingicons: true
    },

    // Show the buyer a 'Pay Now' button in the checkout flow
    commit: true,

    // payment() is called when the button is clicked
    payment: function (data, actions) {

        // Make a call to the REST api to create the payment
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        "amount": {
                            "total": _Total,
                            "currency": "EUR"
                        },
                        "description": _Description,
                        "item_list": {
                            "items": [
                                {
                                    "name": _Item,
                                    "description": _Reservations,
                                    "quantity": "1",
                                    "price": _Price,
                                    "currency": "EUR"
                                }
                            ]
                        }
                    }
                ],
                "note_to_payer": _Note
            },
            experience: {
                input_fields: {
                    no_shipping: 1
                }
            }
        });
    },

    onAuthorize: function (data, actions) {
        return actions.payment.execute().then(function () {
            CallBackPayPalOK(data.paymentID);
        });
    },

    onCancel: function (data, actions) { },

    onError: function (err) { CallBackPayPalKO(err); }

}, '#paypal-button-container');


function CallBackPayPalOK(_PaymentId) {

    AddParticipationParEvenement(_PaymentId);
    AddAllReservationsParEvenement(_PaymentId);

    $('#Div_CalendrierParEvenement .paiement').hide();
    $('#Div_CalendrierParEvenement .confirmation').show();
    $('#Div_CalendrierParEvenement .confirmation .confirmation2').show();

    $('#Div_CalendrierParEvenement .fermer').show();
}


function CallBackPayPalKO(_Error) {

    AddParticipationParEvenement('KO');
    AddAllReservationsParEvenement('KO');

    $('#Div_CalendrierParEvenement .paiement').hide();
    $('#Div_CalendrierParEvenement .confirmation').show();
    $('#Div_CalendrierParEvenement .confirmation .confirmation4').show();

    $('#Div_CalendrierParEvenement .fermer').show();
}