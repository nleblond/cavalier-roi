using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.IN
{
    public class ElevesSearchParameters
    {


        public Int32? Id { set; get; }
        public String Nom { set; get; }
        public String Prenom { set; get; }
        public String License { set; get; }
        public String Club { set; get; }
        public Int32? EvenementId { set; get; }
        public Int32? TypologieId { set; get; }

        public String Email { set; get; }

        public String Password { set; get; }

    }
}