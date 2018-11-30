//extensions jquery : scroll
//v2.0.2
//28/03/2014
//NL
//Created by LEBLOND Nicolas

$.fn.Scroll = function (paramsJson) {

    //variables
    var params = [];
    var obj = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (obj.data('verticalMargin') == undefined) { obj.data('verticalMargin', '0'); } //-20, 30, 50, -100... (px)
    if (obj.data('vitesse') == undefined) { obj.data('vitesse', '800'); } //400, 600, 800
    if (obj.data('top') == undefined) { obj.data('top', obj.offset().top); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == "verticalMargin") { obj.data('verticalMargin', val); }
                if (key == "vitesse") { obj.data('vitesse', val); }
                i++;
            });
        }
        catch (e) {
            obj.data('verticalMargin', parseInt(paramsJson.replace('px', '')));
        }
    }
    else { }


    return this.each(
		function () {

		    //correction d'erreur
		    try { obj.data('verticalMargin', obj.data('verticalMargin').replace('px', '')); } catch (ex) { }
		    try { obj.data('verticalMargin', parseInt(obj.data('verticalMargin'))); } catch (ex) { }
		    try { obj.data('vitesse', parseInt(obj.data('vitesse'))); } catch (ex) { }

		    obj.data('top', parseInt(obj.data('top')) + parseInt(obj.data('verticalMargin')));

		    if (obj.data('top') < 0) { obj.data('top', 0); }

		    $('body,html').animate({ scrollTop: obj.data('top') }, obj.data('vitesse'));

		}
    );
}
