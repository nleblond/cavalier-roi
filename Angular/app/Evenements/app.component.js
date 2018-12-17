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
var Evenement_1 = require("./Models/Evenement");
var Typologie_1 = require("./../Divers/Models/Typologie");
var EvenementsSearchParameters_1 = require("./Models/EvenementsSearchParameters");
var PlanningsSearchParameters_1 = require("./Models/PlanningsSearchParameters");
var AppComponent = /** @class */ (function () {
    function AppComponent(_HttpService) {
        this._HttpService = _HttpService;
        //public _Url: String = 'http://192.168.1.34:63121/';
        this._Url = '/';
        this._Id = null;
        this._EleveId = null;
        this._TypologieId = null;
        this._EvenementParentId = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //gestion des param�tres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) {
                this._Id = parseInt(_UrlParams[i].replace('_Id=', ''));
            }
            if (_UrlParams[i].indexOf('_EleveId=') > -1) {
                this._EleveId = parseInt(_UrlParams[i].replace('_EleveId=', ''));
            }
            if (_UrlParams[i].indexOf('_TypologieId=') > -1) {
                this._TypologieId = parseInt(_UrlParams[i].replace('_TypologieId=', ''));
            }
            if (_UrlParams[i].indexOf('_EvenementParentId=') > -1) {
                this._EvenementParentId = parseInt(_UrlParams[i].replace('_EvenementParentId=', ''));
            }
        }
        if ((this._Id != null) || (this._TypologieId != null) || (this._EleveId != null) || (this._EvenementParentId != null)) {
            this.GetEvenements(this._Id, null, this._EleveId, this._EvenementParentId, null, null, this._TypologieId);
        }
        //r�cup�ration des typologies/evenements
        var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
        //typologies + �v�nements parents uniquement
        this._HttpService.get(this._Url + 'API/Divers/GetTypologiesEvenements?_OnlyParentsYN=Y', _RequestOptions)
            .subscribe(function (data) {
            _this._TypologiesEvenementsParents = data.json();
        });
        //typologies + �v�nements
        this._HttpService.get(this._Url + 'API/Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe(function (data) {
            _this._TypologiesEvenements = data.json();
        });
    };
    AppComponent.prototype.ChangeTypologieEvenementParent = function (_Event, _Option) {
        var _SelectedId = _Event.target.value;
        var _SelectedIndex = _Event.target.options.selectedIndex;
        var _SelectedLibelle = _Event.target.options[_SelectedIndex].innerText;
        if (_Option == 0) { //filtre
            if (_SelectedId.indexOf('-') < 0) {
                this._TypologieId = _SelectedId;
                this._EvenementParentId = null;
            }
            else {
                _SelectedId = _SelectedId.substring(_SelectedId.indexOf('-') + 1); //on enleve la typologie
                this._TypologieId = null;
                this._EvenementParentId = _SelectedId;
            }
        }
        else { //d�tails
            //if (_SelectedId.indexOf('-') < 0) {
            //    this._Evenement.Typologie = new Typologie();
            //    this._Evenement.Typologie.Id = _SelectedId;
            //    this._Evenement.Typologie.Libelle = _SelectedLibelle;
            //    this._Evenement.EvenementParent = new Evenement();
            //    this._Evenement.EvenementParent.Id = null;
            //    this._Evenement.EvenementParent.Libelle = null;
            //}
            //else {
            //    this._Evenement.Typologie = new Typologie();
            //    this._Evenement.Typologie.Id = _SelectedId.substring(0, _SelectedId.indexOf('-'));
            //    this._Evenement.Typologie.Libelle = null;
            //    var _NewSelectedId = _SelectedId.substring(_SelectedId.indexOf('-') + 1);
            //    this._Evenement.EvenementParent = new Evenement;
            //    if (_NewSelectedId.indexOf('-') < 0) {
            //        this._Evenement.EvenementParent.Id = _NewSelectedId;
            //    }
            //    else {
            //        this._Evenement.EvenementParent.Id = _NewSelectedId.substring(0, _SelectedId.indexOf('-'));
            //    }
            //    this._Evenement.EvenementParent.Libelle = _SelectedLibelle.replace('____', '').replace('____', '').trim();
            //}
        }
    };
    AppComponent.prototype.GetSelect = function (_Evenement) {
        if ((this._Evenement.EvenementParent.Id == undefined) || (this._Evenement.EvenementParent.Id == null)) {
            //on se concentre sur le "Typologie.Id"
            if ((this._Evenement.Typologie.Id != undefined) && (this._Evenement.Typologie.Id != null) && (this._Evenement.Typologie.Id.toString() == _Evenement.FormatedId)) {
                return true;
            }
        }
        else {
            if ((this._Evenement.EvenementParent.Id != undefined) && (this._Evenement.EvenementParent.Id != null) && (this._Evenement.EvenementParent.Id == _Evenement.Id)) {
                return true;
            }
        }
        return false;
    };
    AppComponent.prototype.GetShow = function (_Option, _Evenement) {
        if (_Option == 'stage') {
            return (_Evenement.Typologie.Id == 0);
        }
        else if (_Option == 'tournoi') {
            return (_Evenement.Typologie.Id == 1);
        }
        else if (_Option == 'competition') {
            return (_Evenement.Typologie.Id == 2);
        }
        else if (_Option == 'cours') {
            return (_Evenement.Typologie.Id == 3);
        }
        else if ((_Option == 'cours|stage') || (_Option == 'stage|cours')) {
            return ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 3));
        }
        else if ((_Option == 'tournoi|stage') || (_Option == 'stage|tournoi')) {
            return ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1));
        }
        else if (_Option == 'parent') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) {
                return false;
            }
            return true;
        }
        else if (_Option == 'nombre') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1) || (_Evenement.Typologie.Id == 3)) {
                    return true;
                } //stage, tournoi, cours
                return false;
            }
            else { //parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 3)) {
                    return true;
                } //stage, cours
                return false;
            }
        }
        else if (_Option == 'lien') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                return (_Evenement.Typologie.Id == 2);
            }
            return false;
        }
        else if (_Option == 'logo') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                return ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1));
            }
            return false;
        }
        else if (_Option == 'bandeau') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                return (_Evenement.Typologie.Id == 1);
            }
            return false;
        }
        else if ((_Option == 'descriptif') || (_Option == 'photo')) {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1) || (_Evenement.Typologie.Id == 3)) {
                    return true;
                } //stage, tournoi, cours
                return false;
            }
            else { //parent
                if (_Evenement.Typologie.Id == 3) {
                    return true;
                } //cours
                return false;
            }
        }
        else if (_Option == 'valider') {
            if ((_Evenement.Libelle == '') || (_Evenement.Libelle == null)) {
                return false;
            }
            return true;
        }
        else if (_Option == 'supprimer') {
            if ((_Evenement.Reservations == null) || (_Evenement.Reservations.length == 0)) {
                return true;
            }
        }
        return false;
    };
    AppComponent.prototype.GetColor = function (_IndexPlanning, _IndexProperty) {
        var _this = this;
        if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau0809' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau0809 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau0910' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau0910 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1011' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1011 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1112' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1112 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1213' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1213 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1314' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1314 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1415' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1415 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1516' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1516 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1617' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1617 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 9 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1718' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; }).length > 0) {
                return 'red';
            }
            else {
                return '#FECC16';
            }
        }
        else if (_IndexProperty == 9 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1718 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else {
            return '#000000';
        }
    };
    AppComponent.prototype.ChangeColor = function (_IndexPlanning, _IndexProperty) {
        var _this = this;
        if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau0809' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau0809' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau0809 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau0809 = null;
            }
        }
        else if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau0809 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 != null && this._Evenement.Plannings[_IndexPlanning].Creneau0809 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau0809));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau0910' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau0910' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau0910 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau0910 = null;
            }
        }
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau0910 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 != null && this._Evenement.Plannings[_IndexPlanning].Creneau0910 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau0910));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1011' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1011' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1011 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1011 = null;
            }
        }
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1011 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1011 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1011));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1112' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1112' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1112 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1112 = null;
            }
        }
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1112 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1112 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1112));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1213' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1213' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1213 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1213 = null;
            }
        }
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1213 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1213 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1213));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1314' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1314' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1314 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1314 = null;
            }
        }
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1314 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1314 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1314));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1415' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1415' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1415 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1415 = null;
            }
        }
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1415 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1415 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1415));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1516' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1516' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1516 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1516 = null;
            }
        }
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1516 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1516 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1516));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1617' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1617' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1617 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1617 = null;
            }
        }
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1617 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1617 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1617));
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 9 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(function (r) { return r.Creneau == 'Creneau1718' && _this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour; });
            if (_Reservations != null && _Reservations.length > 0) {
                for (var i = 0; i < this._Evenement.Reservations.length; i++) {
                    if (this._Evenement.Reservations[i].Creneau == 'Creneau1718' && this._Evenement.Reservations[i].Jour == this._Evenement.Plannings[_IndexPlanning].Jour) {
                        var _Eleve = this._Evenement.Reservations[i].Eleve;
                        if (confirm('Voulez-vous vraiment supprimer la reservation de [' + _Eleve.Id + '] ' + _Eleve.Nom + ' ' + _Eleve.Prenom + ' ?')) {
                            this._Evenement.Reservations.splice(i, 1);
                            this._Evenement.Plannings[_IndexPlanning].Creneau1718 = null;
                        }
                    }
                }
            }
            else {
                this._Evenement.Plannings[_IndexPlanning].Creneau1718 = null;
            }
        }
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 == null) {
            this._Evenement.Plannings[_IndexPlanning].Creneau1718 = this._Evenement.Id.toString();
        }
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 != null && this._Evenement.Plannings[_IndexPlanning].Creneau1718 != this._Evenement.Id.toString()) {
            this.GetEvenementReservation(parseInt(this._Evenement.Plannings[_IndexPlanning].Creneau1718));
        }
    };
    AppComponent.prototype.GetEvenements = function (_Id, _Libelle, _EleveId, _EvenementParentId, _DtMin, _DtMax, _TypologieId) {
        var _this = this;
        var Valid = true;
        this._EvenementsSearchParameters = new EvenementsSearchParameters_1.EvenementsSearchParameters();
        this._EvenementsSearchParameters.Id = _Id;
        this._EvenementsSearchParameters.Libelle = _Libelle;
        this._EvenementsSearchParameters.DtMin = _DtMin;
        this._EvenementsSearchParameters.DtMax = _DtMax;
        this._EvenementsSearchParameters.EvenementParentId = _EvenementParentId;
        this._EvenementsSearchParameters.EleveId = _EleveId;
        this._EvenementsSearchParameters.TypologieId = _TypologieId;
        var _Body = JSON.stringify(this._EvenementsSearchParameters);
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Evenements/GetEvenements', _Body, _RequestOptions)
            .subscribe(function (data) {
            var _JsonResponse = data.json();
            _this._Evenements = _JsonResponse;
            if (_this._Evenements.length == 0) {
                _this._NoResult = true;
            }
            else {
                _this._NoResult = false;
            }
        });
    };
    AppComponent.prototype.GetEvenementReservation = function (_EvenementId) {
        var Valid = true;
        this._EvenementsSearchParameters = new EvenementsSearchParameters_1.EvenementsSearchParameters();
        this._EvenementsSearchParameters.Id = _EvenementId;
        var _Body = JSON.stringify(this._EvenementsSearchParameters);
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Evenements/GetEvenements', _Body, _RequestOptions)
            .subscribe(function (data) {
            var _EvenementLibelle = (data.json())[0].Libelle;
            alert('[' + _EvenementId + '] ' + _EvenementLibelle);
        });
    };
    AppComponent.prototype.GetPlannings = function () {
        var _this = this;
        //r�cup�ration du planning
        this._PlanningsSearchParameters = new PlanningsSearchParameters_1.PlanningsSearchParameters();
        this._PlanningsSearchParameters.Mois = (new Date()).getMonth() + 1;
        this._PlanningsSearchParameters.Annee = (new Date()).getFullYear();
        this._PlanningsSearchParameters.Plus = 2;
        var _Body = JSON.stringify(this._PlanningsSearchParameters);
        var _HeaderOptions = new http_1.Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Evenements/GetPlanningsBack', _Body, _RequestOptions)
            .subscribe(function (data) {
            var _Temp = data.json();
            _this._Evenement.Plannings = _Temp;
        });
    };
    AppComponent.prototype.InitEvenement = function (_Option, _Index) {
        var _this = this;
        try {
            this._Evenement.Id = null;
            this._Evenement.FormatedId = null;
            this._Evenement.Libelle = null;
            this._Evenement.Descriptif = null;
            this._Evenement.DtDebut = null;
            this._Evenement.DtFin = null;
            this._Evenement.DtLimiteInscription = null;
            this._Evenement.Maximum = null;
            this._Evenement.Prix = null;
            this._Evenement.Duree = null;
            this._Evenement.Logo = null;
            this._Evenement.Photo = null;
            this._Evenement.Bandeau = null;
            this._Evenement.Lien = null;
            this._Evenement.Typologie = new Typologie_1.Typologie();
            this._Evenement.Typologie.Id = null;
            this._Evenement.Typologie.Libelle = null;
            this._Evenement.EvenementParent = new Evenement_1.Evenement();
            this._Evenement.EvenementParent.Id = null;
            this._Evenement.EvenementParent.Libelle = null;
            this._Evenement.Reservations = null;
            this._Evenement.Plannings = null;
        }
        catch (_a) { }
        ;
        if (_Option == 0) { //cr�ation
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._Url + 'API/Divers/GetId?_Table=Evenements', _RequestOptions)
                .subscribe(function (data) {
                _this._InitReturn = (data.json())[0];
                _this._Evenement = new Evenement_1.Evenement();
                _this._Evenement.EvenementParent = new Evenement_1.Evenement();
                _this._Evenement.Id = _this._InitReturn;
                _this._Evenement.Etat = 0;
            });
        }
        else if (_Option == 1) { //modification
            this._Evenement = JSON.parse(JSON.stringify(this._Evenements[_Index]));
            if (this._Evenement.EvenementParent == null) {
                this._Evenement.EvenementParent = new Evenement_1.Evenement();
            }
            this._Evenement.Etat = 1; //modification
        }
        this.GetPlannings(); //r�cup�ration des derniers enregistrements "planning" en date
    };
    AppComponent.prototype.AddUpdEvenement = function () {
        var _this = this;
        var _Question = '';
        var _Confirmation = '';
        var _Method = '';
        if (this._Evenement.Etat == 0) {
            _Method = 'API/Evenements/AddEvenement';
            _Question = 'Voulez-vous vraiment ajouter l\'evenement ' + this._Evenement.Id + ' et le planning ?';
            _Confirmation = 'L\'evenement ' + this._Evenement.Id + ' a bien ete ajoute !';
        }
        else {
            _Method = 'API/Evenements/UpdEvenement';
            _Question = 'Voulez-vous vraiment modifier l\'evenement ' + this._Evenement.Id + ' et le planning ?';
            _Confirmation = 'L\'evenement ' + this._Evenement.Id + ' a bien ete modifie !';
        }
        if (confirm(_Question)) {
            //mise � jour de l'�v�nement
            var _Body = JSON.stringify(this._Evenement);
            var _HeaderOptions = new http_1.Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post(this._Url + _Method, _Body, _RequestOptions)
                .subscribe(function (data) {
                _this._AddUpdReturn = data.json();
                if (data.ok) {
                    //mise � jour du model
                    if (_this._Evenement.Etat == 0) {
                        _this._Evenements.push(_this._Evenement);
                    }
                    else {
                        if ((_this._Evenements.find(function (t) { return t.Id === _this._Evenement.Id; }) != undefined) && (_this._Evenements.find(function (t) { return t.Id === _this._Evenement.Id; }) != null)) {
                            var _Index = _this._Evenements.findIndex(function (t) { return t.Id === _this._Evenement.Id; });
                            _this._Evenements[_Index] = JSON.parse(JSON.stringify(_this._Evenement));
                        }
                    }
                    //mise � jour du planning que la modification de l'�v�nement a pu modifier
                    var _Body = JSON.stringify(_this._Evenement.Plannings);
                    var _HeaderOptions = new http_1.Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
                    var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, headers: _HeaderOptions });
                    _this._HttpService.post(_this._Url + 'API/Evenements/UpdPlannings', _Body, _RequestOptions)
                        .subscribe(function (data) {
                        if (data.ok) {
                            _this.InitEvenement(null, null);
                        }
                        else {
                            alert('Une erreur est survenue !');
                        }
                    });
                }
                else {
                    alert('Une erreur est survenue !');
                }
            });
        }
    };
    AppComponent.prototype.DelEvenement = function (_Index) {
        var _this = this;
        if (confirm('Voulez-vous vraiment supprimer l\'evenement ' + this._Evenements[_Index].Id + ' ?')) {
            var _HeaderOptions = new http_1.Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._Url + 'API/Contenus/DelEvenement?_Id=' + this._Evenements[_Index].Id.toString(), _RequestOptions)
                .subscribe(function (data) {
                _this._DelReturn = data.json();
                _this._Evenements.splice(_Index, 1);
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