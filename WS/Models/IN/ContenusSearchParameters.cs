using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.IN
{
    public class ContenusSearchParameters
    {

        public Int32? Id { set; get; }
        public String Titre { set; get; }


        public String DtMin { set; get; }
        public String DtMax { set; get; }


        public Int32? EmplacementId { set; get; }
        public Int32? ModeId { set; get; }

        public Int32? EvenementId { set; get; }
        public Int32? TypologieId { set; get; }

    }

}