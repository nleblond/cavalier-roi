//extensions jquery : menu
//v2.2.2
//05/09/2014
//NL
//Created by LEBLOND Nicolas

//à faire
//transparent png lors d'un fadeIn sous IE6 => mode dégradé pour le moment
//multiples hover
//gestion des débords
//fermeture par l'analyse de la position de la souris

$.fn.HoverMenu = function (paramsJson) {

    //gestion spéciale selon le navigateur
    //nécessite "navigateurs.js"
    var browser = 'png 24 transparency enhanced browser';
    if (navName == 'MSIE 8') { browser = 'OLD IE'; }
    if (navName == 'MSIE 7') { browser = 'OLD IE'; }
    if (navName == 'MSIE 6') { browser = 'OLD IE'; }

    //variables
    var params = [];
    var menu = $(this);
    var adjustLoaderEvent;
    var mouseX;
    var mouseY;

    //variables + valeurs par défaut si aucune valeur stockée
    if (menu.data('command') == undefined) { menu.data('command', 'init'); } //show, close, adjust, init
    if (menu.data('commandObj') == undefined) { menu.data('commandObj', null); }
    if (menu.data('commandObjPosition') == undefined) { menu.data('commandObjPosition', 'bottom-center'); } //top-left, top-center, top-right, right-middle, bottom-right, bottom-center, bottom-left, left-middle, top-left, center-middle
    if (menu.data('menuPosition') == undefined) { menu.data('menuPosition', 'top-center'); } //top-left, top-center, top-right, right-middle, bottom-right, bottom-center, bottom-left, left-middle, top-left, center-middle
    if (menu.data('openMethod') == undefined) { menu.data('openMethod', 'show'); } //show, slide, blind, clip, drop, fold, fade, bounce, show
    if (menu.data('closeMethod') == undefined) { menu.data('closeMethod', 'hide'); } //hide, slide, blind, clip, drop, fold, fade, bounce, show
    if (menu.data('verticalMargin') == undefined) { menu.data('verticalMargin', 0); } //2, 10, 1000
    if (menu.data('horizontalMargin') == undefined) { menu.data('horizontalMargin', 0); } //2, 10, 1000
    if (menu.data('vitesse') == undefined) { menu.data('vitesse', 400); } //400, 600, 800
    if (menu.data('scrollHiding') == undefined) { menu.data('scrollHiding', false); } //true, false
    if (menu.data('resizeHiding') == undefined) { menu.data('resizeHiding', false); } //true, false
    if (menu.data('adjustMode') == undefined) { menu.data('adjustMode', 'manual'); } //automatic, manual, window
    if (menu.data('openEvent') == undefined) { menu.data('openEvent', 'hover'); } //click, hover
    if (menu.data('closeEvent') == undefined) { menu.data('openEvent', 'unhover'); } //click, blur, unhover
    if (menu.data('openBeforeCommand') == undefined) { menu.data('openBeforeCommand', ''); }
    if (menu.data('openAfterCommand') == undefined) { menu.data('openAfterCommand', ''); }
    if (menu.data('openAlreadyCommand') == undefined) { menu.data('openAlreadyCommand', ''); }
    if (menu.data('closeBeforeCommand') == undefined) { menu.data('closeBeforeCommand', ''); }
    if (menu.data('closeAfterCommand') == undefined) { menu.data('closeAfterCommand', ''); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == "command") { menu.data('command', val); }
                if (key == "commandObj") { menu.data('commandObj', val); }
                if (key == "commandObjPosition") { menu.data('commandObjPosition', val); }
                if (key == "menuPosition") { menu.data('menuPosition', val); }
                if (key == "openMethod") { menu.data('openMethod', val); }
                if (key == "closeMethod") { menu.data('closeMethod', val); }
                if (key == "verticalMargin") { menu.data('verticalMargin', val); }
                if (key == "horizontalMargin") { menu.data('horizontalMargin', val); }
                if (key == "vitesse") { menu.data('vitesse', val); }
                if (key == "scrollHiding") { menu.data('scrollHiding', val); }
                if (key == "resizeHiding") { menu.data('resizeHiding', val); }
                if (key == "adjustMode") { menu.data('adjustMode', val); }
                if (key == "openEvent") { menu.data('openEvent', val); }
                if (key == "closeEvent") { menu.data('closeEvent', val); }
                if (key == "openBeforeCommand") { menu.data('openBeforeCommand', val); }
                if (key == "openAfterCommand") { menu.data('openAfterCommand', val); }
                if (key == "openAlreadyCommand") { menu.data('openAlreadyCommand', val); }
                if (key == "closeBeforeCommand") { menu.data('closeBeforeCommand', val); }
                if (key == "closeAfterCommand") { menu.data('closeAfterCommand', val); }
                i++;
            });
            if (!(command)) { command = ''; }
        }
        catch (e) { command = paramsJson; }
    }
    else { command = ''; }


    return this.each(
		function () {


		    function Init() {

		        //correction d'erreur
		        if (menu.data('openMethod') == 'left-top') { menu.data('openMethod', 'top-left'); }
		        else if (menu.data('openMethod') == 'center-top') { menu.data('openMethod', 'top-center'); }
		        else if (menu.data('openMethod') == 'right-top') { menu.data('openMethod', 'top-right'); }
		        else if (menu.data('openMethod') == 'middle-right') { menu.data('openMethod', 'right-middle'); }
		        else if (menu.data('openMethod') == 'right-bottom') { menu.data('openMethod', 'bottom-right'); }
		        else if (menu.data('openMethod') == 'center-bottom') { menu.data('openMethod', 'bottom-center'); }
		        else if (menu.data('openMethod') == 'left-bottom') { menu.data('openMethod', 'bottom-left'); }
		        else if (menu.data('openMethod') == 'middle-left') { menu.data('openMethod', 'left-middle'); }
		        else if (menu.data('openMethod') == 'middle-center') { menu.data('openMethod', 'center-middle'); }
		        else if (menu.data('openMethod') == 'left-top') { menu.data('openMethod', 'top-left'); }
		        else if (menu.data('openMethod') == 'center-top') { menu.data('openMethod', 'top-center'); }
		        else if (menu.data('openMethod') == 'right-top') { menu.data('openMethod', 'top-right'); }
		        else if (menu.data('openMethod') == 'middle-right') { menu.data('openMethod', 'right-middle'); }
		        else if (menu.data('openMethod') == 'right-bottom') { menu.data('openMethod', 'bottom-right'); }
		        else if (menu.data('openMethod') == 'center-bottom') { menu.data('openMethod', 'bottom-center'); }
		        else if (menu.data('openMethod') == 'left-bottom') { menu.data('openMethod', 'bottom-left'); }
		        else if (menu.data('openMethod') == 'middle-left') { menu.data('openMethod', 'left-middle'); }
		        else if (menu.data('openMethod') == 'middle-center') { menu.data('openMethod', 'center-middle'); }
		        try { menu.data('verticalMargin', menu.data('verticalMargin').replace('px', '')); } catch (ex) { }
		        try { menu.data('horizontalMargin', menu.data('horizontalMargin').replace('px', '')); } catch (ex) { }

		        //commandes d'initialisation
		        menu.hide();

		        //IDfication des éléments dans le hover
		        menu.find('*').each(function (index) {
		            if (($(this).attr('id') == '') || ($(this).attr('id') == undefined) || ($(this).attr('id') == null)) {
		                $(this).attr('id', menu.attr('id') + '_HID' + index);
		            }
		        });

		        //IDfication des éléments dans l'objet
		        $('#' + menu.data('commandObj')).find('*').each(function (index) {
		            if (($(this).attr('id') == '') || ($(this).attr('id') == undefined) || ($(this).attr('id') == null)) {
		                $(this).attr('id', menu.attr('id') + '_BID' + index);
		            }
		        });

		        //initilisation des évènements d'ouverture
		        if (menu.data('openEvent') == 'hover') {
		            $('#' + menu.data('commandObj')).off('mouseenter').on('mouseenter', function (event) {
		                mouseX = event.clientX;
		                mouseY = event.clientY;
		                Show();
		                if ($('#' + menu.data('commandObj')).is('a')) {
		                    event.stopPropagation();
		                }
		                return false;
		            });
		        }
		        else if (menu.data('openEvent') == 'click') {
		            $('#' + menu.data('commandObj')).off('click').on('click', function (event) {
		                mouseX = event.clientX;
		                mouseY = event.clientY;
		                Show();
		                return false;
		            });
		        }
		    }


		    function Show() {

		        if (!menu.is(':visible')) {

		            Adjust();

		            menu.find('*').addClass('zone-nl');
		            menu.addClass('zone-nl');
		            $('#' + menu.data('commandObj')).find('*').addClass('zone-nl');

		            var notOnHoverMenu = function (event) {
		                var evenement = event || window.event;
		                var source = evenement.target || evenement.srcElement;
		                var sourceId = source.id;

		                var response = true;
		                if (sourceId == menu.data('commandObj')) { response = false; }
		                else if (sourceId == menu.attr('id')) { response = false; }
		                else if ($('#' + sourceId) == menu) { response = false; }
		                try { if ($('#' + sourceId).hasClass('zone-nl')) { response = false; } } catch (ex) { }
		                try { if ($('#' + sourceId).parents.hasClass('zone-nl')) { response = false; } } catch (ex) { }

		                return response;
		            }

		            //initialisation de l'évènement sur le hovermenu déjà ouvert
		            if (menu.data('openAlreadyCommand') != undefined) {
		                $('#' + menu.data('commandObj')).on('click.' + menu.attr('id') + '_alreadyOpened', function (event) {
		                    if (typeof (menu.data('openAlreadyCommand')) == "string") { eval(menu.data('openAlreadyCommand')); }
		                    else if (typeof (menu.data('openAlreadyCommand')) != "undefined") { menu.data('openAlreadyCommand').call(this, null); }
		                });
		            }

		            //initialisation des évènements de fermeture
		            if (menu.data('closeEvent') == 'unhover') {
		                $('*').on('mouseover.' + menu.attr('id'), function (event) {
		                    if (notOnHoverMenu(event)) { Hide(); }
		                });
		            }
		            else if (menu.data('closeEvent') == 'blur') {
		                $('*').on('click.' + menu.attr('id'), function (event) {
		                    if (notOnHoverMenu(event)) { Hide(); }
		                    //execution de l'évènement sur le "HoverMenu" déjà ouvert car l'évènement sur le '*' empêche l'évènement sur le "commandObj"
		                    else if ((!notOnHoverMenu(event)) && (menu.data('openAlreadyCommand') != undefined)) {
		                        if (typeof (menu.data('openAlreadyCommand')) == "string") { eval(menu.data('openAlreadyCommand')); }
		                        else if (typeof (menu.data('openAlreadyCommand')) != "undefined") { menu.data('openAlreadyCommand').call(this, null); }
		                    }
		                });
		            }
		            else if (menu.data('closeEvent') == 'click') {
		                $('#' + menu.data('commandObj')).on('click.' + menu.attr('id'), function (event) {
		                    if (!notOnHoverMenu(event)) { Hide(); }
		                });
		            }
		            if (menu.data('scrollHiding') == true) { $(window).on('scroll.' + menu.attr('id') + '_scrollHiding', function (event) { MayHide(event); return false; }); }
		            if (menu.data('resizeHiding') == true) { $(window).on('resize.' + menu.attr('id') + '_resizeHiding', function (event) { MayHide(event); return false; }); }

		            //gestion du repositionnement
		            if (menu.data('adjustMode') == 'automatic') {
		                adjustLoaderEvent = setInterval(
                            function () {
                                var newLeft = Math.round(menu.offset().left);
                                var newTop = Math.round(menu.offset().top);
                                var newHeight = menu.outerHeight();
                                var newWidth = menu.outerWidth();
                                if ((menu.data('top') != newTop) || (menu.data('left') != newLeft) || (menu.data('height') != newHeight) || (menu.data('width') != newWidth)) {
                                    Adjust();
                                }
                                return false;
                            }, 10);
		            }
		            else if (menu.data('adjustMode') == 'window') {
		                $(window).on('resize.' + menu.attr('id') + '_adjustMode', function () { Adjust(); return false; });
		                $(window).on('scroll.' + menu.attr('id') + '_adjustMode', function () { Adjust(); return false; });
		            }

		            if (typeof (menu.data('openBeforeCommand')) == "string") { eval(menu.data('openBeforeCommand')); }
		            else if (typeof (menu.data('openBeforeCommand')) != "undefined") { menu.data('openBeforeCommand').call(this, null); }

		            //affichage
		            if (menu.data('openMethod') == 'fade') {
		                if (browser != 'OLD IE') {
		                    menu.fadeIn(menu.data('vitesse')).queue(function () {
		                        if (typeof (menu.data('openAfterCommand')) == "string") { eval(menu.data('openAfterCommand')); }
		                        else if (typeof (menu.data('openAfterCommand')) != "undefined") { menu.data('openAfterCommand').call(this, null); }
		                        $(this).dequeue();
		                    });
		                }
		                else {
		                    menu.show().queue(function () {
		                        if (typeof (menu.data('openAfterCommand')) == "string") { eval(menu.data('openAfterCommand')); }
		                        else if (typeof (menu.data('openAfterCommand')) != "undefined") { menu.data('openAfterCommand').call(this, null); }
		                        $(this).dequeue();
		                    });
		                }
		            }
		            else if (menu.data('openMethod') == 'show') {
		                menu.show().queue(function () {
		                    if (typeof (menu.data('openAfterCommand')) == "string") { eval(menu.data('openAfterCommand')); }
		                    else if (typeof (menu.data('openAfterCommand')) != "undefined") { menu.data('openAfterCommand').call(this, null); }
		                    $(this).dequeue();
		                });
		            }
		            else {
		                menu.show(menu.data('openMethod'), menu.data('vitesse')).queue(function () {
		                    if (typeof (menu.data('openAfterCommand')) == "string") { eval(menu.data('openAfterCommand')); }
		                    else if (typeof (menu.data('openAfterCommand')) != "undefined") { menu.data('openAfterCommand').call(this, null); }
		                    $(this).dequeue();
		                });
		            }


		        }
		    }


		    function Hide() {

		        if (menu.is(':visible')) {

		            if (typeof (menu.data('closeBeforeCommand')) == "string") { eval(menu.data('closeBeforeCommand')); }
		            else if (typeof (menu.data('closeBeforeCommand')) != "undefined") { menu.data('closeBeforeCommand').call(this, null); }

		            if (menu.data('closeMethod') == 'fade') {
		                if (browser != 'OLD IE') {
		                    menu.fadeOut(menu.data('vitesse')).queue(function () {
		                        if (typeof (menu.data('closeAfterCommand')) == "string") { eval(menu.data('closeAfterCommand')); }
		                        else if (typeof (menu.data('closeAfterCommand')) != "undefined") { menu.data('closeAfterCommand').call(this, null); }
		                        $(this).dequeue();
		                    });
		                }
		                else {
		                    menu.hide().queue(function () {
		                        if (typeof (menu.data('closeAfterCommand')) == "string") { eval(menu.data('closeAfterCommand')); }
		                        else if (typeof (menu.data('closeAfterCommand')) != "undefined") { menu.data('closeAfterCommand').call(this, null); }
		                        $(this).dequeue();
		                    });
		                }
		            }
		            else if (menu.data('closeMethod') == 'hide') {
		                menu.hide().queue(function () {
		                    if (typeof (menu.data('closeAfterCommand')) == "string") { eval(menu.data('closeAfterCommand')); }
		                    else if (typeof (menu.data('closeAfterCommand')) != "undefined") { menu.data('closeAfterCommand').call(this, null); }
		                    $(this).dequeue();
		                });
		            }
		            else {
		                menu.hide(menu.data('closeMethod'), menu.data('vitesse')).queue(function () {
		                    if (typeof (menu.data('closeAfterCommand')) == "string") { eval(menu.data('closeAfterCommand')); }
		                    else if (typeof (menu.data('closeAfterCommand')) != "undefined") { menu.data('closeAfterCommand').call(this, null); }
		                    $(this).dequeue();
		                });
		            }

		            menu.find('*').removeClass('zone-nl');
		            menu.removeClass('zone-nl');
		            $('#' + menu.data('commandObj')).find('*').removeClass('zone-nl');

		            //arrêt des évènements de fermeture
		            if (menu.data('closeEvent') == 'unhover') { $('*').off('mouseover.' + menu.attr('id')); }
		            else if (menu.data('closeEvent') == 'blur') { $('*').off('click.' + menu.attr('id')); }
		            else if (menu.data('closeEvent') == 'click') { $('#' + menu.data('commandObj')).off('click.' + menu.attr('id')); }
		            if (menu.data('scrollHiding') == true) { $(window).off('scroll.' + menu.attr('id') + '_scrollHiding'); }
		            if (menu.data('resizeHiding') == true) { $(window).off('resize.' + menu.attr('id') + '_resizeHiding'); }

		            //arrêt de l'évènement sur le hovermenu déjà ouvert
		            if (menu.data('openAlreadyCommand') != undefined) { $('#' + menu.data('commandObj')).off('click.' + menu.attr('id') + '_alreadyOpened'); }

		            //arrêt du repositionnement
		            if (menu.data('adjustMode') == 'automatic') {
		                clearInterval(adjustLoaderEvent);
		                adjustLoaderEvent = null;
		            }
		            else if (menu.data('adjustMode') == 'window') {
		                $(window).off('resize.' + menu.attr('id') + '_adjustMode');
		                $(window).off('scroll.' + menu.attr('id') + '_adjustMode');
		            }

		        }
		    }


		    function Adjust() {
		        menu.data('top', Coordonnees_Y() - Decalage_Y() + parseFloat(menu.data('verticalMargin'))); // -$(document).scrollTop();
		        menu.data('left', Coordonnees_X() - Decalage_X() + parseFloat(menu.data('horizontalMargin'))); // -$(document).scrollLeft();
		        menu.data('width', menu.outerWidth());
		        menu.data('height', menu.outerHeight());
		        //$('#test').html(menu.data('top') + ' ' + menu.data('left') + ' ' + menu.data('width') + ' ' + menu.data('height'));
		        menu.css({ 'margin': '0', 'padding': '0', 'position': 'absolute', 'zIndex': 9999, 'top': menu.data('top'), 'left': menu.data('left') })
                    .width(menu.data('width'))
                    .height(menu.data('height'))
                    .prependTo('body');
		    }


		    function Coordonnees_X() {
		        var commandObjX = Math.round($('#' + menu.data('commandObj')).offset().left);
		        var commandObjY = Math.round($('#' + menu.data('commandObj')).offset().top);
		        var commandObjWidth = Math.round($('#' + menu.data('commandObj')).outerWidth());
		        var commandObjHeight = Math.round($('#' + menu.data('commandObj')).outerHeight());

		        switch (menu.data('commandObjPosition')) {
		            case "top-left":
		                return commandObjX;
		            case "top-center":
		                return Math.round(commandObjX + (commandObjWidth / 2));
		            case "top-right":
		                return (commandObjX + commandObjWidth);
		            case "right-middle":
		                return (commandObjX + commandObjWidth);
		            case "bottom-right":
		                return (commandObjX + commandObjWidth);
		            case "bottom-center":
		                return Math.round(commandObjX + (commandObjWidth / 2));
		            case "bottom-left":
		                return commandObjX;
		            case "left-middle":
		                return commandObjX;
		            case "center-middle":
		                return Math.round(commandObjX + (commandObjWidth / 2));
		        }
		    }


		    function Coordonnees_Y() {
		        var commandObjX = Math.round($('#' + menu.data('commandObj')).offset().left);
		        var commandObjY = Math.round($('#' + menu.data('commandObj')).offset().top);
		        var commandObjWidth = Math.round($('#' + menu.data('commandObj')).outerWidth());
		        var commandObjHeight = Math.round($('#' + menu.data('commandObj')).outerHeight());

		        switch (menu.data('commandObjPosition')) {
		            case "top-left":
		                return commandObjY;
		            case "top-center":
		                return commandObjY;
		            case "top-right":
		                return commandObjY;
		            case "right-middle":
		                return Math.round(commandObjY + (commandObjHeight / 2));
		            case "bottom-right":
		                return (commandObjY + commandObjHeight);
		            case "bottom-center":
		                return (commandObjY + commandObjHeight);
		            case "bottom-left":
		                return (commandObjY + commandObjHeight);
		            case "left-middle":
		                return Math.round(commandObjY + (commandObjHeight / 2));
		            case "center-middle":
		                return Math.round(commandObjY + (commandObjHeight / 2));
		        }
		    }


		    function Decalage_X() {
		        var menuX = Math.round(menu.offset().left);
		        var menuY = Math.round(menu.offset().top);
		        var menuWidth = Math.round(menu.outerWidth());
		        var menuHeight = Math.round(menu.outerHeight());

		        switch (menu.data('menuPosition')) {
		            case "top-left":
		                return 0;
		            case "top-center":
		                return Math.round(menuWidth / 2);
		            case "top-right":
		                return menuWidth;
		            case "right-middle":
		                return menuWidth;
		            case "bottom-right":
		                return menuWidth;
		            case "bottom-center":
		                return Math.round(menuWidth / 2);
		            case "bottom-left":
		                return 0;
		            case "left-middle":
		                return 0;
		            case "center-middle":
		                return Math.round(menuWidth / 2);
		        }
		    }


		    function Decalage_Y() {
		        var menuX = Math.round(menu.offset().left);
		        var menuY = Math.round(menu.offset().top);
		        var menuWidth = Math.round(menu.outerWidth());
		        var menuHeight = Math.round(menu.outerHeight());

		        switch (menu.data('menuPosition')) {
		            case "top-left":
		                return 0;
		            case "top-center":
		                return 0;
		            case "top-right":
		                return 0;
		            case "right-middle":
		                return Math.round(menuHeight / 2);
		            case "bottom-right":
		                return menuHeight;
		            case "bottom-center":
		                return menuHeight;
		            case "bottom-left":
		                return menuHeight;
		            case "left-middle":
		                return Math.round(menuHeight / 2);
		            case "center-middle":
		                return Math.round(menuHeight / 2);
		        }
		    }

		    //actions
		    if (menu.data('command') == 'init') { Init(); }
		    else if (menu.data('command') == 'adjust') { Adjust(); return false; }
		    else if (menu.data('command') == 'hide') { Hide(); return false; }
		    else if (menu.data('command') == 'close') { Hide(); return false; }
		    else if (menu.data('command') == 'show') { Show(); return false; }
		    else if (menu.data('command') == 'open') { Show(); return false; }


		}
	);
}
