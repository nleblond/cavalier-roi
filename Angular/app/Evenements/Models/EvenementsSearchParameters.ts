export class EvenementsSearchParameters {

    constructor() {
        this.Id = null;

        this.Libelle = null;

        this.DtMin = null;
        this.DtMax = null;

        this.EleveId = null;
        this.EvenementParentId = null;
        this.TypologieId = null;

    }

    public Id: number | null;

    public Libelle: string | null;

    public DtMin: string | null;
    public DtMax: string | null;

    public EleveId: number | null;
    public EvenementParentId: number | null;
    public TypologieId: number | null;


    public OnlyParentsYN: string | null;
}