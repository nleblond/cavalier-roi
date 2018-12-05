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
var ProduitsSearchParameters_1 = require("./Models/ProduitsSearchParameters");
var Produit_1 = require("./Models/Produit");
var AppComponent = /** @class */ (function () {
    function AppComponent(_HttpService) {
        this._HttpService = _HttpService;
        this._CategorieId = '';
        this._Produit = new Produit_1.Produit();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get('http://localhost:63122/API/Produits/GetCategories', _RequestOptions)
            .subscribe(function (data) {
            _this._Categories = data.json();
        });
    };
    AppComponent.prototype.ChangeCategorie = function (_Event, _Option) {
        if (_Option == 0) {
            this._CategorieId = _Event.target.value;
        }
        else {
            this._Produit.Categorie.Id = _Event.target.value;
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
        this._HttpService.post('http://localhost:63122/API/Produits/GetProduits', _Body, _RequestOptions)
            .subscribe(function (data) {
            var _JsonResponse = data.json();
            _this._Produits = _JsonResponse;
        });
    };
    AppComponent.prototype.GetProduit = function (_Index) {
        this._Produit = JSON.parse(JSON.stringify(this._Produits[_Index]));
    };
    AppComponent.prototype.InitProduit = function (_Option) {
        var _this = this;
        try {
            this._Produit.Id = null;
            this._Produit.Reference = null;
            this._Produit.Libelle = null;
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
        }
        catch (_a) { }
        ;
        if (_Option == 0) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get('http://localhost:63122/API/Divers/GetId?_Table=Produits', _RequestOptions)
                .subscribe(function (data) {
                _this._InitReturn = data.json();
                _this._Produit.Id = _this._InitReturn;
            });
        }
    };
    AppComponent.prototype.DelProduit = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer le produit ' + this._Produits[_Index].Id + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get('http://localhost:63122/API/Produits/DelProduit?_Id=' + this._Produits[_Index].Id.toString() + '&_Real=Y', _RequestOptions)
                .subscribe(function (data) {
                _this._DelReturn = data.json();
                _this._Produits.splice(_Index, 1);
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