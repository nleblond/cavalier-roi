$(window).on('load', function () {

    $('.menu .stages').addClass('select');

    $('.stages input[type="button"].reserver').each(function () {
        $(this).on('click', function () {

            var _Connected = CheckConnectedEleve();

            if (_Connected == true) {
                var _EvenementId = $(this).data('evenementid');
                var _EvenementLibelle = $(this).data('evenementlibelle');
                var _EleveId = $(this).data('eleveid');
                var _Duree = $(this).data('duree');
                var _JourMin = $(this).data('jourmin');
                var _JourMax = $(this).data('jourmax');
                var _Prix = $(this).data('prix');
                var _EvenementParentId = $(this).data('evenementparentid');

                OpenCalendrierParDemiJournee(_EvenementId, _EvenementLibelle, _EleveId, _JourMin, _JourMax, _Prix, _Duree, _EvenementParentId);
            }
            else {
                OpenConnexion();
            }

            return false;
        });
    });

});


