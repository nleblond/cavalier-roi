//extensions jquery : accordeon
//v2.0.3
//16/01/2019
//NL
//Created by LEBLOND Nicolas
//Modified by BARANGER Cyrille

$.fn.Accordeon = function (paramsJson) {


    //gestion spéciale selon le navigateur
    //nécessite "navigateurs.js"
    var browser = 'fixed enhanced browser';
    if (navName == 'MSIE 7') { browser = 'OLD IE'; }
    if (navName == 'MSIE 6') { browser = 'OLD IE'; }

    //variables
    var params = [];
    var accordeon = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (accordeon.data('command') == undefined) { accordeon.data('command', 'init'); }
    if (accordeon.data('accordeonClass') == undefined) { accordeon.data('accordeonClass', 'accordeon'); }
    if (accordeon.data('offClass') == undefined) { accordeon.data('offClass', 'n2_off'); }
    if (accordeon.data('onClass') == undefined) { accordeon.data('onClass', 'n2_on'); }
    if (accordeon.data('headerClass') == undefined) { accordeon.data('headerClass', 'li_header'); }
    if (accordeon.data('contentClass') == undefined) { accordeon.data('contentClass', 'li_content'); }
    if (accordeon.data('load') == undefined) { accordeon.data('load', 0); } //0 (accordeon fermé au démarrage), 1/2/3/... (ouvert au démarrage sur le 1/2/3...)
    if (accordeon.data('open') == undefined) { accordeon.data('open', 1); } //1 (1 seul uniquement d'ouvert), 2 (possibilité de plusieurs d'ouverts)
    if (accordeon.data('close') == undefined) { accordeon.data('close', 1); } //0 (peut-être complétement fermé), 1 (obligatoirement 1 d'ouvert)
    if (accordeon.data('vitesse') == undefined) { accordeon.data('vitesse', 400); } //400, 600, 800...

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == "command") { accordeon.data('command', val); }
                if (key == "accordeonClass") { accordeon.data('accordeonClass', val); }
                if (key == "offClass") { accordeon.data('offClass', val); }
                if (key == "onClass") { accordeon.data('onClass', val); }
                if (key == "headerClass") { accordeon.data('headerClass', val); }
                if (key == "contentClass") { accordeon.data('contentClass', val); }
                if (key == "load") { accordeon.data('load', val); }
                if (key == "open") { accordeon.data('open', val); }
                if (key == "close") { accordeon.data('close', val); }
                if (key == "vitesse") { accordeon.data('vitesse', val); }
                i++;
            });
        }
        catch (e) {
            accordeon.data('command', paramsJson);
        }
    }
    else { accordeon.data('command', 'init'); }


    return this.each(
		function () {


		    function Init() {

		        //commandes d'initialisation
		        accordeon.css({ 'visibility': 'hidden' });

		        //commandes d'initialisation
                accordeon.removeClass(accordeon.data('accordeonClass')).addClass(accordeon.data('accordeonClass')).css({ 'overflow': 'hidden', 'zIndex': 400 });

		        accordeon.find('> li').each(function (index) {

		            var currentLi = $(this);

		            //initialisation des li "panel"
		            currentLi
                        .attr('id', accordeon.attr('id') + '_panel' + index)
                        .removeClass(accordeon.data('offClass')).addClass(accordeon.data('offClass'))
		                .css({ 'zIndex': 300, 'overflow': 'hidden' });

		            //initialisation des div "header"
		            var currentLiHeader = currentLi.find('> div').eq(0);
		            currentLiHeader
                        .attr('id', accordeon.attr('id') + '_header' + index)
                        .removeClass(accordeon.data('headerClass')).addClass(accordeon.data('headerClass'))
		                .css({ 'zIndex': 200, 'overflow': 'hidden' });

		            //initialisation des ul "content"
                    var currentLiContent = currentLi.find('> ul').eq(0);
                    currentLiContent
                        .attr('id', accordeon.attr('id') + '_content' + index)
                        .removeClass(accordeon.data('contentClass')).addClass(accordeon.data('contentClass'))
                        .css({ 'zIndex': 100, 'overflow': 'hidden', 'marginBottom': -currentLiContent.height() }); //utilisation de "Height" à la place de "outerHeight" qui pose des problèmes

                    //alert(currentLiContent.height());
		        });

		        accordeon.find('.' + accordeon.data('headerClass')).off('click').on('click', function () {
		            if (accordeon.find('.progressAccordeon').length < 1) { //si plus de 2 contents en cours d'animation => ca va bugguer, on annule l'action
		                var header = $(this);
		                var panel = header.parent();
		                var content = panel.find('.' + accordeon.data('contentClass'));
		                var contentHeight = content.outerHeight(true);

		                //désactivation grace à jQueryUI ou la propriété "enabled/disabled"
                        if ((panel.hasClass('ui-state-disabled')) || (panel.is(':disabled') == true)) {
		                    return false;
		                }

		                //"content" fermé
		                if (!(content.hasClass('opened'))) {

		                    if (accordeon.find('.opened').length > 0) { //déjà un ou plusieurs d'ouverts

		                        if (accordeon.data('open') == 1) { //uniquement 1 seul ouvert possible

		                            //on doit refermer chaque "content" ouvert
		                            accordeon.find('.opened').each(function (index) {

		                                var currentLiContent = $(this);

		                                //on met la classe fermée pour chaque li avec "content" ouvert
		                                var currentLi = currentLiContent.parent('.' + accordeon.data('onClass'));
		                                currentLi
                                            .removeClass(accordeon.data('onClass'))
                                            .addClass(accordeon.data('offClass'));

		                                //on repere les éléments en position absolute ou relative dans le "content"
		                                if (browser == 'OLD IE') { //IE6 ou IE7 : bug
		                                    var hasPositionRelativeAndAbsolute = false;
		                                    $(this).find('*').each(function () {
		                                        if (($(this).css('position') == 'relative') || ($(this).css('position') == 'absolute')) {
		                                            hasPositionRelativeAndAbsolute = true;
		                                        }
		                                    });
		                                    if (hasPositionRelativeAndAbsolute) { //=> mode dégradé
		                                        currentLiContent.css({ 'visibility': 'hidden' });
		                                    }
		                                }
		                                //on referme le "content" ouvert (margin)
		                                currentLiContent
                                                .addClass('progressAccordeon') //on marque chaque "content" ouvert comme en cours de fermeture
                                                .animate({ 'marginBottom': -currentLiContent.outerHeight(true) }, accordeon.data('vitesse'), function () {
                                                    currentLiContent
                                                        .removeClass('progressAccordeon')
                                                        .removeClass('opened');  //on démarque chaque "content" initialement ouvert
                                                });
		                                //}

		                            });
		                        }
		                    }

		                    //on met le "panel" à "on"
		                    panel
                                .removeClass(accordeon.data('offClass'))
                                .addClass(accordeon.data('onClass'));

		                    //on repere les éléments en position absolute ou relative dans le "content"
		                    if (browser == 'OLD IE') { //IE6 ou IE7 : bug
		                        var hasPositionRelativeAndAbsolute = false;
		                        content.find('*').each(function () {
		                            if (($(this).css('position') == 'relative') || ($(this).css('position') == 'absolute')) {
		                                hasPositionRelativeAndAbsolute = true;
		                            }
		                        });
		                        if (hasPositionRelativeAndAbsolute) { //=> mode dégradé
		                            currentLiContent.css({ 'visibility': 'visible' });
		                        }
		                    }
		                    //on ouvre le "content" (margin)
		                    content
                                    .addClass('progressAccordeon') //on marque le "content" courant comme en cours d'ouverture
                                    .animate({ 'marginBottom': 0 }, accordeon.data('vitesse'), function () {
                                        content
                                            .removeClass('progressAccordeon')
                                            .addClass('opened');  //on marque le "content" courant à ouvert
                                    });
		                    //}
		                }

		                //"content" déjà ouvert
		                else {
		                    var fermeture = false;
		                    if (accordeon.data('close') == 0) { //on peut tout fermer
		                        fermeture = true;
		                    }
		                    else if (accordeon.data('close') == 1) { //il doit en rester un d'ouvert
		                        if (accordeon.find('.opened').length > 1) { //c'est bon il y a un ou plusieurs autres d'ouverts
		                            fermeture = true;
		                        }
		                    }
		                    if (fermeture) {

		                        //on met le "panel" à "off"
		                        panel
                                    .removeClass(accordeon.data('onClass'))
                                    .addClass(accordeon.data('offClass'));

		                        //on repere les éléments en position absolute ou relative dans le "content"
		                        if (browser == 'OLD IE') { //IE6 ou IE7 : bug
		                            var hasPositionRelativeAndAbsolute = false;
		                            content.find('*').each(function () {
		                                if (($(this).css('position') == 'relative') || ($(this).css('position') == 'absolute')) {
		                                    hasPositionRelativeAndAbsolute = true;
		                                }
		                            });
		                            if (hasPositionRelativeAndAbsolute) { //=> mode dégradé
		                                content.css({ 'visibility': 'hidden' });
		                            }
		                        }
		                        //on ferme le "content" (margin)
		                        content
                                        .addClass('progressAccordeon') //on marque le "content" courant comme en cours de fermeture
                                        .animate({ 'marginBottom': -contentHeight }, accordeon.data('vitesse'), function () {
                                            content
                                                .removeClass('progressAccordeon')
                                                .removeClass('opened'); //on démarque le "content" initialement ouvert
                                        });
		                    }
		                }
		                return false;
		            }
		        });

		        //fin de l'initialisation
		        accordeon.css({ 'visibility': 'visible' });
		    }


		    function Load() {
		        if (accordeon.data('load') != 0) {
		            if (accordeon.data('load') <= accordeon.find('> li').length) {
		                accordeon.find('.' + accordeon.data('headerClass')).eq(accordeon.data('load') - 1).click();
		            }
		        }
		    }


		    //actions
		    if (accordeon.data('command') == 'init') { Init(); Load(); }

		}
    );
}
