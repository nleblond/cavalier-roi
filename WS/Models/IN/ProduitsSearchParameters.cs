using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.IN
{
    public class ProduitsSearchParameters
    {

        public Int32? Id { set; get; }
        public String Reference { set; get; }
        public String Libelle{ set; get; }


        public Int32? StockMin { set; get; }
        public Int32? StockMax { set; get; }

        public Int32? CategorieId { set; get; }

        public Int32? CommandeId { set; get; }

    }

}