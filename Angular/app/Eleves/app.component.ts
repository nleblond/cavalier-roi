import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';



import { EleveResult } from './Models/EleveResult';
import { ElevesSearchParameters } from './Models/ElevesSearchParameters';
import { EvenementAndTypologie } from './Models/EvenementAndTypologie';



@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})



export class AppComponent implements OnInit {

    _EvenementsAndTypologies: EvenementAndTypologie[];
    _Eleves: EleveResult[];
    _DelReturn: Number;
    _ElevesSearchParameters: ElevesSearchParameters;

    constructor(private _HttpService: Http) { }

    ngOnInit() {

        var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

        this._HttpService.get('http://localhost:63122/API/Eleves/GetEvenementsAndTypologies', _RequestOptions)
            .subscribe(data => { this._EvenementsAndTypologies = data.json() as EvenementAndTypologie[]; }
        );

    }

    public _EvenementId: String = '';
    public _TypologieId: String = '';
    SelectEvenementTypologie(event: any) {
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
    }


    public _NoResult: Boolean;
    public GetEleves(_Id: Number, _Nom: String, _Prenom: String, _Email: String, _License: String, _Club: String, _EvenementId: Number, _TypologieId: Number) {

        var Valid = true;

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
        var _HeaderOptions = new Headers({
                                            'Content-Type': 'application/json',
                                            'APIKey': 'AEZRETRYTUYIUOIP'
        });
        var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });

        this._HttpService.post('http://localhost:63122/API/Eleves/GetEleves', _Body, _RequestOptions)
            .subscribe((data: Response) => {
                this._Eleves = data.json() as EleveResult[];
                alert(data.status + ' ' + data.statusText + ' ' + data.json().length);
                if (this._Eleves.length == 0) { this._NoResult = true; }
                else { this._NoResult = false; }
            }
        );

        
    }



    public DelEleve(_Id: Number) {

        if (confirm('Voulez-vous vraiment supprimer l\'eleve ' + _Id + ' ?')) {

            var _HeaderOptions = new Headers({ 'APIKey': 'AEZRETRYTUYIUOIP' });
            var _RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: _HeaderOptions });


            this._HttpService.get('http://localhost:63122/API/Eleves/DelEleve?Id=' + _Id, _RequestOptions)
                .subscribe(data => { this._DelReturn = data.json() as Number; }
            );
        }

    }

    public GetEleve(_Id: Number) {
        document.location.href = '/MonCompte?Id=' + _Id;
    }

}

