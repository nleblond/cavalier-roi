

$(window).on('load', function () {

    $('.menu .tournois').addClass('select');

    $('.competitions .slider').TouchSlider({ 'sliderVisibleLiCount': 4, 'sliderRotation': true, 'sliderRotationDelay': 2000, 'sliderClickableLi': false });

    //tournois
    $('.tournois input[type="button"].reserver').each(function () {
        $(this).on('click', function () {

            var _Connected = CheckConnectedEleve();

            if (_Connected == true) {
                var _EvenementId = $(this).data('evenementid');
                var _EvenementLibelle = $(this).data('evenementlibelle');
                var _EleveId = $(this).data('eleveid');
                var _Prix = $(this).data('prix');

                OpenCalendrierParEvenement(_EvenementId, _EvenementLibelle, _EleveId, _Prix);
            }
            else {
                OpenConnexion();
            }

            return false;
        });
    });




    //compétitions
    $('.competitions .participer').each(function () {
        $(this).on('click', function () {
            var _Lien = $(this).data('lien');
            window.open(_Lien, '_blank');
            return false;
        });
    });


});