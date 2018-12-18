$(window).on('load', function () {

    $('.menu .tournois').addClass('select');

    $('.exterieurs .slider').TouchSlider({ 'sliderVisibleLiCount': 4, 'sliderRotation': true, 'sliderRotationDelay' : 2000 });

    //$('#Div_NosMarques .pagination .left').off('click').on('click', function () { $('#Div_NosMarques').TouchSlider({ 'command': 'previous' }); return false; });
    //$('#Div_NosMarques .pagination .right').off('click').on('click', function () { $('#Div_NosMarques').TouchSlider({ 'command': 'next' }); return false; });


});