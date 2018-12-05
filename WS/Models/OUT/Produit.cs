namespace WS.Models.OUT
{
    using System;
    using System.Collections.Generic;

    public partial class Produit
    {
        public Int32? Id { get; set; }
        public String Reference { get; set; }
        public String Libelle { get; set; }
        public String Descriptif { get; set; }


        public Double? Prix { get; set; }
        public Int32? Stock { get; set; }

        public Double? Poids { get; set; }
        public Double? Hauteur { get; set; }
        public Double? Largeur { get; set; }
        public Double? Longueur { get; set; }


        public Boolean? Depassement { get; set; }

        public DateTime? DtDebut { get; set; }
        public DateTime? DtFin { get; set; }


        public String Image { get; set; }
        public String Logo { get; set; }
        public String Visuel { get; set; }


        public Categorie Categorie { get; set; }


        public Int32? NbCommandes { get; set; }
    }
}
