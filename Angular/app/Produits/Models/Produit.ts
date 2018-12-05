import { Categorie } from './Categorie';

export class Produit {

    constructor() { }

    public Id: Number;
    public Reference: String;

    public Libelle: String;
    public Descriptif: String;


    public Poids: Number;
    public Hauteur: Number;
    public Largeur: Number;
    public Longueur: Number;

    public Depassement: Boolean;

    public DtDebut: String;
    public DtFin: String;

    public Image: String;
    public Logo: String;
    public Visuel: String;


    public Categorie: Categorie;

    public Prix: Number;
    public Stock: Number;

    public NbCommandes: Number;

}