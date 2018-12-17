using System;
using System.Collections.Generic;


namespace WS.Models.OUT
{

    public partial class Ligne
    {
        public Int32? Id { get; set; }
        public Int32? ProduitId { get; set; }
        public Int32? CommandeId { get; set; }
        public Int32? Quantite { get; set; }
        public Int32? StatutId { get; set; }
        public Double? Prix { get; set; }
        public Double? Reduction { get; set; }
        public String DeletedYN { get; set; }

        public WS.Models.OUT.Produit Produit { get; set; }

    }
}
