//extensions jquery : modalpopup
//v2.6.5.B
//28/02/2015
//NL
//Created by LEBLOND Nicolas

$.fn.ModalPopUp = function (paramsJson) {

    //chemin
    var cheminModal = imgRelativePath + '/jquery-nl/modal/';

    //gestion spéciale selon le navigateur
    //nécessite "navigateurs-xxxxxx.js"
    var browser = navName;

    //variables
    var params = [];
    var modal = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (modal.data('command') == undefined) { modal.data('command', 'init'); } //open, show, close, hide, init, adjust, ''
    if (modal.data('backgroundTransparency') == undefined) { modal.data('backgroundTransparency', '1'); } //0, 1, 2
    if (modal.data('backgroundTransparencyLevel') == undefined) { modal.data('backgroundTransparencyLevel', '0.8'); } //0 => 1
    if (modal.data('backgroundType') == undefined) { modal.data('backgroundType', 'black'); } //white, black, grey, transparent
    if (modal.data('backgroundUrl') == undefined) { modal.data('backgroundUrl', cheminModal + 'background-modal-white.png'); }
    if (modal.data('backgroundOpenMethod') == undefined) { modal.data('backgroundOpenMethod', 'show'); } //show, slide, blind, clip, drop, fold, fade, bounce
    if (modal.data('backgroundCloseMethod') == undefined) { modal.data('backgroundCloseMethod', 'hide'); } //hide, slide, blind, clip, drop, fold, fade, bounce
    if (modal.data('backgroundOpenVitesse') == undefined) { modal.data('backgroundOpenVitesse', '400'); } //400, 500, 600...
    if (modal.data('backgroundCloseVitesse') == undefined) { modal.data('backgroundCloseVitesse', '400'); } //400, 500, 600...
    if (modal.data('modalOpenMethod') == undefined) { modal.data('modalOpenMethod', 'show'); } //show, slide, blind, clip, drop, fold, fade, bounce
    if (modal.data('modalCloseMethod') == undefined) { modal.data('modalCloseMethod', 'hide'); } //hide, slide, blind, clip, drop, fold, fade, bounce
    if (modal.data('modalOpenVitesse') == undefined) { modal.data('modalOpenVitesse', '400'); } //400, 500, 600...
    if (modal.data('modalCloseVitesse') == undefined) { modal.data('modalCloseVitesse', '400'); } //400, 500, 600...
    if (modal.data('position') == undefined) { modal.data('position', 'top'); } //top, middle
    if (modal.data('adjustMode') == undefined) { modal.data('adjustMode', 'window'); } //automatic, manual, window
    if (modal.data('backgroundZIndex') == undefined) { modal.data('backgroundZIndex', '8000'); } //1-9999
    if (modal.data('modalZIndex') == undefined) { modal.data('modalZIndex', '9000'); } //1-9999
    if (modal.data('vitesse') == undefined) { modal.data('vitesse', ''); } //'' (pas de forcage), 400, 500, 600...
    if (modal.data('modalMarginTop') == undefined) { modal.data('modalMarginTop', 20); } //20, 30, 40...
    if (modal.data('closeByBackgroundClick') == undefined) { modal.data('closeByBackgroundClick', false); } //true, false
    if (modal.data('closeByEscape') == undefined) { modal.data('closeByEscape', true); } //true, false
    if (modal.data('overflowHidden') == undefined) { modal.data('overflowHidden', false); } //true, false
    if (modal.data('draggable') == undefined) { modal.data('draggable', false); } //true, false
    if (modal.data('draggableClass') == undefined) { modal.data('draggableClass', null); }
    if (modal.data('undraggableClass') == undefined) { modal.data('undraggableClass', null); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == 'command') { modal.data('command', val); }
                if (key == "backgroundTransparency") { modal.data('backgroundTransparency', val); }
                if (key == 'backgroundType') { modal.data('backgroundType', val); }
                if (key == 'backgroundUrl') { modal.data('backgroundUrl', val); }
                if (key == 'backgroundOpenMethod') { modal.data('backgroundOpenMethod', val); }
                if (key == 'backgroundCloseMethod') { modal.data('backgroundCloseMethod', val); }
                if (key == 'backgroundOpenVitesse') { modal.data('backgroundOpenVitesse', val); }
                if (key == 'backgroundCloseVitesse') { modal.data('backgroundCloseVitesse', val); }
                if (key == 'modalOpenMethod') { modal.data('modalOpenMethod', val); }
                if (key == 'modalCloseMethod') { modal.data('modalCloseMethod', val); }
                if (key == 'modalOpenVitesse') { modal.data('modalOpenVitesse', val); }
                if (key == 'modalCloseVitesse') { modal.data('modalCloseVitesse', val); }
                if (key == 'position') { modal.data('position', val); }
                if (key == 'mode') { modal.data('adjustMode', val); } //retrocompatibilité
                if (key == 'adjustMode') { modal.data('adjustMode', val); }
                if (key == 'backgroundZIndex') { modal.data('backgroundZIndex', val); }
                if (key == 'modalZIndex') { modal.data('modalZIndex', val); }
                if (key == 'vitesse') { modal.data('', val); }
                if (key == 'modalMarginTop') { modal.data('modalMarginTop', val); }
                if (key == 'closeByBackgroundClick') { modal.data('closeByBackgroundClick', val); }
                if (key == 'closeByEscape') { modal.data('closeByEscape', val); }
                if (key == 'overflowHidden') { modal.data('overflowHidden', val); }
                if (key == 'draggable') { modal.data('draggable', val); }
                if (key == 'draggableClass') { modal.data('draggableClass', val); }
                if (key == 'undraggableClass') { modal.data('undraggableClass', val); }
                i++;
            });
        }
        catch (e) {
            modal.data('command', paramsJson);
        }
    }
    else { modal.data('command', 'init'); }


    return this.each(
		function () {

		    function Init() {

		        //correction d'erreur    
		        if (modal.data('position') == 'center') { modal.data('position', 'middle'); }

		        modal.hide();

		    }

		    function Gestion_Parameters() {

		        if (modal.data('uniqueId') == undefined) { modal.data('uniqueId', $.guid); }

		        if (modal.data('backgroundType') == 'black') { modal.data('backgroundUrl', cheminModal + 'background-modal-black.png'); }
		        else if (modal.data('backgroundType') == 'white') { modal.data('backgroundUrl', cheminModal + 'background-modal-white.png'); }
		        else if (modal.data('backgroundType') == 'transparent') {
		            modal.data('backgroundUrl', cheminModal + 'background-modal-transparent.png');
		            modal.data('backgroundCloseMethod', 'hide');
		            modal.data('backgroundOpenMethod', 'show');
		        }
		        else if (modal.data('backgroundType') == 'gray') {
		            modal.data('backgroundUrl', cheminModal + 'background-modal-gray.png');
		        }

		        if ((modal.data('vitesse') != undefined) && (modal.data('vitesse') != '')) {
		            modal.data('backgroundOpenVitesse', modal.data('vitesse'));
		            modal.data('backgroundCloseVitesse', modal.data('vitesse'));
		            modal.data('modalOpenVitesse', modal.data('vitesse'));
		            modal.data('modalCloseVitessse', modal.data('vitesse'));
		        }

		        if (modal.data('closeByEscape') == true) {
		            $(document).bind('keydown', function (e) {
		                var code = e.keyCode ? e.keyCode : e.which;
		                if (code == 27) { Close(); }
		            });
		        }

		        try {
		            if (modal.data('draggable') == true) {
		                if ((modal.data('draggableClass') == null) && (modal.data('undraggableClass') == null)) { modal.draggable(); }
		                else if ((modal.data('draggableClass') != null) && (modal.data('undraggableClass') == null)) { modal.draggable({ 'handle': '.' + modal.data('draggableClass') }); }
		                else if ((modal.data('draggableClass') == null) && (modal.data('undraggableClass') != null)) { modal.draggable({ 'cancel': '.' + modal.data('undraggableClass') }); }
		                else if ((modal.data('draggableClass') != null) && (modal.data('undraggableClass') != null)) { modal.draggable({ 'handle': '.' + modal.data('draggableClass'), 'cancel': '.' + modal.data('undraggableClass') }); }
		            }
		        }
                catch (ex) { }

		    }

		    function Gestion_Background(opt) {
		        if (browser == 'MSIE 6') {
		            var myHeight = document.body.scrollTop + document.documentElement.scrollTop + document.documentElement.clientHeight;
		            if (myHeight < modal.outerHeight()) { myHeight = modal.outerHeight(); }
		            var myWidth = document.body.scrollLeft + document.documentElement.scrollLeft + document.documentElement.clientWidth;
		            if (myWidth < modal.outerWidth()) { myWidth = modal.outerWidth(); }
		            if (opt == 'init') {
		                if ($('#background_modal_' + modal.data('uniqueId'))) { $('#background_modal_' + modal.data('uniqueId')).remove(); }
		                $(document.createElement('div'))
	                        .attr('id', 'background_modal_' + modal.data('uniqueId'))
	                        .css({
	                            'position': 'absolute',
	                            'top': 0,
	                            'left': 0,
	                            'height': myHeight,
	                            'width': myWidth,
	                            'zIndex': parseInt(modal.data('backgroundZIndex'))
	                        })
	                        .appendTo($('body'))
	                        .hide();
		                //gestion de la transparence
		                if (modal.data('backgroundTransparency') == 0) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'backgroundColor': modal.data('backgroundType')
		                    });
		                }
		                else if ((modal.data('backgroundTransparency') == 1) || (modal.data('backgroundTransparency') == 2)) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + modal.data('backgroundUrl') + "', sizingMethod='scale')"
		                    });
		                }
		            }
		            else if (opt == 'adjust') {
		                $('#background_modal_' + modal.data('uniqueId')).css({ position: 'absolute', top: 0, left: 0, height: myHeight, width: myWidth });
		            }
		        }
		        ////////////////////////////////////////////////////////
		        else if ((browser == 'Safari/iPad') || (browser == 'Safari/iPhone') || (browser == 'Safari/iPod')) {
		            var myHeight = document.body.scrollHeight;
		            var myWidth = document.body.scrollWidth;
		            if (opt == 'init') {
		                if ($('#background_modal_' + modal.data('uniqueId'))) { $('#background_modal_' + modal.data('uniqueId')).remove(); }
		                $(document.createElement('div'))
	                        .attr('id', 'background_modal_' + modal.data('uniqueId'))
	                        .css({
	                            'position': 'absolute',
	                            'top': 0,
	                            'right': 0,
	                            'bottom': 0,
	                            'left': 0,
	                            'height': myHeight,
	                            'width': myWidth,
	                            'zIndex': parseInt(modal.data('backgroundZIndex'))
	                        })
                            .appendTo($('body'))
	                        .hide();
		                //gestion de la transparence
		                if (modal.data('backgroundTransparency') == 0) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'backgroundColor': modal.data('backgroundType')
		                    });
		                }
		                else if (modal.data('backgroundTransparency') == 1) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'backgroundImage': 'url(' + modal.data('backgroundUrl') + ')'
		                    });
		                }
		                else if (modal.data('backgroundTransparency') == 2) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'opacity': parseInt(modal.data('backgroundTransparencyLevel')),
		                        'filter': 'alpha(opacity=' + (parseInt(modal.data('backgroundTransparencyLevel')) * 100) + ')'
		                    });
		                }
		            }
		            else if (opt == 'adjust') {
		                $('#background_modal_' + modal.data('uniqueId')).css({ position: 'absolute', height: myHeight, width: myWidth });
		            }
		        }
		        ////////////////////////////////////////////////////////
		        else {
		            if (opt == 'init') {
		                if ($('#background_modal_' + modal.data('uniqueId'))) { $('#background_modal_' + modal.data('uniqueId')).remove(); }
		                $(document.createElement('div'))
	                        .attr('id', 'background_modal_' + modal.data('uniqueId'))
	                        .css({
	                            'position': 'fixed',
	                            'top': 0,
	                            'right': 0,
	                            'bottom': 0,
	                            'left': 0,
	                            'height': '100%',
	                            'width': '100%',
	                            'zIndex': parseInt(modal.data('backgroundZIndex'))
	                        })
	                        .appendTo($('body'))
	                        .hide();
		                //gestion de la transparence
		                if (modal.data('backgroundTransparency') == 0) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'backgroundColor': modal.data('backgroundType')
		                    });
		                }
		                else if (modal.data('backgroundTransparency') == 1) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'backgroundImage': 'url(' + modal.data('backgroundUrl') + ')'
		                    });
		                }
		                else if (modal.data('backgroundTransparency') == 2) {
		                    $('#background_modal_' + modal.data('uniqueId')).css({
		                        'opacity': parseInt(modal.data('backgroundTransparencyLevel')),
		                        'filter': 'alpha(opacity=' + (parseInt(modal.data('backgroundTransparencyLevel')) * 100) + ')'
		                    });
		                }
		            }
		            else if (opt == 'adjust') {
		                //rien à faire, c'est du "fixed"
		            }
		        }
		        //événement sur le background qui vient d'être créé
		        if (opt == 'init') {
		            if (modal.data('closeByBackgroundClick') == true) {
		                $('#background_modal_' + modal.data('uniqueId')).off('click').on('click', function () { Close(); });
		            }
		        }
		    }

		    function Gestion_Modal(opt) {
		        var myTop = 0;
		        var myLeft = 0;
		        //position top/center repositionnée X, non repositionnée Y
		        if (modal.data('position') == 'top') {
		            if ((browser == 'Safari/iPad') || (browser == 'Safari/iPhone') || (browser == 'Safari/iPod')) {
		                myTop = (window.pageYIndex) + (document.documentElement.scrollHeight / 2) - (modal.outerHeight() / 2);
		                myLeft = (window.pageXIndex) + (document.documentElement.scrollWidth / 2) - (modal.outerWidth() / 2);
		            }
		            else {
		                if (document.body.scrollTop == document.documentElement.scrollTop) { //en règle générale quand il n'y a pas de DOCTYPE
		                    myTop = document.documentElement.scrollTop;
		                }
		                else {
		                    myTop = document.body.scrollTop + document.documentElement.scrollTop;
		                }
		                myLeft = (document.documentElement.clientWidth / 2) - (modal.outerWidth() / 2);
		            }
		            myTop += parseInt(modal.data('modalMarginTop'));
		            if (opt == 'init') {
		                modal.css({
		                    'position': 'absolute',
		                    'top': myTop,
		                    'left': myLeft,
		                    'zIndex': parseInt(modal.data('modalZIndex'))
		                });
		                modal.data('top', myTop);
		                modal.data('left', myLeft);
		            }
		            else if (opt == 'adjust') {
		                if (modal.data('top') > myTop) {
		                    modal.css({
		                        top: myTop,
		                        left: myLeft
		                    });
		                    modal.data('top', myTop);
		                    modal.data('left', myLeft);
		                }
		            }
		        }
		        //position center/middle repositionnée X et Y
		        else if (modal.data('position') == 'middle') {
		            ////////////////////////////////////////////////////////
		            if (browser == 'MSIE 6') {
		                if (document.documentElement.clientHeight > modal.outerHeight()) {
		                    myTop = (document.body.scrollTop + document.documentElement.scrollTop) + (document.documentElement.clientHeight / 2) - (modal.outerHeight() / 2);
		                    if (myTop < 0) { myTop = document.body.scrollTop + document.documentElement.scrollTop; }
		                }
		                else { myTop = 0; }
		                myLeft = (document.documentElement.clientWidth / 2) - (modal.outerWidth() / 2);
		                if (myLeft < 0) { myLeft = 0; }
		                modal.css({
		                    'position': 'absolute',
		                    'left': myLeft,
		                    'top': myTop,
		                    'zIndex': parseInt(modal.data('modalZIndex'))
		                });
		            }
		            ////////////////////////////////////////////////////////
		            else if (((browser == 'Safari/iPad') || (browser == 'Safari/iPhone') || (browser == 'Safari/iPod')) && (window.pageYIndex != undefined)) {
		                myTop = (window.pageYIndex) + (document.documentElement.scrollHeight / 2) - (modal.outerHeight() / 2);
		                myLeft = (window.pageXIndex) + (document.documentElement.scrollWidth / 2) - (modal.outerWidth() / 2);
		                modal.css({
		                    'position': 'absolute',
		                    'left': myTop,
		                    'top': myLeft,
		                    'zIndex': parseInt(modal.data('modalZIndex'))
		                });
		            }
		            ////////////////////////////////////////////////////////
		            else {
		                var myPosition = 'fixed';
		                var myMarginTop = -(modal.outerHeight() / 2);
		                var myMarginLeft = -(modal.outerWidth() / 2);
		                myTop = '50%';
		                myLeft = '50%';
		                if (document.body.scrollTop + document.documentElement.scrollTop + document.documentElement.clientHeight < modal.outerHeight()) {
		                    myTop = 0;
		                    myMarginTop = 0;
		                    myPosition = 'absolute';
		                }
		                if (document.body.scrollLeft + document.documentElement.scrollLeft + document.documentElement.clientWidth < modal.outerWidth()) {
		                    myLeft = 0;
		                    myMarginLeft = 0;
		                    myPosition = 'absolute';
		                }
		                modal.css({
		                    'position': myPosition,
		                    'top': myTop,
		                    'left': myLeft,
		                    'marginLeft': myMarginLeft,
		                    'marginTop': myMarginTop,
		                    'zIndex': parseInt(modal.data('modalZIndex'))
		                });
		            }
		            modal.data('top', myTop);
		            modal.data('left', myLeft);
		        }
		        modal.data('height', modal.outerHeight());
		        modal.data('width', modal.outerWidth());
		    }

		    function Open() {

		        Gestion_Parameters();
		        Gestion_Background('init');
		        Gestion_Modal('init');

		        //////////////////////////////////////////////////////
		        if (browser == 'MSIE 6') {
		            $('#background_modal_' + modal.data('uniqueId')).show();
		            modal.show();
		        }
		        ////////////////////////////////////////////////////////
		        else if ((browser == 'Safari/iPad') || (browser == 'Safari/iPhone') || (browser == 'Safari/iPod')) {
		            if (modal.data('backgroundOpenMethod') == 'fade') { $('#background_modal_' + modal.data('uniqueId')).fadeIn(parseInt(modal.data('backgroundOpenVitesse'))); }
		            else if (modal.data('backgroundOpenMethod') == 'show') { $('#background_modal_' + modal.data('uniqueId')).show(); }
		            else { $('#background_modal_' + modal.data('uniqueId')).show(modal.data('backgroundOpenMethod'), '', parseInt(modal.data('backgroundOpenVitesse'))); }

		            if (modal.data('modalOpenMethod') == 'fade') { modal.fadeIn(parseInt(modal.data('modalOpenVitesse'))); }
		            else if (modal.data('modalOpenMethod') == 'show') { modal.show(); }
		            else { modal.show(modal.data('modalOpenMethod'), '', parseInt(modal.data('modalOpenVitesse'))); }
		        }
		        ////////////////////////////////////////////////////////
		        else {
		            if (modal.data('backgroundOpenMethod') == 'fade') { $('#background_modal_' + modal.data('uniqueId')).fadeIn(parseInt(modal.data('backgroundOpenVitesse'))); }
		            else if (modal.data('backgroundOpenMethod') == 'show') { $('#background_modal_' + modal.data('uniqueId')).show(); }
		            else { $('#background_modal_' + modal.data('uniqueId')).show(modal.data('backgroundOpenMethod'), '', parseInt(modal.data('backgroundOpenVitesse'))); }

		            if (modal.data('modalOpenMethod') == 'fade') { modal.fadeIn(parseInt(modal.data('modalOpenVitesse'))); }
		            else if (modal.data('modalOpenMethod') == 'show') { modal.show(); }
		            else { modal.show(modal.data('modalOpenMethod'), '', parseInt(modal.data('modalOpenVitesse'))) }
		        }

		        //gestion du repositionnement
		        if (modal.data('adjustMode') == 'automatic') {
		            modal.data('adjustModalEvent', setInterval(function () { Adjust(); }, 10));
		        }
		        else if (modal.data('adjustMode') == 'window') {
		            $(window).on('resize.' + modal.attr('id') + '_adjustMode', function () { Adjust(); return false; });
		            $(window).on('scroll.' + modal.attr('id') + '_adjustMode', function () { Adjust(); return false; });
		        }

		        //gestion du overflow
		        if (modal.data('overflowHidden') == true) { $('body').css({ 'overflow': 'hidden' }); }

		    }

		    function Adjust() {
		        Gestion_Background('adjust');
		        Gestion_Modal('adjust');
		    }

		    function Close() {
		        if (browser == 'MSIE 6') {
		            $('#background_modal_' + modal.data('uniqueId')).hide().remove();
		            modal.hide();
		        }
		        else {
		            if (modal.data('backgroundCloseMethod') == 'fade') {
		                $('#background_modal_' + modal.data('uniqueId')).fadeOut(modal.data('backgroundCloseVitesse')).queue(function () {
		                    $(this).remove();
		                    $(this).dequeue();
		                });
		            }
		            else if (modal.data('backgroundCloseMethod') == 'hide') {
		                $('#background_modal_' + modal.data('uniqueId')).hide().queue(function () {
		                    $(this).remove();
		                    $(this).dequeue();
		                });
		            }
		            else {
		                $('#background_modal_' + modal.data('uniqueId')).hide(modal.data('backgroundCloseMethod'), '', modal.data('backgroundCloseVitesse')).queue(function () {
		                    $(this).remove();
		                    $(this).dequeue();
		                });
		            }
		            if (modal.data('modalCloseMethod') == 'fade') { modal.fadeOut(modal.data('modalCloseVitesse')); }
		            else if (modal.data('modalCloseMethod') == 'hide') { modal.hide(); }
		            else { modal.hide(modal.data('modalCloseMethod'), '', modal.data('modalCloseVitesse')); }
		        }

		        //arrêt du repositionnement
		        if (modal.data('adjustMode') == 'automatic') {
		            clearInterval(modal.data('adjustModalEvent'));
		            modal.data('adjustModalEvent', null);
		        }
		        else if (modal.data('adjustMode') == 'window') {
		            $(window).off('resize.' + modal.attr('id') + '_adjustMode');
		            $(window).off('scroll.' + modal.attr('id') + '_adjustMode');
		        }

		        //arêt de l'écoute du "escape"
		        if (modal.data('closeByEscape') == true) { $(document).unbind('keydown'); }

		        //gestion du overflow
		        if (modal.data('overflowHidden') == true) { $('body').css({ 'overflow': 'auto' }); }

		    }

		    //actions
		    if ((modal.data('command') == 'close') || (modal.data('command') == 'hide')) { Close(); return false; }
		    else if ((modal.data('command') == 'open') || (modal.data('command') == 'show')) { Open(); return false; }
		    else if (modal.data('command') == 'adjust') { Adjust(); return false; }
		    else if (modal.data('command') == 'init') { Init(); return false; }

		}
	);
}
