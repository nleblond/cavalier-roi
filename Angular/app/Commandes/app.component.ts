import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { CommandesSearchParameters } from './Models/CommandesSearchParameters';
import { CommandeUpdateParameters } from './Models/CommandeUpdateParameters';
import { Commande } from './Models/Commande';
import { Statut } from './Models/Statut';
import { Frai } from './Models/Frai';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {


    constructor(private _HttpService: Http) { }
       

    public _Statuts: Statut[];
    ngOnInit() {

        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

        this._HttpService.get('http://localhost:63122/API/Commandes/GetStatuts', _RequestOptions)
            .subscribe(data => {
                this._Statuts = data.json() as Statut[];
            });

    }



    public _StatutId: String = '';
    ChangeStatut(_Event: any, _Index: number) {
        if ((_Index != null) && (_Index != undefined)) {
            this._Commandes[_Index].Statut.Id = _Event.target.value;
        }
        else {
            this._StatutId = _Event.target.value;
        }
    }

    ChangeReferenceTransaction(_Event: any, _Index: number) {
        this._Commandes[_Index].ReferenceTransaction = _Event.target.value;
    }

    ChangeReferenceExterne(_Event: any, _Index: number) {
        this._Commandes[_Index].ReferenceExterne = _Event.target.value;
    }



    public _NoResult: Boolean;
    public _CommandesSearchParameters: CommandesSearchParameters;
    public _Commandes: Commande[];
    public GetCommandes(_Id: Number, _DtMin: String, _DtMax: String, _ProduitId: Number, _EleveId: Number, _ReferenceTransaction: String, _ReferenceExterne: String, _StatutId: Number) {

        var Valid = true;

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
        var _HeaderOptions = new Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

        this._HttpService.post('http://localhost:63122/API/Commandes/GetCommandes', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                this._Commandes = data.json() as Commande[];
                if (this._Commandes.length == 0) { this._NoResult = true; }
                else { this._NoResult = false; }
            });


    }




    public _DelReturn: Number;
    public DelCommande(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer la commande ' + this._Commandes[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

            this._HttpService.get('http://localhost:63122/API/Commandes/DelCommande?_Id=' + this._Commandes[_Index].Id.toString() + '&_Real=N', _RequestOptions)
                .subscribe(data => {
                    this._DelReturn = data.json() as Number;
                    this._Commandes.splice(_Index);
                });
        }

    }



    public _UpdReturn: Number;
    public _CommandeUpdateParameters: CommandeUpdateParameters;
    public UpdCommande(_Index: number) {
        if (confirm('Voulez-vous vraiment modifier la commande ' + this._Commandes[_Index].Id + ' ?')) {

            this._CommandeUpdateParameters = new CommandeUpdateParameters();
            this._CommandeUpdateParameters.Id = this._Commandes[_Index].Id;
            this._CommandeUpdateParameters.StatutId = this._Commandes[_Index].Statut.Id;
            this._CommandeUpdateParameters.ReferenceTransaction = this._Commandes[_Index].ReferenceTransaction;
            this._CommandeUpdateParameters.ReferenceExterne = this._Commandes[_Index].ReferenceExterne;

            var _Body = JSON.stringify(this._CommandeUpdateParameters);
            var _HeaderOptions = new Headers({
                'Content-Type': 'application/json',
                'APIKey': 'AEZRETRYTUYIUOIP'
            });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });


            this._HttpService.post('http://localhost:63122/API/Commandes/UpdCommande', _Body, _RequestOptions)
                .subscribe(data => {
                    this._UpdReturn = data.json() as Number;
                });
        }
    }



}

