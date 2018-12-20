import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


import { Evenement } from './../Evenements/Models/Evenement';

import { ElevesSearchParameters } from './Models/ElevesSearchParameters';
import { Eleve } from './Models/Eleve';

declare var jQuery: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})



export class AppComponent implements OnInit {

    public _WsUrl: string = '/API/';
    public _RootUrl: string = '/';


    constructor(private _HttpService: Http) { }

    public _TypologiesEvenements: Evenement[];
    public _Id: number = null;
    public _EvenementId: number = null;
    public _TypologieId: number = null;
    ngOnInit() {

        //initialisation des datetimepickers du filtre
        jQuery('.filtre input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });


        //gestion des paramètres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) { this._Id = parseInt(_UrlParams[i].replace('_Id=', '')); }
            if (_UrlParams[i].indexOf('_TypologieId=') > -1) { this._TypologieId = parseInt(_UrlParams[i].replace('_TypologieId=', '')); }
            if (_UrlParams[i].indexOf('_EvenementId=') > -1) { this._EvenementId = parseInt(_UrlParams[i].replace('_EvenementId=', '')); }
        }
        if ((this._Id != null) || (this._TypologieId != null) || (this._EvenementId != null)) { this.GetEleves(this._Id, null, null, null, null, null, this._EvenementId, this._TypologieId); }

        //récupération des typologies/evenements
        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetTypologiesEvenements', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._TypologiesEvenements = data.json() as Evenement[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            }
        );

    }

    public ChangeTypologieEvenement(_Event: any) {
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
    }


    public _Eleves: Eleve[];
    public _NoResult: boolean;
    public _ElevesSearchParameters: ElevesSearchParameters;
    public GetEleves(_Id: number, _Nom: string, _Prenom: string, _Email: string, _License: string, _Club: string, _EvenementId: number, _TypologieId: number) {

        this._ElevesSearchParameters = new ElevesSearchParameters();
        this._ElevesSearchParameters.Id = _Id;
        this._ElevesSearchParameters.Nom = _Nom;
        this._ElevesSearchParameters.Prenom = _Prenom;
        this._ElevesSearchParameters.Email = _Email;
        this._ElevesSearchParameters.License = _License;
        this._ElevesSearchParameters.Club = _Club;
        this._ElevesSearchParameters.EvenementId = _EvenementId;
        this._ElevesSearchParameters.TypologieId = _TypologieId;

        var _Body = JSON.stringify(this._ElevesSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._WsUrl + 'Eleves/GetEleves', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Eleves = data.json() as Eleve[];
                    if (this._Eleves.length == 0) { this._NoResult = true; }
                    else { this._NoResult = false; }
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            }
        );

        
    }




    public InitEleve(_Id: number) {
        window.open('/MonCompte?_Id=' + _Id, '_blank');
    }



    _DelReturn: number;
    public DelEleve(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer l\'eleve ' + this._Eleves[_Index].Nom + ' ' + this._Eleves[_Index].Prenom + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            var _Confirmation = 'L\'eleve ' + this._Eleves[_Index].Id + ' a bien ete supprime !';
            this._HttpService.get(this._WsUrl + 'Eleves/DelEleve?_Id=' + this._Eleves[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._DelReturn = data.json() as number;
                        this._Eleves.splice(_Index, 1);
                        if (this._Eleves.length == 0) { this._NoResult = true; }
                        else { this._NoResult = false; }
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                }
            );
        }

    }



}

