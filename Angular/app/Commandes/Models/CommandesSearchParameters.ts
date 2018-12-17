export class CommandesSearchParameters {


    constructor() {

        this.Id = null;

        this.DtMin = null;
        this.DtMax = null;

        this.ProduitId = null;
        this.ProduitReference = null;

        this.EleveId = null;

        this.ReferenceTransaction = null;
        this.ReferenceExterne = null;

        this.StatutId = null;

    }

    public Id: number | null;

    public DtMin: string | null;
    public DtMax: string | null;

    public ProduitId: number | null;
    public ProduitReference: string | null;

    public EleveId: number | null;

    public ReferenceTransaction: string | null;
    public ReferenceExterne: string | null;

    public StatutId: number | null;


}