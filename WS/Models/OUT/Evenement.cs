using System;
using System.Collections.Generic;

namespace WS.Models.OUT
{

    public partial class Evenement
    {
        
        public Evenement()
        {
            this.Typologie = new Typologie();
            this.EvenementParent = null;
            this.Plannings = null;
            this.Reservations = null;
        }

        public Int32? Id { get; set; }
        
        public String FormatedId { set; get; }

        public String Libelle { get; set; }

        public String Descriptif { get; set; }



        public String DtDebut { set; get; }
        public String DtFin { set; get; }


        public String DtLimiteInscription { set; get; }
        public Int32? Minimum { set; get; }
        public Int32? Maximum { set; get; }
        public Int32? Compte { set; get; }


        public Double? Prix { set; get; }
        public Double? Duree { set; get; }



        public String Logo { set; get; }
        public String Photo { set; get; }
        public String Bandeau { set; get; }
        public String Lien { set; get; }


        public Typologie Typologie { get; set; }

        public Evenement EvenementParent { get; set; }


        public List<Planning> Plannings { set; get; }

        public List<Reservation> Reservations { set; get; }




        public String VisibledYN { set; get; }


    }
}

