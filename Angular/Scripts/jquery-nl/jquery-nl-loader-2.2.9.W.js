//extensions jquery : loader
//v2.2.9.W
//05/09/2014

//NL
//Created by LEBLOND Nicolas

//à faire
//gérer les classes en plus des ids


$.fn.Loader = function (paramsJson) {

    //chemin
    if (imgRelativePath == null) { imgRelativePath = 'images'; }
    var cheminLoader = imgRelativePath + '/jquery-nl/loader/';

    //variables
    var params = [];
    var obj = $(this);
    var adjustLoaderEvent;

    //variables + valeurs par défaut si aucune valeur stockée
    if (obj.data('command') == undefined) { obj.data('command', ''); } //show, hide, adjust, init, ''
    if (obj.data('imageURL') == undefined) { obj.data('imageURL', cheminLoader + 'ajax-loader.gif'); }
    if (obj.data('text') == undefined) { obj.data('text', 'Chargement en cours'); }
    if (obj.data('textBorder') == undefined) { obj.data('textBorder', false); } //false, true
    if (obj.data('textBorderColor') == undefined) { obj.data('textBorderColor', 'silver'); }
    if (obj.data('textColor') == undefined) { obj.data('textColor', 'silver'); }
    if (obj.data('textBackgroundColor') == undefined) { obj.data('textBackgroundColor', '#FFFFFF'); }
    if (obj.data('textFont') == undefined) { obj.data('textFont', 'Arial'); }
    if (obj.data('textSize') == undefined) { obj.data('textSize', '10px'); }
    if (obj.data('backgroundType') == undefined) { obj.data('backgroundType', 'white'); } //white, black, transparent, gray
    if (obj.data('backgroundURL') == undefined) { obj.data('backgroundURL', cheminLoader + 'background-loader-white.png'); }
    if (obj.data('backgroundTransparency') == undefined) { obj.data('backgroundTransparency', '1'); } //0, 1, 2
    if (obj.data('backgroundTransparencyLevel') == undefined) { obj.data('backgroundTransparencyLevel', '0.8'); } //0 => 1
    if (obj.data('positionVerticale') == undefined) { obj.data('positionVerticale', 'middle'); } //top, middle, bottom
    if (obj.data('positionHorizontale') == undefined) { obj.data('positionHorizontale', 'center'); } //left, center, right
    if (obj.data('openMethod') == undefined) { obj.data('openMethod', 'show'); } //slide, blind, clip, drop, fold, fade, show
    if (obj.data('closeMethod') == undefined) { obj.data('closeMethod', 'hide'); } //slide, blind, clip, drop, fold, fade, show
    if (obj.data('zIndex') == undefined) { obj.data('zIndex', '9999'); } //1-9999
    if (obj.data('vitesse') == undefined) { obj.data('vitesse', '400'); } //400, 500, 600...
    if (obj.data('adjustMode') == undefined) { obj.data('adjustMode', 'window'); } //automatic, manual, window
    if (obj.data('image') == undefined) { obj.data('image', 'true'); } //false, true
    if (obj.data('texte') == undefined) { obj.data('texte', 'true'); } //false, true

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == "command") { obj.data('command', val); }
                if (key == "imageURL") { obj.data('imageURL', val); }
                if (key == "textBorderColor") { obj.data('textBorderColor', val); }
                if (key == "text") { obj.data('text', val); }
                if (key == "textBorder") { obj.data('textBorder', val); }
                if (key == "textColor") { obj.data('textColor', val); }
                if (key == "textFont") { obj.data('textFont', val); }
                if (key == "textSize") { obj.data('textSize', val); }
                if (key == "textBackgroundColor") { obj.data('textBackgroundColor', val); }
                if (key == "backgroundType") { obj.data('backgroundType', val); }
                if (key == "backgroundTransparency") { obj.data('backgroundTransparency', val); }
                if (key == "backgroundTransparencyLevel") { obj.data('backgroundTransparencyLevel', val); }
                if (key == "positionVerticale") { obj.data('positionVerticale', val); }
                if (key == "positionHorizontale") { obj.data('positionHorizontale', val); }
                if (key == "openMethod") { obj.data('openMethod', val); }
                if (key == "closeMethod") { obj.data('closeMethod', val); }
                if (key == "zIndex") { obj.data('zIndex', val); }
                if (key == "vitesse") { obj.data('vitesse', val); }
                if (key == "mode") { obj.data('adjustMode', val); } //retrocompatibilité
                if (key == "adjustMode") { obj.data('adjustMode', val); }
                if (key == "image") { obj.data('image', val); }
                if (key == "texte") { obj.data('texte', val); }
                i++;
            });
        }
        catch (e) {
            obj.data('command', paramsJson);
        }
    }
    else { obj.data('command', ''); }


    return this.each(
		function () {

		    function Init() {

		        if (obj.data('backgroundType') == 'black') { obj.data('backgroundURL', cheminLoader + 'background-loader-black.png'); }
		        else if (obj.data('backgroundType') == 'white') { obj.data('backgroundURL', cheminLoader + 'background-loader-white.png'); }
		        else if (obj.data('backgroundType') == 'gray') { obj.data('backgroundURL', cheminLoader + 'background-loader-gray.png'); }
		        else if (obj.data('backgroundType') == 'transparent') {
		            obj.data('backgroundURL', cheminLoader + 'background-loader-transparent.png');
		            obj.data('closeMethod', 'hide');
		            obj.data('openMethod', 'show');
		        }

		    }

		    function Show(opt) {

		        if (opt == 1) { //loader plein écran
		            //création du loader
		            if ($('#div_chargement_fullscreen').length == 0) {
		                var loader = '';
		                loader += '<table cellpadding="0" cellspacing="0" border="0"';
		                loader += ' style="padding:6px;';
		                if (obj.data('textBorder')) {
		                    loader += ' border:solid 1px ' + obj.data('textBorderColor') + '; ';
		                }
		                loader += ' color:' + obj.data('textColor') + ';';
		                loader += ' background-color:' + obj.data('textBackgroundColor') + ';"';
		                loader += '>';
		                loader += '<tr>';
		                if (obj.data('image')) {
		                    loader += '<td style="padding:4px;"><img id="img_chargement" src="' + obj.data('imageURL') + '" title="' + obj.data('text') + '" border="0" /></td>';
		                }
		                if (obj.data('texte')) {
		                    loader += '<td style="padding:6px; font-family:' + obj.data('textFont') + '; color:' + obj.data('textColor') + '; font-size:' + obj.data('textSize') + ';">' + obj.data('text') + '</td>';
		                }
		                loader += '</tr>';
		                loader += '</table>';
		                $(document.createElement('div'))
		                    .attr('id', 'div_chargement_fullscreen')
		                    .html(loader)

		                    .hide()
		                    .appendTo($('body'))
                            .ModalPopUp({
                                'command': 'init',
                                'backgroundOpenMethod': obj.data('openMethod'),
                                'backgroundOpenVitesse': '0',
                                'backgroundCloseMethod': obj.data('closeMethod'),
                                'backgroundCloseVitesse': '0',
                                'backgroundType': obj.data('backgroundType'),
                                'backgroundTransparency': obj.data('backgroundTransparency'),
                                'position': 'center',
                                'backgroundZIndex': obj.data('zIndex'),
                                'modalZIndex': parseInt(obj.data('zIndex')) + 1
                            });
		                //affichage du loader comme une modal
		                $('#div_chargement_fullscreen').ModalPopUp('open');
		            }
		        }

		        else if (opt == 2) { //loader sur objet

		            obj.data('height', obj.outerHeight());
		            obj.data('largeur', obj.outerWidth());
		            obj.data('top', Math.round(obj.offset().top));
		            obj.data('left', Math.round(obj.offset().left));

		            var loader = '';
		            loader += '<table cellpadding="0" cellspacing="0" border="0" style="height:100%; width:100%;">';
		            loader += '<tr>';
		            loader += '<td style="height:100%; width:100%; text-align:' + obj.data('positionHorizontale') + '; vertical-align:' + obj.data('positionVerticale') + ';" align="' + obj.data('positionHorizontale') + '" valign="' + obj.data('positionVerticale') + '">';
		            loader += '<img src="' + obj.data('imageURL') + '" title="' + obj.data('text') + '" border="0" style="padding:5px 5px 5px 5px;" />';
		            loader += '</td>';
		            loader += '</tr>';
		            loader += '</table>';

		            $(document.createElement('div'))
				        .attr('id', 'div_chargement_' + obj.attr('id'))
                        .width(obj.data('largeur'))
		                .height(obj.data('height'))
                        .html(loader)
                        .appendTo($('body'))
                        .hide();

		            if (obj.data('backgroundTransparency') == 0) {
		                $('#div_chargement_' + obj.attr('id')).css({
		                    'position': 'absolute',
		                    'zIndex': obj.data('zIndex'),
		                    'left': obj.data('left'),
		                    'top': obj.data('top'),
		                    'backgroundColor': obj.data('backgroundType')
		                });
		            }
		            else if (obj.data('backgroundTransparency') == 1) {
		                $('#div_chargement_' + obj.attr('id')).css({
		                    'position': 'absolute',
		                    'zIndex': obj.data('zIndex'),
		                    'left': obj.data('left'),
		                    'top': obj.data('top'),
		                    'backgroundImage': 'url(' + obj.data('backgroundURL') + ')'
		                });
		            }
		            else if (obj.data('backgroundTransparency') == 2) {
		                $('#div_chargement_' + obj.attr('id')).css({
		                    'position': 'absolute',
		                    'zIndex': obj.data('zIndex'),
		                    'left': obj.data('left'),
		                    'top': obj.data('top'),
		                    'backgroundColor': obj.data('backgroundType'),
		                    'opacity': parseInt(obj.data('backgroundTransparencyLevel')),
		                    'filter': 'alpha(opacity=' + (parseInt(obj.data('backgroundTransparencyLevel')) * 100) + ')'
		                });
		            }
		            $('#div_chargement_' + obj.attr('id')).position({ 'top': obj.data('top'), 'left': obj.data('left') });

		            if (obj.data('openMethod') == 'show') { $('#div_chargement_' + obj.attr('id')).show(); }
		            else if (obj.data('openMethod') == 'fade') { $('#div_chargement_' + obj.attr('id')).fadeIn(400); }
		            else { $('#div_chargement_' + obj.attr('id')).show(obj.data('openMethod')); }
		        }

		        //gestion du repositionnement
		        if (obj.data('adjustMode') == 'automatic') {
		            adjustLoaderEvent = setInterval(
                            function () {
                                var newLeft = Math.round(obj.offset().left);
                                var newTop = Math.round(obj.offset().top);
                                var newHeight = obj.outerHeight();
                                var newWidth = obj.outerWidth();
                                if ((obj.data('top') != newTop) || (obj.data('left') != newLeft) || (obj.data('height') != newHeight) || (obj.data('width') != newWidth)) {
                                    Adjust();
                                }
                                return false;
                            }, 10);
		        }
		        else if (obj.data('adjustMode') == 'window') {
		            $(window).on('resize.' + obj.attr('id') + '_adjustMode', function () { Adjust(); return false; });
		            $(window).on('scroll.' + obj.attr('id') + '_adjustMode', function () { Adjust(); return false; });
		        }
		    }

		    function Hide() {

		        try {
		            $('#div_chargement_fullscreen').queue(function () {
		                $(this).ModalPopUp('close');
		                $(this).remove();
		                $(this).dequeue();
		            });
		        }
		        catch (ex) { }

		        try {

		            //fermeture
		            if (obj.data('closeMethod') == 'hide') {
		                $('#div_chargement_' + obj.attr('id')).hide().remove();
		            }
		            else if (obj.data('closeMethod') == 'fade') {
		                $('#div_chargement_' + obj.attr('id'))
                            .fadeOut(obj.data('vitesse'))
		                    .queue(function () {
		                        $(this).remove();
		                        $(this).dequeue();
		                    });
		            }
		            else {
		                $('#div_chargement_' + obj.attr('id'))
                            .hide(obj.data('closeMethod'), obj.data('vitesse'))
                            .queue(function () {
                                $(this).remove();
                                $(this).dequeue();
                            });
		            }
		        }
		        catch (ex) { }

		        //arrêt du repositionnement
		        if (obj.data('adjustMode') == 'automatic') {
		            clearInterval(adjustLoaderEvent);
		            adjustLoaderEvent = null;
		        }
		        else if (obj.data('adjustMode') == 'window') {
		            $(window).off('resize.' + obj.attr('id') + '_adjustMode');
		            $(window).off('scroll.' + obj.attr('id') + '_adjustMode');
		        }

		        //suppression des données stockées
		        obj.removeData();
		    }

		    function Adjust() {
		        //stockage
		        obj.data('height', obj.outerHeight());
		        obj.data('largeur', obj.outerWidth());
		        obj.data('top', obj.offset().top);
		        obj.data('left', obj.offset().left);
		        //ajustement
		        $('#div_chargement_' + obj.attr('id'))
                    .css({ 'left': obj.data('left'), 'top': obj.data('top') })
                    .width(obj.data('largeur'))
                    .height(obj.data('height'));
		    }


		    //actions
		    if (obj.data('command') == 'hide') { Hide(); return false; }
		    if (obj.data('command') == 'adjust') { Adjust(); return false; }
		    else { //'', 'init', 'show'
		        Init();

		        //commandes d'initialisation
		        if (obj.attr('id')) {
		            if (obj.attr('id') == $('body').attr('id')) { Show(1); }
		            else {
		                if (!(obj.is(':visible'))) { Show(1); }
		                else if (obj.innerHeight() > 0) { Show(2); }
		                else { Show(1); }
		            }
		        }
		        else { Show(1); }
		    }


		}
    );
}


//pour la compatibilité avec les anciennes versions du loader
function CallBack_Loading(objId, positionHorizontale, positionVerticale) {
    var obj = $('#' + objId);
    if (obj.data('positionHorizontale') == undefined) { obj.data('positionHorizontale', 'center'); }
    if (obj.data('positionVerticale') == undefined) { obj.data('positionVerticale', 'middle'); }
    obj.Loader({ 'command': 'open', 'positionHorizontale': obj.data('positionHorizontale'), 'positionVerticale': obj.data('positionVerticale') });
}

function CallBack_Loaded(objId) {
    var obj = $('#' + objId);
    obj.Loader('hide');
}


//pour un updatepanel/scriptmanager (met un loader sur l'objet dont l'ID est dans le champ caché "__refresh")
try {
    Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(beginLoaderHandle);
    function beginLoaderHandle(sender, Args) {
        //alert('début : ' + $('#__refresh').val());
        if ($('#__refresh').val() != '') {
            $('#' + $('#__refresh').val()).Loader('show');
        }
        else {
            $('body').Loader('show');
        }
    }

    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endLoaderHandle);
    function endLoaderHandle(sender, Args) {
        //alert('fin : ' + $('#__refresh').val());
        if ($('#__refresh').val() != '') {
            $('#' + $('#__refresh').val()).Loader('hide');
        }
        else {
            $('body').Loader('hide');
        }
    }
}
catch (ex) {
    //alert(ex);
}