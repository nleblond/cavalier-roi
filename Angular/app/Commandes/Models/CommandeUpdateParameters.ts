export class CommandeUpdateParameters {


    constructor() {

        this.Id = null;

        this.StatutId = null;
        this.StatutLibelle = null;

        this.ReferenceTransaction = null;
        this.ReferenceExterne = null;

    }


    public Id: number | null;

    public StatutId: number | null;
    public StatutLibelle: string | null;

    public ReferenceTransaction: string | null;
    public ReferenceExterne: string | null;

    public EleveId: number | null;

}