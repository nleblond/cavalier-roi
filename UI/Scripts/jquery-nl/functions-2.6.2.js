// JScript File
// v2.6.2
// 28/06/2018

//newParseFloat pour les chiffres à virgule ou à point
function newParseFloat(val) {
    val = val.replace(",", ".");
    return parseFloat(val);
}

//fonction pour trouver le parametre dans l'url
function FindUrl(txt) {
    var url = window.location.href;
    var urlSplit = url.split(/[?&]/);
    for (var i = 1; i < urlSplit.length; i++)
        if (urlSplit[i].indexOf(txt + "=") > -1) {
            var aParam = urlSplit[i].split("=");
            return aParam[1];
        }
    return null;
}

//Afficher une PopUp paramétrable
function PopupCentre(page, largeur, hauteur, options) {
    var top = (screen.height - hauteur) / 2;
    var left = (screen.width - largeur) / 2;
    window.open(page, "", "top=" + top + ",left=" + left + ",width=" + largeur + ",height=" + hauteur + "," + options);
}

//Supprimer les espaces en trop au milieu d'une une chaine caractères
function ITrim(chaine) {
    return (chaine.indexOf('  ') == -1) ? chaine : ITrim(chaine.substring(0, chaine.indexOf('  ')) + chaine.substring(chaine.indexOf('  ') + 1))
}

//Supprimer les espaces en trop en début de chaine de caractères
function LTrim(chaine) {
    return (chaine.charAt(0) == ' ') ? LTrim(chaine.substring(1)) : chaine
}

//Supprimer les espaces en trop en fin de chaine de caractères
function RTrim(chaine) {
    return (chaine.charAt(chaine.length - 1) == ' ') ? RTrim(chaine.substring(0, chaine.length - 1)) : chaine
}

//Supprimer les espaces en trop dans une chaine de caractères
function Trim(chaine) {
    return chaine.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//Convertir une date au format us en date au format fr
function Date_FR_To_US(value) {
    return value.charAt(6) + value.charAt(7) + value.charAt(8) + value.charAt(9) + '/' + value.charAt(3) + value.charAt(4) + '/' + value.charAt(0) + value.charAt(1)
}

//Convertir une date au format fr en date au format us
function Date_US_To_FR(value) {
    return value.charAt(8) + value.charAt(9) + '/' + value.charAt(5) + value.charAt(6) + '/' + value.charAt(0) + value.charAt(1) + value.charAt(2) + value.charAt(3)
}

//Récupérer la date du jour au format DD/MM/YYYY
function DayDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

//Récupérer les n premiers caractères d'une chaine de caractères
function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}

//Récupérer les n derniers caractères d'une chaine de caractères
function Right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

//Supprimer tous les espaces en trop dans une chaine de caractères
function removeExtraSpace(str) {
    str = str.replace(/[\s]{2,}/g, " "); // Enlève les espaces doubles, triples, etc. 
    str = str.replace(/^[\s]/, ""); // Enlève les espaces au début 
    str = str.replace(/[\s]$/, ""); // Enlève les espaces à la fin 
    return str;
}

//Convertir les \r\n et \n en <br />
function WithBR(str) {
    str = str.replace(/[\r\n]/g, '<br />');
    str = str.replace(/[\n]/g, '<br />');
    return str;
}

//Tester si un numéro de téléphone mobile est valide
function isMobilePhone(e) {
    var validation = true;
    var myRegexp = /^(06|07)+([0-9]){8}$/g;
    var m = myRegexp.exec(e);

    if (!m) {
        validation = false;
    }
    return validation;
}

//Tester si une adresse e-mail est valide
function isEmail(e) {
    var validation = true
    var regex = /^[^@]+@(([\w\-]+\.){1,4}[a-zA-Z]{2,4}|(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5]))$/;
    var rgx = new RegExp(regex);

    var test_email = rgx.exec(e);
    if ((test_email == null) || (test_email == '')) {
        validation = false;
    }
    return validation;
}

//Tester si une IP est valide
function isIP(ip) {
    var x = ip.split("."), x1, x2, x3, x4;

    if (x.length == 4) {
        x1 = parseInt(x[0], 10);
        x2 = parseInt(x[1], 10);
        x3 = parseInt(x[2], 10);
        x4 = parseInt(x[3], 10);

        if (isNaN(x1) || isNaN(x2) || isNaN(x3) || isNaN(x4)) {
            return false;
        }

        if ((x1 >= 0 && x1 <= 255) && (x2 >= 0 && x2 <= 255) && (x3 >= 0 && x3 <= 255) && (x4 >= 0 && x4 <= 255)) {
            return true;
        }
    }
    return false;
}

//fonction pour verifier un email professionnel
function isEmailPro(e) {
    var validation = true
    var Tableau_Email = ["gmail", "hotmail", "yahoo", "free", "gmx"];
    for (var i = 0; i <= Tableau_Email.length; i++) {
        var Search_Index = e.toLowerCase().indexOf(Tableau_Email[i]);
        if (Search_Index != -1) {
            validation = false;
            break;
        }
    }
    return validation;
}

// fonction permettant de contrôler la validité d'un numéro SIRET
function isSiret(e) {
    e = e.replace(/ /g, "");
    if (e.length != 14) return false; // le SIRET doit contenir 14 caractères
    if (!isInteger(e)) return false; // le SIRET ne doit contenir que des chiffres
    // on prend chaque chiffre un par un
    // si son index est pair
    // on double sa valeur et si cette dernière est supérieure à 9, on lui retranche 9
    // on ajoute cette valeur à la somme totale
    var ctrlNumber;
    var sum = 0;
    for (i = 0; i < 14; i++) {
        ctrlNumber = parseInt(e.charAt(i));
        if ((i % 2) == 0) {
            ctrlNumber = ctrlNumber * 2;
            if ((ctrlNumber) > 9) ctrlNumber = ctrlNumber - 9;
        }
        sum = sum + ctrlNumber;
    }
    // le numéro est valide si la somme des chiffres est multiple de 10
    if ((sum % 10) != 0) {
        return false;
    } else return true;
}

// Convertit une lettre d'un RIB en un chiffre selon la table suivante :
// 1 2 3 4 5 6 7 8 9
// A B C D E F G H I
// J K L M N O P Q R
// _ S T U V W X Y Z
function RibLetterToDigit(letter) {
    var val;
    if (letter >= 'A' && letter <= 'I') {
        val = (letter.charCodeAt(0) - 'A'.charCodeAt(0) + '1'.charCodeAt(0));
    }
    else if (letter >= 'J' && letter <= 'R') {
        val = (letter.charCodeAt(0) - 'J'.charCodeAt(0) + '1'.charCodeAt(0));
    }
    else if (letter >= 'S' && letter <= 'Z') {
        val = (letter.charCodeAt(0) - 'S'.charCodeAt(0) + '2'.charCodeAt(0));
    }
    else return '';
    return String.fromCharCode(val);
}

// Validation de la saisie d'un RIB (http://fr.wikipedia.org/wiki/Clé_RIB)
function isValidRib(rib) {
    // Suppression des espaces et tirets
    rib = rib.replace(/ /g, "");
    rib = rib.replace(/-/g, "");

    // Vérification du format BBBBBGGGGGCCCCCCCCCCCKK
    // B : banque
    // G : guichet
    // C : numéro de compte
    // K : clé RIB
    var myRegexp = /^(\d{5})(\d{5})(\w{11})(\d{2})$/g;
    var m = myRegexp.exec(rib);

    if (!m) return false;

    // Extraction des composants
    var b_s = m[1];
    var g_s = m[2];
    var c_s = m[3];
    var k_s = m[4];
    var c_s2 = '';

    // Remplacement des lettres par des chiffres dans le numéro de compte
    for (i = 0; i < c_s.length; i++) {
        if (isInteger(c_s.charAt(i)))
            c_s2 = c_s2 + c_s.charAt(i);
        else
            c_s2 = c_s2 + RibLetterToDigit(c_s.charAt(i).toUpperCase());
    }
    c_s = c_s2;

    // Séparation du numéro de compte pour tenir sur 32bits
    var d_s = c_s.substring(0, 6);
    c_s = c_s.substring(6, 11);

    // Calcul de la clé RIB
    // Algo ici : http://fr.wikipedia.org/wiki/Clé_RIB#Algorithme_de_calcul_qui_fonctionne_avec_des_entiers_32_bits

    var b = parseInt(b_s, 10);
    var g = parseInt(g_s, 10);
    var d = parseInt(d_s, 10);
    var c = parseInt(c_s, 10);
    var k = parseInt(k_s, 10);

    var calculatedKey = 97 - ((89 * b + 15 * g + 76 * d + 3 * c) % 97);
    return (k == calculatedKey);
}

// Tester si nombre entier
function isInteger(num) {
    var reg = new RegExp("^[\-]?[0-9]*$");
    return reg.test(num)
}

// Tester si nombre 
function isNumeric(sText, caractere) {
    if (typeof (sText) != 'undefined' && sText != null && sText != '') {
        var validChars;
        if (typeof (caractere) == 'undefined') { validChars = "0123456789.,"; }
        else if (caractere == '.') { validChars = "0123456789.,"; }
        else if (caractere == ',') { validChars = "0123456789,"; }
        var isNumber = true;
        var char;
        for (i = 0; i < sText.length && isNumber == true; i++) {
            char = sText.charAt(i);
            if (validChars.indexOf(char) == -1) {
                isNumber = false;
            }
        }
    }
    else {
        isNumber = false;
    }
    return isNumber;
}

// Tester si un nombre est un numérique positif
function isPositiveNumeric(sText, caractere) {
    if (typeof (sText) != 'undefined' && sText != null && sText != '') {
        var validChars;
        if (typeof (caractere) == 'undefined') { validChars = "0123456789.,"; }
        else if (caractere == '.') { validChars = "0123456789.,"; }
        else if (caractere == ',') { validChars = "0123456789,"; }
        var isNumber = true;
        var char;
        for (i = 0; i < sText.length && isNumber == true; i++) {
            char = sText.charAt(i);
            if (validChars.indexOf(char) == -1) {
                isNumber = false;
            }
        }
    }
    else {
        isNumber = false;
    }
    return isNumber;
}

function isWholePositiveNumber(value) {
    var isValueOk = true;

    if (value == "") isValueOk = false;

    var rgx = new RegExp("^(0|[1-9][0-9]*)$");

    if (!rgx.test(value)) isValueOk = false;

    return isValueOk;
}

//Tester si une date est valide
function isDate(d) {
    // Cette fonction permet de vérifier la validité d'une date au format jj/mm/aa ou jj/mm/aaaa
    // Par Romuald

    if (d == "") // si la variable est vide on retourne faux
        return false;

    e = new RegExp("^[0-9]{1,2}\/[0-9]{1,2}\/([0-9]{2}|[0-9]{4})$");

    if (!e.test(d)) // On teste l'expression régulière pour valider la forme de la date
        return false; // Si pas bon, retourne faux
    // On sépare la date en 3 variables pour vérification, parseInt() converti du texte en entier
    j = parseInt(d.split("/")[0], 10); // jour
    m = parseInt(d.split("/")[1], 10); // mois
    a = parseInt(d.split("/")[2], 10); // année
    // Si l'année n'est composée que de 2 chiffres on complète automatiquement
    if (a < 1000) {
        if (a < 89) a += 2000; // Si a < 89 alors on ajoute 2000 sinon on ajoute 1900
        else a += 1900;
    }
    // Définition du dernier jour de février
    // Année bissextile si annnée divisible par 4 et que ce n'est pas un siècle, ou bien si divisible par 400
    if (a % 4 == 0 && a % 100 != 0 || a % 400 == 0) fev = 29;
    else fev = 28;
    // Nombre de jours pour chaque mois
    nbJours = new Array(31, fev, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // Enfin, retourne vrai si le jour est bien entre 1 et le bon nombre de jours, idem pour les mois, sinon retourn faux
    return (m >= 1 && m <= 12 && j >= 1 && j <= nbJours[m - 1]);
}

//Tester si une heure est valide
function isHour(sHour) {
    var sSeparator = ':';
    var withSeconds = false;
    if (sHour.match("^[0-9]{2}:[0-9]{2}:[0-9]{2}$")) {
        var withSeconds = true;
    }
    else if (!sHour.match("^[0-9]{2}:[0-9]{2}$")) {
        return false;
    }
    var arHour = sHour.split(sSeparator);
    var iHour = parseInt(arHour[0]);
    var iMinute = parseInt(arHour[1]);
    if (withSeconds) {
        var iSecs = parseInt(arHour[2]);
    }
    else {
        var iSecs = 0;
    }
    return ((iHour >= 0) && (iHour < 24)) && ((iMinute >= 0) && (iMinute < 60)) && ((iSecs >= 0) && (iSecs < 60));
}

//Récupérer les dimensions d'origine d'une image
function naturalDimensions(img) {
    // si l'un existe, l'autre aussi. On a affaire à un bon navigateur, on s'arrête.
    if ('naturalWidth' in img) { return img; }

    // on commence les tours de passe-passe
    var
        // ceci est la copie sur laquelle on va travailler
        copie = img.cloneNode(false),

        // un petit raccourci
        s = copie.style;

    // remet tous les styles par défaut
    s.width = 'auto';
    s.height = 'auto';
    // pour que les tailles soient disponible il faut ajouter la copie au DOM
    // donc on cache l'image pour pas avoir de surprises
    // on utilise visibility au lieu de display car même si l'élément ne 
    // s'affiche pas il réserve sa place lors du rendu, les dimensions sont calculées.
    s.visibility = 'hidden';
    // et on la positionne hors de l'écran pour être bien sûr
    s.position = 'absolute';
    s.top = '100%';
    // on l'ajoute au DOM pour que les tailles soient calculés
    document.body.appendChild(copie);

    // on ajoute les dimensions originales à notre image redimensionnée
    img.naturalWidth = copie.clientWidth;
    img.naturalHeight = copie.clientHeight;

    // on supprime la copie
    document.body.removeChild(copie);

    // et l'on renvoie l'objet modifié
    return img;
}

//Protéger les caractères spéciaux d'une chaine de caractères : ', ", \, ...
function protect(ch) {
    ch = ch.replace(/\\/g, "\\\\");
    ch = ch.replace(/[']/g, "\\'");
    ch = ch.replace(/\"/g, "\\\"")
    return ch;
}

//Rajoute les 3 petits points à la fin d'une phrase de taille définie
function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots;
    }

    return string;
}

//Générer un GUID/UUID
function generateGuId() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j == 8 || j == 12 || j == 16 || j == 20) {
            result = result + '-';
        }
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}

//Générer un identifiant unique
function generateUniqueId() {
    return generateGuId().replace('-', '');
}

//Déterminer si le type en paramètre est une fonction
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

//Converti une date au format FR dd/MM/yyyy en Date() Javascript
function dateFrToDateJs(str) {
    var dateJs = null;
    try {
        var myRegexp = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/g;
        var match = myRegexp.exec(str);
        dateJs = new Date();

        dateJs.setDate(parseInt(match[1]));
        dateJs.setMonth(parseInt(match[2]) - 1);
        dateJs.setYear(parseInt(match[3]));
    } catch (e) {
        dateJs = null;
    }
    return dateJs;
}

//Regarder si la première date (format String) est inférieure à la deuxième date (format String)
function dateIsLessThan(firstDate, secondDate) {
    var IsLessThan = false;
    try {
        var firstDateJs = dateFrToDateJs(firstDate);
        var secondDateJs = dateFrToDateJs(secondDate);
        IsLessThan = firstDateJs < secondDateJs;
    } catch (e) {
        IsLessThan = false;
    }
    return IsLessThan;
}


var JSON = JSON || {};
//Sérialiser/Convertir un objet javascript en chaine de caractères JSON
JSON.serialize = JSON.serialize || function (obj) {

    var t = typeof (obj);
    if (t != "object" || obj === null) {

        // simple data type
        alert(protect(obj));

        if (t == "string") obj = '"' + protect(obj) + '"';
        return String(obj);

    }
    else {

        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);

        for (n in obj) {
            v = obj[n]; t = typeof (v);

            if (t == "string") {
                v = '"' + protect(v) + '"';
            }
            else if (t == "object" && v !== null) {
                v = JSON.serialize(v);
            }

            json.push((arr ? "" : '"' + n + '":') + String(v));
        }

        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

//Permet de lancer un click sur le bouton selector lorsque le bouton entrée est déclenché.
function FireDefaultButton(event, selector) {
    if (event.keyCode == 13) {
        var src = event.srcElement || event.target;
        if (!src || (src.tagName.toLowerCase() != "textarea")) {
            var defaultButton = selector;
            if (defaultButton && typeof (defaultButton.click) != "undefined") {
                defaultButton.trigger('click');
                event.cancelBubble = true;
                if (event.stopPropagation) event.stopPropagation();
                return false;
            }
        }
    }
    return true;
}

JSON.deserialize = JSON.deserialize || function (str) {
    if (str === "") str = '""';
    return eval('[ ' + str + ' ]');
};

// Transforme une chaine de la forme : &lt;img src='myimage.jpg'&gt; en <img src='myimage.jpg'>
function unescapeHTML(html) {
    return $("<div />").html(html).text();
}

function formatDateFromJsSerialization(badDate) {

    // Correction des dates JSON de la serialization Microsoft dégueulasse
    if (typeof (badDate) != 'undefined' && badDate != null) {
        // Conversion en date 'moment.js'
        var datem = moment(badDate);
        return datem.format("DD/MM/YYYY");
    }
}

function objectToParametersString(obj, withQuestionMark) {

    var str = ""

    if (typeof (obj) != 'undefined' && obj != null) {

        for (var key in obj) {
            if (obj[key] != null && obj[key] != '') {
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + obj[key];
            }
        }

    }

    str = (typeof (withQuestionMark) != 'undefined' && withQuestionMark ? "?" : "") + str;

    return str;
}


Number.prototype.formatNumber = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "," : d,
        t = t == undefined ? " " : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
