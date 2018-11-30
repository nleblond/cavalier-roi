$(window).on('load', function () {

    $('.panier .fermer').on('click', function () {
        $('.panier').hide();
    });

    $('.menu .basket').on('click', function () {
        $('.panier').toggle();
    });

});
