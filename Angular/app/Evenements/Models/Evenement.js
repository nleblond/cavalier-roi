"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Typologie_1 = require("./../../Divers/Models/Typologie");
var Evenement = /** @class */ (function () {
    function Evenement() {
        this.Id = null;
        this.FormatedId = null;
        this.Libelle = null;
        this.Descriptif = null;
        this.DtDebut = null;
        this.DtFin = null;
        this.DtLimiteInscription = null;
        this.Minimum = null;
        this.Maximum = null;
        this.Compte = null;
        this.Prix = null;
        this.Duree = null;
        this.Logo = null;
        this.Photo = null;
        this.Bandeau = null;
        this.Lien = null;
        this.Typologie = new Typologie_1.Typologie();
        this.EvenementParent = null;
        this.Plannings = null;
        this.Reservations = null;
        this.VisibledYN = null;
        this.Etat = null;
    }
    return Evenement;
}());
exports.Evenement = Evenement;
//# sourceMappingURL=Evenement.js.map