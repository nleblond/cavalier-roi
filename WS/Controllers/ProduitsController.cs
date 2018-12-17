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
    public class ProduitsController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetProduits(ProduitsSearchParameters _Parameters)
        {
            List<ProduitResult> _ProduitsResults = DB.GetProduits(
                                    id: (_Parameters.Id == null ? -1 : _Parameters.Id),
                                    libelle: (String.IsNullOrEmpty(_Parameters.Libelle) ? null : _Parameters.Libelle),
                                    reference: (String.IsNullOrEmpty(_Parameters.Reference) ? null : _Parameters.Reference),
                                    stockMin: (_Parameters.StockMin == null ? -1 : _Parameters.StockMin),
                                    stockMax: (_Parameters.StockMax == null ? -1 : _Parameters.StockMax),
                                    commandeId: (_Parameters.CommandeId == null ? -1 : _Parameters.CommandeId),
                                    categorieId: (_Parameters.CategorieId == null ? -1 : _Parameters.CategorieId)
                               ).ToList();

            List<Produit> _Produits = new List<Produit>();
            foreach (ProduitResult _Current in _ProduitsResults)
            {

                Produit _NewProduit = new Produit();
                _NewProduit.Id = _Current.Id;
                _NewProduit.Reference = _Current.Reference;
                _NewProduit.Libelle = _Current.Libelle;
                _NewProduit.Descriptif = _Current.Descriptif;
                _NewProduit.Prix = _Current.Prix;
                _NewProduit.Stock = _Current.Stock;
                _NewProduit.Poids = _Current.Poids;
                _NewProduit.Longueur = _Current.Longueur;
                _NewProduit.Largeur = _Current.Largeur;
                _NewProduit.Hauteur = _Current.Hauteur;
                _NewProduit.Depassement = _Current.Depassement;

                _NewProduit.DtDebut = _Current.DtDebut;
                _NewProduit.DtFin = _Current.DtFin;

                _NewProduit.Image = _Current.Image;
                _NewProduit.Logo = _Current.Logo;
                _NewProduit.Visuel = _Current.Visuel;
                _NewProduit.NbCommandes = _Current.NbCommandes;

                if (_Current.CategorieId != null)
                {
                    _NewProduit.Categorie = new Categorie();
                    _NewProduit.Categorie.Id = Int32.Parse(_Current.CategorieId.ToString());
                    _NewProduit.Categorie.Libelle = _Current.CategorieLibelle;
                }

                _NewProduit.NbCommandes = _NewProduit.NbCommandes;

                _Produits.Add(_NewProduit);
            }

            return Ok(_Produits);

        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelProduit(Int32 _Id, String _Real = "N")
        {
            return Ok(DB.DelProduit(_Id, _Real));
        }


        [HttpPost]
        public IHttpActionResult UpdProduit(Produit _Produit)
        {

            DateTime? _DtDebut = null;
            DateTime? _DtFin = null;
            if (!String.IsNullOrEmpty(_Produit.DtDebut)) { _DtDebut = DateTime.Parse(_Produit.DtDebut); }
            if (!String.IsNullOrEmpty(_Produit.DtFin)) { _DtFin = DateTime.Parse(_Produit.DtFin); }

            return Ok(DB.UpdProduit(
                id: _Produit.Id,
                reference: _Produit.Reference,
                libelle: _Produit.Libelle,
                descriptif: _Produit.Descriptif,
                poids: _Produit.Poids,
                hauteur: _Produit.Hauteur,
                largeur: _Produit.Largeur,
                longueur: _Produit.Longueur,
                depassement: _Produit.Depassement,
                dtDebut: _DtDebut, 
                dtFin: _DtFin,
                image: _Produit.Image,
                logo: _Produit.Logo,
                visuel: _Produit.Visuel,
                categorieId: _Produit.Categorie.Id,
                prix: _Produit.Prix,
                stock: _Produit.Stock
                ));
        }


        [HttpPost]
        public IHttpActionResult AddProduit(Produit _Produit)
        {

            DateTime? _DtDebut = null;
            DateTime? _DtFin = null;
            if (!String.IsNullOrEmpty(_Produit.DtDebut)) { _DtDebut = DateTime.Parse(_Produit.DtDebut); }
            if (!String.IsNullOrEmpty(_Produit.DtFin)) { _DtFin = DateTime.Parse(_Produit.DtFin); }

            return Ok(DB.AddProduit(
                id: _Produit.Id,
                reference: _Produit.Reference,
                libelle: _Produit.Libelle,
                descriptif: _Produit.Descriptif,
                poids: _Produit.Poids,
                hauteur: _Produit.Hauteur,
                largeur: _Produit.Largeur,
                longueur: _Produit.Longueur,
                depassement: _Produit.Depassement,
                dtDebut: _DtDebut,
                dtFin: _DtFin,
                image: _Produit.Image,
                logo: _Produit.Logo,
                visuel: _Produit.Visuel,
                categorieId: _Produit.Categorie.Id,
                prix: _Produit.Prix,
                stock: _Produit.Stock
                ));
        }


        


    }
}
