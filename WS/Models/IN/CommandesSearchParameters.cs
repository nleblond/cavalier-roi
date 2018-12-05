using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.IN
{
    public class CommandesSearchParameters
    {

        public Int32? Id { set; get; }
        public String DtMin { set; get; }
        public String DtMax { set; get; }
        public Int32? ProduitId { set; get; }
        public String ProduitReference { set; get; }
        public Int32? EleveId { set; get; }
        public String ReferenceTransaction { set; get; }
        public String ReferenceExterne { set; get; }
        public Int32? StatutId { set; get; }

    }

}