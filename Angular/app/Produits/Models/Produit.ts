import { Categorie } from './../../Divers/Models/Categorie';

export class Produit {

    constructor() {

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

        this.Categorie = new Categorie();

        this.Etat = null;
    }

    public Id: number |  null;
    public Reference: string | null;

    public Libelle: string | null;
    public Descriptif: string | null;


    public Poids: number | null;
    public Hauteur: number | null;
    public Largeur: number | null;
    public Longueur: number | null;

    public Depassement: boolean | null;

    public DtDebut: string | null;
    public DtFin: string | null;

    public Image: string | null;
    public Logo: string | null;
    public Visuel: string | null;


    public Prix: number | null;
    public Stock: number | null;

    public NbCommandes?: number | null;


    public Categorie: Categorie | null;


    public Etat: number | null; //0 = création, 1 = modification

}