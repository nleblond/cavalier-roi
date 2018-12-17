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
var Categorie_1 = require("./../Divers/Models/Categorie");
var ProduitsSearchParameters_1 = require("./Models/ProduitsSearchParameters");
var Produit_1 = require("./Models/Produit");
var AppComponent = /** @class */ (function () {
    function AppComponent(_HttpService) {
        this._HttpService = _HttpService;
        //public _Url: String = 'http://192.168.1.34:63121/';
        this._Url = '/';
        this._Id = null;
        this._CommandeId = null;
        this._CategorieId = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //gestion des param�tres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) {
                this._Id = parseInt(_UrlParams[i].replace('_Id=', ''));
            }
            if (_UrlParams[i].indexOf('_CommandeId=') > -1) {
                this._CommandeId = parseInt(_UrlParams[i].replace('_CommandeId=', ''));
            }
            if (_UrlParams[i].indexOf('_CategorieId=') > -1) {
                this._CategorieId = parseInt(_UrlParams[i].replace('_CategorieId=', ''));
            }
        }
        if ((this._Id != null) || (this._CategorieId != null) || (this._CommandeId != null)) {
            this.GetProduits(this._Id, null, null, this._CategorieId, null, null, this._CommandeId);
        }
        //r�cup�ration des cat�gories
        var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._Url + 'API/Divers/GetCategories', _RequestOptions)
            .subscribe(function (data) {
            _this._Categories = data.json();
        });
    };
    AppComponent.prototype.ChangeCategorie = function (_Event, _Option) {
        var _SelectedId = _Event.target.value;
        var _SelectedIndex = _Event.target.options.selectedIndex;
        var _SelectedLibelle = _Event.target.options[_SelectedIndex].innerText;
        if (_Option == 0) { //filtre
            this._CategorieId = _SelectedId;
        }
        else { //d�tails
            this._Produit.Categorie.Id = (_SelectedId == '-1' ? null : parseInt(_SelectedId));
            this._Produit.Categorie.Libelle = _SelectedLibelle.trim();
        }
    };
    AppComponent.prototype.InitProduit = function (_Option, _Index) {
        var _this = this;
        try {
            this._Produit.Id = null;
            this._Produit.Reference = null;
            this._Produit.Libelle = null;
            this._Produit.Categorie = new Categorie_1.Categorie();
            this._Produit.Categorie.Id = null;
            this._Produit.Categorie.Libelle = null;
            this._Produit.Descriptif = null;
            this._Produit.DtDebut = null;
            this._Produit.DtFin = null;
            this._Produit.Stock = null;
            this._Produit.Prix = null;
            this._Produit.Poids = null;
            this._Produit.Longueur = null;
            this._Produit.Largeur = null;
            this._Produit.Hauteur = null;
            this._Produit.Depassement = false;
            this._Produit.Logo = null;
            this._Produit.Visuel = null;
            this._Produit.Image = null;
            this._Produit.NbCommandes = null;
            this._Produit.Etat = null;
        }
        catch (_a) { }
        ;
        if (_Option == 0) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._Url + 'API/Divers/GetId?_Table=Produits', _RequestOptions)
                .subscribe(function (data) {
                _this._InitReturn = (data.json())[0];
                _this._Produit = new Produit_1.Produit();
                _this._Produit.Id = _this._InitReturn;
                _this._Produit.Etat = 0; //creation
            });
        }
        else if (_Option == 1) {
            this._Produit = JSON.parse(JSON.stringify(this._Produits[_Index]));
            this._Produit.Etat = 1; //modification
        }
    };
    AppComponent.prototype.GetProduits = function (_Id, _Reference, _Libelle, _CategorieId, _StockMin, _StockMax, _CommandeId) {
        var _this = this;
        var Valid = true;
        this._ProduitsSearchParameters = new ProduitsSearchParameters_1.ProduitsSearchParameters();
        this._ProduitsSearchParameters.Id = _Id;
        this._ProduitsSearchParameters.Reference = _Reference;
        this._ProduitsSearchParameters.Libelle = _Libelle;
        this._ProduitsSearchParameters.CategorieId = _CategorieId;
        this._ProduitsSearchParameters.StockMin = _StockMin;
        this._ProduitsSearchParameters.StockMax = _StockMax;
        this._ProduitsSearchParameters.CommandeId = _CommandeId;
        var _Body = JSON.stringify(this._ProduitsSearchParameters);
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Produits/GetProduits', _Body, _RequestOptions)
            .subscribe(function (data) {
            var _JsonResponse = data.json();
            _this._Produits = _JsonResponse;
            if (_this._Produits.length == 0) {
                _this._NoResult = true;
            }
            else {
                _this._NoResult = false;
            }
        });
    };
    AppComponent.prototype.DelProduit = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer le produit ' + this._Produits[_Index].Id + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            var _Confirmation = 'Le produit ' + this._Produits[_Index].Id + ' a bien ete supprime !';
            this._HttpService.get(this._Url + 'API/Produits/DelProduit?_Id=' + this._Produits[_Index].Id.toString() + '&_Real=Y', _RequestOptions)
                .subscribe(function (data) {
                _this._DelReturn = data.json();
                if (data.ok) {
                    _this._Produits.splice(_Index, 1);
                    alert(_Confirmation);
                }
                else {
                    alert('Une erreur est survenue !');
                }
            });
        }
    };
    AppComponent.prototype.AddUpdProduit = function () {
        var _this = this;
        var _Question = '';
        var _Confirmation = '';
        var _Method = '';
        if (this._Produit.Etat == 0) {
            _Method = 'API/Produits/AddProduit';
            _Question = 'Voulez-vous vraiment ajouter le produit ' + this._Produit.Id + ' ? ';
            _Confirmation = 'Le produit ' + this._Produit.Id + ' a bien ete ajoute !';
        }
        else {
            _Method = 'API/Produits/UpdProduit';
            _Question = 'Voulez-vous vraiment modifier le produit ' + this._Produit.Id + ' ? ';
            _Confirmation = 'Le produit ' + this._Produit.Id + ' a bien ete modifie !';
        }
        if (confirm(_Question)) {
            var _Body = JSON.stringify(this._Produit);
            var _HeaderOptions = new http_1.Headers({
                'Content-Type': 'application/json',
                'APIKey': 'AEZRETRYTUYIUOIP'
            });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post(this._Url + _Method, _Body, _RequestOptions)
                .subscribe(function (data) {
                _this._AddUpdReturn = data.json();
                if (data.ok) {
                    if (_this._Produit.Etat == 0) {
                        _this._Produits.push(_this._Produit);
                    }
                    else {
                        if ((_this._Produits.find(function (t) { return t.Id === _this._Produit.Id; }) != undefined) && (_this._Produits.find(function (t) { return t.Id === _this._Produit.Id; }) != null)) {
                            var _Index = _this._Produits.findIndex(function (t) { return t.Id === _this._Produit.Id; });
                            _this._Produits[_Index] = JSON.parse(JSON.stringify(_this._Produit));
                        }
                    }
                    _this.InitProduit(null, null);
                }
                else {
                    alert('Une erreur est survenue !');
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