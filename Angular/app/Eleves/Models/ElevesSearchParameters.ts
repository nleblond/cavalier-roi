export class ElevesSearchParameters {

    constructor() {

        this.Id = null;
        this.Nom = null;
        this.Prenom = null;

        this.Email = null;
        this.License = null;
        this.Club = null;

        this.EvenementId = null;
        this.TypologieId = null;

    }


    public Id: number | null;
    public Nom: string | null;
    public Prenom: string | null;
    public Email: string | null;
    public License: string | null;
    public Club: string | null;
    public EvenementId: number | null;
    public TypologieId: number | null;


}