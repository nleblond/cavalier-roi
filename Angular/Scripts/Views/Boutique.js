$(window).on('load', function () {

    $('.menu .boutique').addClass('select');

    $('.panier').show();

    $('.menu .basket').show();


    $('.produit').each(function () {
        if (($(this).find('.visuel').length > 0) && ($(this).find('.image').length > 0)) {
            var _ObjectImage = $(this);
            setInterval(function () {
                if ((_ObjectImage.find('.image').is(':visible') == true)) {
                    _ObjectImage.find('.image').hide();
                    _ObjectImage.find('.visuel').show();
                }
                else {
                    _ObjectImage.find('.visuel').hide();
                    _ObjectImage.find('.image').show();
                }
            }, 5000);
        }
    });


    $('.avant select').on('change', function () {
        document.location.href = "/Boutique?_CategorieId=" + $(this).val();
    });


});
