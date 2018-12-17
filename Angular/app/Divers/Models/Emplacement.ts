import { Mode } from './Mode';

export class Emplacement {

    constructor() {

        this.Id = null;
        this.Libelle = null;
        this.Key = null;
        this.Visuel = null;

        this.Mode = new Mode();
    }

    public Id: number | null;
    public Libelle: string | null;
    public Key: string | null;
    public Visuel: string | null;
    public FormatedId: string | null;

    public Mode: Mode | null;


}
