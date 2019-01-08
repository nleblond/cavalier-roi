import { Typologie } from './../../Divers/Models/Typologie';
import { Planning } from './Planning';
import { Reservation } from './Reservation';

export class Evenement {

    constructor() {

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

        this.Typologie = new Typologie();

        this.EvenementParent = null;

        this.Plannings = null;

        this.Reservations = null;




        this.VisibledYN = null;

        this.Etat = null;

    }


    public Id: number | null;
    public FormatedId: string | null;

    public Libelle: string | null;
    public Descriptif: string | null;
    
    public DtDebut: string | null;
    public DtFin: string | null;

    public DtLimiteInscription: string | null;
    public Minimum: number | null;
    public Maximum: number | null;
    public Compte: number | null;

    public Prix: number | null;
    public Duree: number | null;

    public Logo: string | null;
    public Photo: string | null;
    public Bandeau: string | null;
    public Lien: string | null;




    public Typologie: Typologie | null;

    public EvenementParent: Evenement | null;

    public Plannings: Planning[];

    public Reservations: Reservation[];




    public VisibledYN: string | null;

    public Etat: number | null;


}