var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

var _Jours = new Array(7);
_Jours[0] = "Dimanche";
_Jours[1] = "Lundi";
_Jours[2] = "Mardi";
_Jours[3] = "Mercredi";
_Jours[4] = "Jeudi";
_Jours[5] = "Vendredi";
_Jours[6] = "Samedi";

//variables paypal
var _Total = '';
var _Description = 'Paiement pour réservation';
var _Note = "Pour plus d'informations sur ce paiement, n'hésitez pas à contacter l'École du cavalier roi à paypal@cavalier-roi.fr";
var _Item = '';
var _Price = '';
var _Reservations = '';

$(window).on('load', function () {

    //calendrier
    $('#Div_CalendrierParHeure').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_CalendrierParHeure .fermer').on('click', function () {
        CloseCalendrierParHeure();
        return false;
    });

    //validation des réservations
    $('#Div_CalendrierParHeure .planning .valider').on('click', function () {
        ValidateParticipationAndReservationsParHeure();
        return false;
    });

    //autre paiement
    $('#Div_CalendrierParHeure input[type="button"].autre').on('click', function () {
        AddParticipationParHeure();
        AddReservationsParHeure();

        $('#Div_CalendrierParHeure .planning').hide();
        $('#Div_CalendrierParHeure .paiement').hide();
        $('#Div_CalendrierParHeure .confirmation').show();
        $('#Div_CalendrierParHeure .confirmation .confirmation1').show();

        $('#Div_CalendrierParHeure .fermer').show();

        return false;
    });

    //revenir aux réservations
    $('#Div_CalendrierParHeure input[type="button"].revenir').on('click', function () {
        $('#Div_CalendrierParHeure .planning').show();
        $('#Div_CalendrierParHeure .paiement').hide();
        $('#Div_CalendrierParHeure .confirmation').hide();

        $('#Div_CalendrierParHeure .fermer').show();

        return false;
    });


});



function OpenCalendrierParHeure(_EvenementId, _EvenementLibelle, _EleveId, _Duree, _Jour, _Prix) {

    //variables paypal
    this._Total = _Prix.toString().replace(',', '.');
    this._Price = _Prix.toString().replace(',', '.');
    this._Item = _EvenementLibelle;

    ClearCalendrierParHeure();

    $('#Div_CalendrierParHeure .titre').html(_EvenementLibelle);

    $('#Div_CalendrierParHeure #Hidden_EvenementId').val(_EvenementId);
    $('#Div_CalendrierParHeure #Hidden_EvenementLibelle').val(_EvenementLibelle);
    $('#Div_CalendrierParHeure #Hidden_EleveId').val(_EleveId);
    $('#Div_CalendrierParHeure #Hidden_Duree').val(_Duree);
    $('#Div_CalendrierParHeure #Hidden_Jour').val(_Jour);
    $('#Div_CalendrierParHeure #Hidden_Prix').val(_Prix);

    if ((_Duree.toString() == '') || (_Duree == null)) { //participation seule (prise de contact)

        AddParticipationParHeure();

        $('#Div_CalendrierParHeure .planning').hide();
        $('#Div_CalendrierParHeure .paiement').hide();
        $('#Div_CalendrierParHeure .confirmation').show();
        $('#Div_CalendrierParHeure .confirmation .confirmation3').show();

    }
    else { //participation + réservation

        $('#Div_CalendrierParHeure .planning').show();

        $('#Div_CalendrierParHeure span.duree').html(_Duree).show();
        $('#Div_CalendrierParHeure span.nb').html('0').show();
        $('#Div_CalendrierParHeure .sur').show();

        $('#Div_CalendrierParHeure .heures table').html('');
        var _Row = '<tr><td colspan="2">Aucune réservation</td></tr>';
        $('#Div_CalendrierParHeure .selections table').html(_Row);
        $('#Div_CalendrierParHeure table.dates div').remove();
        $('#Div_CalendrierParHeure table.dates td').append('<div></div>');
        $('#Div_CalendrierParHeure table.dates div').datepicker({
            'defaultDate': _Jour,
            'minDate': 0,
            'onSelect': function () {
                GetPlanningsParHeure($(this).val());
            }
        });

        GetPlanningsParHeure(_Jour);

    }
   
    $('#Div_CalendrierParHeure').ModalPopUp('open');

}



function ClearCalendrierParHeure() {
    $('#Div_CalendrierParHeure .titre').html('');

    $('#Div_CalendrierParHeure #Hidden_EvenementId').val('');
    $('#Div_CalendrierParHeure #Hidden_EvenementLibelle').val('');
    $('#Div_CalendrierParHeure #Hidden_EleveId').val('');
    $('#Div_CalendrierParHeure #Hidden_Duree').val('');
    $('#Div_CalendrierParHeure #Hidden_Prix').val('');
    $('#Div_CalendrierParHeure #Hidden_Jour').val('');

    $('#Div_CalendrierParHeure span.duree').html('0').hide();
    $('#Div_CalendrierParHeure span.nb').html('0').hide();
    $('#Div_CalendrierParHeure .sur').hide();

    $('#Div_CalendrierParHeure .heures table').html('');
    $('#Div_CalendrierParHeure .selections table').html('');

    $('#Div_CalendrierParHeure .planning').hide();
    $('#Div_CalendrierParHeure .paiement').hide();
    $('#Div_CalendrierParHeure .confirmation').hide();
    $('#Div_CalendrierParHeure .confirmation .confirmation1').hide();
    $('#Div_CalendrierParHeure .confirmation .confirmation2').hide();
    $('#Div_CalendrierParHeure .confirmation .confirmation3').hide();
    $('#Div_CalendrierParHeure .confirmation .confirmation4').hide();
    $('#Div_CalendrierParHeure .confirmation .confirmation5').hide();

    $('#Div_CalendrierParHeure .fermer').show();

}


function CloseCalendrierParHeure() {
    ClearCalendrierParHeure();
    $('#Div_CalendrierParHeure').ModalPopUp('close');
}



function GetPlanningsParHeure(_Jour) {

    var _Params = {};
    _Params.EvenementId = $('#Div_CalendrierParHeure #Hidden_EvenementId').val();
    _Params.Jour = _Jour;

    $.ajax({
        type: 'POST',
        url: _WsUrl + 'Evenements/GetPlanningsFront',
        headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
        dataType: 'json',
        data: JSON.stringify(_Params),
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) { },
        success: function (data) {
            CreateTableHeuresParHeure(_Jour, data);
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


function CreateTableHeuresParHeure(_Jour, _Object) {

    $('#Div_CalendrierParHeure .heures table').html('');

    var _JourJS = dateFrToDateJs(_Jour);

    var _Row = '<tr><td colspan="2" class="center"><u>' + (_Jours[new Date(_JourJS).getDay()]).toUpperCase() + ' ' + _Jour + '</u></td></tr>';

    if (_Object.length == 0) {
        _Row += '<tr><td colspan="2" class="center">Aucun créneau</td></tr>';
    }
    else {

        _Row += '<tr> \
                    <td>08H - 09H</td> \
                    <td>';
        if (_Object[0].Creneau0809 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau0809 == '') || (_Object[0].Creneau0809 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau0809\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>09H - 10H</td> \
                    <td>';
        if (_Object[0].Creneau0910 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau0910 == '') || (_Object[0].Creneau0910 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau0910\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>10H - 11H</td> \
                    <td>';
        if (_Object[0].Creneau1011 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1011 == '') || (_Object[0].Creneau1011 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1011\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>11H - 12H</td> \
                    <td>';
        if (_Object[0].Creneau1112 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1112 == '') || (_Object[0].Creneau1112 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1112\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>12H - 13H</td> \
                    <td>';
        if (_Object[0].Creneau1213 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1213 == '') || (_Object[0].Creneau1213 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1213\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>13H - 14H</td> \
                    <td>';
        if (_Object[0].Creneau1314 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1314 == '') || (_Object[0].Creneau1314 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1314\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>14H - 15H</td> \
                    <td>';
        if (_Object[0].Creneau1415 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1415 == '') || (_Object[0].Creneau1415 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1415\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>15H - 16H</td> \
                    <td>';
        if (_Object[0].Creneau1516 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1516 == '') || (_Object[0].Creneau1516 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1516\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>16H - 17H</td> \
                    <td>';
        if (_Object[0].Creneau1617 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1617 == '') || (_Object[0].Creneau1617 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1617\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>17H - 18H</td> \
                    <td>';
        if (_Object[0].Creneau1718 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1718 == '') || (_Object[0].Creneau1718 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1718\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>18H - 19H</td> \
                    <td>';
        if (_Object[0].Creneau1819 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1819 == '') || (_Object[0].Creneau1819 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1819\');" />'; }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>19H - 20H</td> \
                    <td>';
        if (_Object[0].Creneau1920 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1920 == '') || (_Object[0].Creneau1920 == null)) { _Row += 'X'; }
        else { _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParHeure(\'' + _Jour + '\', \'Creneau1920\');" />'; }
        _Row += '   </td> \
                </tr>';
    }

    $('#Div_CalendrierParHeure .heures table').append(_Row);
}


function AddTableSelectionParHeure(_Jour, _Creneau) {

    var _JourJS = dateFrToDateJs(_Jour);

    var _Duree = $('#Div_CalendrierParHeure #Hidden_Duree').val();

    var _Row = '<tr class="selection" id="Tr_' + _Jour.replace('/', '-').replace('/', '-') + _Creneau + '"> \
                <td class="creneau">'
                    + (_Jours[new Date(_JourJS).getDay()]).toUpperCase() + ' ' + _Jour
                    + ' : '
                    + _Creneau.replace('Creneau', '').substring(0, 2) + 'H'
                    + ' - '
                    + _Creneau.replace('Creneau', '').substring(2) + 'H'
                + '</td > \
                <td class="reserver"> \
                    <input type="hidden" class="jour" value="' + _Jour + '" /> \
                    <input type="hidden" class="creneau" value="' + _Creneau + '" /> \
                    <input type="button" title="Supprimer" value="Supprimer" onclick="DelTableSelectionParHeure(\'Tr_' + _Jour.replace('/', '-').replace('/', '-') + _Creneau + '\');" /> \
                </td> \
            </tr>';

    if ($('#Div_CalendrierParHeure .selections table').find('.selection').length == 0) {
        $('#Div_CalendrierParHeure .selections table').html('');
    }

    if ($('#Div_CalendrierParHeure .selections table').find('#Tr_' + _Jour.replace('/', '-').replace('/', '-') + _Creneau).length == 0) {
        if ($('#Div_CalendrierParHeure .selections table .selection').length < parseInt(_Duree)) {
            $('#Div_CalendrierParHeure .selections table').append(_Row);
            $('#Div_CalendrierParHeure span.nb').html(parseInt($('#Div_CalendrierParHeure span.nb').html()) + 1);
        }
    }

}


function DelTableSelectionParHeure(_Id) {
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        $('#' + _Id).remove();
        $('#Div_CalendrierParHeure span.nb').html(parseInt($('#Div_CalendrierParHeure span.nb').html()) - 1);

        if ($('#Div_CalendrierParHeure .selections table').find('.selection').length == 0) {
            var _Row = '<tr><td colspan="2">Aucune réservation</td></tr>';
            $('#Div_CalendrierParHeure .selections table').html(_Row);
        }
    }
}


function ValidateParticipationAndReservationsParHeure() {

    var _Duree = $('#Div_CalendrierParHeure #Hidden_Duree').val();

    //toutes les réservations ne sont pas sélectionnées mais on est dans "mon compte" en train d'utiliser la réserve d'heures
    if ((document.location.href.toLowerCase().indexOf('moncompte') > -1) && ($('#Div_CalendrierParHeure .selections table').find('.selection').length > 0)) {

        if (confirm('Voulez-vous vraiment valider ces réservations ?')) { //confirmation car pas d'étape de paiement
            AddReservationsParHeure();
            $('#Div_CalendrierParHeure .planning').hide();
            $('#Div_CalendrierParHeure .paiement').hide();
            $('#Div_CalendrierParHeure .confirmation').show();
            $('#Div_CalendrierParHeure .confirmation .confirmation4').show();

            setTimeout(function () {
                document.location.href = document.location.href;
            }, 2000);
        }

    }
    //toutes les réservations sont sélectionnées
    else if ((document.location.href.toLowerCase().indexOf('moncompte') < 0) && ($('#Div_CalendrierParHeure .selections table').find('.selection').length == parseInt(_Duree))) {

        //variables paypal
        this._Reservations = '';
        $('#Div_CalendrierParHeure .selections table tr.selection td.creneau').each(function () {
            this._Reservations = this._Reservations + (this._Reservations != '' ? ' / ' + $(this).html() : $(this).html());
        });

        $('#Div_CalendrierParHeure .planning').hide();
        $('#Div_CalendrierParHeure .paiement').show();
        $('#Div_CalendrierParHeure .confirmation').hide();

        $('#Div_CalendrierParHeure .fermer').hide();

        //accordeon des paiements
        var params = {
            'load': 0,
            'open': 1,
            'close': 0
        };
        $('#Div_CalendrierParHeure .paiement .accordeon').Accordeon(params);

    }
    else {

        if ($('#Div_CalendrierParHeure .selections table').find('.selection').length == 0) {
            alert('Merci de sélectionner au moins une réservation !');
        }
        else {
            alert('Merci de sélectionner toutes vos réservations !');
        }
    }
}





function AddParticipationParHeure(_PaymentId) {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParHeure #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParHeure #Hidden_EleveId').val();
    _Participation.PaymentId = _PaymentId;

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

function AddReservationsParHeure(_PaymentId) {

    var _Reservations = [];
    $('#Div_CalendrierParHeure .selections table').find('.selection').each(function () {
        var _Reservation = {};
        _Reservation.Evenement = {};
        _Reservation.Evenement.Id = $('#Div_CalendrierParHeure #Hidden_EvenementId').val();
        _Reservation.Eleve = {};
        _Reservation.Eleve.Id = $('#Div_CalendrierParHeure #Hidden_EleveId').val();
        _Reservation.Jour = $(this).find('input[type=hidden].jour').val();
        _Reservation.Creneau = $(this).find('input[type=hidden].creneau').val();
        _Reservation.PaymentId = _PaymentId;

        _Reservations.push(_Reservation);
    });

    $.ajax({
        type: 'POST',
        url: _WsUrl + 'Eleves/AddReservations',
        headers: { 'APIKey': _APIKey, 'Content-Type': 'application/json' },
        dataType: 'json',
        data: JSON.stringify(_Reservations),
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

    AddParticipationParHeure(_PaymentId);
    AddReservationsParHeure(_PaymentId);

    $('#Div_CalendrierParHeure .paiement').hide();
    $('#Div_CalendrierParHeure .confirmation').show();
    $('#Div_CalendrierParHeure .confirmation .confirmation2').show();

    $('#Div_CalendrierParHeure .fermer').show();
}


function CallBackPayPalKO(_Error) {
    $('#Div_CalendrierParHeure .paiement').hide();
    $('#Div_CalendrierParHeure .confirmation').show();
    $('#Div_CalendrierParHeure .confirmation .confirmation5').show();

    $('#Div_CalendrierParHeure .fermer').show();
}