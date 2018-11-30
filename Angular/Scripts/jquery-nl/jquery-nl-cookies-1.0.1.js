//extensions jquery : cookies
//v1.0.1
//20/11/2013
//NL
//Created by PATINO Cédric

(function ($) {

    $.cookies = function (parameters) {

        $.extend({ // Définition des valeurs par défaut 

            mode: 'get', // 'get', 'set', 'del'
            expiration: 0, // 0: expire à la fin de la session - x: date du jour + x jours || Cas d'utilisation: mode = ['set']
            value: null, // valeur du cookie à définir || Cas d'utilisation: mode = ['set']
            name: '', // alias/clé du cookie || Cas d'utilisation: mode = ['get'|'set']
            isDebug: false // mode débug (affichage dans la console) ||  Cas d'utilisation: mode = ['get', 'set', 'del']

        }, parameters);

        return Initialize();

        function Initialize() {
            if (typeof (parameters.isDebug) != 'undefined' && parameters.isDebug) { // Mode Debug
                try {
                    console.log('parameters: ' + parameters.mode);
                    console.log('expiration: ' + parameters.expiration.toString());
                    console.log('value: ' + parameters.value.toString());
                    console.log('name: ' + parameters.name.toString());
                } catch (Ex) { }
            }

            switch (parameters.mode) {
                case 'get':
                    return GetCookie();
                    break;

                case 'set':
                    return SetCookie(parameters.expiration);
                    break;

                case 'del':
                    return DelCookie();
                    break;

                default:
                    return GetCookie();
                    break;
            }
        }

        function GetCookie() { // Fonction de récupération du cookie

            var cookieValues = document.cookie; // Liste des cookies au format brut (chaine)
            var valStartAt = cookieValues.indexOf(" " + parameters.name + "="); // Index de départ de la valeur recherchée
            if (valStartAt == -1) {
                valStartAt = cookieValues.indexOf(parameters.name + "=");
            }
            if (valStartAt == -1) {
                cookieValues = null;
            }
            else {
                valStartAt = cookieValues.indexOf("=", valStartAt) + 1;
                var valEndAt = cookieValues.indexOf(";", valStartAt);  // Index de fin de la valeur recherchée
                if (valEndAt == -1) {
                    valEndAt = cookieValues.length;
                }
                cookieValues = unescape(cookieValues.substring(valStartAt, valEndAt));
            }

            if (typeof (parameters.isDebug) != 'undefined' && parameters.isDebug) { // Mode Debug
                try {
                    console.log('[GET] tous les cookies : ' + document.cookie);
                    console.log('[GET] valeur du cookie : ' + cookieValues);
                } catch (Ex) { }
            }

            return cookieValues;
        }

        function SetCookie(optExpiration) { // Fonction de définition du cookie

            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + ((typeof (optExpiration) != 'undefined' && optExpiration != null) ? optExpiration : parameters.expiration));

            var cookieValue = escape(parameters.value) + ((parameters.expiration == null) ? "" : "; expires=" + expirationDate.toUTCString());
            document.cookie = parameters.name + "=" + cookieValue;

            if (typeof (parameters.isDebug) != 'undefined' && parameters.isDebug && typeof (optExpiration) == 'undefined') { // Mode Debug
                try {
                    console.log('[DEL] tous les cookies : ' + document.cookie);
                    console.log('[SET] cookie défini à : ' + parameters.name + "=" + cookieValue);
                } catch (Ex) { }
            }

            return parameters.name + "=" + cookieValue;
        }

        function DelCookie() { // Fonction de suppression du cookie

            SetCookie(-1);

            if (typeof (parameters.isDebug) != 'undefined' && parameters.isDebug) { // Mode Debug
                try {
                    console.log('[DEL] tous les cookies : ' + document.cookie);
                    console.log('[DEL] cookie supprimé : ' + parameters.name);
                } catch (Ex) { }
            }

        }
    }

})(jQuery)