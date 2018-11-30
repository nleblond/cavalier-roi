﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class DBModelsParameters : DbContext
    {
        public DBModelsParameters()
            : base("name=DBModelsParameters")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Commandes> Commandes { get; set; }
        public virtual DbSet<Contenus> Contenus { get; set; }
        public virtual DbSet<Eleves> Eleves { get; set; }
        public virtual DbSet<Emplacements> Emplacements { get; set; }
        public virtual DbSet<Evenements> Evenements { get; set; }
        public virtual DbSet<Frais> Frais { get; set; }
        public virtual DbSet<Lignes> Lignes { get; set; }
        public virtual DbSet<Participations> Participations { get; set; }
        public virtual DbSet<Plannings> Plannings { get; set; }
        public virtual DbSet<Produits> Produits { get; set; }
        public virtual DbSet<Publications> Publications { get; set; }
        public virtual DbSet<Reservations> Reservations { get; set; }
        public virtual DbSet<Statuts> Statuts { get; set; }
        public virtual DbSet<Typologies> Typologies { get; set; }
    
        public virtual ObjectResult<Eleves> GetEleves(Nullable<int> id, string nom, string prenom, string email, string club, string license, Nullable<int> evenementId, Nullable<int> typologieId)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("Id", id) :
                new ObjectParameter("Id", typeof(int));
    
            var nomParameter = nom != null ?
                new ObjectParameter("Nom", nom) :
                new ObjectParameter("Nom", typeof(string));
    
            var prenomParameter = prenom != null ?
                new ObjectParameter("Prenom", prenom) :
                new ObjectParameter("Prenom", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("Email", email) :
                new ObjectParameter("Email", typeof(string));
    
            var clubParameter = club != null ?
                new ObjectParameter("Club", club) :
                new ObjectParameter("Club", typeof(string));
    
            var licenseParameter = license != null ?
                new ObjectParameter("License", license) :
                new ObjectParameter("License", typeof(string));
    
            var evenementIdParameter = evenementId.HasValue ?
                new ObjectParameter("EvenementId", evenementId) :
                new ObjectParameter("EvenementId", typeof(int));
    
            var typologieIdParameter = typologieId.HasValue ?
                new ObjectParameter("TypologieId", typologieId) :
                new ObjectParameter("TypologieId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Eleves>("GetEleves", idParameter, nomParameter, prenomParameter, emailParameter, clubParameter, licenseParameter, evenementIdParameter, typologieIdParameter);
        }
    
        public virtual ObjectResult<Eleves> GetEleves(Nullable<int> id, string nom, string prenom, string email, string club, string license, Nullable<int> evenementId, Nullable<int> typologieId, MergeOption mergeOption)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("Id", id) :
                new ObjectParameter("Id", typeof(int));
    
            var nomParameter = nom != null ?
                new ObjectParameter("Nom", nom) :
                new ObjectParameter("Nom", typeof(string));
    
            var prenomParameter = prenom != null ?
                new ObjectParameter("Prenom", prenom) :
                new ObjectParameter("Prenom", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("Email", email) :
                new ObjectParameter("Email", typeof(string));
    
            var clubParameter = club != null ?
                new ObjectParameter("Club", club) :
                new ObjectParameter("Club", typeof(string));
    
            var licenseParameter = license != null ?
                new ObjectParameter("License", license) :
                new ObjectParameter("License", typeof(string));
    
            var evenementIdParameter = evenementId.HasValue ?
                new ObjectParameter("EvenementId", evenementId) :
                new ObjectParameter("EvenementId", typeof(int));
    
            var typologieIdParameter = typologieId.HasValue ?
                new ObjectParameter("TypologieId", typologieId) :
                new ObjectParameter("TypologieId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Eleves>("GetEleves", mergeOption, idParameter, nomParameter, prenomParameter, emailParameter, clubParameter, licenseParameter, evenementIdParameter, typologieIdParameter);
        }
    
        public virtual int DelEleve(Nullable<int> id, string real)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("Id", id) :
                new ObjectParameter("Id", typeof(int));
    
            var realParameter = real != null ?
                new ObjectParameter("Real", real) :
                new ObjectParameter("Real", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("DelEleve", idParameter, realParameter);
        }
    
        public virtual ObjectResult<EvenementsAndTypologies> GetEvenementsAndTypologies()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<EvenementsAndTypologies>("GetEvenementsAndTypologies");
        }
    }
}
