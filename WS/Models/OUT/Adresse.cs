using System;
using System.Collections.Generic;


namespace WS.Models.OUT
{
    public partial class Adresse
    {
        public Int32? Id { get; set; }
        public String Destinataire { get; set; }
        public String Ligne1 { get; set; }
        public String Ligne2 { get; set; }
        public String CodePostal { get; set; }
        public String Ville { get; set; }
        public String Pays { get; set; }
        public String Telephone { get; set; }
        public String Email { get; set; }
    }
}
