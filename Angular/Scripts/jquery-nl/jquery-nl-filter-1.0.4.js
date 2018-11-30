//extensions jquery : filter
//v1.0.2
//25/04/2017
//NL
//Created by LEBLOND Nicolas
//Updated by NAHHAS Youssef

$.fn.Filter = function (paramsJson) {

    //variables
    var params = [];
    var obj = $(this);

    //variables + valeurs par défaut si aucune valeur stockée
    if (obj.data('command') == undefined) { obj.data('command', 'init'); }
    if (obj.data('filteredClass') == undefined) { obj.data('filteredClass', ''); }
    if (obj.data('searchedClass') == undefined) { obj.data('searchedClass', ''); }
    if (obj.data('onFiltered') == undefined) { obj.data('onFiltered', ''); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == 'command') { obj.data('command', val); }
                if (key == 'filteredClass') { obj.data('filteredClass', val); }
                if (key == 'searchedClass') { obj.data('searchedClass', val); }
                if (key == 'onFiltered') { obj.onFiltered = val; }
                i++;
            });
        }
        catch (e) { obj.data('command', paramsJson); }
    }
    else { obj.data('command', ''); }


    function Init() {
        if (obj.data('searchedClass') == '') { obj.data('searchedClass', obj.data('filteredClass')); }
        obj.off('keyup').on('keyup', function (e) {
            var code = e.keyCode || e.which;
            if (code != '9') {
                Filter();
            }
        });

        $('.' + obj.data('searchedClass')).each(function (index) {
            $('.' + obj.data('filteredClass')).eq(index).show();
        });
        obj.off('change.filterElement').on('change', function () { Filter(); });
    }

    function Filter() {
        var text = obj.val();
        //var lowerText = text.toLowerCase();
        var upperText = text.toUpperCase();


        //Modification pour fusionner le filtre des champs de recherche
        $('.filterElement').each(function () {
            var _otherSearchedClass = $(this).data('searchedClass');
            // CBAR le 14/02/2018 
            // Désactivé car ne marche pas si 1 seul input de filtre
            //if (_otherSearchedClass != obj.data('searchedClass'))
            //{
            var otherText = $(this).val();
            if (otherText != '' && $(this).hasClass('unwatermark')) {
                //var otherLowerText = otherText.toLowerCase();
                var otherUpperText = otherText.toUpperCase();
                $('.' + _otherSearchedClass).each(function (index) {
                    var otherCurrentText;
                    if ($(this).prop('tagName').toUpperCase() == 'SELECT') { otherCurrentText = $(this).text(); }
                    else if ($(this).prop('tagName').toUpperCase() == 'INPUT') { otherCurrentText = $(this).val(); }
                    else if ($(this).prop('tagName').toUpperCase() == 'SPAN') { otherCurrentText = $(this).html(); }
                    if ((otherCurrentText.toUpperCase().indexOf(otherUpperText) == -1)) {
                        $('.' + obj.data('filteredClass')).eq(index).hide();
                    }
                    else {
                        $('.' + obj.data('filteredClass')).eq(index).show();
                    }
                    //if ((otherCurrentText.indexOf(otherText) == -1) && (otherCurrentText.indexOf(otherLowerText) == -1) && (otherCurrentText.indexOf(otherUpperText) == -1)) { $('.' + obj.data('filteredClass')).eq(index).hide(); }
                    //else { $('.' + obj.data('filteredClass')).eq(index).show(); }
                });
            }
            else {
                $('.' + _otherSearchedClass).each(function (index) { $('.' + obj.data('filteredClass')).eq(index).show(); });
            }
            //}
        });

        $('.' + obj.data('searchedClass')).each(function (index) {
            var currentText;
            if ($(this).prop('tagName').toUpperCase() == 'SELECT') { currentText = $(this).text(); }
            else if ($(this).prop('tagName').toUpperCase() == 'INPUT') { currentText = $(this).val(); }
            else if ($(this).prop('tagName').toUpperCase() == 'SPAN') { currentText = $(this).html(); }
            if ((currentText.toUpperCase().indexOf(upperText) == -1)) { $('.' + obj.data('filteredClass')).eq(index).hide(); }
            else if ($(this).hasClass("OneParam")) { $('.' + obj.data('filteredClass')).eq(index).show(); } // Gérer le cas d'un seul champs de recherche
            else { $('.' + obj.data('filteredClass') + ':visible').eq(index).show(); }
            //if ((currentText.indexOf(text) == -1) && (currentText.indexOf(lowerText) == -1) && (currentText.indexOf(upperText) == -1)) { $('.' + obj.data('filteredClass')).eq(index).hide(); }
            //else { $('.' + obj.data('filteredClass') + ':visible').eq(index).show(); }
            //KJAR 24/07/2018 : ajout du filtre pour les select
            if ($(this).prop('tagName').toUpperCase() == 'SELECT') { filterSelect($(this), text); }
        });

        if (typeof (obj.onFiltered) != 'undefined') {
            obj.onFiltered();
        }
    }
    function filterSelect(obj, selValue) {

        $.fn.toggleOption = function (show) {
            return this.each(function () {
                if (!obj.hasClass("unwatermark")) {
                    if (show) {
                        obj.parents(".selectFilterlast").css('display', 'none');
                    } else {
                        obj.parents(".selectFilterlast").css('display', 'block').css('display', 'table-row');
                    }
                }
            });
        };

        if (selValue == "") {
            obj.toggleOption(false);
        } else if (obj["0"] == null || obj["0"].selectedOptions[0].value == null) {
            obj.toggleOption(true);
        } else if (obj["0"] != null && obj["0"].selectedOptions[0].value != null && obj["0"].selectedOptions[0].value == selValue) {
            obj.toggleOption(false);
        } else {
            obj.toggleOption(true);
        }

    }
    return this.each(
        function () { Init(); }
    );

}