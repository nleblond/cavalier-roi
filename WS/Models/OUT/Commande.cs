using System;
using System.Collections.Generic;



namespace WS.Models.OUT
{

    public partial class Commande
    {
        public Commande()
        {
            this.Lignes = new List<Ligne>();
        }

        public Int32? Id { get; set; }

        public String DtCreation { get; set; }
        public String DtModification { get; set; }
        public String DtValidation { get; set; }


        public String DeletedYN { get; set; }




        public Double? Prix { get; set; }


        public String ReferenceTransaction { get; set; }
        public String ReferenceExterne { get; set; }
        


        //public Nullable<int> FraiId { get; set; }
        public Frai Frai { get; set; }


        //public Int32? StatutId { get; set; }
        public Statut Statut { get; set; }


        public List<Ligne> Lignes { get; set; }


        //public Int32? EleveId { get; set; }
        public Eleve Eleve { get; set; }



        //public Int32? AdresseId { get; set; }

        public Adresse Adresse { get; set; }
    }
}
