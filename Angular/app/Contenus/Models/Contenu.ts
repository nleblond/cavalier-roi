import { Publication } from './Publication';
import { Mode } from './../../Divers/Models/Mode';
import { Evenement } from './../../Evenements/Models/Evenement';


export class Contenu {

    constructor() {

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

        this.Mode = new Mode();

        this.Evenement = new Evenement();

        this.Etat = null;
    }

    public Id: number | null;
    public Titre: string | null;
    public Texte: string | null;

    public DtCreation: string | null;
    public DtModification: string | null;

    public DtDebut: string | null;
    public DtFin: string | null;

    public Exclusif: boolean | null;


    public Lien: string | null;
    public Script: string | null;

    public Logo: string | null;
    public Horizontale: string | null;
    public Carree: string | null;
    public Verticale: string | null
    public Full: string | null;


    public Publications: Publication[] | null;

    public Mode: Mode | null;

    public Evenement: Evenement | null;



    public Etat: number | null;


}