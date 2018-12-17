import { Statut } from './Statut';
import { Produit } from '../../Produits/Models/Produit';
import { Commande } from '../../Commandes/Models/Commande';

export class Ligne {

    constructor() {

        this.Id = null;

        this.Prix = null;
        this.Reduction = null;
        this.Quantite = null;

        this.Commande = null;

        this.Statut = null;

        this.Produit = null;

    }

    public Id: number | null;

    public Prix: number | null;
    public Reduction: number | null;
    public Quantite: number | null;

    
    public Commande: Commande | null;

    public Statut: Statut | null;

    public Produit: Produit | null;

}