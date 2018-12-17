"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mode_1 = require("./../../Divers/Models/Mode");
var Evenement_1 = require("./../../Evenements/Models/Evenement");
var Contenu = /** @class */ (function () {
    function Contenu() {
        this.Id = null;
        this.Titre = null;
        this.Texte = null;
        this.DtCreation = null;
        this.DtModification = null;
        this.DtFin = null;
        this.Lien = null;
        this.Script = null;
        this.Logo = null;
        this.Horizontale = null;
        this.Carree = null;
        this.Verticale = null;
        this.Full = null;
        this.Publications = [];
        this.Mode = new Mode_1.Mode();
        this.Evenement = new Evenement_1.Evenement();
        this.Etat = null;
    }
    return Contenu;
}());
exports.Contenu = Contenu;
//# sourceMappingURL=Contenu.js.map