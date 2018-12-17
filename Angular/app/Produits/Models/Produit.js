"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Categorie_1 = require("./../../Divers/Models/Categorie");
var Produit = /** @class */ (function () {
    function Produit() {
        this.Id = null;
        this.Reference = null;
        this.Libelle = null;
        this.Descriptif = null;
        this.Poids = null;
        this.Hauteur = null;
        this.Largeur = null;
        this.Longueur = null;
        this.Depassement = false;
        this.DtDebut = null;
        this.DtFin = null;
        this.Image = null;
        this.Logo = null;
        this.Visuel = null;
        this.Prix = null;
        this.Stock = null;
        this.NbCommandes = null;
        this.Categorie = new Categorie_1.Categorie();
        this.Etat = null;
    }
    return Produit;
}());
exports.Produit = Produit;
//# sourceMappingURL=Produit.js.map