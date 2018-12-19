import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


import { Evenement } from './Models/Evenement';
import { Typologie } from './../Divers/Models/Typologie';
import { EvenementsSearchParameters } from './Models/EvenementsSearchParameters';
import { Planning } from './Models/Planning';
import { Reservation } from './Models/Reservation';
import { PlanningsSearchParameters } from './Models/PlanningsSearchParameters';

declare var jQuery: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})



export class AppComponent implements OnInit {

    public _Url: string = '/';



    constructor(private _HttpService: Http) { }

    public _TypologiesEvenementsParents: Evenement[];
    public _TypologiesEvenements: Evenement[];
    public _Id: number = null;
    public _EleveId: number = null;
    public _TypologieId: number = null;
    public _EvenementParentId: number = null;
    ngOnInit() {

        //initialisation des datetimepickers du filtre
        jQuery('.filtre input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });


        //gestion des paramètres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) { this._Id = parseInt(_UrlParams[i].replace('_Id=', '')); }
            if (_UrlParams[i].indexOf('_EleveId=') > -1) { this._EleveId = parseInt(_UrlParams[i].replace('_EleveId=', '')); }
            if (_UrlParams[i].indexOf('_TypologieId=') > -1) { this._TypologieId = parseInt(_UrlParams[i].replace('_TypologieId=', '')); }
            if (_UrlParams[i].indexOf('_EvenementParentId=') > -1) { this._EvenementParentId = parseInt(_UrlParams[i].replace('_EvenementParentId=', '')); }
        }
        if ((this._Id != null) || (this._TypologieId != null) || (this._EleveId != null) || (this._EvenementParentId != null)) { this.GetEvenements(this._Id, null, this._EleveId, this._EvenementParentId, null, null, this._TypologieId); }


        //récupération des typologies/evenements parents uniquement
        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._Url + 'API/Divers/GetTypologiesEvenements?_OnlyParentsYN=Y', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._TypologiesEvenementsParents = data.json() as Evenement[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });

        //récupération des typologies + évènements
        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._Url + 'API/Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._TypologiesEvenements = data.json() as Evenement[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });
       
    }


    public ChangeTypologieEvenementParent(_Event: any, _Option: number) {
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
        else { //détails
            if (_SelectedId.indexOf('-') < 0) {
                this._Evenement.Typologie = new Typologie();
                this._Evenement.Typologie.Id = _SelectedId;
                this._Evenement.Typologie.Libelle = _SelectedLibelle;
                this._Evenement.EvenementParent = new Evenement();
                this._Evenement.EvenementParent.Id = null;
                this._Evenement.EvenementParent.Libelle = null;
            }
            else {
                this._Evenement.Typologie = new Typologie();
                this._Evenement.Typologie.Id = _SelectedId.substring(0, _SelectedId.indexOf('-'));
                this._Evenement.Typologie.Libelle = null;
                var _NewSelectedId = _SelectedId.substring(_SelectedId.indexOf('-') + 1);
                this._Evenement.EvenementParent = new Evenement;
                if (_NewSelectedId.indexOf('-') < 0) {
                    this._Evenement.EvenementParent.Id = _NewSelectedId;
                }
                else {
                    this._Evenement.EvenementParent.Id = _NewSelectedId.substring(0, _SelectedId.indexOf('-'));
                }
                this._Evenement.EvenementParent.Libelle = _SelectedLibelle.replace('____', '').replace('____', '').trim();
            }
        }
    }

    public GetSelect(_Evenement: Evenement) {

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
    }





    public GetShow(_Option: string, _Evenement: Evenement) {

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
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { return false; }
            return true;
        }
        else if (_Option == 'nombre') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1) || (_Evenement.Typologie.Id == 3)) { return true; } //stage, tournoi, cours
                return false;
            }
            else { //parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 3)) { return true; } //stage, cours
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
        else if (_Option == 'descriptif') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1) || (_Evenement.Typologie.Id == 3)) { return true; } //stage, tournoi, cours
                return false;
            }
            else { //parent
                if (_Evenement.Typologie.Id == 3) { return true; } //cours
                return false;
            }
        }
        else if (_Option == 'photo') {
            if ((_Evenement.EvenementParent == null) || ((_Evenement.EvenementParent != null) && (_Evenement.EvenementParent.Id == null))) { //pas de parent
                if ((_Evenement.Typologie.Id == 0) || (_Evenement.Typologie.Id == 1) || (_Evenement.Typologie.Id == 3) || (_Evenement.Typologie.Id == 2)) { return true; } //stage, tournoi, cours, compétition
                return false;
            }
            else { //parent
                if (_Evenement.Typologie.Id == 3) { return true; } //cours
                return false;
            }
        }
        else if (_Option == 'valider') {
            if ((_Evenement.Libelle == '') || (_Evenement.Libelle == null)) { return false; }
            return true;
        }
        else if (_Option == 'supprimer') {
            if ((_Evenement.Reservations == null) || (_Evenement.Reservations.length == 0)) { return true; }
        }
        return false;
    }



    public GetColor(_IndexPlanning: number, _IndexProperty: number) {

        if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau0809' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau0809 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau0910' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 1 && this._Evenement.Plannings[_IndexPlanning].Creneau0910 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau0910 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1011' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 2 && this._Evenement.Plannings[_IndexPlanning].Creneau1011 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1011 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1112' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 3 && this._Evenement.Plannings[_IndexPlanning].Creneau1112 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1112 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1213' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 4 && this._Evenement.Plannings[_IndexPlanning].Creneau1213 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1213 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1314' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 5 && this._Evenement.Plannings[_IndexPlanning].Creneau1314 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1314 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1415' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 6 && this._Evenement.Plannings[_IndexPlanning].Creneau1415 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1415 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1516' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 7 && this._Evenement.Plannings[_IndexPlanning].Creneau1516 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1516 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1617' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 8 && this._Evenement.Plannings[_IndexPlanning].Creneau1617 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1617 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else if (_IndexProperty == 9 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 == this._Evenement.Id.toString()) {
            if (this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1718' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour).length > 0) { return 'red'; }
            else { return '#FECC16'; }
        }
        else if (_IndexProperty == 9 && this._Evenement.Plannings[_IndexPlanning].Creneau1718 != this._Evenement.Id.toString() && this._Evenement.Plannings[_IndexPlanning].Creneau1718 != null) {
            return '#FFFFFF';
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        else {
            return '#000000';
        }
    }

    public ChangeColor(_IndexPlanning: number, _IndexProperty: number) {

        if (_IndexProperty == 0 && this._Evenement.Plannings[_IndexPlanning].Creneau0809 == this._Evenement.Id.toString()) {
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau0809' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau0910' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1011' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1112' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1213' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1314' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1415' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1516' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1617' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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
            var _Reservations = this._Evenement.Reservations.filter(r => r.Creneau == 'Creneau1718' && this._Evenement.Plannings[_IndexPlanning].Jour == r.Jour) as Reservation[];
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

    }




    public _Evenements: Evenement[];
    public _NoResult: boolean;
    public _EvenementsSearchParameters: EvenementsSearchParameters;
    public GetEvenements(_Id: number, _Libelle: string, _EleveId: number, _EvenementParentId: number, _DtMin: string, _DtMax: string, _TypologieId: number) {

        this._EvenementsSearchParameters = new EvenementsSearchParameters();
        this._EvenementsSearchParameters.Id = _Id;
        this._EvenementsSearchParameters.Libelle = _Libelle;
        this._EvenementsSearchParameters.DtMin = _DtMin;
        this._EvenementsSearchParameters.DtMax = _DtMax;
        this._EvenementsSearchParameters.EvenementParentId = _EvenementParentId;
        this._EvenementsSearchParameters.EleveId = _EleveId;
        this._EvenementsSearchParameters.TypologieId = _TypologieId;

        var _Body = JSON.stringify(this._EvenementsSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Evenements/GetEvenements', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    var _JsonResponse = data.json() as Evenement[];
                    this._Evenements = _JsonResponse;
                    if (this._Evenements.length == 0) { this._NoResult = true; }
                    else { this._NoResult = false; }
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });


    }




    public GetEvenementReservation(_EvenementId: number) {

        this._EvenementsSearchParameters = new EvenementsSearchParameters();
        this._EvenementsSearchParameters.Id = _EvenementId;

        var _Body = JSON.stringify(this._EvenementsSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Evenements/GetEvenements', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    var _EvenementLibelle = ((data.json())[0] as Evenement).Libelle;
                    alert('[' + _EvenementId + '] ' + _EvenementLibelle);
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });
    }



    public GetPlannings() {

        //récupération du planning
        this._PlanningsSearchParameters = new PlanningsSearchParameters();
        this._PlanningsSearchParameters.Mois = (new Date()).getMonth() + 1;
        this._PlanningsSearchParameters.Annee = (new Date()).getFullYear();
        this._PlanningsSearchParameters.Plus = 2;

        var _Body = JSON.stringify(this._PlanningsSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._Url + 'API/Evenements/GetPlanningsBack', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Evenement.Plannings = data.json() as Planning[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });

    }




    public _InitReturn: number;
    public _Evenement: Evenement;
    public _PlanningsSearchParameters: PlanningsSearchParameters;
    public InitEvenement(_Option: number, _Index: number) {
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

            this._Evenement.Typologie = new Typologie();
            this._Evenement.Typologie.Id = null;
            this._Evenement.Typologie.Libelle = null;

            this._Evenement.EvenementParent = new Evenement();
            this._Evenement.EvenementParent.Id = null;
            this._Evenement.EvenementParent.Libelle = null;

            this._Evenement.Reservations = null;
            this._Evenement.Plannings = null;
        } catch { };

        if (_Option == 0) { //création
            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._Url + 'API/Divers/GetId?_Table=Evenements', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        this._InitReturn = (data.json())[0] as number;
                        this._Evenement = new Evenement();
                        this._Evenement.EvenementParent = new Evenement();
                        this._Evenement.Id = this._InitReturn;
                        this._Evenement.Etat = 0;
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }
        else if (_Option == 1) { //modification
            this._Evenement = JSON.parse(JSON.stringify(this._Evenements[_Index]));
            if (this._Evenement.EvenementParent == null) { this._Evenement.EvenementParent = new Evenement(); }
            this._Evenement.Etat = 1; //modification
        }
        this.GetPlannings(); //récupération des derniers enregistrements "planning" en date

        //initialisation des datetimepickers des détails
        setTimeout(function () {
            jQuery('.details input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });
        }, 1000);
    }
            


    public _AddUpdReturn: number;
    public AddUpdEvenement() {

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

            //mise à jour de l'évènement
            var _Body = JSON.stringify(this._Evenement);
            var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post(this._Url + _Method, _Body, _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._AddUpdReturn = data.json() as number;
                        //mise à jour du model
                        if (this._Evenement.Etat == 0) {
                            if ((this._Evenements == null) || (this._Evenements == undefined) || (this._Evenements.length == 0)) {
                                this._Evenements = [];
                            }
                            var _NouveauEvenement = JSON.parse(JSON.stringify(this._Evenement));
                            this._Evenements.push(_NouveauEvenement);
                            if (this._Evenements.length == 0) { this._NoResult = true; }
                            else { this._NoResult = false; }
                        }
                        else {
                            if ((this._Evenements.find(t => t.Id === this._Evenement.Id) != undefined) && (this._Evenements.find(t => t.Id === this._Evenement.Id) != null)) {
                                var _Index = this._Evenements.findIndex(t => t.Id === this._Evenement.Id);
                                this._Evenements[_Index] = JSON.parse(JSON.stringify(this._Evenement));
                            }
                        }

                        //mise à jour du planning que la modification de l'évènement a pu modifier
                        var _Body = JSON.stringify(this._Evenement.Plannings);
                        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
                        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
                        this._HttpService.post(this._Url + 'API/Evenements/UpdPlannings', _Body, _RequestOptions)
                            .subscribe((data: Response) => {
                                if (data.ok) {
                                    alert('Le planning a bien ete modifie !');
                                    this.InitEvenement(null, null);
                                }
                                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                            });
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });

            
        }
    }



    _DelReturn: number;
    public DelEvenement(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer l\'evenement ' + this._Evenements[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            var _Confirmation = 'L\'evenement ' + this._Evenements[_Index].Id + ' a bien ete supprime !';
            this._HttpService.get(this._Url + 'API/Evenements/DelEvenement?_Id=' + this._Evenements[_Index].Id.toString(), _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._DelReturn = data.json() as number;
                        this._Evenements.splice(_Index, 1);
                        if (this._Evenements.length == 0) { this._NoResult = true; }
                        else { this._NoResult = false; }
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }

    }




}




