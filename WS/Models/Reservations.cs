//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Reservations
    {
        public int Id { get; set; }
        public Nullable<int> EleveId { get; set; }
        public Nullable<int> EvenementId { get; set; }
        public string DeletedYN { get; set; }
        public Nullable<System.DateTime> Jour { get; set; }
        public string Creneau { get; set; }
    
        public virtual Eleves Eleve { get; set; }
        public virtual Evenements Evenement { get; set; }
    }
}
