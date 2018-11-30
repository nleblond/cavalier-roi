//extensions jquery : touchslider
//v2.3.6
//22/11/2016
//NL
//Created by LEBLOND Nicolas

//sliderInfiniteSwipe à implémenter en tactile (problème de lenteur lors du changement de position du li)
//slidersliderRotationMethod = 'random' à implémenter

$.fn.TouchSlider = function (paramsJson) {

    //gestion spéciale selon le navigateur
    //nécessite "navigateurs-xxxxxx.js"
    //nécessite "functions-xxxxxx.js"
    var browser = navName;
    var os = operatingSystemName;

    //variables
    var params = [];
    var slider = $(this);
    var rotation;

    //variables + valeurs par défaut si aucune valeur stockée
    if (slider.data('command') == undefined) { slider.data('command', 'init'); } //init, correct, resize
    if (slider.data('sliderVisibleLiCount') == undefined) { slider.data('sliderVisibleLiCount', 1); } //1, 2, 3, 4...
    if (slider.data('sliderFirstVisibleLi') == undefined) { slider.data('sliderFirstVisibleLi', 1); } //1, 2, 3, 4...
    if (slider.data('sliderSelectedLi') == undefined) { slider.data('sliderSelectedLi', 1); } //null, 1, 2, 3, 4

    if (slider.data('sliderRotation') == undefined) { slider.data('sliderRotation', false); } //true, false
    if (slider.data('sliderRotationMethod') == undefined) { slider.data('sliderRotationMethod', 'linear'); } //linear, random
    if (slider.data('sliderRotationDelay') == undefined) { slider.data('sliderRotationDelay', 4000); } //1000, 2000, 3000

    if (slider.data('sliderPaginationClass') == undefined) { slider.data('sliderPaginationClass', 'pagination'); }

    if (slider.data('sliderVitesse') == undefined) { slider.data('sliderVitesse', 200); } //0, 100, 200, 300
    if (slider.data('sliderMinSwipe') == undefined) { slider.data('sliderMinSwipe', 5); } //1, 2, 3, ...
    if (slider.data('sliderInfiniteSwipe') == undefined) { slider.data('sliderInfiniteSwipe', false); } //true, false
    if (slider.data('sliderFreeSwipe') == undefined) { slider.data('sliderFreeSwipe', false); } //true, false
    if (slider.data('sliderSideProtection') == undefined) { slider.data('sliderSideProtection', true); } //true, false 
    if (slider.data('sliderRepeatGroupAtLeftAndRight') == undefined) { slider.data('sliderRepeatGroupAtLeftAndRight', 0); } //0, 1, ...
    if (slider.data('sliderPointerId') == undefined) { slider.data('sliderPointerId', ''); }
    if (slider.data('sliderClickableLi') == undefined) { slider.data('sliderClickableLi', true); } //true, false

    if (slider.data('sliderInitFunction') == undefined) { slider.data('sliderInitFunction', ''); }
    if (slider.data('sliderResizeFunction') == undefined) { slider.data('sliderResizeFunction', ''); }

    if (slider.data('sliderTouchStartFunction') == undefined) { slider.data('sliderTouchStartFunction', ''); }
    if (slider.data('sliderTouchMoveFunction') == undefined) { slider.data('sliderTouchMoveFunction', ''); }
    if (slider.data('sliderTouchEndFunction') == undefined) { slider.data('sliderTouchEndFunction', ''); }
    if (slider.data('sliderTouchHoldFunction') == undefined) { slider.data('sliderTouchHoldFunction', ''); }
    if (slider.data('sliderTouchMesureAndResize_SliderFunction') == undefined) { slider.data('sliderTouchMesureAndResize_SliderFunction', ''); }

    if (slider.data('sliderMoveStartFunction') == undefined) { slider.data('sliderMoveStartFunction', ''); }
    if (slider.data('sliderMoveEndFunction') == undefined) { slider.data('sliderMoveEndFunction', ''); }

    //récupération des paramètres
    if (paramsJson) {
        try {
            var i = 0;
            $.each(paramsJson, function (key, val) {
                if (key == 'command') { slider.data('command', val); }
                if (key == 'sliderVisibleLiCount') { slider.data('sliderVisibleLiCount', val); }
                if (key == 'sliderFirstVisibleLi') { slider.data('sliderFirstVisibleLi', val); }
                if (key == 'sliderSelectedLi') { slider.data('sliderSelectedLi', val); }

                if (key == 'sliderRotation') { slider.data('sliderRotation', val); }
                if (key == 'sliderRotationMethod') { slider.data('sliderRotationMethod', val); }
                if (key == 'sliderRotationDelay') { slider.data('sliderRotationDelay', val); }

                if (key == 'sliderPaginationClass') { slider.data('sliderPaginationClass', val); }

                if (key == 'sliderVitesse') { slider.data('sliderVitesse', val); }
                if (key == 'sliderMinSwipe') { slider.data('sliderMinSwipe', val); }
                if (key == 'sliderInfiniteSwipe') { slider.data('sliderInfiniteSwipe', val); }
                if (key == 'sliderFreeSwipe') { slider.data('sliderFreeSwipe', val); }
                if (key == 'sliderSideProtection') { slider.data('sliderSideProtection', val); }
                if (key == 'sliderRepeatGroupAtLeftAndRight') { slider.data('sliderRepeatGroupAtLeftAndRight', val); }
                if (key == 'sliderPointerId') { slider.data('sliderPointerId', val); }
                if (key == 'sliderClickableLi') { slider.data('sliderClickableLi', val); }

                if (key == 'sliderInitFunction') { slider.data('sliderInitFunction', val); }
                if (key == 'sliderResizeFunction') { slider.data('sliderResizeFunction', val); }

                if (key == 'sliderTouchStartFunction') { slider.data('sliderTouchStartFunction', val); }
                if (key == 'sliderTouchMoveFunction') { slider.data('sliderTouchMoveFunction', val); }
                if (key == 'sliderTouchEndFunction') { slider.data('sliderTouchEndFunction', val); }
                if (key == 'sliderTouchHoldFunction') { slider.data('sliderTouchHoldFunction', val); }
                if (key == 'sliderTouchMesureAndResize_SliderFunction') { slider.data('sliderTouchMesureAndResize_SliderFunction', val); }

                if (key == 'sliderMoveStartFunction') { slider.data('sliderMoveStartFunction', val); }
                if (key == 'sliderMoveEndFunction') { slider.data('sliderMoveEndFunction', val); }

                i++;
            });
        }
        catch (e) {
            slider.data('command', paramsJson);
        }
    }
    else { slider.data('command', 'init'); }

    return this.each(
            function () {

                function Init() {

                    //initialisation des paramêtres de fonctionnement --------------------------------------------------------------------------------------------------------
                    slider.css({ 'visibility': 'hidden' });

                    //attribution d'un ID si le slider n'en a pas déjà un
                    if ((slider.attr('id') == undefined) || (slider.attr('id') == '')) {
                        slider.attr('id', generateUniqueId());
                    }

                    var liArray = slider.find('li');
                    for (var i = 0; i < parseInt(slider.data('sliderRepeatGroupAtLeftAndRight')) ; i++) {
                        var liArrayLeftClone = liArray.clone();
                        for (var j = 0; j < liArrayLeftClone.length; j++) {
                            slider.find('.content li:last').after(liArrayLeftClone[j]);
                        }
                        var liArrayRightClone = liArrayLeftClone.clone();
                        for (var l = liArrayRightClone.length - 1; l > -1; l--) {
                            slider.find('.content li:first').before(liArrayRightClone[l]);
                        }
                    }

                    slider.data('sliderLiCount', slider.find('.content > ul > li').length);

                    MesureAndResize_Slider();

                    if (parseInt(slider.data('sliderRepeatGroupAtLeftAndRight')) != 0) {
                        slider.data('sliderFirstVisibleLi', slider.data('sliderFirstVisibleLi') + (parseInt(slider.data('sliderRepeatGroupAtLeftAndRight')) * slider.data('sliderLiCount')));
                    }
                    slider.data('sliderNewMarginLeft', -((parseInt(slider.data('sliderFirstVisibleLi')) - 1) * parseInt(slider.data('sliderLiWidth'))));
                    slider.find('.content').css({ 'marginLeft': slider.data('sliderNewMarginLeft') });

                    if (slider.data('sliderInitFunction') != '') { eval(slider.data('sliderInitFunction')); }

                    slider.css({ 'visibility': 'visible' });
                    //------------------------------------------------------------------------------------------------------------------------------------------------------


                    //évènements ---------------------------------------------------------------------------------------------------------------------------------------------

                    //rotation automatique
                    if (slider.data('sliderRotation') == true) {
                        rotation = setInterval(function () {
                            slider.data('command', 'next');
                            Move_Slider(slider.data('command'), 'automatic');
                        }, parseInt(slider.data('sliderRotationDelay')));
                    }

                    //resize
                    $(window).resize(function () { Resize(); });
                    function Resize() {
                        MesureAndResize_Slider();
                        Correct_Slider();
                        slider.find('.content').css({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) });
                        if (slider.data('sliderTouchResizeFunction') != '') { eval(slider.data('sliderTouchResizeFunction')); }
                    }

                    //gestion des curseurs
                    if (slider.data('sliderClickableLi') == true) {
                        slider.find('.content li, .content li a, .content li a *').css('cursor', 'pointer');
                    }
                    else {
                        slider.find('.content li').css('cursor', 'default');
                        slider.find('.content li a, .content li a *').css('cursor', 'pointer');
                    }
                    slider.find('.content li, .content li a, .content li a *').each(function (index) {
                        $(this).mousedown(function () { $(this).css('cursor', 'move'); });
                        $(this).mouseup(function () { $(this).css('cursor', 'inherit'); });
                    });

                    //gestion du click
                    if (slider.data('sliderClickableLi') == true) {
                        slider.find('.content li a').each(function (index) {
                            $(this).click(function () { return false; });
                        });
                    }
                    slider.find('.' + slider.data('sliderPaginationClass') + ' input[type="radio"]').each(function (index) {
                        $(this).click(function () { return false; });
                    });


                    if (((browser == 'MSIE 10') || (browser == 'MSIE 11')) && (touchNavigator == true)) {



                        slider.find('.content').css({ '-ms-touch-action': 'pan-y' });
                        slider.data('sliderGesture', new MSGesture());
                        slider.data('sliderGesture').target = document.getElementById(slider.attr('id'));

                        //selectstart
                        eval(slider.attr('id')).addEventListener("selectstart", SelectStart, false);
                        function SelectStart(event) { event.preventDefault(); }

                        //contextMenu
                        eval(slider.attr('id')).addEventListener('contextmenu', ContextMenu, false);
                        function ContextMenu(event) { event.preventDefault(); }

                        //MSInertiaStart
                        eval(slider.attr('id')).addEventListener("MSInertiaStart", MSInertiaStart, false);
                        function MSInertiaStart(event) { slider.data('sliderGesture').stop(); }

                        //MSHoldVisual
                        eval(slider.attr('id')).addEventListener("MSHoldVisual", MSHoldVisual, false);
                        function MSHoldVisual(event) { event.preventDefault(); }

                        //MSPointerOut
                        eval(slider.attr('id')).addEventListener('MSPointerOut', MSPointerOut, false);
                        function MSPointerOut(event) { event.preventDefault(); }

                        //MSPointerUp
                        eval(slider.attr('id')).addEventListener('MSPointerUp', MSPointerUp, false);
                        function MSPointerUp(event) { event.preventDefault(); }

                        //MSPointerMove
                        eval(slider.attr('id')).addEventListener('MSPointerMove', MSPointerMove, false);
                        function MSPointerMove(event) { event.preventDefault(); }

                        //MSPointerDown 
                        eval(slider.attr('id')).addEventListener('MSPointerDown', MSPointerDown, false);
                        function MSPointerDown(event) {

                            if (slider.data('sliderRotation') == true) { clearInterval(rotation); }

                            slider.data('sliderGesture').addPointer(event.pointerId);

                            MesureAndResize_Slider();
                            slider.data('sliderTouchSwipe', '');

                            slider.data('sliderStartX', Math.round(event.clientX - $(this).offset().left));
                            slider.data('sliderMarginLeft', parseInt(slider.find('.content').css('marginLeft').replace('px', '')));

                            if (slider.data('sliderTouchStartFunction') != '') { eval(slider.data('sliderTouchStartFunction')); }

                        }

                        //MSGestureTap
                        eval(slider.attr('id')).addEventListener('MSGestureTap', MSGestureTap, true);
                        function MSGestureTap(event) {

                            var currentClientX = Math.round(event.clientX);
                            var currentClientY = Math.round(event.clientY);

                            //répérage si l'évènement est sur une puce (bidouille : le MSGestureTap ne rend pas l'élement-enfant cliqué mais toujours le div écouté)
                            var sliderClickedPuce = -1;
                            slider.find('.' + slider.data('sliderPaginationClass') + ' input[type="radio"]').each(function (index) {

                                var leftPuce = Math.round($(this).offset().left);
                                var topPuce = Math.round($(this).offset().top);
                                var rightPuce = Math.round($(this).offset().left + $(this).outerWidth(true));
                                var bottomPuce = Math.round($(this).offset().top + $(this).outerHeight(true));

                                if ((currentClientX >= leftPuce) && (currentClientX <= rightPuce) && (currentClientY >= topPuce) && (currentClientY <= bottomPuce)) { sliderClickedPuce = index; }

                            });

                            //répérage de quel li va peut-être être cliqué (si on est pas sur une puce)
                            var sliderClickedLi = -1;
                            slider.find('.content li').each(function (index) {

                                var leftLi = Math.round($(this).offset().left);
                                var rightLi = Math.round($(this).offset().left + $(this).outerWidth(true));

                                if ((currentClientX >= leftLi) && (currentClientX <= rightLi)) { sliderClickedLi = index; }
                            });

                            //action
                            if (sliderClickedPuce != -1) {
                                slider.data('sliderSelectedLi', sliderClickedPuce + 1);
                                Move_Slider('select', 'manual');
                            }
                            else if (sliderClickedLi != -1) {
                                Click_CurrentLi(slider.find('.content li').eq(sliderClickedLi).find('a'));
                            }
                        }

                        //MSGestureChange
                        eval(slider.attr('id')).addEventListener('MSGestureChange', MSGestureChange, false);
                        function MSGestureChange(event) {

                            //défilement horizontal uniquement
                            slider.data('sliderCurX', Math.round(event.offsetX));

                            if (parseInt(slider.data('sliderCurX')) > parseInt(slider.data('sliderStartX'))) {
                                slider.data('sliderHorizontalSwipeLength', -(parseInt(slider.data('sliderCurX')) - parseInt(slider.data('sliderStartX'))));
                            }
                            else if (parseInt(slider.data('sliderCurX')) < parseInt(slider.data('sliderStartX'))) {
                                slider.data('sliderHorizontalSwipeLength', (parseInt(slider.data('sliderStartX')) - parseInt(slider.data('sliderCurX'))));
                            }
                            else {
                                slider.data('sliderHorizontalSwipeLength', 0);
                            }

                            slider.data('sliderNewMarginLeft', parseInt(slider.data('sliderMarginLeft')) - parseInt(slider.data('sliderHorizontalSwipeLength')));
                            slider.find('.content').css({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) });

                            if (slider.data('sliderTouchMoveFunction') != '') { eval(slider.data('sliderTouchMoveFunction')); }
                        }

                        //MSGestureEnd
                        eval(slider.attr('id')).addEventListener('MSGestureEnd', MSGestureEnd, false);
                        function MSGestureEnd(event) {

                            MesureAndResize_Slider();
                            Get_SelectedLiByPointer();
                            Get_Li();
                            Correct_Animation();
                            slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, 200, function () {
                                if (slider.data('sliderTouchEndFunction') != '') { eval(slider.data('sliderTouchEndFunction')); }
                            });

                            //relancement de la rotation automatique
                            //if (slider.data('sliderRotation') == true) {
                            //	clearInterval(rotation);
                            //	rotation = setInterval(function () {
                            //		slider.data('command', 'next');
                            //		Move_Slider(slider.data('command'), 'automatic');
                            //	}, parseInt(slider.data('sliderRotationDelay')));
                            //}

                        }

                        //MSGestureHold
                        eval(slider.attr('id')).addEventListener('MSGestureHold', MSGestureHold, false);
                        function MSGestureHold(event) { event.preventDefault(); }

                        //mousedown
                        slider.on('mousedown', MouseDown, false);
                        function MouseDown() { return false; }

                    }

                    else {

                        //touchstart / mousedown
                        function SliderTouchStart(event) {

                            if (slider.data('sliderRotation') == true) { clearInterval(rotation); }

                            //récupération des paramêtres
                            var mouseAction;
                            try { mouseAction = event.data.mouseAction; } catch (ex) { mouseAction = 0; }

                            //comportements particuliers
                            if (mouseAction == 1) {
                                $(window).on('mousemove.' + slider.attr('id'), { 'mouseAction': mouseAction }, SliderTouchMove);
                                $(window).on('mouseup.' + slider.attr('id'), { 'mouseAction': mouseAction }, SliderTouchEnd);
                            }

                            MesureAndResize_Slider();
                            slider.data('sliderTouchSwipe', '');

                            slider.data('sliderStartX', Math.round(event.pageX) || event.originalEvent.touches[0].pageX);
                            slider.data('sliderStartY', Math.round(event.pageY) || event.originalEvent.touches[0].pageY);
                            slider.data('sliderMarginLeft', parseInt(slider.find('.content').css('marginLeft').replace('px', '')));

                            var d = new Date();
                            slider.data('sliderTouchStartTime', d.getTime());

                            if (slider.data('sliderTouchStartFunction') != '') { eval(slider.data('sliderTouchStartFunction')); }

                            //comportements particuliers
                            if (mouseAction == 1) { return false; }

                        }
                        if (touchNavigator) { slider.on('touchstart', { 'mouseAction': 0 }, SliderTouchStart); }
                        slider.on('mousedown', { 'mouseAction': 1 }, SliderTouchStart);


                        //touchmove
                        function SliderTouchMove(event) {

                            //récupération des paramêtres
                            var mouseAction;
                            try { mouseAction = event.data.mouseAction; } catch (ex) { mouseAction = 0; }

                            //déplacement horizontal
                            try { slider.data('sliderCurX', Math.round(event.pageX) || event.originalEvent.touches[0].pageX); }
                            catch (ex) { slider.data('sliderCurX', 0); }
                            slider.data('sliderHorizontalSwipeLength', Math.round(parseInt(slider.data('sliderStartX')) - parseInt(slider.data('sliderCurX'))));

                            //déplacement vertical
                            slider.data('sliderCurY', Math.round(event.pageY) || event.originalEvent.touches[0].pageY);
                            slider.data('sliderVerticalSwipeLength', Math.round(parseInt(slider.data('sliderStartY')) - parseInt(slider.data('sliderCurY'))));

                            if (Math.abs(slider.data('sliderHorizontalSwipeLength')) > Math.abs(slider.data('sliderVerticalSwipeLength'))) {
                                slider.data('sliderTouchSwipe', 'horizontal');
                                slider.data('sliderVerticalSwipeLength', 0);
                            }
                            else if (Math.abs(slider.data('sliderHorizontalSwipeLength')) < Math.abs(slider.data('sliderVerticalSwipeLength'))) {
                                slider.data('sliderTouchSwipe', 'vertical');
                                slider.data('sliderHorizontalSwipeLength', 0);
                            }
                            else {
                                slider.data('sliderTouchSwipe', '');
                                slider.data('sliderHorizontalSwipeLength', 0);
                                slider.data('sliderVerticalSwipeLength', 0);
                            }

                            if (slider.data('sliderTouchSwipe') == 'vertical') { }
                            else if (slider.data('sliderTouchSwipe') == 'horizontal') {

                                slider.data('sliderNewMarginLeft', parseInt(slider.data('sliderMarginLeft')) - parseInt(slider.data('sliderHorizontalSwipeLength')));
                                slider.find('.content').css({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) });

                                //comportements particuliers
                                if ((os == 'iOS') || (os == 'MacOS') || (os.indexOf('Android') > -1)) { event.preventDefault(); }

                                if (slider.data('sliderTouchMoveFunction') != '') { eval(slider.data('sliderTouchMoveFunction')); }
                            }

                        }
                        if (touchNavigator) { slider.on('touchmove', { 'mouseAction': 0 }, SliderTouchMove); }


                        //touchend
                        function SliderTouchEnd(event) {

                            //récupération des paramêtres
                            var mouseAction;
                            try { mouseAction = event.data.mouseAction; } catch (ex) { mouseAction = 0; }

                            //comportements particuliers
                            if (mouseAction == 1) {
                                $(window).unbind('mousemove.' + slider.attr('id'));
                                $(window).unbind('mouseup.' + slider.attr('id'));
                            }

                            if (slider.data('sliderTouchSwipe') == 'horizontal') { //déplacement horizontal
                                MesureAndResize_Slider();
                                Get_SelectedLiByPointer();
                                Get_Li();
                                Correct_Animation();
                                slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                    if (slider.data('sliderTouchEndFunction') != '') { eval(slider.data('sliderTouchEndFunction')); }
                                });
                            }
                            else if (slider.data('sliderTouchSwipe') == 'vertical') { //déplacement vertical
                                //on ne fait rien, le navigateur gère tout seul
                            }
                            else { //click sur le lien principal du li

                                if (($(event.target).attr('type') == 'radio') && ($(event.target).parents('.' + slider.data('sliderPaginationClass')).length > 0)) {

                                    //on est sur une puce de pagination
                                    slider.find('.' + slider.data('sliderPaginationClass') + ' input[type="radio"]').each(function (index) {
                                        if ($(this).attr('id') == $(event.target).attr('id')) {
                                            slider.data('sliderSelectedLi', parseInt(index + 1));
                                            Move_Slider('select', 'manual');
                                        }
                                    });
                                }
                                else {
                                    //on est sur le li
                                    Click_CurrentLi($(event.target).parents('li').find('a'));
                                }
                            }

                            //relancement de la rotation automatique
                            //if (slider.data('sliderRotation') == true) {
                            //	clearInterval(rotation);
                            //	rotation = setInterval(function() {
                            //		slider.data('command', 'next');
                            //		Move_Slider(slider.data('command'), 'automatic');
                            //	}, parseInt(slider.data('sliderRotationDelay')));
                            //}

                            //return false;
                        }
                        if (touchNavigator) { slider.on('touchend', { 'mouseAction': 0 }, SliderTouchEnd); }
                    }
                    //---------------------------------------------------------------------------------------------------------------------------------------------

                }



                //récupération du li sélectionné par le potentiel pointer
                function Get_SelectedLiByPointer() {
                    if (slider.data('sliderPointerId') != '') { //présence d'un pointer/aiguille
                        var pointer = $('#' + slider.data('sliderPointerId'));
                        var pointerWidth = Math.round(pointer.outerWidth(true));
                        var positionLeftPointer = Math.round(pointer.offset().left);
                        var positionRightPointer = positionLeftPointer + pointerWidth;
                        var positionCenterPointer = Math.round((positionLeftPointer + positionRightPointer) / 2);

                        for (var i = 0; i < parseInt(slider.data('sliderLiCount')) ; i++) {
                            var currentLi = slider.find('.content li').eq(i);
                            var currentLiWidth = Math.round(currentLi.outerWidth(true));
                            var positionLeftCurrentLi = Math.round(currentLi.offset().left);
                            var positionRightCurrentLi = positionLeftCurrentLi + currentLiWidth;
                            if ((i == 0) && (positionLeftCurrentLi >= positionCenterPointer) && (positionRightCurrentLi >= positionCenterPointer)) {
                                slider.data('sliderSelectedLi', 1);
                            }
                            else if ((i == (parseInt(slider.data('sliderLiCount')) - 1)) && (positionLeftCurrentLi <= positionCenterPointer) && (positionRightCurrentLi <= positionCenterPointer)) {
                                slider.data('sliderSelectedLi', parseInt(slider.data('sliderLiCount')));
                            }
                            else if ((positionLeftCurrentLi <= positionCenterPointer) && (positionRightCurrentLi >= positionCenterPointer)) {
                                slider.data('sliderSelectedLi', i + 1);
                            }
                        }
                    }
                }


                //récupération du premier li affichable et du li sélectionné
                function Get_Li() {

                    if (parseInt(slider.data('sliderVisibleLiCount')) == 1) { //c'est simple
                        if (slider.data('command') == 'next') {
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderFirstVisibleLi')) + 1);
                        }
                        else if (slider.data('command') == 'previous') {
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderFirstVisibleLi')) - 1);
                        }
                        else if (slider.data('command') == 'first') {
                            slider.data('sliderFirstVisibleLi', 1);
                        }
                        else if (slider.data('command') == 'last') {
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderLiCount')));
                        }
                        else if (slider.data('command') == 'select') {
                            slider.data('sliderFirstVisibleLi', slider.data('sliderSelectedLi'));
                        }
                        else if (parseInt(slider.data('sliderHorizontalSwipeLength')) > parseInt(slider.data('sliderMinSwipe'))) {
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderFirstVisibleLi')) + 1);
                        }
                        else if (parseInt(slider.data('sliderHorizontalSwipeLength')) < parseInt(slider.data('sliderMinSwipe'))) {
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderFirstVisibleLi')) - 1);
                        }
                    }
                    else { //c'est plus complexe
                        if (parseInt(slider.find('.content').css('marginLeft').replace('px', '')) >= 0) { //li le plus à gauche
                            slider.data('sliderFirstVisibleLi', 1);
                        }
                        else if (Math.abs(parseInt(slider.find('.content').css('marginLeft').replace('px', ''))) > Math.abs(parseInt(slider.data('sliderMaxWidth')))) { //li le plus à droite
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderLiCount')) + 1);
                        }
                        else {
                            slider.data('sliderFirstVisibleLi', Math.ceil(Math.abs(parseInt(slider.find('.content').css('marginLeft').replace('px', ''))) / parseInt(slider.data('sliderLiWidth'))));
                            if (Math.abs(parseInt(slider.find('.content').css('marginLeft').replace('px', ''))) % parseInt(slider.data('sliderLiWidth')) == 0) {
                                slider.data('sliderFirstVisibleLi', slider.data('sliderFirstVisibleLi') + 1);
                            }
                        }
                    }

                    if (slider.data('sliderSideProtection') == true) { //protection des débords sur les côtés
                        //blocage à droite : on prend le li qui permettra d'avoir le dernier li parfaitement à droite
                        if (parseInt(slider.data('sliderFirstVisibleLi')) > (parseInt(slider.data('sliderLiCount')) - parseInt(slider.data('sliderVisibleLiCount')) + 1)) {
                            slider.data('sliderFirstVisibleLi', (parseInt(slider.data('sliderLiCount')) - parseInt(slider.data('sliderVisibleLiCount')) + 1));
                        }
                        //blocage à gauche : on prend le premier li
                        if (parseInt(slider.data('sliderFirstVisibleLi')) < 1) {
                            slider.data('sliderFirstVisibleLi', 1);
                        }
                    }
                    else { //pas de protection des débords sur les côtés
                        //on prend le dernier li
                        if (parseInt(slider.data('sliderFirstVisibleLi')) > parseInt(slider.data('sliderLiCount'))) {
                            slider.data('sliderFirstVisibleLi', parseInt(slider.data('sliderLiCount')));
                        }
                        //on prend le premier li
                        if (parseInt(slider.data('sliderFirstVisibleLi')) < 1) {
                            slider.data('sliderFirstVisibleLi', 1);
                        }
                    }

                    slider.find('.' + slider.data('sliderPaginationClass')).find('input[type="radio"]').removeAttr('checked');
                    slider.find('.' + slider.data('sliderPaginationClass')).find('input[type="radio"]').eq(parseInt(slider.data('sliderFirstVisibleLi')) - 1).prop('checked', 'checked');

                    slider.data('command', null);
                    slider.data('sliderSelectedLi', null);
                }


                //correction de l'animation pour respecter les règles du slider
                function Correct_Animation(opt) {

                    var minLeftPosition = 0; //le coté gauche à ne pas dépasser (par défaut)
                    var minRightPosition = parseInt(slider.data('sliderMinWidth')); //le coté droit à ne pas dépasser (par défaut)

                    if (slider.data('sliderSideProtection') == true) { //protection des débords sur les côtés

                        if (slider.data('sliderFreeSwipe') == false) { //mouvement bloqué sur un "li", on replace parfaitement sur le li courant

                            if (slider.data('sliderPointerId') == '') { //absence de pointer/aiguille
                                if (parseInt(slider.data('sliderFirstVisibleLi')) == 1) {
                                    slider.data('sliderNewMarginLeft', minLeftPosition);
                                }
                                else {
                                    slider.data('sliderNewMarginLeft', -((parseInt(slider.data('sliderFirstVisibleLi')) - 1) * parseInt(slider.data('sliderLiWidth'))));
                                }
                            }
                            else { //présence d'un pointer/aiguille
                                var pointer = $('#' + slider.data('sliderPointerId'));
                                var pointerWidth = Math.round(pointer.outerWidth(true));
                                var positionLeftPointer = Math.round(pointer.offset().left);
                                var positionRightPointer = positionLeftPointer + pointerWidth;
                                var positionCenterPointer = Math.round((positionLeftPointer + positionRightPointer) / 2);
                                if ((parseInt(slider.data('sliderFirstVisibleLi')) == 1) && (parseInt(slider.find('.content').css('marginLeft').replace('px', '')) > positionCenterPointer)) {
                                    slider.data('sliderNewMarginLeft', (minLeftPosition + positionCenterPointer - Math.round(parseInt(slider.data('sliderLiWidth')) / 2)));
                                }
                                else if ((parseInt(slider.data('sliderMaxWidth')) + parseInt(slider.data('sliderNewMarginLeft')) + (parseInt(slider.data('sliderMinWidth')) - positionCenterPointer)) < minRightPosition) {
                                    slider.data('sliderNewMarginLeft', 0 - parseInt(slider.data('sliderMaxWidth')) + positionCenterPointer + Math.round(parseInt(slider.data('sliderLiWidth')) / 2));
                                }
                                else {
                                    slider.data('sliderNewMarginLeft', -((parseInt(slider.data('sliderFirstVisibleLi')) - 1) * parseInt(slider.data('sliderLiWidth'))));
                                }
                            }
                        }
                        else { //mouvement libre
                            if (slider.data('sliderPointerId') == '') { //absence de pointer/aiguille
                                if ((parseInt(slider.data('sliderFirstVisibleLi')) == 1) && (parseInt(slider.find('.content').css('marginLeft').replace('px', '')) > 0)) {
                                    slider.data('sliderNewMarginLeft', minLeftPosition);
                                }
                                else if (parseInt(slider.data('sliderFirstVisibleLi')) >= (parseInt(slider.data('sliderLiCount')) - parseInt(slider.data('sliderVisibleLiCount')) + 1)) {
                                    slider.data('sliderNewMarginLeft', -((parseInt(slider.data('sliderFirstVisibleLi')) - 1) * parseInt(slider.data('sliderLiWidth'))));
                                }
                            }
                            else { //présence d'un pointer/aiguille
                                var pointer = $('#' + slider.data('sliderPointerId'));
                                var pointerWidth = Math.round(pointer.outerWidth(true));
                                var positionLeftPointer = Math.round(pointer.offset().left);
                                var positionRightPointer = positionLeftPointer + pointerWidth;
                                var positionCenterPointer = Math.round((positionLeftPointer + positionRightPointer) / 2);
                                if ((parseInt(slider.data('sliderFirstVisibleLi')) == 1) && (parseInt(slider.find('.content').css('marginLeft').replace('px', '')) > positionCenterPointer)) {
                                    slider.data('sliderNewMarginLeft', (minLeftPosition + positionCenterPointer - Math.round(parseInt(slider.data('sliderLiWidth')) / 2)));
                                }
                                else if ((parseInt(slider.data('sliderMaxWidth')) + parseInt(slider.data('sliderNewMarginLeft')) + (parseInt(slider.data('sliderMinWidth')) - positionCenterPointer)) < minRightPosition) {
                                    slider.data('sliderNewMarginLeft', 0 - parseInt(slider.data('sliderMaxWidth')) + positionCenterPointer + Math.round(parseInt(slider.data('sliderLiWidth')) / 2));
                                }
                            }

                        }
                    }
                }


                //mesure et redimensionnement dynamique du slider
                function MesureAndResize_Slider() {

                    slider.data('sliderLiHeight', slider.outerHeight(true));

                    slider.data('sliderLiWidth', slider.outerWidth(true) / parseInt(slider.data('sliderVisibleLiCount')));
                    slider.find('.content li').width(parseInt(slider.data('sliderLiWidth')));

                    slider.data('sliderMinWidth', parseInt(slider.data('sliderLiWidth')) * parseInt(slider.data('sliderVisibleLiCount')));

                    slider.data('sliderMaxWidth', parseInt(slider.data('sliderLiCount')) * parseInt(slider.data('sliderLiWidth')));
                    slider.find('.content').width(parseInt(slider.data('sliderMaxWidth')));

                    slider.find('.container').width(slider.data('sliderMinWidth'));

                    //alert(slider.data('sliderMinWidth'));
                    //alert(slider.data('sliderMaxWidth'));
                    //alert(slider.data('sliderLiWidth'));

                }


                //correction du design du slider après un redimensionnement
                function Correct_Slider() {
                    if (slider.data('sliderPointerId') == '') { //pas de présence de pointer/aiguille
                        slider.data('sliderNewMarginLeft', -((parseInt(slider.data('sliderFirstVisibleLi')) - 1) * parseInt(slider.data('sliderLiWidth'))));
                    }
                    else { //présence d'un pointer/aiguille
                        var pointer = $('#' + slider.data('sliderPointerId'));
                        var pointerWidth = Math.round(pointer.outerWidth(true));
                        var positionLeftPointer = Math.round(pointer.offset().left);
                        var positionRightPointer = positionLeftPointer + pointerWidth;
                        var positionCenterPointer = Math.round((positionLeftPointer + positionRightPointer) / 2);
                        slider.data('sliderNewMarginLeft', -((parseInt(slider.data('sliderSelectedLi')) - 1) * parseInt(slider.data('sliderLiWidth'))) + positionCenterPointer - Math.round(parseInt(slider.data('sliderLiWidth')) / 2));
                    }
                }


                //click sur le lien principal du li
                function Click_CurrentLi(currentLink) {
                    if ((slider.data('sliderClickableLi') == true) && (currentLink != undefined)) {
                        var currentLinkHref = currentLink.attr('href');
                        if (currentLinkHref != undefined) {
                            var currentLinkTarget = ((currentLink.attr('target') == '') || (currentLink.attr('target') == undefined)) ? '_self' : currentLink.attr('target').toLowerCase();
                            if (currentLinkTarget == '_blank') {
                                var openAction = window.open(currentLinkHref);
                                if (openAction == null || typeof (openAction) == 'undefined') {
                                    document.location = currentLinkHref;
                                }
                            }
                            else {
                                document.location = currentLinkHref;
                            }
                        }
                    }
                    return false;
                }

                //déplacement manuel du slider
                function Move_Slider(action, mode) {

                    if ((mode == 'undefined') || (mode == undefined) || (mode == null)) { mode = 'manual'; }

                    if (!slider.hasClass(slider.attr('id') + '_inprogress')) {

                        if (slider.data('sliderMoveStartFunction') != '') { eval(slider.data('sliderMoveStartFunction')); }

                        if (action == 'next') {
                            if (((slider.data('sliderFirstVisibleLi') + slider.data('sliderVisibleLiCount') - 1) < slider.data('sliderLiCount')) || (slider.data('sliderPointerId') != '')) {
                                slider.addClass(slider.attr('id') + '_inprogress');
                                slider.data('sliderNewMarginLeft', parseInt(slider.find('.content').css('marginLeft').replace('px', '')) - parseInt(slider.data('sliderLiWidth')));
                                slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                    MesureAndResize_Slider();
                                    Get_SelectedLiByPointer();
                                    Get_Li();
                                    Correct_Animation();
                                    slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                        if (slider.data('sliderMoveEndFunction') != '') { eval(slider.data('sliderMoveEndFunction')); }
                                        slider.removeClass(slider.attr('id') + '_inprogress');
                                    });
                                });
                            }
                            else if ((slider.data('sliderInfiniteSwipe') == true) || (slider.data('sliderRotation') == true)) {
                                slider.data('command', 'first');
                                Move_Slider(slider.data('command'), 'automatic');
                            }
                        }
                        if (action == 'previous') {
                            if ((slider.data('sliderFirstVisibleLi') > 1) || (slider.data('sliderPointerId') != '')) {
                                slider.addClass(slider.attr('id') + '_inprogress');
                                slider.data('sliderNewMarginLeft', parseInt(slider.find('.content').css('marginLeft').replace('px', '')) + parseInt(slider.data('sliderLiWidth')));
                                slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                    MesureAndResize_Slider();
                                    Get_SelectedLiByPointer();
                                    Get_Li();
                                    Correct_Animation();
                                    slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                        if (slider.data('sliderMoveEndFunction') != '') { eval(slider.data('sliderMoveEndFunction')); }
                                        slider.removeClass(slider.attr('id') + '_inprogress');
                                    });
                                });
                            }
                            else if ((slider.data('sliderInfiniteSwipe') == true) || (slider.data('sliderRotation') == true)) {
                                slider.data('command', 'last');
                                Move_Slider(slider.data('command'), 'automatic');
                            }
                        }
                        if (action == 'first') {
                            slider.addClass(slider.attr('id') + '_inprogress');
                            slider.data('sliderSelectedLi', 1);
                            slider.data('sliderNewMarginLeft', 0);
                            slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                MesureAndResize_Slider();
                                Get_SelectedLiByPointer();
                                Get_Li();
                                Correct_Animation();
                                slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                    if (slider.data('sliderMoveEndFunction') != '') { eval(slider.data('sliderMoveEndFunction')); }
                                    slider.removeClass(slider.attr('id') + '_inprogress');
                                });
                            });
                        }
                        if (action == 'last') {
                            slider.addClass(slider.attr('id') + '_inprogress');
                            slider.data('sliderSelectedLi', slider.data('sliderLiCount'));
                            slider.data('sliderNewMarginLeft', -(parseInt(slider.data('sliderLiCount')) - parseInt(slider.data('sliderVisibleLiCount'))) * parseInt(slider.data('sliderLiWidth')));
                            slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                MesureAndResize_Slider();
                                Get_SelectedLiByPointer();
                                Get_Li();
                                Correct_Animation();
                                slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                    if (slider.data('sliderMoveEndFunction') != '') { eval(slider.data('sliderMoveEndFunction')); }
                                    slider.removeClass(slider.attr('id') + '_inprogress');
                                });
                            });
                        }
                        if (action == 'select') {
                            slider.addClass(slider.attr('id') + '_inprogress');
                            slider.data('sliderNewMarginLeft', -(parseInt(slider.data('sliderSelectedLi') - 1) * parseInt(slider.data('sliderLiWidth'))));
                            slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                MesureAndResize_Slider();
                                Get_SelectedLiByPointer();
                                Get_Li();
                                Correct_Animation();
                                slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')), function () {
                                    if (slider.data('sliderMoveEndFunction') != '') { eval(slider.data('sliderMoveEndFunction')); }
                                    slider.removeClass(slider.attr('id') + '_inprogress');
                                });
                            });
                        }

                    }
                    return false;
                }

                //actions
                if (slider.data('command') == 'init') { Init(); }
                else if (slider.data('command') == 'next') { Move_Slider('next', 'manual'); }
                else if (slider.data('command') == 'previous') { Move_Slider('previous', 'manual'); }
                else if (slider.data('command') == 'first') { Move_Slider('first', 'manual'); }
                else if (slider.data('command') == 'last') { Move_Slider('last', 'manual'); }
                else if (slider.data('command') == 'select') { Move_Slider('select', 'manual'); }
                else if (slider.data('command') == 'resize') { MesureAndResize_Slider(); }
                else if (slider.data('command') == 'correct') {
                    MesureAndResize_Slider();
                    Get_SelectedLiByPointer();
                    Get_Li();
                    Correct_Animation();
                    slider.find('.content').animate({ 'marginLeft': parseInt(slider.data('sliderNewMarginLeft')) }, parseInt(slider.data('sliderVitesse')));
                }

                return false;

            }
    );
}