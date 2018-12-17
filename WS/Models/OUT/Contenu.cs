using System;
using System.Collections.Generic;


namespace WS.Models.OUT
{


    public partial class Contenu
    {

        public Contenu()
        {
            this.Publications = new List<Publication>();
            this.Evenement = new Evenement();
            this.Mode = new Mode();
        }


        public Int32? Id { get; set; }

        public String Titre { get; set; }

        public String DtCreation { get; set; }
        public String DtModification { get; set; }


        public String DtDebut { get; set; }
        public String DtFin { get; set; }


        public String Texte { get; set; }

        public String Lien { get; set; }
        public String Script { get; set; }


        public String Logo { get; set; }
        public String Horizontale { get; set; }
        public String Carree { get; set; }
        public String Verticale { get; set; }
        public String Full { get; set; }


        public Boolean? Exclusif { get; set; }

        public List<Publication> Publications { get; set; }

        public Evenement Evenement { get; set; }

        public Mode Mode { get; set; }

    }
}
