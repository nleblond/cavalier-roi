//extensions jquery : watermark
//v2.2.3
//29/08/2017
//NL
//Created by BARANGER Cyrille

$.fn.Watermark = function (paramsJson) {

    //variables
    var params = [];
    var obj = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (obj.data('command') == undefined) { obj.data('command', ''); } //text, watermarkText, reinit, ''
    if (obj.data('text') == undefined) { obj.data('text', null); }
    if (obj.data('watermarkText') == undefined) { obj.data('watermarkText', ''); }
    if (obj.data('watermarkClass') == undefined) { obj.data('watermarkClass', 'watermark'); }
    if (obj.data('defaultClass') == undefined) { obj.data('defaultClass', 'unwatermark'); }
    if (obj.data('plus') == undefined) { obj.data('plus', null); }
    if (obj.data('size') == undefined) { obj.data('size', null); }
    if (obj.data('title') == undefined) { obj.data('title', true); }
    if (obj.data('error') == undefined) { obj.data('error', ''); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == 'command') { obj.data('command', val); }
                if (key == 'text') { obj.data('text', val); }
                if (key == 'watermarkText') { obj.data('watermarkText', val); }
                if (key == 'watermarkClass') { obj.data('watermarkClass', val); }
                if (key == 'defaultClass') { obj.data('defaultClass', val); }
                if (key == 'plus') { obj.data('plus', val); }
                if (key == 'size') { obj.data('size', val); }
                if (key == 'title') { obj.data('title', val); }
                if (key == 'error') { obj.data('error', val); }
                i++;
            });
        }
        catch (e) { obj.data('command', paramsJson); }
    }
    else { obj.data('command', ''); }

    function Init() {

        //CPAT : Ajout de la compatibilité avec la balise HTML5 placeholder (introduite entre autres par BootStrap Touiteure :D)
        //Pour le set du 'watermarkText' : Si un attr HTML5 placeholder est défini et qu'aucun watermarkText n'est défini, on set la valeur de placeholder 
        //Utile pour être désormais utilisé comme suit : $('#Text_Test').Watermark();
        if ((obj.data('watermarkText') == '') && (typeof (obj.attr('placeholder')) != 'undefined') && (obj.attr('placeholder') != '')) { obj.data('watermarkText', obj.attr('placeholder')); }

        //CPAT : Ajout de la compatibilité avec la balise HTML5 placeholder (introduite entre autres par BootStrap Touiteure :D)
        //Voir set du watermarkText ci-dessus...
        if (typeof (obj.attr('placeholder')) != 'undefined') {
            obj.attr('placeholder', obj.data('watermarkText'));
        }

        //suppression des autocompletes des navigateurs (quand ca marche)
        if ((obj.prop('tagName').toUpperCase() == 'INPUT') && (obj.prop('type').toUpperCase() == 'PASSWORD')) {
            obj.parents('form').attr('autocomplete', 'nope');
            obj.attr('autocomplete', 'new-password');
            obj.prop('readonly', true);
        }

        if (obj.data('size') != null) { obj.attr('maxlength', obj.data('size')); }
        if (obj.data('title') == true) {
            var title = obj.data('watermarkText');
            if (obj.data('plus') != null) { title += ' (' + obj.data('plus') + ')'; }
            if (obj.data('size') != null) { title += ' (' + obj.data('size') + ')'; }
            obj.attr('title', title);
        }

        if ((obj.data('text') != null) && (obj.data('text') != '')) {
            obj.val(obj.data('text'));
            Check();
        }

        //commandes d'initialisation
        if (obj.prop('tagName').toUpperCase() == 'SELECT') {
            obj.addClass(obj.data('watermarkClass'));
            obj.find('option').each(function (index) {
                if (index == 0) { $(this).removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass')); }
                else { $(this).removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass')); }
            });
            obj.off('change').on('change', function () {
                if (($(this).val() != '') && ($(this).val() != null) && ($(this).val() != "null")) {
                    $(this).removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass'));
                }
                else {
                    $(this).removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
                }
            });
            if ((obj.val() != '') && (obj.val() != null) && (obj.val() != "null")) {
                obj.removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass'));
            }
            else {
                obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            }
        }
        else if ((obj.prop('tagName').toUpperCase() == 'INPUT') && (obj.prop('type').toUpperCase() == 'PASSWORD')) {
            if (obj.val() == obj.data('watermarkText')) {
                obj.prop('type', 'text');
                obj.attr('old-type', 'password');
            }
            Check();
            obj.off('focus').on('focus', function () {
                $(this).prop('readonly', false);
                Focus();
            });
            obj.off('blur').on('blur', Check);
            obj.off('change').on('change', Check);
            //obj.off('paste').on('paste', function () { return false; });
            obj.off('paste').on('paste', Check);
        }
        else {
            Check();
            obj.off('focus').on('focus', Focus);
            obj.off('blur').on('blur', Check);
            obj.off('change').on('change', Check);
            obj.off('paste').on('paste', Check);
        }

    }

    function Focus() {
        if ((obj.prop('tagName').toUpperCase() == 'INPUT') && (obj.attr('old-type') != undefined) && (obj.attr('old-type').toUpperCase() == 'PASSWORD')) {
            obj.val('');
            obj.prop('type', 'PASSWORD');
            obj.attr('old-type', 'TEXT');
        }
        else if ((obj.prop('tagName').toUpperCase() == 'INPUT') && (obj.val() == obj.data('watermarkText'))) {
            obj.val('');
        }
        else if ((obj.prop('tagName').toUpperCase() == 'TEXTAREA') && (obj.val() == obj.data('watermarkText'))) {
            obj.val('');
        }
        obj.removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass'));
    }

    function Clear() {
        if (obj.prop('tagName').toUpperCase() == 'INPUT') {
            obj.val('');
            obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
        }
        else if (obj.prop('tagName').toUpperCase() == 'TEXTAREA') {
            obj.val('');
            obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            // obj.val(obj.data('watermarkText'));
        }
        else if (obj.prop('tagName').toUpperCase() == 'SELECT') {
            obj.prop('selectedIndex', 0);
            obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            obj.find('option').each(function (index) {
                if (index == 0) { $(this).removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass')); }
                else { $(this).removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass')); }
            });
            if ((obj.val() != '') && (obj.val() != null) && (obj.val() != "null")) {
                obj.removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass'));
            }
            else {
                obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            }
        }
    }

    function Reinit() {
        Clear();
        Init();
    }

    function Check() {
        if ((obj.prop('tagName').toUpperCase() == 'INPUT') && (obj.prop('type').toUpperCase() == 'PASSWORD') && (obj.val() == obj.data('watermarkText') || (obj.val().length == 0))) {
            obj.prop('type', 'TEXT');
            obj.attr('old-type', 'PASSWORD');
            obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            obj.val(obj.data('watermarkText'));
        }
        else if ((obj.prop('tagName').toUpperCase() == 'INPUT') && ((obj.val().length == 0) || (obj.val() == obj.data('watermarkText')))) {
            obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            obj.val(obj.data('watermarkText'));
        }
        else if ((obj.prop('tagName').toUpperCase() == 'TEXTAREA') && ((obj.val().length == 0) || (obj.val() == obj.data('watermarkText')))) {
            obj.removeClass(obj.data('defaultClass')).addClass(obj.data('watermarkClass'));
            obj.val(obj.data('watermarkText'));
        }
        else {
            if (obj.prop('tagName').toUpperCase() != 'SELECT') { //le SELECT a son propre évènement
                obj.removeClass(obj.data('watermarkClass')).addClass(obj.data('defaultClass'));
            }
        }
    }

    function ReadWatermark() {
        return ((typeof (obj.data('watermarkText')) == 'undefined') && (typeof (obj.attr('placeholder')) != 'undefined') && (obj.attr('placeholder') != '')) ? obj.attr('placeholder') : obj.data('watermarkText');
    }

    function ReadError() {
        return ((obj.data('error') == undefined) || (obj.data('error') == null) || (obj.data('error') == '')) ? '' : obj.data('error');
    }

    function ReadText() {
        var currentText = '';
        if (typeof (obj) == 'undefined' || obj == null || obj.length == 0) {
            return '';
        }

        if (obj.prop('tagName').toUpperCase() == 'INPUT') { currentText = obj.val(); }
        else if (obj.prop('tagName').toUpperCase() == 'TEXTAREA') { currentText = obj.val(); }
        else if (obj.prop('tagName').toUpperCase() == 'SELECT') { currentText = obj.val(); }
        if (currentText != obj.data('watermarkText')) { return currentText; }
        else { return ''; }
    }

    if (obj.data('command') == 'watermarkText') {
        return ReadWatermark();
    }
    else if (obj.data('command') == 'error') {
        return ReadError();
    }
    else if (obj.data('command') == 'text') {
        return ReadText();
    }
    else if (obj.data('command') == 'reinit') {
        Reinit(); return false;
    }
    else if (obj.data('command') == 'clear') {
        Clear(); Check(); return false;
    }
    else {
        return this.each(
            function () { Init(); return false; }
        );
    }

}
