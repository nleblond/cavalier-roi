var _WsUrl = '/API/';
var _APIKey = 'AEZRETRYTUYIUOIP';


//variables paypal
var _Total = '';
var _SubTotal = '';
var _Tax = '';
var _Shipping = '';
var _HandlingFee = '';
var _ShippingDiscount = '';
var _Insurance = '';
var _Custom = '';
var _InvoiceNumber = '';
var _Description = 'Paiement pour commande';
var _Note = "Pour plus d'informations sur ce paiement, n'hésitez pas à contacter l'École du cavalier roi à paypal@cavalier-roi.fr";
var _Items = [];
var _RecipientName = '';
var _Line1 = '';
var _Line2 = '';
var _City = '';
var _CountryCode = '';
var _PostalCode = '';
var _Phone = '';
var _State = '';


$(window).on('load', function () {

    $('.menu .boutique').addClass('select');

    //filtre
    $('.avant select').on('change', function () {
        if ($(this).val() == '') {
            document.location.href = "/Boutique";
        }
        else {
            document.location.href = "/Boutique?_CategorieId=" + $(this).val();
        }
    });


    //panier
    //-----------------------------------------------------------------------------------------------------------
    $('.menu .basket').show();
    $('.menu .basket').off('click').on('click', function () {
        $('.panier').toggle();
    });
    Initialisation_NavigationPanier();


    //évènements sur les produits
    $('.produit').each(function () {

        var _Produit = $(this);

        //changement d'images
        if ((_Produit.find('.visuel').length > 0) && (_Produit.find('.image').length > 0)) {
            setInterval(function () {
                if (_Produit.find('.image').is(':visible') == true) {
                    _Produit.find('.image').hide();
                    _Produit.find('.visuel').show();
                }
                else {
                    _Produit.find('.visuel').hide();
                    _Produit.find('.image').show();
                }
            }, 5000);
        }

        //plus/moins
        _Produit.find('.moins').off('click').on('click', function () {
            if (parseInt(_Produit.find('.quantite input[type="text"]').val()) > 1) {
                _Produit.find('.quantite input[type="text"]').val(parseInt(_Produit.find('.quantite input[type="text"]').val()) - 1);
            }
        });
        _Produit.find('.plus').off('click').on('click', function () {
            if (parseInt(_Produit.find('.quantite input[type="text"]').val()) < parseInt(_Produit.find('.quantite input[type="hidden"]').val())) {
                _Produit.find('.quantite input[type="text"]').val(parseInt(_Produit.find('.quantite input[type="text"]').val()) + 1);
            }
            else {
                alert('La quantité supérieure que vous désirez n\'est actuellement pas disponible !');
            }
        });

        _Produit.find('.ajouter').off('click').on('click', function () {
            var _Connected = CheckConnectedEleve();

            if (_Connected == true) {
                var _ProduitId = $(this).data('produitid');
                var _Quantite = _Produit.find('.quantite input[type="text"]').val();

                AddLigneToCommandeEnCours(_ProduitId, _Quantite);
            }
            else {
                OpenConnexion();
            }

            return false;
        });

    });

});




function Initialisation_NavigationPanier() {

    $('.panier').show();

    $('.panier .fermer').off('click').on('click', function () {
        $('.panier').hide();
    });

    $('.panier .etape1').width($('.panier .cadre').outerWidth(true));
    $('.panier .etape2').width($('.panier .cadre').outerWidth(true));
    $('.panier .etape3').width($('.panier .cadre').outerWidth(true));
    $('.panier .etape4').width($('.panier .cadre').outerWidth(true));


    $('.panier .supprimer').each(function () {
        $(this).off('click').on('click', function () {
            DelLigneFromCommandeEnCours($(this).data('id'));
            return false;
        });
    });

    //passage à l'étape 2
    $('.panier .etape1 input[type="button"].valider').off('click').on('click', function () {
        ValiderEtape1();
        return false;
    });

    //retour à l'étape 1 à partir de l'étape 2
    $('.panier .etape2 input[type="button"].revenir').off('click').on('click', function () {
        RevenirEtape1();
        return false;
    });

    //passage à l'étape 3
    $('.panier .etape2 input[type="button"].valider').off('click').on('click', function () {
        ValiderEtape2();
        return false;
    });

    //retour à l'étape 2 à partir de l'étape 3
    $('.panier .etape3 input[type="button"].revenir').off('click').on('click', function () {
        RevenirEtape2();
        return false;
    });

    //validation de l'étape 3 par autre paiement
    $('.panier .etape3 input[type="button"].autre').off('click').on('click', function () {
        ValiderEtape3();
        return false;
    });

}



function ValiderEtape1() {

    $('.panier .etape1').show();
    $('.panier .etape2').show();
    $('.panier .etape3').hide();
    $('.panier .etape4').hide();
    $('.panier .etape4 .confirmation1').hide();
    $('.panier .etape4 .confirmation2').hide();
    $('.panier .etape4 .confirmation3').hide();

    //animation du panier
    $('.panier .etape1').animate({ 'marginLeft': - $('.panier .etape1').outerWidth(true) }, function () {
        $('.panier .etape1').hide();
    });
}


function RevenirEtape1() {
    $('.panier .etape1').show();
    $('.panier .etape2').show();
    $('.panier .etape3').hide();
    $('.panier .etape4').hide();
    $('.panier .etape4 .confirmation1').hide();
    $('.panier .etape4 .confirmation2').hide();
    $('.panier .etape4 .confirmation3').hide();

    //animation du panier
    $('.panier .etape1').animate({ 'marginLeft': 0 }, function () {
        $('.panier .etape2').hide();
    });

}


function ValiderEtape2() { //adresse

    var _AlertMessage;
    var _AlertObject;
    var _Valid = true;
    if ($('.panier .destinataire').val() == '') {
        _AlertMessage = 'Merci de saisir un destinataire !';
        _AlertObject = $('.panier .destinataire');
        _Valid = false;
    }
    else if ($('.panier .route').val() == '') {
        _AlertMessage = 'Merci de saisir un n°/route !';
        _AlertObject = $('.panier .route');
        _Valid = false;
    }
    //else if ($('.panier .complement').val() == '') {
    //    _AlertMessage = 'Merci de saisir une autre information de livraison !';
    //    _AlertObject = $('.panier .complement');
    //    _Valid = false;
    //}
    else if ($('.panier .codepostal').val() == '') {
        _AlertMessage = 'Merci de saisir une code postal valide !';
        _AlertObject = $('.panier .codepostal');
        _Valid = false;
    }
    else if ($('.panier .ville').val() == '') {
        _AlertMessage = 'Merci de saisir une ville !';
        _AlertObject = $('.panier .ville');
        _Valid = false;
    }
    else if (isEmail($('.panier .mail').val()) == false) {
        _AlertMessage = 'Merci de saisir un email valide !';
        _AlertObject = $('.connexion .mail');
        _Valid = false;
    }
    else if ($('.panier .phone').val() == '') {
        _AlertMessage = 'Merci de saisir un téléphone !';
        _AlertObject = $('.connexion .phone');
        _Valid = false;
    }
    if (_Valid) {

        //variables paypal
        this._RecipientName = $('.panier .destinataire').val();
        this._Line1 = $('.panier .route').val();
        this._Line2 = $('.panier .complement').val();
        this._PostalCode = $('.panier .codepostal').val();
        this._City = $('.panier .ville').val();
        this._State = 'FRANCE';
        this._CountryCode = 'FR';
        this._Phone = $('.panier .phone').val();
        this._Total = $('.panier div.tarifs span').eq(1).html().replace(",", ".");
        this._SubTotal = (parseFloat($('.panier div.tarifs span').eq(1).html().replace(',', '.')) - parseFloat($('.panier div.tarifs span').eq(0).html().replace(',', '.'))).toString();
        this._Tax = "0";
        this._Shipping = $('.panier div.tarifs span').eq(0).html().replace(",", ".");
        this._HandlingFee = "0";
        this._ShippingDiscount = "0";
        this._Insurance = "0";
        this._Items = [];
        for (var i = 1; i < $('.panier table.lignes tr').length; i++) {
            var _Item = {
                "name": $('.panier table.lignes tr').eq(i).find('td').eq(0).html(),
                "description": "-",
                "quantity": $('.panier table.lignes tr').eq(i).find('td').eq(1).html(),
                "price": $('.panier table.lignes tr').eq(i).find('td').eq(2).find('span').html(),
                "currency": "EUR"
            };
            this._Items.push(_Item);
        }

        var _Params = {};
        _Params.Destinataire = $('.panier .destinataire').val();
        _Params.Ligne1 = $('.panier .route').val();
        _Params.Ligne2 = $('.panier .complement').val();
        _Params.CodePostal = $('.panier .codepostal').val();
        _Params.Ville = $('.panier .ville').val();
        _Params.Pays = 'FRANCE';
        _Params.Email = $('.panier .mail').val();
        _Params.Telephone = $('.panier .phone').val();

        $.ajax({
            type: 'POST',
            url: '/AddAdresseToCommandeEnCours',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(_Params),
            async: false,
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                if (data == true) {

                    $('.panier .etape1').hide();
                    $('.panier .etape2').show();
                    $('.panier .etape3').show();
                    $('.panier .etape4').hide();
                    $('.panier .etape4 .confirmation1').hide();
                    $('.panier .etape4 .confirmation2').hide();
                    $('.panier .etape4 .confirmation3').hide();

                    //accordeon des paiements
                    var params = {
                        'load': 0,
                        'open': 1,
                        'close': 0
                    };
                    $('.panier .etape3 .accordeon').Accordeon(params);

                    //animation du panier
                    $('.panier .etape1').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true)) });
                    $('.panier .etape2').animate({ 'marginLeft': - $('.panier .etape2').outerWidth(true) }, function () {
                        $('.panier .etape2').hide();
                    });

                }
                else {
                    alert('Une erreur est survenue !');
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


function RevenirEtape2() {
    $('.panier .etape1').hide();
    $('.panier .etape2').show();
    $('.panier .etape3').show();
    $('.panier .etape4').hide();
    $('.panier .etape4 .confirmation1').hide();
    $('.panier .etape4 .confirmation2').hide();
    $('.panier .etape4 .confirmation3').hide();

    //animation du panier
    $('.panier .etape1').css({ 'marginLeft': - $('.panier .etape1').outerWidth(true) });
    $('.panier .etape2').animate({ 'marginLeft': 0 }, function () {
        $('.panier .etape3').hide();
    });
}


function ValiderEtape3() {

    if (confirm('Voulez-vous vraiment valider et régler cette commande avec un autre paiement ?')) {

        //désactivation des boutons de commande de la page (pour forcer un raffraichissement de la page pour en faire une autre)
        $('.produit input[type="button"].ajouter').hide();
        $('.produit .quantite').hide();

        AddCommmande(2, '');

        $('.panier .etape1').hide();
        $('.panier .etape2').hide();
        $('.panier .etape3').show();
        $('.panier .etape4').show();
        $('.panier .etape4 .confirmation1').show();
        $('.panier .etape4 .confirmation2').hide();
        $('.panier .etape4 .confirmation3').hide();

        //animation du panier
        $('.panier .etape1').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true) + $('.panier .etape3').outerWidth(true)) });
        $('.panier .etape2').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true)) });
        $('.panier .etape3').animate({ 'marginLeft': - $('.panier .etape3').outerWidth(true) }, function () {
            $('.panier .etape3').hide();
        });

    }

}


function AddLigneToCommandeEnCours(_ProduitId, _Quantite) {

    var _Params = {};
    _Params._ProduitId = _ProduitId;
    _Params._Quantite = _Quantite;

    $.ajax({
        type: 'POST',
        url: '/AddLigneToCommandeEnCours',
        //headers: { 'Content-Type': 'application/json' },
        contentType: 'application/json; charset=utf-8',
        dataType: 'html',
        data: JSON.stringify(_Params),
        async: false,
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) { },
        success: function (data) {
            $('.panier .etape1').html(data);
            Initialisation_NavigationPanier();
            alert('Le panier a bien été mis à jour (dans la limite des stocks disponibles) !');
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


function DelLigneFromCommandeEnCours(_LigneId) {

    if (confirm('Voulez-vraiment supprimer ce produit du panier ?')) {
        var _Params = {};
        _Params._LigneId = _LigneId;

        $.ajax({
            type: 'POST',
            url: '/DelLigneFromCommandeEnCours',
            //headers: { 'Content-Type': 'application/json' },
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            data: JSON.stringify(_Params),
            async: false,
            timeout: 100000000,
            tryCount: 0,
            retryLimit: 0,
            beforeSend: function (request) { },
            success: function (data) {
                $('.panier .etape1').html(data);
                Initialisation_NavigationPanier();
                alert('Le panier a bien été mis à jour !');
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

}






function AddCommmande(_StatutId, _PaymentId) {

    var _Params = {};
    _Params._StatutId = _StatutId;
    _Params._PaymentId = (_PaymentId == undefined || _PaymentId == null ? '' : _PaymentId);

    $.ajax({
        type: 'POST',
        url: '/AddCommande',
        headers: { 'Content-Type': 'application/json' },
        dataType: 'json',
        data: JSON.stringify(_Params),
        async: false,
        timeout: 100000000,
        tryCount: 0,
        retryLimit: 0,
        beforeSend: function (request) { },
        success: function (data) { },
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
                            "currency": "EUR",
                            "details": {
                                "subtotal": _SubTotal,
                                "tax": _Tax,
                                "shipping": _Shipping,
                                "handling_fee": _HandlingFee,
                                "shipping_discount": _ShippingDiscount,
                                "insurance": _Insurance
                            }
                        },
                        "description": _Description,
                        "item_list": {
                            "items": _Items,
                            "shipping_address": {
                                "recipient_name": _RecipientName,
                                "line1": _Line1,
                                "line2": _Line2,
                                "city": _City,
                                "country_code": _CountryCode,
                                "postal_code": _PostalCode,
                                "phone": _Phone,
                                "state": _State
                            }
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

    //désactivation des boutons de commande de la page (pour forcer un raffraichissement de la page pour en faire une autre)
    $('.produit input[type="button"].ajouter').hide();
    $('.produit .quantite').hide();

    AddCommmande(3, _PaymentId);

    $('.panier .etape1').hide();
    $('.panier .etape2').hide();
    $('.panier .etape3').show();
    $('.panier .etape4').show();
    $('.panier .etape4 .confirmation1').hide();
    $('.panier .etape4 .confirmation2').show();
    $('.panier .etape4 .confirmation3').hide();

    //animation du panier
    $('.panier .etape1').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true) + $('.panier .etape3').outerWidth(true)) });
    $('.panier .etape2').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true)) });
    $('.panier .etape3').animate({ 'marginLeft': - $('.panier .etape3').outerWidth(true) }, function () {
        $('.panier .etape3').hide();
    });

}


function CallBackPayPalKO(_Error) {

    //désactivation des boutons de commande de la page (pour forcer un raffraichissement de la page pour en faire une autre)
    $('.produit input[type="button"].ajouter').hide();
    $('.produit .quantite').hide();

    AddCommmande(2, 'KO');

    $('.panier .etape1').hide();
    $('.panier .etape2').hide();
    $('.panier .etape3').show();
    $('.panier .etape4').show();
    $('.panier .etape4 .confirmation1').hide();
    $('.panier .etape4 .confirmation2').hide();
    $('.panier .etape4 .confirmation3').show();

    //animation du panier
    $('.panier .etape1').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true) + $('.panier .etape3').outerWidth(true)) });
    $('.panier .etape2').css({ 'marginLeft': - ($('.panier .etape1').outerWidth(true) + $('.panier .etape2').outerWidth(true)) });
    $('.panier .etape3').animate({ 'marginLeft': - $('.panier .etape3').outerWidth(true) }, function () {
        $('.panier .etape3').hide();
    });

}