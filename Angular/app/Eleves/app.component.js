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
var ElevesSearchParameters_1 = require("./Models/ElevesSearchParameters");
var AppComponent = /** @class */ (function () {
    function AppComponent(_HttpService) {
        this._HttpService = _HttpService;
        this._WsUrl = '/API/';
        this._APIKey = 'AEZRETRYTUYIUOIP';
        this._RootUrl = '/';
        this._ImgUrl = 'http://www.cavalier-roi.fr/Content/Images';
        this._Id = null;
        this._EvenementId = null;
        this._TypologieId = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //initialisation des datetimepickers du filtre
        jQuery('.filtre input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });
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
        }
        if ((this._Id != null) || (this._TypologieId != null) || (this._EvenementId != null)) {
            this.GetEleves(this._Id, null, null, null, null, null, this._EvenementId, this._TypologieId);
        }
        //r�cup�ration des typologies/evenements
        var _HeaderOptions = new http_1.Headers({ 'APIKey': this._APIKey });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe(function (data) {
            if (data.ok) {
                _this._TypologiesEvenements = data.json();
            }
            else {
                alert('Une erreur est survenue : ' + data.statusText + ' !');
            }
        });
    };
    AppComponent.prototype.ChangeTypologieEvenement = function (_Event) {
        var _SelectedValue = _Event.target.value;
        if (_SelectedValue.indexOf('-') < 0) {
            this._TypologieId = _SelectedValue;
            this._EvenementId = null;
        }
        else {
            _SelectedValue = _SelectedValue.substring(_SelectedValue.indexOf('-') + 1); //on enleve la typologie
            if (_SelectedValue.indexOf('-') >= 0) { //il y a un enfant
                _SelectedValue = _SelectedValue.substring(_SelectedValue.indexOf('-') + 1); //on enleve le parent
            }
            this._TypologieId = null;
            this._EvenementId = _SelectedValue;
        }
    };
    AppComponent.prototype.GetEleves = function (_Id, _Nom, _Prenom, _Email, _License, _Club, _EvenementId, _TypologieId) {
        var _this = this;
        this._ElevesSearchParameters = new ElevesSearchParameters_1.ElevesSearchParameters();
        this._ElevesSearchParameters.Id = _Id;
        this._ElevesSearchParameters.Nom = _Nom;
        this._ElevesSearchParameters.Prenom = _Prenom;
        this._ElevesSearchParameters.Email = _Email;
        this._ElevesSearchParameters.License = _License;
        this._ElevesSearchParameters.Club = _Club;
        this._ElevesSearchParameters.EvenementId = _EvenementId;
        this._ElevesSearchParameters.TypologieId = _TypologieId;
        var _Body = JSON.stringify(this._ElevesSearchParameters);
        var _HeaderOptions = new http_1.Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._WsUrl + 'Eleves/GetEleves', _Body, _RequestOptions)
            .subscribe(function (data) {
            if (data.ok) {
                _this._Eleves = data.json();
                if (_this._Eleves.length == 0) {
                    _this._NoResult = true;
                }
                else {
                    _this._NoResult = false;
                }
            }
            else {
                alert('Une erreur est survenue : ' + data.statusText + ' !');
            }
        });
    };
    AppComponent.prototype.InitEleve = function (_Id) {
        window.open('/MonCompte?_Id=' + _Id, '_blank');
    };
    AppComponent.prototype.DelEleve = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer l\'eleve ' + this._Eleves[_Index].Nom + ' ' + this._Eleves[_Index].Prenom + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            var _Confirmation = 'L\'eleve ' + this._Eleves[_Index].Id + ' a bien ete supprime !';
            this._HttpService.get(this._WsUrl + 'Eleves/DelEleve?_Id=' + this._Eleves[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(function (data) {
                if (data.ok) {
                    alert(_Confirmation);
                    _this._DelReturn = data.json();
                    _this._Eleves.splice(_Index, 1);
                    if (_this._Eleves.length == 0) {
                        _this._NoResult = true;
                    }
                    else {
                        _this._NoResult = false;
                    }
                }
                else {
                    alert('Une erreur est survenue : ' + data.statusText + ' !');
                }
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