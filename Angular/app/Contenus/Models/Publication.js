"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Emplacement_1 = require("./../../Divers/Models/Emplacement");
var Contenu_1 = require("./Contenu");
var Publication = /** @class */ (function () {
    function Publication() {
        this.Id = null;
        this.Contenu = new Contenu_1.Contenu();
        this.Emplacement = new Emplacement_1.Emplacement();
    }
    return Publication;
}());
exports.Publication = Publication;
//# sourceMappingURL=Publication.js.map