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
var CommandesSearchParameters_1 = require("./Models/CommandesSearchParameters");
var CommandeUpdateParameters_1 = require("./Models/CommandeUpdateParameters");
var AppComponent = /** @class */ (function () {
    function AppComponent(_HttpService) {
        this._HttpService = _HttpService;
        this._WsUrl = '/API/';
        this._APIKey = 'AEZRETRYTUYIUOIP';
        this._RootUrl = '/';
        this._ImgUrl = 'http://www.cavalier-roi.fr/Content/Images';
        this._Id = null;
        this._ProduitId = null;
        this._EleveId = null;
        this._StatutId = null;
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
            if (_UrlParams[i].indexOf('_ProduitId=') > -1) {
                this._ProduitId = parseInt(_UrlParams[i].replace('_ProduitId=', ''));
            }
            if (_UrlParams[i].indexOf('_EleveId=') > -1) {
                this._EleveId = parseInt(_UrlParams[i].replace('_EleveId=', ''));
            }
            if (_UrlParams[i].indexOf('_StatutId=') > -1) {
                this._StatutId = parseInt(_UrlParams[i].replace('_StatutId=', ''));
            }
        }
        if ((this._Id != null) || (this._ProduitId != null) || (this._EleveId != null)) {
            this.GetCommandes(this._Id, null, null, this._ProduitId, this._EleveId, null, null, this._StatutId, null);
        }
        //r�cup�ration des statuts
        var _HeaderOptions = new http_1.Headers({ 'APIKey': this._APIKey });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetStatuts', _RequestOptions)
            .subscribe(function (data) {
            if (data.ok) {
                _this._Statuts = data.json();
            }
            else {
                alert('Une erreur est survenue : ' + data.statusText + ' !');
            }
        });
    };
    AppComponent.prototype.ChangeStatut = function (_Event, _Index) {
        if ((_Index != null) && (_Index != undefined)) {
            this._Commandes[_Index].Statut.Id = _Event.target.value;
            this._Commandes[_Index].Statut.Libelle = _Event.target[_Event.target.selectedIndex].text;
        }
        else {
            this._StatutId = _Event.target.value;
        }
    };
    //j'aurai pu utiliser un "ngModel"
    //----------------------------------------------
    AppComponent.prototype.ChangeReferenceTransaction = function (_Event, _Index) {
        this._Commandes[_Index].ReferenceTransaction = _Event.target.value;
    };
    AppComponent.prototype.ChangeReferenceExterne = function (_Event, _Index) {
        this._Commandes[_Index].ReferenceExterne = _Event.target.value;
    };
    AppComponent.prototype.ChangeTrackingNumber = function (_Event, _Index) {
        this._Commandes[_Index].TrackingNumber = _Event.target.value;
    };
    AppComponent.prototype.GetCommandes = function (_Id, _DtMin, _DtMax, _ProduitId, _EleveId, _ReferenceTransaction, _ReferenceExterne, _StatutId, _TrackingNumber) {
        var _this = this;
        this._CommandesSearchParameters = new CommandesSearchParameters_1.CommandesSearchParameters();
        this._CommandesSearchParameters.Id = _Id;
        this._CommandesSearchParameters.DtMin = _DtMin;
        this._CommandesSearchParameters.DtMax = _DtMax;
        this._CommandesSearchParameters.ProduitId = _ProduitId;
        this._CommandesSearchParameters.EleveId = _EleveId;
        this._CommandesSearchParameters.ReferenceTransaction = _ReferenceTransaction;
        this._CommandesSearchParameters.ReferenceExterne = _ReferenceExterne;
        this._CommandesSearchParameters.StatutId = _StatutId;
        this._CommandesSearchParameters.TrackingNumber = _TrackingNumber;
        var _Body = JSON.stringify(this._CommandesSearchParameters);
        var _HeaderOptions = new http_1.Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._WsUrl + 'Commandes/GetCommandes', _Body, _RequestOptions)
            .subscribe(function (data) {
            if (data.ok) {
                _this._Commandes = data.json();
                if (_this._Commandes.length == 0) {
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
    AppComponent.prototype.UpdCommande = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment modifier la commande ' + this._Commandes[_Index].Id + ' ?')) {
            this._CommandeUpdateParameters = new CommandeUpdateParameters_1.CommandeUpdateParameters();
            this._CommandeUpdateParameters.Id = this._Commandes[_Index].Id;
            this._CommandeUpdateParameters.StatutId = this._Commandes[_Index].Statut.Id;
            this._CommandeUpdateParameters.StatutLibelle = this._Commandes[_Index].Statut.Libelle;
            this._CommandeUpdateParameters.ReferenceTransaction = this._Commandes[_Index].ReferenceTransaction;
            this._CommandeUpdateParameters.ReferenceExterne = this._Commandes[_Index].ReferenceExterne;
            this._CommandeUpdateParameters.EleveId = this._Commandes[_Index].Eleve.Id;
            this._CommandeUpdateParameters.TrackingNumber = this._Commandes[_Index].TrackingNumber;
            var _Body = JSON.stringify(this._CommandeUpdateParameters);
            var _HeaderOptions = new http_1.Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            var _Confirmation = 'La commande ' + this._Commandes[_Index].Id + ' a bien ete modifiee !';
            this._HttpService.post(this._WsUrl + 'Commandes/UpdCommande', _Body, _RequestOptions)
                .subscribe(function (data) {
                if (data.ok) {
                    alert(_Confirmation);
                    _this._UpdReturn = data.json();
                }
                else {
                    alert('Une erreur est survenue : ' + data.statusText + ' !');
                }
            });
        }
    };
    AppComponent.prototype.DelCommande = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer la commande ' + this._Commandes[_Index].Id + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            var _Confirmation = 'La commande ' + this._Commandes[_Index].Id + ' a bien ete supprimee !';
            this._HttpService.get(this._WsUrl + 'Commandes/DelCommande?_Id=' + this._Commandes[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(function (data) {
                if (data.ok) {
                    alert(_Confirmation);
                    _this._DelReturn = data.json();
                    _this._Commandes.splice(_Index);
                    if (_this._Commandes.length == 0) {
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