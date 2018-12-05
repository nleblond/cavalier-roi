import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { ProduitsSearchParameters } from './Models/ProduitsSearchParameters';
import { Categorie } from './Models/Categorie';
import { Produit } from './Models/Produit';



@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {


    constructor(private _HttpService: Http) { }
       

    public _Categories: Categorie[];
    ngOnInit() {

        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

        this._HttpService.get('http://localhost:63122/API/Produits/GetCategories', _RequestOptions)
            .subscribe(data => {
                this._Categories = data.json() as Categorie[];
            });

    }

    _CategorieId: String = '';
    ChangeCategorie(_Event: any, _Option: Number) {
        if (_Option == 0) { this._CategorieId = _Event.target.value; }
        else { this._Produit.Categorie.Id = _Event.target.value; }
    }


    public _NoResult: Boolean;
    public _ProduitsSearchParameters: ProduitsSearchParameters;
    public _Produits : Produit[];
    public GetProduits(_Id: Number, _Reference: String, _Libelle: String, _CategorieId: Number, _StockMin: Number, _StockMax: Number, _CommandeId: Number) {

        var Valid = true;

        this._ProduitsSearchParameters = new ProduitsSearchParameters();
        this._ProduitsSearchParameters.Id = _Id;
        this._ProduitsSearchParameters.Reference = _Reference;
        this._ProduitsSearchParameters.Libelle = _Libelle;
        this._ProduitsSearchParameters.CategorieId = _CategorieId;
        this._ProduitsSearchParameters.StockMin = _StockMin;
        this._ProduitsSearchParameters.StockMax = _StockMax;
        this._ProduitsSearchParameters.CommandeId = _CommandeId;


        var _Body = JSON.stringify(this._ProduitsSearchParameters);
        var _HeaderOptions = new Headers({
            'Content-Type': 'application/json',
            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

        this._HttpService.post('http://localhost:63122/API/Produits/GetProduits', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                var _JsonResponse = data.json() as Produit[];
                this._Produits = _JsonResponse;
            });
    }



    public _Produit: Produit = new Produit();
    public GetProduit(_Index: number) {
        this._Produit = JSON.parse(JSON.stringify(this._Produits[_Index]));
    }




    public _InitReturn: Number;
    public InitProduit(_Option: Number) {
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

        } catch { };
        if (_Option == 0) {
            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

            this._HttpService.get('http://localhost:63122/API/Divers/GetId?_Table=Produits', _RequestOptions)
                .subscribe(data => {
                    this._InitReturn = data.json() as Number;
                    this._Produit.Id = this._InitReturn;
                });
        }
    }


    public _DelReturn: Number;
    public DelProduit(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer le produit ' + this._Produits[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });

            this._HttpService.get('http://localhost:63122/API/Produits/DelProduit?_Id=' + this._Produits[_Index].Id.toString() + '&_Real=Y', _RequestOptions)
                .subscribe(data => {
                    this._DelReturn = data.json() as Number;
                    this._Produits.splice(_Index, 1);
                });
        }

    }



    //public _UpdReturn: Number;
    //public _CommandeUpdateParameters: CommandeUpdateParameters;
    //public UpdCommande(_Index: number) {
    //    if (confirm('Voulez-vous vraiment modifier la commande ' + this._Commandes[_Index].Id + ' ?')) {

    //        this._CommandeUpdateParameters = new CommandeUpdateParameters();
    //        this._CommandeUpdateParameters.Id = this._Commandes[_Index].Id;
    //        this._CommandeUpdateParameters.StatutId = this._Commandes[_Index].StatutId;
    //        this._CommandeUpdateParameters.ReferenceTransaction = this._Commandes[_Index].ReferenceTransaction;
    //        this._CommandeUpdateParameters.ReferenceExterne = this._Commandes[_Index].ReferenceExterne;

    //        var _Body = JSON.stringify(this._CommandeUpdateParameters);
    //        var _HeaderOptions = new Headers({
    //            'Content-Type': 'application/json',
    //            'APIKey': 'AEZRETRYTUYIUOIP'
    //        });
    //        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });


    //        this._HttpService.post('http://localhost:63122/API/Commandes/UpdCommande', _Body, _RequestOptions)
    //            .subscribe(data => {
    //                this._UpdReturn = data.json() as Number;
    //            });
    //    }
    //}



}

