import { Eleve } from '../../Eleves/Models/Eleve';
import { Frai } from './Frai';
import { Statut } from './Statut';
import { Adresse } from './Adresse';
import { Ligne } from './Ligne';

export class Commande {

    public Id: Number;

    public DtCreation: Date;
    public DtModification: Date;
    public DtValidation: Date;

    public ReferenceTransaction: String;
    public ReferenceExterne: String;

    public Prix: Number;

    public Statut: Statut;
    public Eleve: Eleve;
    public Adresse: Adresse;
    public Frai: Frai;
    
    public Lignes: Ligne[];

}