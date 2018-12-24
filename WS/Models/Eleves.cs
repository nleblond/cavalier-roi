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
    
    public partial class Eleves
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Eleves()
        {
            this.Reservations = new HashSet<Reservations>();
            this.Commandes = new HashSet<Commandes>();
            this.Participations = new HashSet<Participations>();
        }
    
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public Nullable<System.DateTime> DtNaissance { get; set; }
        public string Sexe { get; set; }
        public string Club { get; set; }
        public string Photo { get; set; }
        public string Password { get; set; }
        public string Fixe { get; set; }
        public string Portable { get; set; }
        public string Commentaire { get; set; }
        public string License { get; set; }
        public string Classement { get; set; }
        public string DeletedYN { get; set; }
        public string Suivi { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Reservations> Reservations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Commandes> Commandes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Participations> Participations { get; set; }
    }
}
