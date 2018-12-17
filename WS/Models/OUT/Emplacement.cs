using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.OUT
{
    public class Emplacement
    {


        public Emplacement()
        {
        }

        public Int32? Id { get; set; }

        public String Libelle { get; set; }

        public String Visuel { get; set; }

        public String Key { get; set; }

        public String FormatedId { get; set; }

        public Mode Mode { get; set; }


    }
}

