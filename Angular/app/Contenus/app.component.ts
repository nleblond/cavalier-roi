import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


import { Evenement } from './../Evenements/Models/Evenement';
import { Emplacement } from './../Divers/Models/Emplacement';
import { Mode } from './../Divers/Models/Mode';
import { Contenu } from './Models/Contenu';
import { ContenusSearchParameters } from './Models/ContenusSearchParameters';
import { Publication } from './Models/Publication';

declare var jQuery: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})



export class AppComponent implements OnInit {

    public _WsUrl: string = '/API/';
    public _APIKey: string = 'AEZRETRYTUYIUOIP';
    public _RootUrl: string = '/';
    public _ImgUrl: string = 'http://www.cavalier-roi.fr/Content/Images'; 

    constructor(private _HttpService: Http) { }


    public _Modes: Mode[];
    public _ModesEmplacements: Emplacement[];
    public _TypologiesEvenements: Evenement[];
    public _Id: number = null;
    public _TypologieId: number = null;
    public _EvenementId: number = null;
    public _ModeId: number = null;
    public _EmplacementId: number = null;
    ngOnInit() {

        //initialisation des datetimepickers du filtre
        jQuery('.filtre input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });

        //gestion des paramètres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) { this._Id = parseInt(_UrlParams[i].replace('_Id=', '')); }
            if (_UrlParams[i].indexOf('_TypologieId=') > -1) { this._TypologieId = parseInt(_UrlParams[i].replace('_TypologieId=', '')); }
            if (_UrlParams[i].indexOf('_EvenementId=') > -1) { this._EvenementId = parseInt(_UrlParams[i].replace('_EvenementId=', '')); }
            if (_UrlParams[i].indexOf('_ModeId=') > -1) { this._ModeId = parseInt(_UrlParams[i].replace('_ModeId=', '')); }
            if (_UrlParams[i].indexOf('_EmplacementId=') > -1) { this._EmplacementId = parseInt(_UrlParams[i].replace('_EmplacementId=', '')); }
        }
        if ((this._Id != null) || (this._TypologieId != null) || (this._EvenementId != null) || (this._ModeId != null) || (this._EmplacementId != null)) { this.GetContenus(this._Id, null, this._EmplacementId, this._ModeId, null, null, this._EvenementId, this._TypologieId); }


        //récupération des typologies/évènements
        var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._TypologiesEvenements = data.json() as Evenement[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            }
        );

        //récupération des modes/emplacements
        var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetModesEmplacements', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._ModesEmplacements = data.json() as Emplacement[];
                    var _Temp1 = this._ModesEmplacements.filter(e => e.Key == null);
                    var _Temp2 = [];
                    for (var i = 0; i < _Temp1.length; i++) {
                        if (_Temp1[i].Id == null) {
                            var _Current = new Mode();
                            _Current.Id = parseInt(_Temp1[i].FormatedId.toString());
                            _Current.Libelle = _Temp1[i].Libelle[0].toUpperCase() + _Temp1[i].Libelle.toLowerCase().slice(1);
                            _Temp2.push(_Current);
                        }
                    }
                    this._Modes = _Temp2;
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            }
        );


    }

    public ChangeTypologieEvenement(_Event: any, _Option: number) {
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
        else { //détails
            this._Contenu.Evenement.Id = (_SelectedId == '-1' ? null : parseInt(_SelectedId));
            this._Contenu.Evenement.Libelle = _SelectedLibelle.replace('____', '').replace('____', '').trim();
        }
    }

    public ChangeModeEmplacement(_Event: any, _Option: number) {
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
        else { //détails
            this._Contenu.Publications.splice(0, this._Contenu.Publications.length);
            this._Contenu.Mode.Id = (_SelectedId == '-1' ? null : parseInt(_SelectedId));
            this._Contenu.Mode.Libelle = _SelectedLibelle.replace('____', '').trim();
        }
    }



    public GetCheck(_Id: number) { return this._Contenu.Publications.find(p => p.Emplacement.Id == _Id); }

    public ChangeCheck(_Event: any, _EmplacementId: number) {

        var _checkedValue = _Event.target.checked;

        if (_checkedValue == true) {
            var _NewPublication = new Publication();
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
    }

    public GetShow(_Option: string, _Index: number) {

        if (_Option == 'emplacement') {
            if ((this._ModesEmplacements[_Index].Key == '') || (this._ModesEmplacements[_Index].Key == null)) { return false; }
            else if (this._ModesEmplacements[_Index].Mode.Id == this._Contenu.Mode.Id) { return true; }
        }
        else if (_Option == 'zone') {
            return (this._Contenu.Mode.Id == 0);
        }
        else if (_Option == 'actualite') {
            return (this._Contenu.Mode.Id == 1);
        }
        else if (_Option == 'partenariat') {
            return (this._Contenu.Mode.Id == 2);
        }
        else if ((_Option == 'zone|actualite') || (_Option == 'actualite|zone')) {
            return ((this._Contenu.Mode.Id == 0) || (this._Contenu.Mode.Id == 1));
        }
        else if ((_Option == 'actualite|partenariat') || (_Option == 'partenariat|actualite')) {
            return ((this._Contenu.Mode.Id == 1) || (this._Contenu.Mode.Id == 2));
        }
        else if ((_Option == 'zone|partenariat') || (_Option == 'partenariat|zone')) {
            return ((this._Contenu.Mode.Id == 0) || (this._Contenu.Mode.Id == 2));
        }
        else if (_Option == 'mode') {
            return ((this._Contenu.Mode.Id != null) && (this._Contenu.Mode.Id != -1))
        }
        else if (_Option == 'supprimer') {
            if ((this._Contenus[_Index].Publications == null) || ((this._Contenus[_Index].Publications != null) && (this._Contenus[_Index].Publications.length == 0))) { return true; }
        }
        else if (_Option == 'valider') {
            return ((this._Contenu.Titre != '') && (this._Contenu.Titre != null));
        }
        return false;
    }




    public _InitReturn: number;
    public _Contenu: Contenu;
    public InitContenu(_Option: number, _Index: number) {

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

            this._Contenu.Mode = new Mode();
            this._Contenu.Mode.Id = null;
            this._Contenu.Mode.Libelle = null;

            this._Contenu.Evenement = new Evenement();
            this._Contenu.Evenement.Id = null;
            this._Contenu.Evenement.Libelle = null;

            this._Contenu.Etat = null;
        } catch { };

        if (_Option == 0) {
            var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._WsUrl + 'Divers/GetId?_Table=Contenus', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        this._InitReturn = data.json() as number;
                        this._Contenu = new Contenu();
                        this._Contenu.Id = this._InitReturn;
                        this._Contenu.Etat = 0; //creation
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }
        else if (_Option == 1) {
            this._Contenu = JSON.parse(JSON.stringify(this._Contenus[_Index]));
            this._Contenu.Etat = 1; //modification
        }

        //initialisation des datetimepickers des détails
        //setTimeout(function () {
        //    jQuery('.details input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });
        //}, 1000);

    }


    public _Contenus: Contenu[];
    public _NoResult: boolean;
    public _ContenusSearchParameters: ContenusSearchParameters;
    public GetContenus(_Id: number, _Titre: string, _EmplacementId: number, _ModeId: number, _DtMin: string, _DtMax: string, _EvenementId: number, _TypologieId: number) {

        this._ContenusSearchParameters = new ContenusSearchParameters();
        this._ContenusSearchParameters.Id = _Id;
        this._ContenusSearchParameters.Titre = _Titre;
        this._ContenusSearchParameters.EmplacementId = _EmplacementId;
        this._ContenusSearchParameters.ModeId = _ModeId;
        this._ContenusSearchParameters.DtMin = _DtMin;
        this._ContenusSearchParameters.DtMax = _DtMax;
        this._ContenusSearchParameters.EvenementId = _EvenementId;
        this._ContenusSearchParameters.TypologieId = _TypologieId;

        var _Body = JSON.stringify(this._ContenusSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._WsUrl + 'Contenus/GetContenus', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Contenus = data.json() as Contenu[];
                    if (this._Contenus.length == 0) { this._NoResult = true; }
                    else { this._NoResult = false; }
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });
    }




    public _AddUpdReturn: number;
    public AddUpdContenu() {

        var _Question = '';
        var _Confirmation = '';
        var _Method = '';
        if (this._Contenu.Etat == 0) {
            _Method = 'Contenus/AddContenu';
            _Question = 'Voulez-vous vraiment ajouter le contenu ' + this._Contenu.Id + ' ?';
            _Confirmation = 'Le contenu ' + this._Contenu.Id + ' a bien ete ajoute !';
        }
        else {
            _Method = 'Contenus/UpdContenu';
            _Question = 'Voulez-vous vraiment modifier le contenu ' + this._Contenu.Id + ' ?';
            _Confirmation = 'Le contenu ' + this._Contenu.Id + ' a bien ete modifie !';
        }

        if (confirm(_Question)) {

            var _Body = JSON.stringify(this._Contenu);
            var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post(this._WsUrl + _Method, _Body, _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._AddUpdReturn = data.json() as number;
                        if (this._Contenu.Etat == 0) {
                            if ((this._Contenus == null) || (this._Contenus == undefined) || (this._Contenus.length == 0)) {
                                this._Contenus = [];
                            }
                            var _NouveauContenu = JSON.parse(JSON.stringify(this._Contenu));
                            this._Contenus.push(_NouveauContenu);
                            if (this._Contenus.length == 0) { this._NoResult = true; }
                            else { this._NoResult = false; }
                        }
                        else {
                            if ((this._Contenus.find(t => t.Id === this._Contenu.Id) != undefined) && (this._Contenus.find(t => t.Id === this._Contenu.Id) != null)) {
                                var _Index = this._Contenus.findIndex(t => t.Id === this._Contenu.Id);
                                this._Contenus[_Index] = JSON.parse(JSON.stringify(this._Contenu));
                            }
                        }
                        this.InitContenu(null, null);
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }
    }



    _DelReturn: number;
    public DelContenu(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer le contenu ' + this._Contenus[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            var _Confirmation = 'Le contenu ' + this._Contenus[_Index].Id + ' a bien ete supprime !';
            this._HttpService.get(this._WsUrl + 'Contenus/DelContenu?_Id=' + this._Contenus[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._DelReturn = data.json() as number;
                        this._Contenus.splice(_Index, 1);
                        if (this._Contenus.length == 0) { this._NoResult = true; }
                        else { this._NoResult = false; }
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }

    }




}

