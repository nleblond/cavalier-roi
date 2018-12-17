"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Evenement_1 = require("./../Evenements/Models/Evenement");
var Mode_1 = require("./../Divers/Models/Mode");
var Contenu_1 = require("./Models/Contenu");
var ContenusSearchParameters_1 = require("./Models/ContenusSearchParameters");
var Publication_1 = require("./Models/Publication");
var AppComponent = /** @class */ (function () {
    function AppComponent(_HttpService) {
        this._HttpService = _HttpService;
        //public _Url: String = 'http://192.168.1.34:63121/';
        this._Url = '/';
        this._Id = null;
        this._TypologieId = null;
        this._EvenementId = null;
        this._ModeId = null;
        this._EmplacementId = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //gestion des param�tres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) {
                this._Id = parseInt(_UrlParams[i].replace('_Id=', ''));
            }
            if (_UrlParams[i].indexOf('_TypologieId=') > -1) {
                this._TypologieId = parseInt(_UrlParams[i].replace('_TypologieId=', ''));
            }
            if (_UrlParams[i].indexOf('_EvenementId=') > -1) {
                this._EvenementId = parseInt(_UrlParams[i].replace('_EvenementId=', ''));
            }
            if (_UrlParams[i].indexOf('_ModeId=') > -1) {
                this._ModeId = parseInt(_UrlParams[i].replace('_ModeId=', ''));
            }
            if (_UrlParams[i].indexOf('_EmplacementId=') > -1) {
                this._EmplacementId = parseInt(_UrlParams[i].replace('_EmplacementId=', ''));
            }
        }
        if ((this._Id != null) || (this._TypologieId != null) || (this._EvenementId != null) || (this._ModeId != null) || (this._EmplacementId != null)) {
            this.GetContenus(this._Id, null, this._EmplacementId, this._ModeId, null, null, this._EvenementId, this._TypologieId);
        }
        //r�cup�ration des typologies/�v�nements
        var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._Url + 'API/Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe(function (data) {
            _this._TypologiesEvenements = data.json();
        });
        //r�cup�ration des modes/emplacements
        this._HttpService.get(this._Url + 'API/Divers/GetModesEmplacements', _RequestOptions)
            .subscribe(function (data) {
            _this._ModesEmplacements = data.json();
            var _Temp1 = _this._ModesEmplacements.filter(function (e) { return e.Key == null; });
            var _Temp2 = [];
            for (var i = 0; i < _Temp1.length; i++) {
                if (_Temp1[i].Id == null) {
                    var _Current = new Mode_1.Mode();
                    _Current.Id = parseInt(_Temp1[i].FormatedId.toString());
                    _Current.Libelle = _Temp1[i].Libelle[0].toUpperCase() + _Temp1[i].Libelle.toLowerCase().slice(1);
                    _Temp2.push(_Current);
                }
            }
            _this._Modes = _Temp2;
        });
    };
    AppComponent.prototype.ChangeTypologieEvenement = function (_Event, _Option) {
        var _SelectedId = _Event.target.value;
        var _SelectedIndex = _Event.target.options.selectedIndex;
        var _SelectedLibelle = _Event.target.options[_SelectedIndex].innerText;
        if (_Option == 0) { //filtre
            if (_SelectedId.indexOf('-') < 0) {
                this._TypologieId = _SelectedId;
                this._EvenementId = null;
            }
            else {
                _SelectedId = _SelectedId.substring(_SelectedId.indexOf('-') + 1); //on enleve la typologie
                if (_SelectedId.indexOf('-') >= 0) { //il y a un enfant
                    _SelectedId = _SelectedId.substring(_SelectedId.indexOf('-') + 1); //on enleve le parent
                }
                this._TypologieId = null;
                this._EvenementId = _SelectedId;
            }
        }
        else { //d�tails
            this._Contenu.Evenement.Id = (_SelectedId == '-1' ? null : parseInt(_SelectedId));
            this._Contenu.Evenement.Libelle = _SelectedLibelle.replace('____', '').replace('____', '').trim();
        }
    };
    AppComponent.prototype.ChangeModeEmplacement = function (_Event, _Option) {
        var _SelectedId = _Event.target.value;
        var _SelectedIndex = _Event.target.options.selectedIndex;
        var _SelectedLibelle = _Event.target.options[_SelectedIndex].innerText;
        if (_Option == 0) { //filtre
            if (_SelectedId.indexOf('-') < 0) {
                this._ModeId = _SelectedId;
                this._EmplacementId = null;
            }
            else {
                _SelectedId = _SelectedId.substring(_SelectedId.indexOf('-') + 1); //on enleve le mode
                this._ModeId = null;
                this._EmplacementId = _SelectedId;
            }
        }
        else { //d�tails
            this._Contenu.Publications.splice(0, this._Contenu.Publications.length);
            this._Contenu.Mode.Id = (_SelectedId == '-1' ? null : parseInt(_SelectedId));
            this._Contenu.Mode.Libelle = _SelectedLibelle.replace('____', '').trim();
        }
    };
    AppComponent.prototype.GetCheck = function (_Id) { return this._Contenu.Publications.find(function (p) { return p.Emplacement.Id == _Id; }); };
    AppComponent.prototype.ChangeCheck = function (_Event, _EmplacementId) {
        var _checkedValue = _Event.target.checked;
        if (_checkedValue == true) {
            var _NewPublication = new Publication_1.Publication();
            _NewPublication.Contenu.Id = this._Contenu.Id;
            _NewPublication.Contenu.Titre = null;
            _NewPublication.Emplacement.Id = _EmplacementId;
            _NewPublication.Emplacement.Libelle = null;
            _NewPublication.Id = null;
            this._Contenu.Publications.push(_NewPublication);
        }
        else if (_checkedValue == false) {
            var _Index = -1;
            for (var i = 0; i < this._Contenu.Publications.length; i++) {
                if (this._Contenu.Publications[i].Emplacement.Id == _EmplacementId) {
                    _Index = i;
                }
            }
            if (_Index != -1) { //il faut supprimer la publication
                this._Contenu.Publications.splice(_Index, 1);
            }
        }
        return;
    };
    AppComponent.prototype.GetShow = function (_Test, _Id, _Key) {
        if ((_Test == 'emplacement') && ((_Key == '') || (_Key == null))) {
            return false;
        }
        else if (_Test == 'emplacement') {
            return (_Id == this._Contenu.Mode.Id);
        }
        else if (_Test == 'zone') {
            return (this._Contenu.Mode.Id == 0);
        }
        else if (_Test == 'actualite') {
            return (this._Contenu.Mode.Id == 1);
        }
        else if (_Test == 'partenariat') {
            return (this._Contenu.Mode.Id == 2);
        }
        else if ((_Test == 'zone|actualite') || (_Test == 'actualite|zone')) {
            return ((this._Contenu.Mode.Id == 0) || (this._Contenu.Mode.Id == 1));
        }
        else if ((_Test == 'actualite|partenariat') || (_Test == 'partenariat|actualite')) {
            return ((this._Contenu.Mode.Id == 1) || (this._Contenu.Mode.Id == 2));
        }
        else if ((_Test == 'zone|partenariat') || (_Test == 'partenariat|zone')) {
            return ((this._Contenu.Mode.Id == 0) || (this._Contenu.Mode.Id == 2));
        }
        else if (_Test == 'mode') {
            return ((this._Contenu.Mode.Id != null) && (this._Contenu.Mode.Id != -1));
        }
        else if (_Test == 'valider') {
            if ((this._Contenu.Titre == '') || (this._Contenu.Titre == null)) {
                return false;
            }
            if (this._Contenu.Publications.length == 0) {
                return false;
            }
            if ((this._Contenu.DtDebut == '') || (this._Contenu.DtDebut == null)) {
                return false;
            }
            return true;
        }
        return false;
    };
    AppComponent.prototype.InitContenu = function (_Option, _Index) {
        var _this = this;
        try {
            this._Contenu.Id = null;
            this._Contenu.Titre = null;
            this._Contenu.DtCreation = null;
            this._Contenu.DtModification = null;
            this._Contenu.DtDebut = null;
            this._Contenu.DtFin = null;
            this._Contenu.Publications = null;
            this._Contenu.Texte = null;
            this._Contenu.Lien = null;
            this._Contenu.Script = null;
            this._Contenu.Logo = null;
            this._Contenu.Horizontale = null;
            this._Contenu.Carree = null;
            this._Contenu.Verticale = null;
            this._Contenu.Full = null;
            this._Contenu.Exclusif = null;
            this._Contenu.Mode = new Mode_1.Mode();
            this._Contenu.Mode.Id = null;
            this._Contenu.Mode.Libelle = null;
            this._Contenu.Evenement = new Evenement_1.Evenement();
            this._Contenu.Evenement.Id = null;
            this._Contenu.Evenement.Libelle = null;
            this._Contenu.Etat = null;
        }
        catch (_a) { }
        ;
        if (_Option == 0) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._Url + 'API/Divers/GetId?_Table=Contenus', _RequestOptions)
                .subscribe(function (data) {
                _this._InitReturn = (data.json())[0];
                _this._Contenu = new Contenu_1.Contenu();
                _this._Contenu.Id = _this._InitReturn;
                _this._Contenu.Etat = 0; //creation
            });
        }
        else if (_Option == 1) {
            this._Contenu = JSON.parse(JSON.stringify(this._Contenus[_Index]));
            this._Contenu.Etat = 1; //modification
        }
    };
    AppComponent.prototype.GetContenus = function (_Id, _Titre, _EmplacementId, _ModeId, _DtMin, _DtMax, _EvenementId, _TypologieId) {
        var _this = this;
        var Valid = true;
        this._ContenusSearchParameters = new ContenusSearchParameters_1.ContenusSearchParameters();
        this._ContenusSearchParameters.Id = _Id;
        this._ContenusSearchParameters.Titre = _Titre;
        this._ContenusSearchParameters.EmplacementId = _EmplacementId;
        this._ContenusSearchParameters.ModeId = _ModeId;
        this._ContenusSearchParameters.DtMin = _DtMin;
        this._ContenusSearchParameters.DtMax = _DtMax;
        this._ContenusSearchParameters.EvenementId = _EvenementId;
        this._ContenusSearchParameters.TypologieId = _TypologieId;
        var _Body = JSON.stringify(this._ContenusSearchParameters);
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Contenus/GetContenus', _Body, _RequestOptions)
            .subscribe(function (data) {
            var _JsonResponse = data.json();
            _this._Contenus = _JsonResponse;
            if (_this._Contenus.length == 0) {
                _this._NoResult = true;
            }
            else {
                _this._NoResult = false;
            }
        });
    };
    AppComponent.prototype.AddUpdContenu = function () {
        var _this = this;
        var _Question = '';
        var _Confirmation = '';
        var _Method = '';
        if (this._Contenu.Etat == 0) {
            _Method = 'API/Contenus/AddContenu';
            _Question = 'Voulez-vous vraiment ajouter le contenu ' + this._Contenu.Id + ' ?';
            _Confirmation = 'Le contenu ' + this._Contenu.Id + ' a bien ete ajoute !';
        }
        else {
            _Method = 'API/Contenus/UpdContenu';
            _Question = 'Voulez-vous vraiment modifier le contenu ' + this._Contenu.Id + ' ?';
            _Confirmation = 'Le contenu ' + this._Contenu.Id + ' a bien ete modifie !';
        }
        if (confirm(_Question)) {
            var _Body = JSON.stringify(this._Contenu);
            var _HeaderOptions = new http_1.Headers({
                'Content-Type': 'application/json',
                'APIKey': 'AEZRETRYTUYIUOIP'
            });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post(this._Url + _Method, _Body, _RequestOptions)
                .subscribe(function (data) {
                _this._AddUpdReturn = data.json();
                if (data.ok) {
                    if (_this._Contenu.Etat == 0) {
                        _this._Contenus.push(_this._Contenu);
                    }
                    else {
                        if ((_this._Contenus.find(function (t) { return t.Id === _this._Contenu.Id; }) != undefined) && (_this._Contenus.find(function (t) { return t.Id === _this._Contenu.Id; }) != null)) {
                            var _Index = _this._Contenus.findIndex(function (t) { return t.Id === _this._Contenu.Id; });
                            _this._Contenus[_Index] = JSON.parse(JSON.stringify(_this._Contenu));
                        }
                    }
                    _this.InitContenu(null, null);
                }
                else {
                    alert('Une erreur est survenue !');
                }
            });
        }
    };
    AppComponent.prototype.DelContenu = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer le contenu ' + this._Contenus[_Index].Id + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._Url + 'API/Contenus/DelContenu?_Id=' + this._Contenus[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(function (data) {
                _this._DelReturn = data.json();
                _this._Contenus.splice(_Index, 1);
            });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map