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
        this._EvenementId = '';
        this._TypologieId = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get('http://localhost:63122/API/Eleves/GetEvenementsAndTypologies', _RequestOptions)
            .subscribe(function (data) { _this._EvenementsAndTypologies = data.json(); });
    };
    AppComponent.prototype.ChangeEvenementTypologie = function (event) {
        var _SelectedValue = event.target.value;
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
        var Valid = true;
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
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post('http://localhost:63122/API/Eleves/GetEleves', _Body, _RequestOptions)
            .subscribe(function (data) {
            _this._Eleves = data.json();
            if (_this._Eleves.length == 0) {
                _this._NoResult = true;
            }
            else {
                _this._NoResult = false;
            }
        });
    };
    AppComponent.prototype.DelEleve = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer l\'eleve ' + this._Eleves[_Index].Nom + ' ' + this._Eleves[_Index].Prenom + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get('http://localhost:63122/API/Eleves/DelEleve?_Id=' + this._Eleves[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(function (data) {
                _this._DelReturn = data.json();
                _this._Eleves.splice(_Index, 1);
            });
        }
    };
    AppComponent.prototype.GetEleve = function (_Id) {
        window.open('/MonCompte?_Id=' + _Id, '_blank');
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