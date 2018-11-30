//extensions jquery : collapsible
//v2.3.4
//12/09/2014
//NL
//Created by LEBLOND Nicolas
//Modified by BARANGER Cyrille

$.fn.Collapsible = function (paramsJson) {

    //chemin
    if (imgRelativePath == null) { imgRelativePath = 'images'; }
    var cheminCollapsible = imgRelativePath + '/jquery-nl/collapsible/';

    //variables
    var params = [];
    var panel = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (panel.data('command') == undefined) { panel.data('command', 'init'); } //open, show, close, hide, init, ''
    if (panel.data('commandObj') == undefined) { panel.data('commandObj', null); }
    if (panel.data('commandObjCollapsedClass') == undefined) { panel.data('commandObjCollapsedClass', ''); }
    if (panel.data('commandObjExpandedClass') == undefined) { panel.data('commandObjExpandedClass', ''); }
    if (panel.data('textObj') == undefined) { panel.data('textObj', null); }
    if (panel.data('textObjCollapsedText') == undefined) { panel.data('textObjCollapsedText', ''); }
    if (panel.data('textObjExpandedText') == undefined) { panel.data('textObjExpandedText', ''); }
    if (panel.data('imageObj') == undefined) { panel.data('imageObj', null); }
    if (panel.data('imageObjCollapsedImageUrl') == undefined) { panel.data('imageObjCollapsedImageUrl', cheminCollapsible + 'c.jpg'); }
    if (panel.data('imageObjExpandedImageUrl') == undefined) { panel.data('imageObjExpandedImageUrl', cheminCollapsible + 'e.jpg'); }
    if (panel.data('imageObjCollapsedText') == undefined) { panel.data('imageObjCollapsedText', ''); }
    if (panel.data('imageObjExpandedText') == undefined) { panel.data('imageObjExpandedText', ''); }

    if (panel.data('statut') == undefined) { panel.data('statut', '0'); }

    if (panel.data('openAfterCommand') == undefined) { panel.data('openAfterCommand', ''); }
    if (panel.data('openBeforeCommand') == undefined) { panel.data('openBeforeCommand', ''); }
    if (panel.data('closeAfterCommand') == undefined) { panel.data('closeAfterCommand'); }
    if (panel.data('closeBeforeCommand') == undefined) { panel.data('closeBeforeCommand', ''); }

    if (panel.data('openMethod') == undefined) { panel.data('openMethod', 'show'); } //show, slide, blind, clip, drop, fold, fade, bounce
    if (panel.data('closeMethod') == undefined) { panel.data('closeMethod', 'hide'); } //show, slide, blind, clip, drop, fold, fade, bounce

    if (panel.data('closeByBlur') == undefined) { panel.data('closeByBlur', false); } // true, false

    if (panel.data('vitesse') == undefined) { panel.data('vitesse', '400'); } //400, 500, 600...
    if (panel.data('openVitesse') == undefined) { panel.data('openVitesse', '400'); } //400, 500, 600...
    if (panel.data('closeVitesse') == undefined) { panel.data('closeVitesse', '400'); } //400, 500, 600...

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {

                //retrocompatibilité
                if (key == "class_off") { panel.data('commandObjCollapsedClass', val); }
                if (key == "class_on") { panel.data('commandObjExpandedClass', val); }
                if (key == "url_collapse") { panel.data('imageObjCollapsedImageUrl', val); }
                if (key == "url_expand") { panel.data('imageObjExpandedImageUrl', val); }
                if (key == "text_off") { panel.data('textObjCollapsedText', val); }
                if (key == "text_on") { panel.data('textObjExpandedText', val); }
                if (key == "obj") { panel.data('commandObj', val); }
                if (key == "objImage") { panel.data('imageObj', val); }
                if (key == "objText") { panel.data('textObj', val); }
                if (key == "collapsedClass") { panel.data('commandObjCollapsedClass', val); }
                if (key == "expandedClass") { panel.data('commandObjExpandedClass', val); }
                if (key == "collapsedImageUrl") { panel.data('imageObjCollapsedImageUrl', val); }
                if (key == "expandedImageUrl") { panel.data('imageObjExpandedImageUrl', val); }
                if (key == "collapsedText") { panel.data('textObjCollapsedText', val); }
                if (key == "expandedText") { panel.data('textObjExpandedText', val); }

                if (key == "commandObj") { panel.data('commandObj', val); }
                if (key == "commandObjCollapsedClass") { panel.data('commandObjCollapsedClass', val); }
                if (key == "commandObjExpandedClass") { panel.data('commandObjExpandedClass', val); }

                if (key == "textObj") { panel.data('textObj', val); }
                if (key == "textObjCollapsedText") { panel.data('textObjCollapsedText', val); }
                if (key == "textObjExpandedText") { panel.data('textObjExpandedText', val); }

                if (key == "imageObj") { panel.data('imageObj', val); }
                if (key == "imageObjCollapsedImageUrl") { panel.data('imageObjCollapsedImageUrl', val); }
                if (key == "imageObjExpandedImageUrl") { panel.data('imageObjExpandedImageUrl', val); }
                if (key == "imageObjCollapsedText") { panel.data('imageObjCollapsedText', val); }
                if (key == "imageObjExpandedText") { panel.data('imageObjExpandedText', val); }

                if (key == "statut") { panel.data('statut', val); }

                if (key == "openAfterCommand") { panel.data('openAfterCommand', val); }
                if (key == "openBeforeCommand") { panel.data('openBeforeCommand', val); }
                if (key == "closeAfterCommand") { panel.data('closeAfterCommand', val); }
                if (key == "closeBeforeCommand") { panel.data('closeBeforeCommand', val); }

                if (key == "openMethod") { panel.data('openMethod', val); }
                if (key == "closeMethod") { panel.data('closeMethod', val); }

                if (key == "closeByBlur") { panel.data('closeByBlur', val); }

                if (key == "vitesse") { panel.data('vitesse', val); }
                if (key == "openVitesse") { panel.data('openVitesse', val); }
                if (key == "closeVitesse") { panel.data('closeVitesse', val); }
                i++;
            });
        }
        catch (e) {
            panel.data('command', paramsJson);
        }
    }
    else { panel.data('command', 'init'); }


    return this.each(
		function () {

		    function Init() {

		        //commandes d'initialisation
		        if (panel.data('statut') == '0') { panel.css({ 'display': 'none' }); }
		        else if (panel.data('statut') == '1') { panel.css({ 'display': 'block' }); }

		        if (panel.data('vitesse') != '') {
		            panel.data('openVitesse', panel.data('vitesse'));
		            panel.data('closeVitesse', panel.data('vitesse'));
		        }

		        //objet(s) de commande
		        if (typeof (panel.data('commandObj')) == "string") {
		            $('#' + panel.data('commandObj')).click(Animate); //évènement
		            if (panel.data('commandObjCollapsedClass') != '') {
		                $('#' + panel.data('commandObj')).addClass(panel.data('commandObjCollapsedClass'));
		            }
		        }
		        else if (typeof (panel.data('commandObj')) == "object") {
		            panel.data('commandObj').click(Animate); //évènement
		            if (panel.data('commandObjCollapsedClass') != '') {
		                panel.data('commandObj').addClass(panel.data('commandObjCollapsedClass')); //on a passé l'objet ou la liste d'objets
		            }
		        }

		        //objet(s) image
		        if (panel.data('imageObj') != null) {
		            if (panel.data('imageObjExpandedImageUrl') != '') {
		                if (typeof (panel.data('imageObj')) == "string") { //on a passé l'ID de l'image
		                    $('#' + panel.data('imageObj')).attr('src', panel.data('imageObjCollapsedImageUrl'));
		                    $('#' + panel.data('imageObj')).attr('title', panel.data('imageObjCollapsedText'));
		                    $('#' + panel.data('imageObj')).css({ 'cursor': 'pointer' });
		                }
		                else if (typeof (panel.data('imageObj')) == "object") { //on a passé l'image ou la liste d'images
		                    panel.data('imageObj').attr('src', panel.data('imageObjCollapsedImageUrl'));
		                    panel.data('imageObj').attr('title', panel.data('imageObjCollapsedText'));
		                    panel.data('imageObj').css({ 'cursor': 'pointer' });
		                }
		            }
		            else {
		                if (typeof (panel.data('imageObj')) == "string") {
		                    $('#' + panel.data('imageObj')).hide();
		                }
		                else if ((panel.data('imageObj') != null) && (typeof (panel.data('imageObj')) == "object")) {
		                    panel.data('imageObj').hide();
		                }
		            }
		        }

		        //objet(s) dont le texte va changer
		        if (panel.data('textObj') != null) {
		            if (panel.data('textObjCollapsedText') != '') {
		                if (typeof (panel.data('textObj')) == "string") { //on a passé l'ID de l'objet
		                    $('#' + panel.data('textObj')).html(panel.data('textObjCollapsedText'));
		                }
		                else if (typeof (panel.data('textObj')) == "object") { //on a passé l'objet ou la liste d'objets
		                    panel.data('textObj').html(panel.data('textObjCollapsedText'));
		                }
		            }
		            else {
		                if (typeof (panel.data('textObj')) == "string") {
		                    $('#' + panel.data('textObj')).hide();
		                }
		                else if (typeof (panel.data('textObj')) == "object") {
		                    panel.data('textObj').hide();
		                }
		            }
		        }

		        if (panel.data('closeByBlur') != '') {

		            //IDfication des éléments dans le hover
		            panel.find('*').each(function (index) {
		                if (($(this).attr('id') == '') || ($(this).attr('id') == undefined) || ($(this).attr('id') == null)) {
		                    $(this).attr('id', panel.attr('id') + '_CID' + index);
		                }
		            });

		            //IDfication des éléments dans l'objet
		            $('#' + panel.data('commandObj')).find('*').each(function (index) {
		                if (($(this).attr('id') == '') || ($(this).attr('id') == undefined) || ($(this).attr('id') == null)) {
		                    $(this).attr('id', panel.attr('id') + '_BID' + index);
		                }
		            });
		        }

		    }


		    function Open() {
		        //objet(s) de commande
		        if ((panel.data('commandObjExpandedClass') != '') && (panel.data('commandObjExpandedClass') != '')) {
		            if (typeof (panel.data('commandObj')) == "string") { //on a passé l'ID de l'objet
		                $('#' + panel.data('commandObj')).removeClass(panel.data('commandObjCollapsedClass')).addClass(panel.data('commandObjExpandedClass'));
		            }
		            else if (typeof (panel.data('commandObj')) == "object") {
		                panel.data('commandObj').removeClass(panel.data('commandObjCollapsedClass')).addClass(panel.data('commandObjExpandedClass')); //on a passé l'objet ou la liste d'objets
		            }
		        }

		        //objet(s) image
		        if (panel.data('imageObj') != null) {
		            if (panel.data('imageObjExpandedImageUrl') != '') {
		                if (typeof (panel.data('imageObj')) == "string") { //on a passé l'ID de l'image
		                    $('#' + panel.data('imageObj')).attr('src', panel.data('imageObjExpandedImageUrl'));
		                    $('#' + panel.data('imageObj')).attr('title', panel.data('imageObjExpandedText'));
		                }
		                else if (typeof (panel.data('imageObj')) == "object") { //on a passé l'image ou la liste d'images
		                    panel.data('imageObj').attr('src', panel.data('imageObjExpandedImageUrl'));
		                    panel.data('imageObj').attr('title', panel.data('imageObjExpandedText'));
		                }
		            }
		        }

		        //objet(s) dont le texte va changer
		        if (panel.data('textObj') != null) {
		            if (panel.data('textObjExpandedText') != '') {
		                if (typeof (panel.data('textObj')) == "string") { //on a passé l'ID de l'objet
		                    $('#' + panel.data('textObj')).html(panel.data('textObjExpandedText'));
		                }
		                else if (typeof (panel.data('textObj')) == "object") { //on a passé l'objet ou la liste d'objets
		                    panel.data('textObj').html(panel.data('textObjExpandedText'));
		                }
		            }
		        }

		        //css
		        panel.find('*').addClass('zone-nl');
		        panel.addClass('zone-nl');

		        //$('#' + panel.data('commandObj')).find('*').addClass('zone-nl'); // Modif CPAT lors de la planif
		        if (typeof (panel.data('commandObj')) == "string") { //on a passé l'ID de l'objet
		            $('#' + panel.data('commandObj')).find('*').addClass('zone-nl');
		        }
		        else if (typeof (panel.data('textObj')) == "object") { //on a passé l'objet ou la liste d'objets
		            panel.data('commandObj').find('*').addClass('zone-nl');
		        }

		        //actions
		        if (panel.data('openBeforeCommand') != '') { eval(panel.data('openBeforeCommand')); }
		        if (panel.data('openMethod') == 'fade') { panel.fadeIn(parseInt(panel.data('openVitesse'))); }
		        else if (panel.data('openMethod') == 'show') { panel.show(); }
		        else { panel.show(panel.data('openMethod'), '', parseInt(panel.data('openVitesse'))); }
		        if (panel.data('openAfterCommand') != '') { eval(panel.data('openAfterCommand')); }
		        if (panel.data('closeByBlur') != '') {

		            var notOnPanel = function (event) {
		                var evenement = event || window.event;
		                var source = evenement.target || evenement.srcElement;
		                var sourceId = source.id;

		                var response = true;
		                if (sourceId == panel.data('commandObj')) { response = false; }
		                else if (sourceId == panel.attr('id')) { response = false; }
		                else if ($('#' + sourceId) == panel) { response = false; }
		                try { if ($('#' + sourceId).hasClass('zone-nl')) { response = false; } } catch (ex) { }
		                try { if ($('#' + sourceId).parents.hasClass('zone-nl')) { response = false; } } catch (ex) { }

		                return response;
		            }

		            $('*').on('click.' + panel.attr('id'), function (event) {
		                if (notOnPanel(event)) { Close(); }
		            });

		        }
		    }


		    function Close() {
		        //objet(s) de commande
		        if ((panel.data('commandObjCollapsedClass') != '') && (panel.data('commandObjExpandedClass') != '')) {
		            if (typeof (panel.data('commandObj')) == "string") { //on a passé l'ID de l'objet
		                $('#' + panel.data('commandObj')).removeClass(panel.data('commandObjExpandedClass')).addClass(panel.data('commandObjCollapsedClass'));
		            }
		            else if (typeof (panel.data('commandObj')) == "object") {
		                panel.data('commandObj').removeClass(panel.data('commandObjExpandedClass')).addClass(panel.data('commandObjCollapsedClass')); //on a passé l'objet ou la liste d'objets
		            }
		        }

		        //objet(s) image
		        if (panel.data('imageObj') != null) {
		            if (panel.data('imageObjCollapsedImageUrl') != '') {
		                if (typeof (panel.data('imageObj')) == "string") { //on a passé l'ID de l'image
		                    $('#' + panel.data('imageObj')).attr('src', panel.data('imageObjCollapsedImageUrl'));
		                    $('#' + panel.data('imageObj')).attr('title', panel.data('imageObjCollapsedText'));
		                }
		                else if (typeof (panel.data('imageObj')) == "object") { //on a passé l'image ou la liste d'images
		                    panel.data('imageObj').attr('src', panel.data('imageObjCollapsedImageUrl'));
		                    panel.data('imageObj').attr('title', panel.data('imageObjCollapsedText'));
		                }
		            }
		        }

		        //objet(s) dont le texte va changer
		        if (panel.data('textObj') != null) {
		            if (panel.data('textObjCollapsedText') != '') {
		                if (typeof (panel.data('textObj')) == "string") { //on a passé l'ID de l'objet
		                    $('#' + panel.data('textObj')).html(panel.data('textObjCollapsedText'));
		                }
		                else if (typeof (panel.data('textObj')) == "object") { //on a passé l'objet ou la liste d'objets
		                    panel.data('textObj').html(panel.data('textObjCollapsedText'));
		                }
		            }
		        }

		        //css
		        panel.find('*').removeClass('zone-nl');
		        panel.removeClass('zone-nl');

		        //$('#' + panel.data('commandObj')).find('*').removeClass('zone-nl'); // Modif CPAT lors de la planif
		        if (typeof (panel.data('commandObj')) == "string") { //on a passé l'ID de l'objet
		            $('#' + panel.data('commandObj')).find('*').removeClass('zone-nl');
		        }
		        else if (typeof (panel.data('textObj')) == "object") { //on a passé l'objet ou la liste d'objets
		            panel.data('commandObj').find('*').removeClass('zone-nl');
		        }

		        //actions
		        if (panel.data('closeBeforeCommand') != '') { eval(panel.data('closeBeforeCommand')); }
		        if (panel.data('closeMethod') == 'fade') { panel.fadeOut(parseInt(panel.data('closeVitesse'))); }
		        else if (panel.data('closeMethod') == 'hide') { panel.hide(); }
		        else { panel.hide(panel.data('closeMethod'), '', parseInt(panel.data('closeVitesse'))); }
		        if (panel.data('closeAfterCommand') != '') { eval(panel.data('closeAfterCommand')); }
		        if (panel.data('closeByBlur') != '') { $('*').off('panel.' + panel.attr('id')); }

		    }


		    function Animate() {
		        if (panel.is(':visible')) { // le panel est ouvert, on va le fermer
		            Close();
		        }

		        else { //le panel est fermé, on va l'ouvrir
		            Open();
		        }
		        return false;
		    }


		    //actions
		    if (panel.data('command') == 'init') { Init(); }
		    else if ((panel.data('command') == 'open') || (panel.data('command') == 'show')) { Open(); }
		    else if ((panel.data('command') == 'close') || (panel.data('command') == 'hide')) { Close(); }

		}
	);
}