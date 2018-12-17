export class ContenusSearchParameters {

    constructor() {
        this.Id = null;

        this.Titre = null;

        this.DtMin = null;
        this.DtMax = null;

        this.EmplacementId = null;
        this.ModeId = null;

        this.EvenementId = null;
        this.TypologieId = null;

    }

    public Id: number | null;

    public Titre: string | null;

    public DtMin: string | null;
    public DtMax: string | null;

    public EmplacementId: number | null;
    public ModeId: number | null;

    public EvenementId: number | null;
    public TypologieId: number | null;


}