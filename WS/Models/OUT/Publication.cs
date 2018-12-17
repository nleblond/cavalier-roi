using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.OUT
{
    public class Publication
    {

        public Publication()
        {
            this.Emplacement = new Emplacement();
            this.Contenu = new Contenu();
        }

        public Int32? Id { get; set; }


        public Contenu Contenu { get; set; }

        public Emplacement Emplacement { get; set; }



    }
}