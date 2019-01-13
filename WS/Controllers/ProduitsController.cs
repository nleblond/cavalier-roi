using System;
using System.Web.Http;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using WS.BLL;

namespace WS.Controllers
{
    public class ProduitsController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetProduits(ProduitsSearchParameters _Parameters)
        {
            return Ok(ProduitsManager.GetProduits(
                                                    _Id: _Parameters.Id,
                                                    _Libelle: _Parameters.Libelle,
                                                    _Reference: _Parameters.Reference,
                                                    _StockMin: _Parameters.StockMin,
                                                    _StockMax: _Parameters.StockMax,
                                                    _CommandeId: _Parameters.CommandeId,
                                                    _CategorieId: _Parameters.CategorieId,
                                                    _Top: _Parameters.Top
                            ));

        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelProduit(Int32 _Id, String _Real = "N")
        {
            return Ok(ProduitsManager.DelProduit(
                                                    _Id: _Id,
                                                    _Real: _Real)
                                                );
        }


        [HttpPost]
        public IHttpActionResult UpdProduit(Produit _Produit)
        {

            DateTime? _DtDebutF = null;
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_Produit.DtDebut)) { _DtDebutF = DateTime.Parse(_Produit.DtDebut); }
            if (!String.IsNullOrEmpty(_Produit.DtFin)) { _DtFinF = DateTime.Parse(_Produit.DtFin); }

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
                dtDebut: _DtDebutF, 
                dtFin: _DtFinF,
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


        [HttpPost]
        public IHttpActionResult GetFrais(FraisSearchParameters _Parameters)
        {
            return Ok(ProduitsManager.GetFrais(_Parameters.Poids));
        }


    }
}
