using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WS.Models.OUT
{

    public class Participation
    {


        public Participation()
        {
            this.Eleve = null;
            this.Evenement = null;
        }


        public Int32? Id { get; set; }

        public Double? Quantite { set; get; }

        public Eleve Eleve { get; set; }

        public Evenement Evenement { get; set; }

        public String PaymentId { get; set; }

    }
}
