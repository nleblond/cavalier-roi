
function Initialisation_Accueil_jQuery(opt) {

}

function GetCommandes() {



    var params = {};
    params.Id = 0;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:63123//Commandes/GetCommandes',
        headers: {
            'APIKey': 'AEZRETRYTUYIUOIP',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        data: JSON.stringify(params),
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) {
            //request.setRequestHeader("APIKey", 'AEZRETRYTUYIUOIP');
        },
        success: function (data) {
            alert('retour');
            //try {
            //    $('#Div_Results').hide();
            //    Alerts.Error(JSON.parse(data).Errors[0], '.displayAlertTop');
            //}
            //catch (ex) {
            //    $('#Div_Results').html(data).show();
            //    if ($('#Div_Results tbody tr').length > 0) {
            //        Initialisation_GiftCardProducts_jQuery(1);
            //    }
            //    else {
            //        $('#Div_Results').hide();
            //        Alerts.Info('Aucun produit "carte cadeau" trouvé !', '.displayAlertTop');
            //    }
            //}
        },
        error: function (xhr, textStatus) {
            if (textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                }
            }
            else if (textStatus == 'error') {
                //$('#Div_Results').hide();
                //Alerts.Error('La recherche de produits "carte cadeau" a rencontré un problème : ' + textStatus, '.displayAlertTop');
            }
        },
        complete: function () { }
    });
}



$(window).on('load', function () {

    $('.menu .accueil').addClass('select');

    //this.setTimeout(function () {
    //    $('#Div_Message').ModalPopUp('open');
    //}, 800);

    //GetCommandes();
});
