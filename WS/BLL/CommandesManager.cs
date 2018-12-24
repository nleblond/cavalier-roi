using System;
using System.Collections.Generic;
using System.Linq;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;

namespace WS.BLL
{
    public static class CommandesManager
    {

        


        public static List<Commande> GetCommmandes(Int32? _Id = null, String _DtMin = null, String _DtMax = null, Int32? _ProduitId = null, String _ProduitReference = null, Int32? _EleveId = null, String _ReferenceTransaction = null, String _ReferenceExterne = null, Int32? _StatutId = null)
        {

            DBModelsParameters _DB = new WS.Models.DBModelsParameters();
    
            List<CommandeResult> _CommandeResults = _DB.GetCommandes(
                                   id: (_Id == null ? -1 : _Id),
                                   dtMin: (String.IsNullOrEmpty(_DtMin) ? null : _DtMin.Replace("/", "-")),
                                   dtMax: (String.IsNullOrEmpty(_DtMax) ? null : _DtMax.Replace("/", "-")),
                                   produitId: (_ProduitId == null ? -1 : _ProduitId),
                                   produitReference: (String.IsNullOrEmpty(_ProduitReference) ? null : _ProduitReference),
                                   eleveId: (_EleveId == null ? -1 : _EleveId),
                                   referenceTransaction: (String.IsNullOrEmpty(_ReferenceTransaction) ? null : _ReferenceTransaction),
                                   referenceExterne: (String.IsNullOrEmpty(_ReferenceExterne) ? null : _ReferenceExterne),
                                   statutId: (_StatutId == null ? -1 : _StatutId)
                              ).ToList();

            List<Commande> _Commandes = new List<Commande>();
            foreach (CommandeResult _Current in _CommandeResults)
            {
                if (_Commandes.Any(c => c.Id == _Current.Id) == false)
                {
                    Commande _NewCommande = new Commande();
                    _NewCommande.Id = Int32.Parse(_Current.Id.ToString());
                    _NewCommande.DtCreation = _Current.DtCreation;

                    _NewCommande.DtModification = _Current.DtModification;
                    _NewCommande.DtValidation = _Current.DtValidation;

                    _NewCommande.Prix = _Current.Total;
                    _NewCommande.ReferenceTransaction = _Current.ReferenceTransaction.Trim();
                    _NewCommande.ReferenceExterne = _Current.ReferenceExterne.Trim();

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

            return _Commandes;
        }


        public static Int32 DelCommande(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelCommande(_Id, _Real);
        }

        public static Int32 UpdCommande(Int32? _Id = null, Int32? _StatutId = null, String _ReferenceTransaction = null, String _ReferenceExterne = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.UpdCommande(
                                    id: (_Id == null ? -1 : _Id),
                                    statutId: (_StatutId == null ? -1 : _StatutId),
                                    referenceTransaction: (String.IsNullOrEmpty(_ReferenceTransaction) ? null : _ReferenceTransaction),
                                    referenceExterne: (String.IsNullOrEmpty(_ReferenceExterne) ? null : _ReferenceExterne)
                                );
        }



    }
}