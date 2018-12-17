using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WS.Models.OUT
{

    public class Reservation
    {


        public Reservation()
        {
            this.Eleve = null;
            this.Evenement = null;
        }


        public Int32? Id { get; set; }

        public String Jour { get; set; }

        public String Creneau { get; set; }

        public Eleve Eleve { get; set; }

        public Evenement Evenement { get; set; }

        
    }
}
