export class Adresse {

    constructor() {

        this.Id = null;
        this.Destinataire = null;

        this.Ligne1 = null;
        this.Ligne2 = null;

        this.CodePostal= null;
        this.Ville = null;
        this.Pays = null;

        this.Email = null;
        this.Telephone = null;
        
    }

    public Id: number | null;
    public Destinataire: string | null;

    public Ligne1: string | null;
    public Ligne2: string | null;

    public CodePostal: number | null;
    public Ville: string | null;
    public Pays: string | null;

    public Email: string | null;
    public Telephone: string | null;
}