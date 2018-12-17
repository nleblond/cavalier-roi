import { Emplacement } from './../../Divers/Models/Emplacement';
import { Contenu } from './Contenu';

export class Publication {


    constructor() {

        this.Id = null;
        this.Contenu = new Contenu();
        this.Emplacement = new Emplacement();
    }

    public Id: number | null;
    
    public Emplacement: Emplacement | null;
    
    public Contenu: Contenu | null;
    
}