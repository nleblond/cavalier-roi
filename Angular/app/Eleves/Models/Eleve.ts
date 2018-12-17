export class Eleve {

    constructor() {

        this.Id = null;
        this.Nom = null;
        this.Prenom = null;

        this.Email = null;
        this.License = null;
        this.Club = null;

        this.NbCommandes = null;
        this.NbStages = null;
        this.NbTournois = null;
        this.NbCours = null;

    }

    public Id: number | null;
    public Nom: string | null;
    public Prenom: string | null;
    public Email: string | null;
    public License: string | null;
    public Club: string | null;

    public NbCommandes: number | null;
    public NbStages: number | null;
    public NbTournois: number | null;
    public NbCours: number | null;

}