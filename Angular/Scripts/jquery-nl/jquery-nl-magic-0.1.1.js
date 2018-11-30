//extensions jquery : magic
//v0.1.1
//26/03/2014
//NL
//Created by LEBLOND Nicolas

$.fn.Magic = function (paramsJson) {

    //variables
    var params = [];
    var obj = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (obj.data('magicClass') == undefined) { obj.data('magicClass', 'magicClass'); }
    if (obj.data('magicMethod') == undefined) { obj.data('magicMethod', 'fade'); } //slide, blind, clip, drop, fold, fade, show
    if (obj.data('magicVitesse') == undefined) { obj.data('magicVitesse', 400); } //200, 400, 600, 800...
    if (obj.data('magicDelay') == undefined) { obj.data('magicDelay', 200); } //400, 600, 800...

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == "magicClass") { obj.data('magicClass', val); }
                if (key == "magicMethod") { obj.data('magicMethod', val); }
                if (key == "magicVitesse") { obj.data('magicVitesse', val); }
                if (key == "magicDelay") { obj.data('magicDelay', val); }
                i++;
            });
        }
        catch (e) { }
    }
    else { }


    return this.each(
		function () {

		    //on cache
		    obj.find('.' + obj.data('magicClass')).each(function (index) {
		        var item = $(this);
		        item.hide();
		    });

		    //on affiche progressivement
		    obj.find('.' + obj.data('magicClass')).each(function (index) {
		        var item = $(this);
		        var delay = obj.data('magicDelay') * index;

		        setTimeout(function () { item.toggle(obj.data('magicMethod')); }, delay);

		    });

		}
    );
}
