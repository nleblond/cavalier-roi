using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;

namespace WS.Controllers
{
    public class CommandesController : ApiController
    {

        private DBModelsParameters DB = new DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetCommandes(CommandesSearchParameters _Parameters)
        {
            List<CommandeResult> _CommandeResults = DB.GetCommandes(
                                    id: (_Parameters.Id == null ? -1 : _Parameters.Id),
                                    dtMin: (String.IsNullOrEmpty(_Parameters.DtMin) ? null : _Parameters.DtMin.Replace("/", "-")),
                                    dtMax: (String.IsNullOrEmpty(_Parameters.DtMax) ? null : _Parameters.DtMax.Replace("/", "-")),
                                    produitId: (_Parameters.ProduitId == null ? -1 : _Parameters.ProduitId),
                                    produitReference: (String.IsNullOrEmpty(_Parameters.ProduitReference) ? null : _Parameters.ProduitReference),
                                    eleveId: (_Parameters.EleveId == null ? -1 : _Parameters.EleveId),
                                    referenceTransaction: (String.IsNullOrEmpty(_Parameters.ReferenceTransaction) ? null : _Parameters.ReferenceTransaction),
                                    referenceExterne: (String.IsNullOrEmpty(_Parameters.ReferenceExterne) ? null : _Parameters.ReferenceExterne),
                                    statutId: (_Parameters.StatutId == null ? -1 : _Parameters.StatutId)
                               ).ToList();

            List<Commande> _Commandes = new List<Commande>();
            foreach (CommandeResult _Current in _CommandeResults)
            {
                if (_Commandes.Any(c => c.Id == _Current.Id) == false)
                {
                    Commande _NewCommande = new Commande();
                    _NewCommande.Id = Int32.Parse(_Current.Id.ToString());
                    _NewCommande.DtCreation = DateTime.Parse(_Current.DtCreation.ToString());

                    if (String.IsNullOrEmpty(_Current.DtModification) == false) { _NewCommande.DtModification = DateTime.Parse(_Current.DtModification); }
                    if (String.IsNullOrEmpty(_Current.DtValidation) == false) { _NewCommande.DtValidation = DateTime.Parse(_Current.DtValidation); }

                    _NewCommande.Prix = _Current.Total;
                    _NewCommande.ReferenceTransaction = _Current.ReferenceTransaction;
                    _NewCommande.ReferenceExterne = _Current.ReferenceExterne;

                    _NewCommande.StatutId = Int32.Parse(_Current.StatutId.ToString());
                    if (_Current.StatutId != null)
                    {
                        _NewCommande.Statut = new Statut();
                        _NewCommande.Statut.Id = Int32.Parse(_Current.StatutId.ToString());
                        _NewCommande.Statut.Libelle = _Current.StatutLibelle;
                    }

                    _NewCommande.AdresseId = _Current.AdresseId;
                    if (_Current.AdresseId != null)
                    {
                        _NewCommande.Adresse = new Adresse();
                        _NewCommande.Adresse.Id = Int32.Parse(_Current.AdresseId.ToString());
                        _NewCommande.Adresse.Destinataire = _Current.Destinataire;
                        _NewCommande.Adresse.Ligne1 = _Current.Ligne1;
                        _NewCommande.Adresse.Ligne2 = _Current.Ligne2;
                        _NewCommande.Adresse.CodePostal = _Current.CodePostal;
                        _NewCommande.Adresse.Ville = _Current.Ville;
                        _NewCommande.Adresse.Telephone = _Current.Telephone;
                        _NewCommande.Adresse.Email = _Current.Email;
                    }

                    _NewCommande.FraiId = _Current.FraiId;
                    if (_Current.FraiId != null)
                    {
                        _NewCommande.Frai = new Frai();
                        _NewCommande.Frai.Id = Int32.Parse(_Current.FraiId.ToString());
                        _NewCommande.Frai.Libelle = _Current.FraiLibelle;
                        _NewCommande.Frai.Prix = _Current.FraiPrix;
                    }

                    _NewCommande.EleveId = Int32.Parse(_Current.EleveId.ToString());
                    if (_Current.EleveId != null)
                    {
                        _NewCommande.Eleve = new Eleve();
                        _NewCommande.Eleve.Id = Int32.Parse(_Current.EleveId.ToString());
                        _NewCommande.Eleve.Nom = _Current.Nom;
                        _NewCommande.Eleve.Prenom = _Current.Prenom;
                    }

                    _NewCommande.Lignes = new List<Ligne>();
                    foreach (CommandeResult _Current2 in _CommandeResults.FindAll(c => c.Id == _Current.Id && c.LigneId != null) as List<CommandeResult>)
                    {
                        Ligne _NewLigne = new Ligne();
                        _NewLigne.Id = Int32.Parse(_Current2.LigneId.ToString());
                        _NewLigne.Quantite = Int16.Parse(_Current2.Quantite.ToString());
                        _NewLigne.Reduction = _Current2.Reduction;
                        _NewLigne.Prix = Double.Parse(_Current2.Prix.ToString());

                        _NewLigne.ProduitId = Int32.Parse(_Current2.ProduitId.ToString());
                        Produit _NewProduit = new Produit();
                        _NewProduit.Id = Int32.Parse(_Current2.ProduitId.ToString());
                        _NewProduit.Libelle = _Current2.ProduitLibelle;
                        _NewProduit.Reference = _Current2.ProduitReference;
                        _NewLigne.Produit = _NewProduit;

                        _NewCommande.Lignes.Add(_NewLigne);
                    }

                    _Commandes.Add(_NewCommande);
                }
            }
            return Ok(_Commandes);

        }


        [HttpGet]
        public IHttpActionResult DelCommande(Int32 _Id, String _Real = "N")
        {
            return Ok(DB.DelCommande(_Id, _Real));
        }


        [HttpPost]
        public IHttpActionResult UpdCommande(CommandeUpdateParameters _Parameters)
        {
            return Ok(DB.UpdCommande(_Parameters.Id, _Parameters.StatutId, _Parameters.ReferenceTransaction, _Parameters.ReferenceExterne));
        }

        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetStatuts()
        {
           return Ok(DB.GetStatuts().ToList());
        }


    }
}
