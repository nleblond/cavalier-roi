export class ProduitsSearchParameters {

    constructor() {
        this.Id = null;

        this.Libelle = null;
        this.Reference = null;

        this.CategorieId = null;

        this.StockMin = null;
        this.StockMax = null;

        this.CommandeId = null;

        this.NbCommandes = null;

    }

    public Id: number | null;

    public Libelle: string | null;
    public Reference: string | null;

    public CategorieId: number | null;

    public StockMin: number | null;
    public StockMax: number | null;

    public CommandeId: number | null;

    public NbCommandes: number | null;


}