using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WS.Models.OUT
{

    public class PlanningOnly
    {


        public PlanningOnly()
        {
            this.EvenementId = null;
            this.Jour = null;
            this.Creneau = null;
        }

        public Int32? EvenementId { get; set; }

        public String Jour { get; set; }

        public String Creneau { get; set; }

    }
}
