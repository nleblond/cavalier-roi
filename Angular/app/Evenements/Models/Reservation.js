"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eleve_1 = require("./../../Eleves/Models/Eleve");
var Evenement_1 = require("./../../Evenements/Models/Evenement");
var Reservation = /** @class */ (function () {
    function Reservation() {
        this.Id = null;
        this.Jour = null;
        this.Eleve = new Eleve_1.Eleve();
        this.Evenement = new Evenement_1.Evenement();
        this.PaymentId = null;
    }
    return Reservation;
}());
exports.Reservation = Reservation;
//# sourceMappingURL=Reservation.js.map