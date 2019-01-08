$(window).on('load', function () {

    $('.menu .cours').addClass('select');

    $('.cours input[type="button"].reserver').each(function () {
        $(this).on('click', function () {

            var _Connected = CheckConnectedEleve();

            if (_Connected == true) {
                var _EvenementId = $(this).data('evenementid');
                var _EvenementLibelle = $(this).data('evenementlibelle');
                var _EleveId = $(this).data('eleveid');
                var _Duree = $(this).data('duree');
                var _Jour = $(this).data('jour');
                var _Prix = $(this).data('prix');

                OpenCalendrierParHeure(_EvenementId, _EvenementLibelle, _EleveId, _Duree, _Jour, _Prix);
            }
            else {
                OpenConnexion();
            }

            return false;
        });
    });

});
