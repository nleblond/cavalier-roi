import { Eleve } from './../../Eleves/Models/Eleve';
import { Evenement } from './../../Evenements/Models/Evenement';


export class Reservation {

    constructor() {
        this.Id = null;

        this.Jour = null;

        this.Eleve = new Eleve();
        this.Evenement = new Evenement();

        this.PaymentId = null;
    }


    public Id: number | null;

    public Jour: string | null;

    public Creneau: string | null;


    public Eleve: Eleve | null;

    public Evenement: Evenement | null;


    public PaymentId: string | null;


}