﻿var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';

var _Jours = new Array(7);
_Jours[0] = "Dimanche";
_Jours[1] = "Lundi";
_Jours[2] = "Mardi";
_Jours[3] = "Mercredi";
_Jours[4] = "Jeudi";
_Jours[5] = "Vendredi";
_Jours[6] = "Samedi";


$(window).on('load', function () {

    //calendrier
    $('#Div_CalendrierParDemiJournee').ModalPopUp({ 'command': 'init', 'mode': 'automatic', 'modalOpenMethod': 'show', 'modalCloseMethod': 'hide', 'position': 'top', 'modalMarginTop': '0' });

    $('#Div_CalendrierParDemiJournee .fermer').on('click', function () {
        CloseCalendrierParDemiJournee();
        return false;
    });


    //validation des réservations
    $('#Div_CalendrierParDemiJournee .planning .valider').on('click', function () {
        ValidateParticipationAndReservationsParDemiJournee();
        return false;
    });

    //paiement par psp
    $('#Div_CalendrierParDemiJournee input[type="button"].psp').on('click', function () {
        alert('paiement paypal');
        AddParticipationParDemiJournee();
        if (($('#Div_CalendrierParDemiJournee #Hidden_EvenementParentId').val() != null) && ($('#Div_CalendrierParDemiJournee #Hidden_EvenementParentId').val() != '')) {
            AddReservationsParDemiJournee();
            $('#Div_CalendrierParDemiJournee .confirmation .confirmation2').show();
        }
        else {
            AddAllReservationsParDemiJournee();
            $('#Div_CalendrierParDemiJournee .confirmation .confirmation6').show();
        }

        $('#Div_CalendrierParDemiJournee .planning').hide();
        $('#Div_CalendrierParDemiJournee .paiement').hide();
        $('#Div_CalendrierParDemiJournee .confirmation').show();

        $('#Div_CalendrierParDemiJournee .fermer').show();

        return false;
    });

    //autre paiement
    $('#Div_CalendrierParDemiJournee input[type="button"].autre').on('click', function () {
        AddParticipationParDemiJournee();
        if (($('#Div_CalendrierParDemiJournee #Hidden_EvenementParentId').val() != null) && ($('#Div_CalendrierParDemiJournee #Hidden_EvenementParentId').val() != '')) {
            AddReservationsParDemiJournee();
            $('#Div_CalendrierParDemiJournee .confirmation .confirmation1').show();
        }
        else {
            AddAllReservationsParDemiJournee();
            $('#Div_CalendrierParDemiJournee .confirmation .confirmation5').show();
        }

        $('#Div_CalendrierParDemiJournee .planning').hide();
        $('#Div_CalendrierParDemiJournee .paiement').hide();
        $('#Div_CalendrierParDemiJournee .confirmation').show();

        $('#Div_CalendrierParDemiJournee .fermer').show();

        return false;
    });

    //revenir aux réservations
    $('#Div_CalendrierParDemiJournee input[type="button"].revenir').on('click', function () {
        $('#Div_CalendrierParDemiJournee .planning').show();
        $('#Div_CalendrierParDemiJournee .paiement').hide();
        $('#Div_CalendrierParDemiJournee .confirmation').hide();

        $('#Div_CalendrierParDemiJournee .fermer').show();

        return false;
    });


});



function OpenCalendrierParDemiJournee(_EvenementId, _EvenementLibelle, _EleveId, _JourMin, _JourMax, _Prix, _Duree, _EvenementParentId) {

    ClearCalendrierParDemiJournee();

    $('#Div_CalendrierParDemiJournee .titre').html(_EvenementLibelle);

    $('#Div_CalendrierParDemiJournee #Hidden_EvenementId').val(_EvenementId);
    $('#Div_CalendrierParDemiJournee #Hidden_EvenementLibelle').val(_EvenementLibelle);
    $('#Div_CalendrierParDemiJournee #Hidden_EleveId').val(_EleveId);
    $('#Div_CalendrierParDemiJournee #Hidden_Duree').val(_Duree);
    $('#Div_CalendrierParDemiJournee #Hidden_JourMin').val(_JourMin);
    $('#Div_CalendrierParDemiJournee #Hidden_JourMin').val(_JourMax);
    $('#Div_CalendrierParDemiJournee #Hidden_Prix').val(_Prix);
    $('#Div_CalendrierParDemiJournee #Hidden_EvenementParentId').val(_EvenementParentId);

    if ((_EvenementParentId.toString() == '') || (_EvenementParentId == null)) { //formule complete (toutes les réservations)
        if ((_Prix == '') || (_Prix == null)) { //participation gratuite
            AddParticipationParDemiJournee();
            AddAllReservationsParDemiJournee();
            $('#Div_CalendrierParDemiJournee .confirmation').show();
            $('#Div_CalendrierParDemiJournee .confirmation .confirmation4').show();

        }
        else {
            $('#Div_CalendrierParDemiJournee .paiement').show();
        }
    }
    else { //formule partielle

        $('#Div_CalendrierParDemiJournee .planning').show();

        $('#Div_CalendrierParDemiJournee span.duree').html(_Duree).show();
        $('#Div_CalendrierParDemiJournee span.nb').html('0').show();
        $('#Div_CalendrierParDemiJournee .sur').show();

        $('#Div_CalendrierParDemiJournee .heures table').html('');
        var _Row = '<tr><td colspan="2">Aucune réservation</td></tr>';
        $('#Div_CalendrierParDemiJournee .selections table').html(_Row);
        $('#Div_CalendrierParDemiJournee table.dates div').remove();
        $('#Div_CalendrierParDemiJournee table.dates td').append('<div></div>');
        $('#Div_CalendrierParDemiJournee table.dates div').datepicker({
            'defaultDate': _JourMin,
            'minDate': 0,
            'onSelect': function () {
                GetPlanningsParDemiJournee($(this).val());
            }
        });

        GetPlanningsParDemiJournee(_JourMin);

    }
    
    $('#Div_CalendrierParDemiJournee').ModalPopUp('open');

}



function ClearCalendrierParDemiJournee() {
    $('#Div_CalendrierParDemiJournee .titre').html('');

    $('#Div_CalendrierParDemiJournee #Hidden_EvenementId').val('');
    $('#Div_CalendrierParDemiJournee #Hidden_EvenementLibelle').val('');
    $('#Div_CalendrierParDemiJournee #Hidden_EleveId').val('');
    $('#Div_CalendrierParDemiJournee #Hidden_Duree').val('');
    $('#Div_CalendrierParDemiJournee #Hidden_Prix').val('');
    $('#Div_CalendrierParDemiJournee #Hidden_JourMin').val('');
    $('#Div_CalendrierParDemiJournee #Hidden_JourMax').val('');

    $('#Div_CalendrierParDemiJournee span.duree').html('0').hide();
    $('#Div_CalendrierParDemiJournee span.nb').html('0').hide();
    $('#Div_CalendrierParDemiJournee .sur').hide();

    $('#Div_CalendrierParDemiJournee .heures table').html('');
    $('#Div_CalendrierParDemiJournee .selections table').html('');

    $('#Div_CalendrierParDemiJournee .planning').hide();
    $('#Div_CalendrierParDemiJournee .paiement').hide();
    $('#Div_CalendrierParDemiJournee .confirmation').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation1').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation2').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation3').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation4').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation5').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation6').hide();
    $('#Div_CalendrierParDemiJournee .confirmation .confirmation7').hide();

    $('#Div_CalendrierParDemiJournee .fermer').show();

}





function CloseCalendrierParDemiJournee() {
    ClearCalendrierParDemiJournee();
    $('#Div_CalendrierParDemiJournee').ModalPopUp('close');
}

function GetPlanningsParDemiJournee(_Jour) {

    var _Params = {};
    _Params.EvenementId = $('#Div_CalendrierParDemiJournee #Hidden_EvenementId').val();
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
            CreateTableHeuresParDemiJournee(_Jour, data);
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


function CreateTableHeuresParDemiJournee(_Jour, _Object) {

    $('#Div_CalendrierParDemiJournee .heures table').html('');

    var _JourJS = dateFrToDateJs(_Jour);

    var _Row = '<tr><td colspan="2" class="center"><u>' + (_Jours[new Date(_JourJS).getDay()]).toUpperCase() + ' ' + _Jour + '</u></td></tr>';

    if (_Object.length == 0) {
        _Row += '<tr><td colspan="2" class="center">Aucun créneau</td></tr>';
    }
    else {

        var _Index = 0;
        _Row += '<tr> \
                    <td>08H - 09H</td> \
                    <td>';
        if (_Object[0].Creneau0809 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau0809 == '') || (_Object[0].Creneau0809 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau0809\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>09H - 10H</td> \
                    <td>';
        if (_Object[0].Creneau0910 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau0910 == '') || (_Object[0].Creneau0910 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau0910\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>10H - 11H</td> \
                    <td>';
        if (_Object[0].Creneau1011 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1011 == '') || (_Object[0].Creneau1011 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1011\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>11H - 12H</td> \
                    <td>';
        if (_Object[0].Creneau1112 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1112 == '') || (_Object[0].Creneau1112 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1112\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>12H - 13H</td> \
                    <td>';
        if (_Object[0].Creneau1213 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1213 == '') || (_Object[0].Creneau1213 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1213\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>13H - 14H</td> \
                    <td>';
        if (_Object[0].Creneau1314 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1314 == '') || (_Object[0].Creneau1314 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1314\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>14H - 15H</td> \
                    <td>';
        if (_Object[0].Creneau1415 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1415 == '') || (_Object[0].Creneau1415 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1415\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>15H - 16H</td> \
                    <td>';
        if (_Object[0].Creneau1516 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1516 == '') || (_Object[0].Creneau1516 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1516\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>16H - 17H</td> \
                    <td>';
        if (_Object[0].Creneau1617 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1617 == '') || (_Object[0].Creneau1617 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1617\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>17H - 18H</td> \
                    <td>';
        if (_Object[0].Creneau1718 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1718 == '') || (_Object[0].Creneau1718 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1718\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>18H - 19H</td> \
                    <td>';
        if (_Object[0].Creneau1819 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1819 == '') || (_Object[0].Creneau1819 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1819\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';

        _Row += '<tr> \
                    <td>19H - 20H</td> \
                    <td>';
        if (_Object[0].Creneau1920 == 'F') { _Row += 'COMPLET'; }
        else if ((_Object[0].Creneau1920 == '') || (_Object[0].Creneau1920 == null)) { _Row += 'X'; }
        else {
            _Index += 1;
            if (_Index == 2) {
                _Row += '<input type="button" class="selectionner" title="Sélectionner" value="Sélectionner" onclick="AddTableSelectionParDemiJournee(\'' + _Jour + '\', \'Creneau1920\');" />';
            }
            else if ((_Index == 1) || (_Index == 3)) {
                _Row += '<span style="display: block; background-color: #FECC16;">&nbsp;</span>';
            }
            if (_Index == 3) { _Index = 0; }
        }
        _Row += '   </td> \
                </tr>';
    }

    $('#Div_CalendrierParDemiJournee .heures table').append(_Row);
}


function AddTableSelectionParDemiJournee(_Jour, _Creneau) {

    var _JourJS = dateFrToDateJs(_Jour);

    var _Duree = $('#Div_CalendrierParDemiJournee #Hidden_Duree').val();

    var _HeureMin = '';
    var _HeureMax = '';
    if (_Creneau == 'Creneau0910') { _HeureMin = '08'; _HeureMax = '11'; }
    else if (_Creneau == 'Creneau1011') { _HeureMin = '09'; _HeureMax = '12'; }
    else if (_Creneau == 'Creneau1112') { _HeureMin = '10'; _HeureMax = '13'; }
    else if (_Creneau == 'Creneau1213') { _HeureMin = '11'; _HeureMax = '14'; }
    else if (_Creneau == 'Creneau1314') { _HeureMin = '12'; _HeureMax = '15'; }
    else if (_Creneau == 'Creneau1415') { _HeureMin = '13'; _HeureMax = '16'; }
    else if (_Creneau == 'Creneau1516') { _HeureMin = '14'; _HeureMax = '17'; }
    else if (_Creneau == 'Creneau1617') { _HeureMin = '15'; _HeureMax = '18'; }
    else if (_Creneau == 'Creneau1718') { _HeureMin = '16'; _HeureMax = '19'; }
    else if (_Creneau == 'Creneau1819') { _HeureMin = '17'; _HeureMax = '20'; }
    
    var _Row = '<tr class="selection" id="Tr_' + _Jour.replace('/', '-').replace('/', '-') + _Creneau + '"> \
                <td>'
        + (_Jours[new Date(_JourJS).getDay()]).toUpperCase() + ' ' + _Jour
        + ' : '
        + _HeureMin + 'H'
        + ' - '
        + _HeureMax + 'H'
        + '</td > \
                <td class="reserver"><input type="button" title="Supprimer" value="Supprimer" onclick="DelTableSelectionParDemiJournee(\'Tr_' + _Jour.replace('/', '-').replace('/', '-') + _Creneau + '\');" /></td> \
            </tr>';

    if ($('#Div_CalendrierParDemiJournee .selections table').find('.selection').length == 0) {
        $('#Div_CalendrierParDemiJournee .selections table').html('');
    }

    if ($('#Div_CalendrierParDemiJournee .selections table').find('#Tr_' + _Jour.replace('/', '-').replace('/', '-') + _Creneau).length == 0) {
        if ($('#Div_CalendrierParDemiJournee .selections table .selection').length < parseInt(_Duree)) {
            $('#Div_CalendrierParDemiJournee .selections table').append(_Row);
            $('#Div_CalendrierParDemiJournee span.nb').html(parseInt($('#Div_CalendrierParDemiJournee span.nb').html()) + 1);
        }
    }

}


function DelTableSelectionParDemiJournee(_Id) {
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        $('#' + _Id).remove();
        $('#Div_CalendrierParDemiJournee span.nb').html(parseInt($('#Div_CalendrierParDemiJournee span.nb').html()) - 1);

        if ($('#Div_CalendrierParDemiJournee .selections table').html() == '') {
            var _Row = '<tr><td colspan="2">Aucune réservation</td></tr>';
            $('#Div_CalendrierParDemiJournee .selections table').html(_Row);
        }
    }
}



function ValidateParticipationAndReservationsParDemiJournee() {

    var _Duree = $('#Div_CalendrierParDemiJournee #Hidden_Duree').val();

    //toutes les réservations sont sélectionnées
    if ((document.location.href.toLowerCase().indexOf('moncompte') < 0) && ($('#Div_CalendrierParDemiJournee .selections table').find('.selection').length == parseInt(_Duree))) {
        if (confirm('Voulez-vous vraiment valider ces réservations ?')) {
            $('#Div_CalendrierParDemiJournee .planning').hide();
            $('#Div_CalendrierParDemiJournee .paiement').show();
            $('#Div_CalendrierParDemiJournee .confirmation').hide();

            $('#Div_CalendrierParDemiJournee .fermer').hide();
        }
    }
    else {
        alert('Merci de sélectionner toutes vos réservations !');
    }
}


function AddParticipationParDemiJournee() {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParDemiJournee #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParDemiJournee #Hidden_EleveId').val();

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

function AddAllReservationsParDemiJournee() {

    var _Participation = {};
    _Participation.Evenement = {};
    _Participation.Evenement.Id = $('#Div_CalendrierParDemiJournee #Hidden_EvenementId').val();
    _Participation.Eleve = {};
    _Participation.Eleve.Id = $('#Div_CalendrierParDemiJournee #Hidden_EleveId').val();

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

function AddReservationsDemiJournee() {

    var _Reservations = [];
    $('#Div_CalendrierParDemiJournee .selections table').find('.selection').each(function () {
        var _Reservation = {};
        _Reservation.Evenement = {};
        _Reservation.Evenement.Id = $('#Div_CalendrierParDemiJournee #Hidden_EvenementId').val();
        _Reservation.Eleve = {};
        _Reservation.Eleve.Id = $('#Div_CalendrierParDemiJournee #Hidden_EleveId').val();
        _Reservation.Jour = $(this).find('input[type=hidden].jour').val();
        _Reservation.Creneau = $(this).find('input[type=hidden].creneau').val();

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