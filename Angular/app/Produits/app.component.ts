import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Categorie } from './../Divers/Models/Categorie';

import { ProduitsSearchParameters } from './Models/ProduitsSearchParameters';
import { Produit } from './Models/Produit';

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

    public _Categories: Categorie[];
    public _Id: number = null;
    public _CommandeId: number = null;
    public _CategorieId: number = null;
    ngOnInit() {

        //initialisation des datetimepickers du filtre
        jQuery('.filtre input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });

        //gestion des paramètres dans l'url
        var _UrlParams = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < _UrlParams.length; i++) {
            if (_UrlParams[i].indexOf('_Id=') > -1) { this._Id = parseInt(_UrlParams[i].replace('_Id=', '')); }
            if (_UrlParams[i].indexOf('_CommandeId=') > -1) { this._CommandeId = parseInt(_UrlParams[i].replace('_CommandeId=', '')); }
            if (_UrlParams[i].indexOf('_CategorieId=') > -1) { this._CategorieId = parseInt(_UrlParams[i].replace('_CategorieId=', '')); }
        }
        if ((this._Id != null) || (this._CategorieId != null) || (this._CommandeId != null)) { this.GetProduits(this._Id, null, null, this._CategorieId, null, null, this._CommandeId); }

        //récupération des catégories
        var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
        this._HttpService.get(this._WsUrl + 'Divers/GetCategories', _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Categories = data.json() as Categorie[];
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });

    }

    public ChangeCategorie(_Event: any, _Option: number) {
        var _SelectedId = _Event.target.value;
        var _SelectedIndex = _Event.target.options.selectedIndex;
        var _SelectedLibelle = _Event.target.options[_SelectedIndex].innerText;
        if (_Option == 0) { //filtre
            this._CategorieId = _SelectedId;
        }
        else { //détails
            this._Produit.Categorie.Id = (_SelectedId == '-1' ? null : parseInt(_SelectedId));
            this._Produit.Categorie.Libelle = _SelectedLibelle.trim();
        }
    }




    public _InitReturn: number;
    public _Produit: Produit;
    public InitProduit(_Option: number, _Index: number) {
        try {
            this._Produit.Id = null;
            this._Produit.Reference = null;
            this._Produit.Libelle = null;

            this._Produit.Categorie = new Categorie();
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
            this._Produit.Etat = null;
        } catch { };

        if (_Option == 0) {
            var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            this._HttpService.get(this._WsUrl + 'Divers/GetId?_Table=Produits', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        this._InitReturn = data.json() as number;
                        this._Produit = new Produit();
                        this._Produit.Id = this._InitReturn;
                        this._Produit.Etat = 0; //creation
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }
        else if (_Option == 1) {
            this._Produit = JSON.parse(JSON.stringify(this._Produits[_Index]));
            this._Produit.Etat = 1; //modification
        }

        //initialisation des datetimepickers des détails
        //setTimeout(function () {
        //    jQuery('.details input[type="datetime"]').datetimepicker({ 'showSecond': true, 'timeFormat': 'HH:mm:ss' }).on('dblclick', function () { jQuery(this).val(''); });
        //}, 1000);
    }




    public _NoResult: boolean;
    public _ProduitsSearchParameters: ProduitsSearchParameters;
    public _Produits: Produit[];
    public GetProduits(_Id: number, _Reference: string, _Libelle: string, _CategorieId: number, _StockMin: number, _StockMax: number, _CommandeId: number) {

        this._ProduitsSearchParameters = new ProduitsSearchParameters();
        this._ProduitsSearchParameters.Id = _Id;
        this._ProduitsSearchParameters.Reference = _Reference;
        this._ProduitsSearchParameters.Libelle = _Libelle;
        this._ProduitsSearchParameters.CategorieId = _CategorieId;
        this._ProduitsSearchParameters.StockMin = _StockMin;
        this._ProduitsSearchParameters.StockMax = _StockMax;
        this._ProduitsSearchParameters.CommandeId = _CommandeId;

        var _Body = JSON.stringify(this._ProduitsSearchParameters);
        var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
        this._HttpService.post(this._WsUrl + 'Produits/GetProduits', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                if (data.ok) {
                    this._Produits = data.json() as Produit[];
                    if (this._Produits.length == 0) { this._NoResult = true; }
                    else { this._NoResult = false; }
                }
                else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
            });
    }




    public _AddUpdReturn: number;
    public AddUpdProduit() {

        var _Question = '';
        var _Confirmation = '';
        var _Method = '';
        if (this._Produit.Etat == 0) {
            _Method = 'Produits/AddProduit';
            _Question = 'Voulez-vous vraiment ajouter le produit ' + this._Produit.Id + ' ? '
            _Confirmation = 'Le produit ' + this._Produit.Id + ' a bien ete ajoute !';
        }
        else {
            _Method = 'Produits/UpdProduit';
            _Question = 'Voulez-vous vraiment modifier le produit ' + this._Produit.Id + ' ? '
            _Confirmation = 'Le produit ' + this._Produit.Id + ' a bien ete modifie !';
        }

        if (confirm(_Question)) {

            var _Body = JSON.stringify(this._Produit);
            var _HeaderOptions = new Headers({ 'Content-Type': 'application/json', 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });
            this._HttpService.post(this._WsUrl + _Method, _Body, _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._AddUpdReturn = data.json() as number;
                        if (this._Produit.Etat == 0) {
                            if ((this._Produits == null) || (this._Produits == undefined) || (this._Produits.length == 0)) {
                                this._Produits = [];
                            }
                            var _NouveauProduit = JSON.parse(JSON.stringify(this._Produit));
                            this._Produits.push(_NouveauProduit);
                            if (this._Produits.length == 0) { this._NoResult = true; }
                            else { this._NoResult = false; }
                        }
                        else {
                            if ((this._Produits.find(t => t.Id === this._Produit.Id) != undefined) && (this._Produits.find(t => t.Id === this._Produit.Id) != null)) {
                                var _Index = this._Produits.findIndex(t => t.Id === this._Produit.Id);
                                this._Produits[_Index] = JSON.parse(JSON.stringify(this._Produit));
                            }
                        }
                        this.InitProduit(null, null);
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });
        }
    }







    public _DelReturn: number;
    public DelProduit(_Index: number) {

        if (confirm('Voulez-vous vraiment supprimer le produit ' + this._Produits[_Index].Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': this._APIKey });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: _HeaderOptions });
            var _Confirmation = 'Le produit ' + this._Produits[_Index].Id + ' a bien ete supprime !';
            this._HttpService.get(this._WsUrl + 'Produits/DelProduit?_Id=' + this._Produits[_Index].Id.toString() + '&_Real=Y', _RequestOptions)
                .subscribe((data: Response) => {
                    if (data.ok) {
                        alert(_Confirmation);
                        this._DelReturn = data.json() as number;
                        this._Produits.splice(_Index, 1);
                        if (this._Produits.length == 0) { this._NoResult = true; }
                        else { this._NoResult = false; }
                    }
                    else { alert('Une erreur est survenue : ' + data.statusText + ' !'); }
                });

        }

    }


}

