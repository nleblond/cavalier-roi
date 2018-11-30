//extensions jquery : treeview
//v2.0.0
//02/04/2013
//NL
//Created by LEBLOND Nicolas

$.fn.TreeView = function (paramsJson) {

    //chemin
    var cheminTreeview = imgRelativePath + '/jquery-nl/treeview/';

    //variables
    var params = [];
    var command; //transcode, open, close, check, uncheck
    var treeview = $(this);

    var checkbox; //0) pas de checkbox, 1) checkbox
    var checkedImgUrl;
    var uncheckedImgUrl;
    var includedImgUrl;
    var plusImgUrl;
    var moinsImgUrl;
    var rienImgUrl;
    var vitesse; //400, 600, 800
    var repercution; //0) ne se passe rien, 1) sélectionne en dessous, 2) empêche la sélection en dessous
    var dependance; //0) ne se passe rien, 1) si on clique sur un fils alors que le pere est coché, ca décoche le père
    var separateur; // - , ; _ |
    var localizationId;
    var localizationClass;

    //valeurs par défaut si aucune valeur stockée
    if (treeview.data('checkbox') == undefined) { checkbox = 0; } else { checkbox = treeview.data('checkbox'); }
    if (treeview.data('checkedImgUrl') == undefined) { checkedImgUrl = cheminTreeview + 'checked.jpg'; } else { checkedImgUrl = treeview.data('checkedImgUrl'); }
    if (treeview.data('uncheckedImgUrl') == undefined) { uncheckedImgUrl = cheminTreeview + 'unchecked.jpg'; } else { uncheckedImgUrl = treeview.data('uncheckedImgUrl'); }
    if (treeview.data('includedImgUrl') == undefined) { includedImgUrl = cheminTreeview + 'included.jpg'; } else { includedImgUrl = treeview.data('includedImgUrl'); }
    if (treeview.data('plusImgUrl') == undefined) { plusImgUrl = cheminTreeview + 'plus.jpg'; } else { plusImgUrl = treeview.data('plusImgUrl'); }
    if (treeview.data('moinsImgUrl') == undefined) { moinsImgUrl = cheminTreeview + 'moins.jpg'; } else { moinsImgUrl = treeview.data('moinsImgUrl'); }
    if (treeview.data('rienImgUrl') == undefined) { rienImgUrl = cheminTreeview + 'vide.jpg'; } else { rienImgUrl = treeview.data('rienImgUrl'); }
    if (treeview.data('vitesse') == undefined) { vitesse = 400; } else { vitesse = treeview.data('vitesse'); }
    if (treeview.data('repercution') == undefined) { repercution = 0; } else { repercution = treeview.data('repercution'); }
    if (treeview.data('dependance') == undefined) { dependance = 0; } else { dependance = treeview.data('dependance'); }
    if (treeview.data('separateur') == undefined) { separateur = ','; } else { separateur = treeview.data('separateur'); }
    if (treeview.data('localizationId') == undefined) { localizationId = ''; } else { localizationId = treeview.data('localizationId'); }
    if (treeview.data('localizationClass') == undefined) { localizationClass = 'localization'; } else { localizationClass = treeview.data('localizationClass'); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == "command") { command = val; }
                if (key == "checkbox") { checkbox = val; }
                if (key == "checkedImgUrl") { checkedImgUrl = val; }
                if (key == "uncheckedImgUrl") { uncheckedImgUrl = val; }
                if (key == "includedImgUrl") { includedImgUrl = val; }
                if (key == "plusImgUrl") { plusImgUrl = val; }
                if (key == "moinsImgUrl") { moinsImgUrl = val; }
                if (key == "rienImgUrl") { rienImgUrl = val; }
                if (key == "repercution") { repercution = val; }
                if (key == "dependance") { dependance = val; }
                if (key == "vitesse") { vitesse = val; }
                if (key == "localizationId") { localizationId = val; }
                if (key == "localizationClass") { localizationClass = val; }
                i++;
            });
            if (!(command)) { command = ''; }
        }
        catch (e) { command = paramsJson; }
    }
    else { command = ''; }


    if (command == 'transcode') {
        return Coder();
    }
    else {

        return this.each(
		    function () {


		        function Init() {

		            //controle
		            //alert(command);
		            //alert(checkbox);
		            //alert(checkedImgUrl);
		            //alert(uncheckedImgUrl);
		            //alert(includedImgUrl);
		            //alert(plusImgUrl);
		            //alert(moinsImgUrl);
		            //alert(rienImgUrl);
		            //alert(repercution);
		            //alert(dependance);
		            //alert(vitesse);
		            //alert(separateur);

		            //stockage
		            treeview.data('checkbox', checkbox);
		            treeview.data('checkedImgUrl', checkedImgUrl);
		            treeview.data('uncheckedImgUrl', uncheckedImgUrl);
		            treeview.data('includedImgUrl', includedImgUrl);
		            treeview.data('plusImgUrl', plusImgUrl);
		            treeview.data('moinsImgUrl', moinsImgUrl);
		            treeview.data('rienImgUrl', rienImgUrl);
		            treeview.data('repercution', repercution)
		            treeview.data('dependance', dependance);
		            treeview.data('vitesse', vitesse);
		            treeview.data('separateur', separateur);
		            treeview.data('localizationId', localizationId);
		            treeview.data('localizationClass', localizationClass);

		            if (command == 'close') { Fermer(); return false; }
		            else if (command == 'open') { Ouvrir(); return false; }
		            else if (command == 'check') { Tout_Cocher(); return false; }
		            else if (command == 'uncheck') { Tout_Decocher(); return false; }
		            else if (command == 'localize') { Localize(); return false; }

		            //on enleve les clics sur les ul
		            treeview.find('ul').click(function (event) {
		                event.stopPropagation();
		            });

		            //on ferme tous les ul qui ne sont pas de niveau 1
		            treeview.find('ul').eq(0).find('ul').each(function () {
		                $(this).hide();
		            });

		            treeview.find('li').each(function () {
		                var li_current = $(this);

		                //checkbox
		                if (checkbox == 1) {
		                    $('<img />')
                                .attr('src', treeview.data('uncheckedImgUrl'))
                                .attr('alt', '')
                                .css({ 'paddingRight': '5px' })
                                .addClass('checkbox')
                                .click(function (event) {
                                    if ($(this).attr('src') == checkedImgUrl) {
                                        $(this).attr('src', uncheckedImgUrl);
                                        if (repercution == 1) {
                                            li_current.find('li img.checkbox').attr('src', uncheckedImgUrl);
                                        }
                                        else if (repercution == 2) {
                                            li_current.find('li img.checkbox').attr('src', uncheckedImgUrl);
                                        }
                                        if (dependance == 1) {
                                            try {
                                                var li_pere = li_current.parents('li');
                                                li_pere.find('img.checkbox:eq(0)').attr('src', uncheckedImgUrl);
                                                var li_grand_pere = li_pere.parent();
                                                li_grand_pere.find('img.checkbox :eq(0)').attr('src', uncheckedImgUrl);
                                                var li_arriere_grand_pere = li_grand_pere.parent();
                                                li_arriere_grand_pere.find('img.checkbox :eq(0)').attr('src', uncheckedImgUrl);
                                            } catch (ex) { }
                                        }
                                    }
                                    else if ($(this).attr('src') == uncheckedImgUrl) {
                                        $(this).attr('src', checkedImgUrl);
                                        if (repercution == 1) {
                                            li_current.find('li img.checkbox').attr('src', checkedImgUrl);
                                        }
                                        else if (repercution == 2) {
                                            li_current.find('li img.checkbox').attr('src', includedImgUrl);
                                        }
                                    }
                                    event.stopPropagation();
                                })
                                .mouseover(function (event) {
                                    $(this).css({ 'cursor': 'default' });
                                    event.stopPropagation();
                                })
                                .prependTo(li_current.eq(0));
		                }
		                else {
		                    //à voir
		                }


		                //ouvrir-fermer
		                if (li_current.find('> ul').length > 0) {
		                    $('<img />')
                                .attr('src', plusImgUrl)
                                .attr('alt', '')
                                .css({ 'paddingRight': '5px' })
                                .addClass('indicateur')
                                .prependTo(li_current.eq(0));
		                }
		                else {
		                    $('<img />')
                                .attr('src', rienImgUrl)
                                .attr('alt', '')
                                .css({ 'paddingRight': '5px', 'visibility': 'hidden' })
                                .addClass('indicateur')
                                .prependTo(li_current.eq(0));
		                }

		                //click
		                li_current.click(function (event) {
		                    try {
		                        if (li_current.find('> ul').length > 0) {
		                            if (li_current.find('> ul').is(':visible')) {
		                                li_current.find('> img.indicateur').attr('src', plusImgUrl);
		                                li_current.find('> ul').slideUp(vitesse);
		                            }
		                            else {
		                                li_current.find('> img.indicateur').attr('src', moinsImgUrl);
		                                li_current.find('> ul').slideDown(vitesse);
		                            }
		                        }
		                    }
		                    catch (ex) { }
		                    event.stopPropagation();
		                });

		                //mouseover
		                li_current.mouseover(function (event) {
		                    if (li_current.find('> ul').length > 0) {
		                        li_current.css({ 'cursor': 'pointer' });
		                    }
		                    else {
		                        li_current.css({ 'cursor': 'default' });
		                    }
		                    event.stopPropagation();
		                });
		            });

		        }

		        function Ouvrir() {
		            treeview.find('li').each(function (index) {
		                var li_current = $(this);
		                li_current.find('> .indicateur').each(function () {
		                    if ($(this).attr('src') == plusImgUrl) {
		                        $(this).attr('src', moinsImgUrl);
		                        li_current.find('ul').show();
		                    }
		                });
		            });
		        }

		        function Fermer() {
		            treeview.find('li').each(function (index) {
		                var li_current = $(this);
		                li_current.find('> .indicateur').each(function () {
		                    if ($(this).attr('src') == moinsImgUrl) {
		                        $(this).attr('src', plusImgUrl);
		                        li_current.find('ul').hide();
		                    }
		                });
		            });
		            treeview.find('ul > li').show();
		        }

		        function Tout_Decocher() {
		            treeview.find('.checkbox').attr('src', uncheckedImgUrl);
		        }

		        function Tout_Cocher() {
		            treeview.find('.checkbox').attr('src', checkedImgUrl);
		        }

		        function Localize() {
		            var foundPath = false;
		            var foundValue = false;
		            treeview.find('ul').each(function () {
		                var ul_current = $(this);
		                ul_current.find('input[type="hidden"]').each(function () {
		                    if ($(this).val() == treeview.data('localizationId')) {
		                        foundPath = true;
		                        if (!foundValue) {
		                            $(this).parent('li').addClass(treeview.data('localizationClass'));
		                            foundValue = true;
		                        }
		                    }
		                });
		                if (foundPath) {
		                    ul_current.parents('li').find('> .indicateur').each(function () {
		                        if ($(this).attr('src') == plusImgUrl) {
		                            $(this).attr('src', moinsImgUrl);
		                            ul_current.show();
		                        }
		                    });
		                }
		                foundPath = false;
		            });
		        }

		        Init();

		    }
	    );
    }

    function Coder() {
        var chaineCodage = '';
        if (treeview.find('.checkbox').length > 0) {
            treeview.find('.checkbox').each(function () {
                if ($(this).attr('src') == checkedImgUrl) {
                    chaineCodage += chaineCodage != '' ? separateur + $(this).parent('li').find('input[type="hidden"]').eq(0).val() : $(this).parent('li').find('input[type="hidden"]').eq(0).val();
                }
            });
            return chaineCodage;
        }
        else {
            return "Aucune case à cocher dans le treeview";
        }
    }

}
