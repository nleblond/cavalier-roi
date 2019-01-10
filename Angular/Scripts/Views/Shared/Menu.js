$(window).on('load', function () {

    //menu
    $('.menu .hamburger').on('click', function () {
        if ($('.menu .liste').is(':visible') == true) {
            $('.menu .liste').hide();
        }
        else {
            $('.menu .liste').show();
        }
    });


    //sous-menu
    $('.menu .liste ul.second').parent('li').on('click', function () {
        if ($(this).find('ul.second').is(':visible') == true) {
            $('.menu .liste ul.second').hide();
            //alert('hide');
        }
        else {
            $('.menu .liste ul.second').show();
            //alert('show');
        }
    });
    $('.menu .liste ul.second').parent('li').on('mouseover', function () {
        if ($('.menu .liste hr').is(':visible') == true) {
            $('.menu .liste ul.second').show();
        }
    });

    //focus
    var accueil = new Object();
    accueil.width = 65;
    accueil.marginLeft = 0;

    var actualites = new Object();
    actualites.width = 100;
    actualites.marginLeft = 85;

    var echecs = new Object();
    echecs.width = 95;
    echecs.marginLeft = 200;

    var stages = new Object();
    stages.width = 60;
    stages.marginLeft = 315;

    var cours = new Object();
    cours.width = 55;
    cours.marginLeft = 395;

    var tournois = new Object();
    tournois.width = 80;
    tournois.marginLeft = 470;

    var moncompte = new Object();
    moncompte.width = 110;
    moncompte.marginLeft = 670;

    var contact = new Object();
    contact.width = 70;
    contact.marginLeft = 800;

    var boutique = new Object();
    boutique.width = 85;
    boutique.marginLeft = 570;

    var positions = new Array();
    positions[0] = accueil;
    positions[1] = actualites;
    positions[2] = echecs;
    positions[3] = stages
    positions[4] = cours;
    positions[5] = tournois;
    positions[6] = moncompte;
    positions[7] = contact;
    positions[8] = boutique;

    $('li.accueil, li.actualites, li.echecs, li.stages, li.cours, li.tournois, li.moncompte, li.contact').each(function (i) {
        $(this).on('mouseover', function () {
            $('.menu .liste ul.second').hide();
            if ($('.menu .liste hr').is(':visible') == true) {
                $('.menu .liste .focus').show().css({
                    'width': positions[i].width + 'px',
                    'marginLeft': positions[i].marginLeft + 'px'
                });
            }
        });
        $(this).on('mouseout', function () {
            if ($('.menu .liste hr').is(':visible') == true) {
                $('.menu .liste .focus').hide();
            }
        });
    });

    //affichage de la modal de contact
    $('li.contact').on('click', function () {
        $('#Div_Contact').ModalPopUp('open');
    });


    //vérification de connexion pour la page "mon compte"
    $('li.moncompte').on('click', function () {

        var _Connected = CheckConnectedEleve();

        if (_Connected == true) {
            //return true;
            document.location.href = "/MonCompte";
        }
        else {
            OpenConnexion("/MonCompte");
        }

        return false;
    });



    
});