using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.IN
{
    public class EvenementsSearchParameters
    {

        public Int32? Id { set; get; }
        public String Libelle { set; get; }


        public String DtMin { set; get; }
        public String DtMax { set; get; }


        public Int32? EvenementParentId { set; get; }

        public Int32? TypologieId { set; get; }

        public Int32? EleveId { set; get; }


        public String OnlyParentsYN { set; get; }

    }

}