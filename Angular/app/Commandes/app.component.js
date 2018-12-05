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
        this._StatutId = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get('http://localhost:63122/API/Commandes/GetStatuts', _RequestOptions)
            .subscribe(function (data) {
            _this._Statuts = data.json();
        });
    };
    AppComponent.prototype.ChangeStatut = function (_Event, _Index) {
        if ((_Index != null) && (_Index != undefined)) {
            this._Commandes[_Index].Statut.Id = _Event.target.value;
        }
        else {
            this._StatutId = _Event.target.value;
        }
    };
    AppComponent.prototype.ChangeReferenceTransaction = function (_Event, _Index) {
        this._Commandes[_Index].ReferenceTransaction = _Event.target.value;
    };
    AppComponent.prototype.ChangeReferenceExterne = function (_Event, _Index) {
        this._Commandes[_Index].ReferenceExterne = _Event.target.value;
    };
    AppComponent.prototype.GetCommandes = function (_Id, _DtMin, _DtMax, _ProduitId, _EleveId, _ReferenceTransaction, _ReferenceExterne, _StatutId) {
        var _this = this;
        var Valid = true;
        this._CommandesSearchParameters = new CommandesSearchParameters_1.CommandesSearchParameters();
        this._CommandesSearchParameters.Id = _Id;
        this._CommandesSearchParameters.DtMin = _DtMin;
        this._CommandesSearchParameters.DtMax = _DtMax;
        this._CommandesSearchParameters.ProduitId = _ProduitId;
        this._CommandesSearchParameters.EleveId = _EleveId;
        this._CommandesSearchParameters.ReferenceTransaction = _ReferenceTransaction;
        this._CommandesSearchParameters.ReferenceExterne = _ReferenceExterne;
        this._CommandesSearchParameters.StatutId = _StatutId;
        var _Body = JSON.stringify(this._CommandesSearchParameters);
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post('http://localhost:63122/API/Commandes/GetCommandes', _Body, _RequestOptions)
            .subscribe(function (data) {
            _this._Commandes = data.json();
            if (_this._Commandes.length == 0) {
                _this._NoResult = true;
            }
            else {
                _this._NoResult = false;
            }
        });
    };
    AppComponent.prototype.DelCommande = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer la commande ' + this._Commandes[_Index].Id + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.get('http://localhost:63122/API/Commandes/DelCommande?_Id=' + this._Commandes[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(function (data) {
                _this._DelReturn = data.json();
                _this._Commandes.splice(_Index);
            });
        }
    };
    AppComponent.prototype.UpdCommande = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment modifier la commande ' + this._Commandes[_Index].Id + ' ?')) {
            this._CommandeUpdateParameters = new CommandeUpdateParameters_1.CommandeUpdateParameters();
            this._CommandeUpdateParameters.Id = this._Commandes[_Index].Id;
            this._CommandeUpdateParameters.StatutId = this._Commandes[_Index].Statut.Id;
            this._CommandeUpdateParameters.ReferenceTransaction = this._Commandes[_Index].ReferenceTransaction;
            this._CommandeUpdateParameters.ReferenceExterne = this._Commandes[_Index].ReferenceExterne;
            var _Body = JSON.stringify(this._CommandeUpdateParameters);
            var _HeaderOptions = new http_1.Headers({
                'Content-Type': 'application/json',
                'APIKey': 'AEZRETRYTUYIUOIP'
            });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post('http://localhost:63122/API/Commandes/UpdCommande', _Body, _RequestOptions)
                .subscribe(function (data) {
                _this._UpdReturn = data.json();
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