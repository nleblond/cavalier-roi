import { Eleve } from '../../Eleves/Models/Eleve';
import { Frai } from './Frai';
import { Statut } from './Statut';
import { Adresse } from './Adresse';
import { Ligne } from './Ligne';

export class Commande {

    constructor() {

        this.Id = null;

        this.DtCreation = null;
        this.DtModification = null;
        this.DtValidation = null;

        this.ReferenceTransaction = null;
        this.ReferenceExterne = null;

        this.Prix = null;

        this.Statut = null;
        this.Eleve = null;
        this.Adresse = null;
        this.Frai = null;

        this.Lignes = null;

    }

    public Id: number | null;

    public DtCreation: string | null;
    public DtModification: string | null;
    public DtValidation: string | null;

    public ReferenceTransaction: string | null;
    public ReferenceExterne: string | null;

    public Prix: number | null;

    public Statut: Statut | null;
    public Eleve: Eleve | null;
    public Adresse: Adresse | null;
    public Frai: Frai | null;
    
    public Lignes: Ligne[] | null;

}