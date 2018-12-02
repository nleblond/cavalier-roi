//javascript : gestion des navigateurs
//v1.6.1
//01/12/2018
//Created by LEBLOND Nicolas

//compatibilité outerHTML
try {
    HTMLElement.prototype.__defineGetter__.length;
    (function (body, removeChild) {
        HTMLElement.prototype.__defineGetter__(
            "outerHTML",
            function () {
                var self = body.appendChild(this.cloneNode(true)),
                    outerHTML = body.innerHTML;
                body.removeChild(self);
                return outerHTML;
            }
        );
        HTMLElement.prototype.__defineSetter__(
            "outerHTML",
            function (String) {
                if (!String)
                    removeChild(this);
                else if (this.parentNode) {
                    body.innerHTML = String;
                    while (body.firstChild)
                        this.parentNode.insertBefore(body.firstChild, this);
                    removeChild(this);
                    body.innerHTML = "";
                };
            }
        );
    })(
        document.createElement("body"),
        function (HTMLElement) { if (HTMLElement.parentNode) HTMLElement.parentNode.removeChild(HTMLElement); }
        );
} catch (e) { };


//ajout d'évenements dynamiques (queue)
function appendEvent(html_element, event_type, event_name, event_function) {
    if (html_element.addEventListener) { //FF, Safari, Chrome...
        html_element.addEventListener(event_type, event_function, true);
    }
    else if (html_element.attachEvent) { //IE
        var old = html_element['on' + event_type] || function () { };
        html_element['on' + event_type] = function () { old(); event_function(); }
    }
}

//fluidification des animations jquery
try { $.fx.interval = 1; } catch (ex) { }

//récupération du user agent
//alert(navigator.userAgent);

//détection du mobile
var device = "Unknow";
if (navigator.userAgent.indexOf("iPad") != -1) { device = 'iPad'; }
if (navigator.userAgent.indexOf("iPhone") != -1) { device = 'iPhone'; }
if (navigator.userAgent.indexOf("iPod") != -1) { device = 'iPod'; }
if (navigator.userAgent.indexOf("Nexus 7") != -1) { device = 'Nexus 7'; }
if (navigator.userAgent.indexOf("Nexus 5") != -1) { device = 'Nexus 5'; }
if (navigator.userAgent.indexOf("Nexus 3") != -1) { device = 'Nexus 3'; }
if (navigator.userAgent.indexOf("LT26i") != -1) { device = 'Xperia LT'; }
if (navigator.userAgent.indexOf("C6603") != -1) { device = 'Xperia Z'; }
if (navigator.userAgent.indexOf("GT-I9100") != -1) { device = 'Galaxy S2'; }
if (navigator.userAgent.indexOf("JZO54K") != -1) { device = 'Galaxy Note 2'; }
if ((navigator.userAgent.indexOf("KOT49H") != -1) || (navigator.userAgent.indexOf("SM-N9005") != -1) || (navigator.userAgent.indexOf("SM-N9002") != -1) || (navigator.userAgent.indexOf("SM-N900") != -1) || (navigator.userAgent.indexOf("SC-01F") != -1)) { device = 'Galaxy Note 3'; }
if ((navigator.userAgent.indexOf("KTU84P") != -1) || (navigator.userAgent.indexOf("SM-N910F") != -1)) { device = 'Galaxy Note 4'; }
if ((navigator.userAgent.indexOf("KVT49L.A1412000029") != -1) || (navigator.userAgent.indexOf("LG-D855") != -1)) { device = 'G3'; }

//détection du type de device
var type = "Desktop";
if ((navigator.userAgent.indexOf("Mobile") != -1) && (navigator.userAgent.indexOf("Mobile/") == -1)) { type = "Mobile"; }
if ((device == 'iPhone') || (device == 'iPod')) { type = 'Mobile'; }
if (device == 'iPad') { type = 'Tablet'; }
if (navigator.userAgent.indexOf("Tablet PC") != -1) { type = 'Tablet'; }

//détection du système d'exploitation
var operatingSystemName = "Unknown OS";
if (navigator.appVersion.indexOf("Windows") != -1) { operatingSystemName = "Windows"; }
if (navigator.appVersion.indexOf("NT 5.0") != -1) { operatingSystemName = "Windows 2000"; }
if (navigator.appVersion.indexOf("NT 6.0") != -1) { operatingSystemName = "Windows Vista"; }
if (navigator.appVersion.indexOf("NT 6.1") != -1) { operatingSystemName = "Windows 7"; }
if (navigator.appVersion.indexOf("NT 6.2") != -1) { operatingSystemName = "Windows 8"; }
if (navigator.appVersion.indexOf("NT 6.3") != -1) { operatingSystemName = "Windows 8.1"; }
if (navigator.appVersion.indexOf("NT 10.0") != -1) { operatingSystemName = "Windows 10"; }
if (navigator.appVersion.indexOf("Mac OS") != -1) { operatingSystemName = "MacOS"; }
if (navigator.appVersion.indexOf("iPhone") != -1) { operatingSystemName = "iOS"; }
if (navigator.appVersion.indexOf("iPad") != -1) { operatingSystemName = "iOS"; }
if (navigator.appVersion.indexOf("iPod") != -1) { operatingSystemName = "iOS"; }
if (navigator.appVersion.indexOf("X11") != -1) { operatingSystemName = "UNIX"; }
if (navigator.appVersion.indexOf("Linux") != -1) { operatingSystemName = "Linux"; }
if (navigator.appVersion.indexOf("BlackBerry") != -1) { operatingSystemName = "BlackBerry"; }
if (navigator.appVersion.indexOf("Bada") != -1) { operatingSystemName = "Bada"; }
if (navigator.appVersion.indexOf("SymbianOS") != -1) { operatingSystemName = "SymbianOS"; }
if (navigator.appVersion.indexOf("Windows Phone") != -1) { operatingSystemName = "Windows Phone OS"; }
if (navigator.appVersion.indexOf("Android") != -1) { operatingSystemName = "Android"; } 
if (navigator.appVersion.indexOf("Android 0.9") != -1) { operatingSystemName = "Android 0.9"; }
if (navigator.appVersion.indexOf("Android 1.0") != -1) { operatingSystemName = "Android 1.0"; } //G1 2008
if (navigator.appVersion.indexOf("Android 1.1") != -1) { operatingSystemName = "Android 1.1"; }
if (navigator.appVersion.indexOf("Android 1.5") != -1) { operatingSystemName = "Android 1.5"; } //Cupcake 2009
if (navigator.appVersion.indexOf("Android C") != -1) { operatingSystemName = "Android 1.5"; }
if (navigator.appVersion.indexOf("Android 1.6") != -1) { operatingSystemName = "Android 1.6"; } //Donut 2009
if (navigator.appVersion.indexOf("Android D") != -1) { operatingSystemName = "Android 1.6"; }
if (navigator.appVersion.indexOf("Android 2.0") != -1) { operatingSystemName = "Android 2.0"; } //Eclair 2009
if (navigator.appVersion.indexOf("Android E") != -1) { operatingSystemName = "Android 2.0"; }
if (navigator.appVersion.indexOf("Android 2.0.1") != -1) { operatingSystemName = "Android 2.0.1"; }
if (navigator.appVersion.indexOf("Android 2.1") != -1) { operatingSystemName = "Android 2.1"; }
if (navigator.appVersion.indexOf("Android 2.2") != -1) { operatingSystemName = "Android 2.2"; } //Froyo 2010
if (navigator.appVersion.indexOf("Android F") != -1) { operatingSystemName = "Android 2.2"; }
if (navigator.appVersion.indexOf("Android 2.2.1") != -1) { operatingSystemName = "Android 2.2.1"; }
if (navigator.appVersion.indexOf("Android 2.2.2") != -1) { operatingSystemName = "Android 2.2.2"; }
if (navigator.appVersion.indexOf("Android 2.2.3") != -1) { operatingSystemName = "Android 2.2.3"; }
if (navigator.appVersion.indexOf("Android 2.3") != -1) { operatingSystemName = "Android 2.3"; } //Gingerbread 2011
if (navigator.appVersion.indexOf("Android G") != -1) { operatingSystemName = "Android 2.3"; }
if (navigator.appVersion.indexOf("Android 2.3.3") != -1) { operatingSystemName = "Android 2.3.3"; }
if (navigator.appVersion.indexOf("Android 2.3.4") != -1) { operatingSystemName = "Android 2.3.4"; }
if (navigator.appVersion.indexOf("Android 2.3.5") != -1) { operatingSystemName = "Android 2.3.5"; }
if (navigator.appVersion.indexOf("Android 2.3.6") != -1) { operatingSystemName = "Android 2.3.6"; }
if (navigator.appVersion.indexOf("Android 2.3.7") != -1) { operatingSystemName = "Android 2.3.7"; }
if (navigator.appVersion.indexOf("Android 3.0") != -1) { operatingSystemName = "Android 3.0"; } //Honeycomb 2011
if (navigator.appVersion.indexOf("Android H") != -1) { operatingSystemName = "Android 3.0"; }
if (navigator.appVersion.indexOf("Android 3.1") != -1) { operatingSystemName = "Android 3.1"; }
if (navigator.appVersion.indexOf("Android 3.2") != -1) { operatingSystemName = "Android 3.2"; }
if (navigator.appVersion.indexOf("Android 3.2.1") != -1) { operatingSystemName = "Android 3.2.1"; }
if (navigator.appVersion.indexOf("Android 3.2.2") != -1) { operatingSystemName = "Android 3.2.2"; }
if (navigator.appVersion.indexOf("Android 3.2.4") != -1) { operatingSystemName = "Android 3.2.4"; }
if (navigator.appVersion.indexOf("Android 3.2.6") != -1) { operatingSystemName = "Android 3.2.6"; }
if (navigator.appVersion.indexOf("Android 4.0") != -1) { operatingSystemName = "Android 4.0"; } //Ice Cream Sandwich 2011
if (navigator.appVersion.indexOf("Android I") != -1) { operatingSystemName = "Android 4.0"; }
if (navigator.appVersion.indexOf("Android 4.0.1") != -1) { operatingSystemName = "Android 4.0.1"; }
if (navigator.appVersion.indexOf("Android 4.0.2") != -1) { operatingSystemName = "Android 4.0.2"; }
if (navigator.appVersion.indexOf("Android 4.0.3") != -1) { operatingSystemName = "Android 4.0.3"; }
if (navigator.appVersion.indexOf("Android 4.0.4") != -1) { operatingSystemName = "Android 4.0.4"; }
if (navigator.appVersion.indexOf("Android 4.1") != -1) { operatingSystemName = "Android 4.1"; } //Jelly Bean 2012
if (navigator.appVersion.indexOf("Android J") != -1) { operatingSystemName = "Android 4.1"; }
if (navigator.appVersion.indexOf("Android 4.1.1") != -1) { operatingSystemName = "Android 4.1.1"; }
if (navigator.appVersion.indexOf("Android 4.1.2") != -1) { operatingSystemName = "Android 4.1.2"; }
if (navigator.appVersion.indexOf("Android 4.2") != -1) { operatingSystemName = "Android 4.2"; }
if (navigator.appVersion.indexOf("Android 4.2.1") != -1) { operatingSystemName = "Android 4.2.1"; }
if (navigator.appVersion.indexOf("Android 4.2.2") != -1) { operatingSystemName = "Android 4.2.2"; }
if (navigator.appVersion.indexOf("Android 4.3") != -1) { operatingSystemName = "Android 4.3"; }
if (navigator.appVersion.indexOf("Android 4.3.1") != -1) { operatingSystemName = "Android 4.3.1"; }
if (navigator.appVersion.indexOf("Android 4.4") != -1) { operatingSystemName = "Android 4.4"; } //KitKat 2013
if (navigator.appVersion.indexOf("Android K") != -1) { operatingSystemName = "Android 4.4"; }
if (navigator.appVersion.indexOf("Android 4.4.1") != -1) { operatingSystemName = "Android 4.4.1"; }
if (navigator.appVersion.indexOf("Android 4.4.2") != -1) { operatingSystemName = "Android 4.4.2"; }
if (navigator.appVersion.indexOf("Android 4.4.3") != -1) { operatingSystemName = "Android 4.4.3"; }
if (navigator.appVersion.indexOf("Android 4.4.4") != -1) { operatingSystemName = "Android 4.4.4"; }
if (navigator.appVersion.indexOf("Android 5.0") != -1) { operatingSystemName = "Android 5.0"; } //Lollipop 2014
if (navigator.appVersion.indexOf("Android L") != -1) { operatingSystemName = "Android 5.0"; }
if (navigator.appVersion.indexOf("Android 5.0.1") != -1) { operatingSystemName = "Android 5.0.1"; }
if (navigator.appVersion.indexOf("Android 5.0.2") != -1) { operatingSystemName = "Android 5.0.2"; }
if (navigator.appVersion.indexOf("Android 5.1") != -1) { operatingSystemName = "Android 5.1"; }
if (navigator.appVersion.indexOf("Android 5.1.1") != -1) { operatingSystemName = "Android 5.1.1"; }
if (navigator.appVersion.indexOf("Android 5.2") != -1) { operatingSystemName = "Android 5.2"; }
if (navigator.appVersion.indexOf("Android 5.3") != -1) { operatingSystemName = "Android 5.3"; }
if (navigator.appVersion.indexOf("Android 5.3.5") != -1) { operatingSystemName = "Android 5.3.5"; }
if (navigator.appVersion.indexOf("Android 5.4") != -1) { operatingSystemName = "Android 5.4"; }
if (navigator.appVersion.indexOf("Android 5.4.5") != -1) { operatingSystemName = "Android 5.4.5"; }
if (navigator.appVersion.indexOf("Android 5.5") != -1) { operatingSystemName = "Android 5.5"; }
if (navigator.appVersion.indexOf("Android 5.5.5") != -1) { operatingSystemName = "Android 5.5.5"; }
if (navigator.appVersion.indexOf("Android 6.0") != -1) { operatingSystemName = "Android 6.0"; } //Marshmallow 2015
if (navigator.appVersion.indexOf("Android M") != -1) { operatingSystemName = "Android 6.0"; } 
if (navigator.appVersion.indexOf("Android 6.0.1") != -1) { operatingSystemName = "Android 6.0.1"; } 
if (navigator.appVersion.indexOf("Android 7.0") != -1) { operatingSystemName = "Android 7.0"; } //Nougat 2016
if (navigator.appVersion.indexOf("Android N") != -1) { operatingSystemName = "Android 7.0"; }
if (navigator.appVersion.indexOf("Android 7.1") != -1) { operatingSystemName = "Android 7.1"; }
if (navigator.appVersion.indexOf("Android 7.1.1") != -1) { operatingSystemName = "Android 7.1.1"; } 
if (navigator.appVersion.indexOf("Android 7.1.2") != -1) { operatingSystemName = "Android 7.1.2"; } 
if (navigator.appVersion.indexOf("Android 8") != -1) { operatingSystemName = "Android 8.0"; } //Oreo 2017
if (navigator.appVersion.indexOf("Android O") != -1) { operatingSystemName = "Android 8.0"; }
if (navigator.appVersion.indexOf("Android 8.1") != -1) { operatingSystemName = "Android 8.1"; }
if (navigator.appVersion.indexOf("Android 9") != -1) { operatingSystemName = "Android 9.0"; } //Pie 2018
if (navigator.appVersion.indexOf("Android P") != -1) { operatingSystemName = "Android 9.0"; }

//détection d'un mobile "touch"
var touchNavigator = ('ontouchstart' in window) || ('onmsgesturechange' in window);

//détection d'un navigateur moderne
var pushStateNavigator = !!(window.history && history.pushState);

//détection du navigateur
var navName = "Unknow";
var strChUserAgent = navigator.userAgent;
var intSplitStart = strChUserAgent.indexOf('(', 0);
var intSplitEnd = strChUserAgent.indexOf(')', 0);
var strChStart = strChUserAgent.substring(0, intSplitStart);
var strChMid = strChUserAgent.substring(intSplitStart, intSplitEnd);
var strChEnd = strChUserAgent.substring(strChEnd);

if (navigator.userAgent.indexOf("Edge") != -1) { navName = 'Edge/MAJ'; touchNavigator = false; } //désactivation du tactile le temps que le sujet murisse
if (navigator.userAgent.indexOf("Edge/12") != -1) { navName = 'Edge/12'; touchNavigator = false; } //désactivation du tactile le temps que le sujet murisse
if (navigator.userAgent.indexOf("Edge/13") != -1) { navName = 'Edge/13'; touchNavigator = false; } //désactivation du tactile le temps que le sujet murisse
if (navigator.userAgent.indexOf("Edge/14") != -1) { navName = 'Edge/14'; touchNavigator = false; } //désactivation du tactile le temps que le sujet murisse
if (navigator.userAgent.indexOf("Edge/15") != -1) { navName = 'Edge/15'; touchNavigator = false; } //désactivation du tactile le temps que le sujet murisse

if (strChMid.indexOf("MSIE 6") != -1) { navName = 'MSIE 6'; }
if (strChMid.indexOf("MSIE 7") != -1) { navName = 'MSIE 7'; }
if (strChMid.indexOf("MSIE 8") != -1) { navName = 'MSIE 8'; }
if (strChMid.indexOf("MSIE 9") != -1) { navName = 'MSIE 9'; }
if (navigator.userAgent.indexOf("MSIE 10") != -1) { navName = 'MSIE 10'; touchNavigator = false; }
if (navigator.userAgent.indexOf("rv:11.0") != -1) { navName = 'MSIE 11'; touchNavigator = false; }
if (navigator.userAgent.indexOf("Touch") != -1) { touchNavigator = true; } //cas particulier des utilisations "desktop" et "mobile" des IE10 et IE11

if (navigator.userAgent.indexOf("Firefox") != -1) {
    navName = 'Firefox/1';
    if ((navigator.userAgent.indexOf("Firefox/2") != -1) && (navigator.userAgent.indexOf("1.8") != -1)) { navName = 'Firefox/2'; }
    else if ((navigator.userAgent.indexOf("Firefox/") != -1)) { navName = 'Firefox/MAJ'; }
}

if (navigator.userAgent.indexOf("Netscape/7") != -1) { navName = 'Netscape/7'; }
if (navigator.userAgent.indexOf("Netscape") != -1) { navName = 'Netscape'; }

if (navigator.userAgent.indexOf("Opera") != -1) { navName = 'Opera'; }
if (navigator.userAgent.indexOf("Opera/8") != -1) { navName = 'Opera/8'; }
if (navigator.userAgent.indexOf("Opera/9") != -1) { navName = 'Opera/9'; }
if ((navigator.userAgent.indexOf("Opera") != -1) && (navigator.userAgent.indexOf("Version/10") != -1)) { navName = 'Opera/10'; }
if ((navigator.userAgent.indexOf("Opera") != -1) && (navigator.userAgent.indexOf("Version/11") != -1)) { navName = 'Opera/11'; }
if ((navigator.userAgent.indexOf("Opera") != -1) && (navigator.userAgent.indexOf("Version/12") != -1)) { navName = 'Opera/12'; }
if ((navigator.userAgent.indexOf("Opera") != -1) && (navigator.userAgent.indexOf("Version/13") != -1)) { navName = 'Opera/13'; }
if (navigator.userAgent.indexOf("OPR/14") != -1) { navName = 'Opera/14'; }
if (navigator.userAgent.indexOf("OPR/15") != -1) { navName = 'Opera/15'; }
if (navigator.userAgent.indexOf("OPR/16") != -1) { navName = 'Opera/16'; }
if (navigator.userAgent.indexOf("OPR/17") != -1) { navName = 'Opera/17'; }
if (navigator.userAgent.indexOf("OPR/18") != -1) { navName = 'Opera/18'; }
if ((navigator.userAgent.indexOf("Opera") != -1) && (navigator.userAgent.indexOf("Mini") != -1)) { navName = navName + ' Mini'; }

if ((navName.indexOf('Opera') == -1) && (navName.indexOf('Edge') == -1)) {
    if (navigator.userAgent.indexOf("Chrome") != -1) { navName = 'Chrome/MAJ'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/1") != -1)) { navName = 'Safari/1'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/1.5") != -1)) { navName = 'Safari/1.5'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/2") != -1)) { navName = 'Safari/2'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/3") != -1)) { navName = 'Safari/3'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/4") != -1)) { navName = 'Safari/4'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/5") != -1)) { navName = 'Safari/5'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/6") != -1)) { navName = 'Safari/6'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/7") != -1)) { navName = 'Safari/7'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/8") != -1)) { navName = 'Safari/8'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/9") != -1)) { navName = 'Safari/9'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/10") != -1)) { navName = 'Safari/10'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/11") != -1)) { navName = 'Safari/11'; }
    if ((navigator.userAgent.indexOf("Safari") != -1) && (navigator.userAgent.indexOf("Version/12") != -1)) { navName = 'Safari/12'; }
}

if ((operatingSystemName == "iOS") && (navName == "Unknow")) { navName = 'iOSInside'; }
if ((navName.indexOf('Opera') == -1) && (navigator.userAgent.indexOf("U;") != -1)) { navName = 'AndroidBrowser'; }
if (navName.indexOf('Gecko) Version/1.5') != -1) { navName = 'AndroidBrowser'; } //grosse bidouille
if (navigator.userAgent.indexOf("CriOS") != -1) { navName = 'CriOS'; }

if (navigator.userAgent.indexOf("FlyFlow") != -1) { navName = 'Baidu'; }
if (navigator.userAgent.indexOf("FlyFlow/3") != -1) { navName = 'Baidu/3'; }

if (navigator.userAgent.indexOf("UCBrowser") != -1) { navName = 'UCBrowser'; }
if (navigator.userAgent.indexOf("UCBrowser/9") != -1) { navName = 'UCBrowser/9'; }
if (navigator.userAgent.indexOf("UCWEB") != -1) { navName = 'UCBrowser Mini'; }

if (navigator.userAgent.indexOf("Puffin") != -1) { navName = 'Puffin'; }
if (navigator.userAgent.indexOf("Puffin/2") != -1) { navName = 'Puffin/2'; }

if (navigator.userAgent.indexOf("OneBrowser") != -1) { navName = 'OneBrowser'; }
if (navigator.userAgent.indexOf("OneBrowser/4") != -1) { navName = 'OneBrowser/4'; }




var report = navName + '\n' + operatingSystemName + '\n' + device + ' (' + type + ')' + '\n\n' + navigator.userAgent + (touchNavigator ? '\n' + 'Navigation tactile' : '');
//alert(navigator.userAgent);
//alert(navName);
//alert(report);
//192 = ~
//181 = µ
//178 = ²
//167 = §
//163 = £
$(window).keypress(function (event) {
    if ((event.which == 192) || (event.which == 181) || (event.which == 178) || (event.which == 167) || (event.which == 163)) {
        alert(report);
        event.preventDefault();
    }
});

if (
    (navName == 'MSIE 7') || (navName == 'MSIE 8') || (navName == 'MSIE 9') || (navName == 'MSIE 10') || (navName == 'MSIE 11')
    || (navName == 'Edge/12') || (navName == 'Edge/13') || (navName == 'Edge/14') || (navName == 'Edge/15') || (navName == 'Edge/MAJ')
    || (navName == 'Firefox/MAJ')
    || (navName == 'Chrome/MAJ')
    || (navName == 'iOSInside')
    || (navName == 'Safari/4') || (navName == 'Safari/5') || (navName == 'Safari/6') || (navName == 'Safari/7') || (navName == 'Safari/8') || (navName == 'Safari/9') || (navName == 'Safari/10') || (navName == 'Safari/11') || (navName == 'Safari/12')
    || (navName == 'Opera/11') || (navName == 'Opera/12') || (navName == 'Opera/13') || (navName == 'Opera/14') || (navName == 'Opera/15') || (navName == 'Opera/16') || (navName == 'Opera/17') || (navName == 'Opera/18')
    || (navName == 'FlyFlow') || (navName == 'FlyFlow/3')
    || (navName == 'UCBrowser') || (navName == 'UCBrowser/9')
    || (navName == 'OneBrowser') || (navName == 'OneBrowser/4')
    || (navName == 'AndroidBrowser')
) {
}
else {
    alert('Ce navigateur ne supporte pas les dernieres fonctionnalités de ce site ou n\'a pas encore été certifié pour ce site !\r\nMerci d\'utiliser un navigateur compatible...');
}