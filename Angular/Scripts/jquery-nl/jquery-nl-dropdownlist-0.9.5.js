//extensions jquery : select
//v0.9.5
//02/04/2013
//NL
//Created by LEBLOND Nicolas and TERREN Florent

$.fn.DropDownList = function (paramsJson) {

    //variables
    var params = [];
    var select = $(this);
    var offset = $(this).offset();

    var openMethod;
    var closeMethod;
    var vitesse;

    var divClass;
    var selectClass;
    var itemClass;
    var itemHoverClass;
    var selectedClass;
    var divWidth;
    var divHeight;


    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {

                if (key == "openMethod") { openMethod = val; }
                if (key == "closeMethod") { closeMethod = val; }
                if (key == "vitesse") { vitesse = val; }

                if (key == "divClass") { divClass = val; }
                if (key == "selectClass") { selectClass = val; }
                if (key == "itemClass") { itemClass = val; }
                if (key == "itemHoverClass") { itemHoverClass = val; }
                if (key == "selectedClass") { selectedClass = val; }

                if (key == "divWidth") { divWidth = val; }
                if (key == "divHeight") { divHeight = val; }

                i++;
            });
        }
        catch (e) { }
    }
    else { }

    return this.each(
		function () {

		    //init
		    function Init() {

		        //		        alert(
		        //                        select.position().top + ' ' + select.offset().top
		        //                         + '\r\n'
		        //                         + select.position().left + ' ' + select.offset().left
		        //                         );


		        //défaut
		        if (openMethod == undefined) { openMethod = 'fade'; }
		        if (closeMethod == undefined) { closeMethod = 'fade'; }
		        if (vitesse == undefined) { vitesse = 400; }
		        if (selectClass == undefined) {
		            if (select.attr("class") == '') { selectClass = "selectClass_default"; }
		            else { selectClass = select.attr("class"); }
		        }
		        if (divClass == undefined) { divClass = 'divClass_default'; }
		        if (selectedClass == undefined) { selectedClass = 'selectedClass_default'; }
		        if (itemClass == undefined) { itemClass = 'itemClass_default'; }
		        if (itemHoverClass == undefined) { itemHoverClass = 'itemHoverClass_default'; }
		        if (divWidth == undefined) { divWidth = ''; }
		        if (divHeight == undefined) { divHeight = ''; }

		        //correction des erreurs
		        divWidth = divWidth.replace('px', '');
		        divHeight = divHeight.replace('px', '');

		        //controle
		        //alert(select);
		        //alert(openMethod);
		        //alert(closeMethod);
		        //alert(vitesse);
		        //alert(divClass);
		        //alert(selectedClass);
		        //alert(itemHoverClass);
		        //alert(hovermenuPosition);
		        //alert(divWidth);
		        //alert(divHeight);

		        //création du div qui remplace le deroulant du select
		        $(document.createElement('div'))
                    .width(select.width())
                    .addClass(divClass)
                    .attr('id', select.attr('id') + '_deroulant')
		            .css({
		                position: 'absolute',
		                //'top': select.height(),
		                //'left': 0,
		                'top': offset.top + select.height(),
		                'left': offset.left,
		                'cursor': 'pointer',
		                'overflow': 'auto',
		                'zIndex': 5
		            })
                    .appendTo($('body'))
                    .hide();
		        if (divWidth != '') { $('#' + select.attr('id') + '_deroulant').width(divWidth); }
		        if (divHeight != '') { $('#' + select.attr('id') + '_deroulant').height(divHeight); }

		        //création du div remplacant le select
		        $(document.createElement('div'))
                    .width(select.width())
                    .height(select.height())
                    .addClass(selectClass)
                    .attr('id', select.attr('id') + '_div')
                    .html($('#' + select.attr('id') + ' option:eq(0)').html())
		            .css({
		                position: 'absolute',
		                //top: 0,
		                //left: 0,
		                'top': offset.top,
		                'left': offset.left,
		                'cursor': 'pointer',
		                'zIndex': 5
		            })
                    .appendTo($('body'))
                    .show();


		        //action sur le div
		        $('#' + select.attr('id') + '_deroulant').HoverMenu({
		            'commandObj': select.attr('id') + '_div',
		            'openMethod': openMethod,
		            'closeMethod': closeMethod,
		            'vitesse': vitesse,
		            'commandObjPosition': 'bottom-left',
		            'hovermenuPosition': 'top-left',
		            'openEvent': 'click',
		            'closeEvent': 'blur'
		        });

		        //on récupère les options pour les inserer dans le div
		        var html = '';
		        $('#' + select.attr('id') + ' option').each(function () {
		            var html_option = '';
		            if ($(this).html() != '') { html_option = $(this).html(); }
		            html_option = html_option.replace('----------', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		            html_option = html_option.replace('--------', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		            html_option = html_option.replace('------', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		            html_option = html_option.replace('----', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		            html_option = html_option.replace('--', '&nbsp;&nbsp;&nbsp;&nbsp;');
		            html += '<div class=' + itemClass + '>' + html_option + '</div>';
		        });
		        $('#' + select.attr('id') + '_deroulant').html(html);

		        $('#' + select.attr('id') + '_deroulant > div').each(function (index) {
		            $(this).hover(
		                function () {
		                    $(this).removeClass(itemClass).addClass(itemHoverClass);
		                },
		                function () {
		                    $(this).removeClass(itemHoverClass).addClass(itemClass);
		                }
		            )
                    .click(function () {
                        $('#' + select.attr('id') + '_div').html($(this).html());
                        select.attr('selectedIndex', index);
                        if (select.attr('selectedIndex') == 0) { //on remet la classe initiale "selected" du div
                            $('#' + select.attr('id') + '_div').removeClass(selectedClass).addClass(selectClass);
                        }
                        else { //on met la classe "selected" du div
                            $('#' + select.attr('id') + '_div').removeClass(selectClass).addClass(selectedClass);
                        }
                        //on ferme le déroulant
                        $('#' + select.attr('id') + '_deroulant').HoverMenu('hide');
                        return false;
                    })
		        });

		        //on cache le select
		        //select.css({ 'visibility': 'hidden' });
		        select.hide(); ;

		    }

		    Init();


		}
    );

}                                                // Fin du plugin