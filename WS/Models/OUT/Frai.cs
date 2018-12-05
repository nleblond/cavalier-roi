namespace WS.Models.OUT
{
    using System;
    using System.Collections.Generic;

    public partial class Frai
    {
        public Int32? Id { get; set; }
        public String Libelle { get; set; }
        public Double? Minimum { get; set; }
        public Double? Maximum { get; set; }
        public Double? Prix { get; set; }
    }
}
