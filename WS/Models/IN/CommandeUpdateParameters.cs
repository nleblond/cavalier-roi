using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WS.Models.IN
{

    public class CommandeUpdateParameters
    {

        public Int32? Id { set; get; }

        public String ReferenceTransaction { set; get; }

        public String ReferenceExterne { set; get; }

        public Int32? StatutId { set; get; }

        public String StatutLibelle { set; get; }

        public Int32? EleveId { set; get; }

        public String TrackingNumber { set; get; }

    }

}