import { Statut } from './Statut';
import { Produit} from '../../Produits/Models/Produit';

export class Ligne {

    public Id: Number;

    public Prix: Number;
    public Reduction: Number;
    public Quantite: Number;

    
    public CommandeId: Number;

    public StatutId: Number;
    public Statut: Statut;

    public Produit: Produit;

}