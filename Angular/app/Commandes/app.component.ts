import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { CommandesSearchParameters } from './Models/CommandesSearchParameters';
import { CommandeUpdateParameters } from './Models/CommandeUpdateParameters';
import { Commande } from './Models/Commande';
import { Statut } from './Models/Statut';
import { Frai } from './Models/Frai';

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
       

    public _Statuts: Statut[];
    public _Id: number = null;
    public _ProduitId: number = null;
    public _EleveId: number = null;
    public _StatutId: number = null;
    ngOnInit() {

        //initialisation des datetimepickers du filtre
        jQuery('.filtre input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });


        //gestion des paramètres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) { this._Id = parseInt(_UrlParams[i].replace('_Id=', '')); }
            if (_UrlParams[i].indexOf('_ProduitId=') > -1) { this._ProduitId = parseInt(_UrlParams[i].replace('_ProduitId=', '')); }
            if (_UrlParams[i].indexOf('_EleveId=') > -1) { this._EleveId = parseInt(_UrlParams[i].replace('_EleveId=', '')); }
            if (_UrlParams[i].indexOf('_StatutId=') > -1) { this._StatutId = parseInt(_UrlParams[i].replace('_StatutId=', '')); }
        }
        if ((this._Id != null) || (this._ProduitId != null) || (this._EleveId != null)) { this.GetCommandes(this._Id, null, null, this._ProduitId, this._EleveId, null, null, this._StatutId); }

        //récupération des statuts
        var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetStatuts', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Statuts = data.json() as Statut[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });

    }


    public ChangeStatut(_Event: any, _Index: number) {
        if ((_Index != null) && (_Index != undefined)) {
            this._Commandes[_Index].Statut.Id = _Event.target.value;
            this._Commandes[_Index].Statut.Libelle = _Event.target[_Event.target.selectedIndex].text;
        }
        else {
            this._StatutId = _Event.target.value;
        }
    }


    //j'aurai pu utiliser un "ngModel"
    //----------------------------------------------
    public ChangeReferenceTransaction(_Event: any, _Index: number) {
        this._Commandes[_Index].ReferenceTransaction = _Event.target.value;
    }

    public ChangeReferenceExterne(_Event: any, _Index: number) {
        this._Commandes[_Index].ReferenceExterne = _Event.target.value;
    }
    //----------------------------------------------


    public _NoResult: boolean;
    public _CommandesSearchParameters: CommandesSearchParameters;
    public _Commandes: Commande[];
    public GetCommandes(_Id: number, _DtMin: string, _DtMax: string, _ProduitId: number, _EleveId: number, _ReferenceTransaction: string, _ReferenceExterne: string, _StatutId: number) {

        this._CommandesSearchParameters = new CommandesSearchParameters();
        this._CommandesSearchParameters.Id = _Id;
        this._CommandesSearchParameters.DtMin = _DtMin;
        this._CommandesSearchParameters.DtMax = _DtMax;
        this._CommandesSearchParameters.ProduitId = _ProduitId;
        this._CommandesSearchParameters.EleveId = _EleveId;
        this._CommandesSearchParameters.ReferenceTransaction = _ReferenceTransaction;
        this._CommandesSearchParameters.ReferenceExterne = _ReferenceExterne;
        this._CommandesSearchParameters.StatutId = _StatutId;

        var _Body = JSON.stringify(this._CommandesSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._WsUrl + 'Commandes/GetCommandes', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Commandes = data.json() as Commande[];
                    if (this._Commandes.length == 0) { this._NoResult = true; }
                    else { this._NoResult = false; }
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });

    }





    public _UpdReturn: number;
    public _CommandeUpdateParameters: CommandeUpdateParameters;
    public UpdCommande(_Index: number) {
        if (confirm('Voulez-vous vraiment modifier la commande ' + this._Commandes[_Index].Id + ' ?')) {

            this._CommandeUpdateParameters = new CommandeUpdateParameters();
            this._CommandeUpdateParameters.Id = this._Commandes[_Index].Id;
            this._CommandeUpdateParameters.StatutId = this._Commandes[_Index].Statut.Id;
            this._CommandeUpdateParameters.StatutLibelle = this._Commandes[_Index].Statut.Libelle;
            this._CommandeUpdateParameters.ReferenceTransaction = this._Commandes[_Index].ReferenceTransaction;
            this._CommandeUpdateParameters.ReferenceExterne = this._Commandes[_Index].ReferenceExterne;
            this._CommandeUpdateParameters.EleveId = this._Commandes[_Index].Eleve.Id;

            var _Body = JSON.stringify(this._CommandeUpdateParameters);
            var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
            var _Confirmation = 'La commande ' + this._Commandes[_Index].Id + ' a bien ete modifiee !';
            this._HttpService.post(this._WsUrl + 'Commandes/UpdCommande', _Body, _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._UpdReturn = data.json() as number;
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }
    }




    public _DelReturn: number;
    public DelCommande(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer la commande ' + this._Commandes[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
            var _Confirmation = 'La commande ' + this._Commandes[_Index].Id + ' a bien ete supprimee !';
            this._HttpService.get(this._WsUrl + 'Commandes/DelCommande?_Id=' + this._Commandes[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._DelReturn = data.json() as number;
                        this._Commandes.splice(_Index);
                        if (this._Commandes.length == 0) { this._NoResult = true; }
                        else { this._NoResult = false; }
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }

    }


}

