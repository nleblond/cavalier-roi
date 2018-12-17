using System;
using System.Collections.Generic;



namespace WS.Models.OUT
{
   public partial class Eleve
    {
        public Eleve()
        {
            this.Participations = new List<Participations>();
            this.Reservations = new List<Reservations>();
            this.Commandes = new List<Commande>();
        }

        public Int32 Id { get; set; }
        public String Nom { get; set; }
        public String Prenom { get; set; }
        public String Email { get; set; }
        public DateTime? DtNaissance { get; set; }
        public String Sexe { get; set; }
        public String Club { get; set; }
        public String Photo { get; set; }
        public String Password { get; set; }
        public String Fixe { get; set; }
        public String Portable { get; set; }
        public String Commentaire { get; set; }
        public String License { get; set; }
        public String Classement { get; set; }


        public String DeletedYN { get; set; }


        public List<Participations> Participations { get; set; }

        public List<Reservations> Reservations { get; set; }

        public List<Commande> Commandes { get; set; }




        public Int32? NbCommandes { get; set; }
        public Int32? NbStages { get; set; }
        public Int32? NbCours { get; set; }
        public Int32? NbTournois { get; set; }
    }
}
