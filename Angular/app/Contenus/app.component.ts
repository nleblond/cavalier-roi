import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


import { Evenement } from './../Evenements/Models/Evenement';
import { Emplacement } from './../Divers/Models/Emplacement';
import { Mode } from './../Divers/Models/Mode';
import { Contenu } from './Models/Contenu';
import { ContenusSearchParameters } from './Models/ContenusSearchParameters';
import { Publication } from './Models/Publication';



@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})



export class AppComponent implements OnInit {


    constructor(private _HttpService: Http) { }
    //public _Url: String = 'http://192.168.1.34:63121/';
    public _Url: string = '/';


    public _ModesEmplacements: Emplacement[];
    public _Modes: Mode[];
    public _Emplacements: Emplacement[];
    public _TypologiesEvenements: Evenement[];

    public _Id: number = null;
    public _TypologieId: number = null;
    public _EvenementId: number = null;
    public _ModeId: number = null;
    public _EmplacementId: number = null;
    ngOnInit() {

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
        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

        this._HttpService.get(this._Url + 'API/Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe(data => {
                this._TypologiesEvenements = data.json() as Evenement[];
            }
        );

        //récupération des modes/emplacements
        this._HttpService.get(this._Url + 'API/Divers/GetModesEmplacements', _RequestOptions)
            .subscribe(data => {
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

    public GetShow(_Test: string, _Id: number, _Key: string) {

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
            return ((this._Contenu.Mode.Id != null) && (this._Contenu.Mode.Id != -1))
        }
        else if (_Test == 'valider') {
            if ((this._Contenu.Titre == '') || (this._Contenu.Titre == null)) { return false; }
            if (this._Contenu.Publications.length == 0) { return false; }
            if ((this._Contenu.DtDebut == '') || (this._Contenu.DtDebut == null)) { return false; }
            return true;
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
            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

            this._HttpService.get(this._Url + 'API/Divers/GetId?_Table=Contenus', _RequestOptions)
                .subscribe(data => {
                    this._InitReturn = (data.json())[0] as number;
                    this._Contenu = new Contenu();
                    this._Contenu.Id = this._InitReturn;
                    this._Contenu.Etat = 0; //creation
                });
        }
        else if (_Option == 1) {
            this._Contenu = JSON.parse(JSON.stringify(this._Contenus[_Index]));
            this._Contenu.Etat = 1; //modification
        }
    }




    public _Contenus: Contenu[];
    public _NoResult: boolean;
    public _ContenusSearchParameters: ContenusSearchParameters;
    public GetContenus(_Id: number, _Titre: string, _EmplacementId: number, _ModeId: number, _DtMin: string, _DtMax: string, _EvenementId: number, _TypologieId: number) {

        var Valid = true;

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
        var _HeaderOptions = new Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

        this._HttpService.post(this._Url + 'API/Contenus/GetContenus', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                var _JsonResponse = data.json() as Contenu[];
                this._Contenus = _JsonResponse;
                if (this._Contenus.length == 0) { this._NoResult = true; }
                else { this._NoResult = false; }

            });


    }




    public _AddUpdReturn: number;
    public AddUpdContenu() {

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
            var _HeaderOptions = new Headers({
                'Content-Type': 'application/json',
                'APIKey': 'AEZRETRYTUYIUOIP'
            });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

            this._HttpService.post(this._Url + _Method, _Body, _RequestOptions)
                .subscribe(data => {
                    this._AddUpdReturn = data.json() as number;
                    if (data.ok) {
                        if (this._Contenu.Etat == 0) {
                            this._Contenus.push(this._Contenu);
                        }
                        else {
                            if ((this._Contenus.find(t => t.Id === this._Contenu.Id) != undefined) && (this._Contenus.find(t => t.Id === this._Contenu.Id) != null)) {
                                var _Index = this._Contenus.findIndex(t => t.Id === this._Contenu.Id);
                                this._Contenus[_Index] = JSON.parse(JSON.stringify(this._Contenu));
                            }
                        }
                        this.InitContenu(null, null);
                    }
                    else { alert('Une erreur est survenue !'); }
                });
        }
    }



    _DelReturn: number;
    public DelContenu(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer le contenu ' + this._Contenus[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

            this._HttpService.get(this._Url + 'API/Contenus/DelContenu?_Id=' + this._Contenus[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(data => {
                    this._DelReturn = data.json() as number;
                    this._Contenus.splice(_Index, 1);
                }
            );
        }

    }




}

