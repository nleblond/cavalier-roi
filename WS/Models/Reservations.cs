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
        public Nullable<int> PlanningId { get; set; }
        public Nullable<int> EleveId { get; set; }
        public Nullable<int> EvenementId { get; set; }
        public string DeletedYN { get; set; }
    
        public virtual Eleve Eleves { get; set; }
        public virtual Evenements Evenements { get; set; }
        public virtual Plannings Plannings { get; set; }
    }
}
