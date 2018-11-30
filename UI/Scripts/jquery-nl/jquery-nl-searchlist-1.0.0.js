//extensions jquery : searchList
//v1.0.1
//27/02/2015
//NL
//Created by DEBACK Fanny

(function ($) {

    $.fn.searchlist = function (parameters) {

        $.extend({ // Définition des valeurs par défaut 

            delayInSecond: 1 // permet de temporiser l'intervalle entre les saisies
        }, parameters);

        return Initialize($(this));

        function Initialize(jElement) {
            //initialisation des champs timeout et textsearch
            jElement.data('textsearch', "");
            jElement.data('timeout', 0);

            jElement.on('keypress', function (e) { SearchItemInList(e, jElement, parameters.delayInSecond) });
        }

        function SearchItemInList(event,jelement, delayInSecond) {
            // correspond à la lettre saisie
            var key = String.fromCharCode(event.which);
            // temps entre deux saisies
            var timeoutInMemory = jelement.data('timeout');
            var textSearchInMemory = jelement.data('textsearch');
            var d = new Date();
            var timeoutNew = d.getSeconds();
           
            //si le delai est dépassé, nouvelle recherche sur la première lettre
            if (timeoutNew - timeoutInMemory > delayInSecond || (timeoutNew - timeoutInMemory < 0)) {
                jelement.data('timeout', timeoutNew);
                jelement.data('textsearch', key);
            }
            else {
                //sinon concatenation de l'ancienne recherche   
                jelement.data('textsearch', textSearchInMemory + key);
            }
            textSearchInMemory = jelement.data('textsearch')
            //recherche des élements dans la liste commençant par la recherche key
            var list = jelement.find(' [data-search^="' + textSearchInMemory + '"]');
            if (list.length > 0) {
                $(jelement.find(' [data-search^="' + textSearchInMemory + '"]')[0]).prop('selected', true);
            }
        }
    }

})(jQuery)