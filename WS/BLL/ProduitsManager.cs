using System;
using System.Collections.Generic;
using System.Linq;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;


namespace WS.BLL
{
    public static class ProduitsManager
    {

        private static WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        public static List<Produit> GetProduits(Int32? _Id = null, String _Libelle = null, String _Reference = null, Int32? _StockMin = null, Int32? _StockMax = null, Int32? _CommandeId = null, Int32? _CategorieId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<ProduitResult> _ProduitsResults = _DB.GetProduits(
                                    id: (_Id == null ? -1 : _Id),
                                    libelle: (String.IsNullOrEmpty(_Libelle) ? null : _Libelle),
                                    reference: (String.IsNullOrEmpty(_Reference) ? null : _Reference),
                                    stockMin: (_StockMin == null ? -1 : _StockMin),
                                    stockMax: (_StockMax == null ? -1 : _StockMax),
                                    commandeId: (_CommandeId == null ? -1 : _CommandeId),
                                    categorieId: (_CategorieId == null ? -1 : _CategorieId)
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

            return _Produits;
        }


        public static Int32? DelProduit(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelProduit(
                                    id: _Id,
                                    real: _Real
                                );
        }



        public static Int32? UpdProduit(
                                            Int32? _Id = null,
                                            String _Reference = null,
                                            String _Libelle = null,
                                            String _Descriptif = null,
                                            Double? _Poids = null,
                                            Double? _Hauteur = null,
                                            Double? _Largeur = null,
                                            Double? _Longueur = null,
                                            Boolean? _Depassement = null,
                                            String _DtDebut = null,
                                            String _DtFin = null,
                                            String _Image = null,
                                            String _Logo = null,
                                            String _Visuel = null,
                                            Int32? _CategorieId = null,
                                            Double? _Prix = null,
                                            Int32? _Stock = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtDebutF = null;
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_DtDebut)) { _DtDebutF = DateTime.Parse(_DtDebut); }
            if (!String.IsNullOrEmpty(_DtFin)) { _DtFinF = DateTime.Parse(_DtFin); }

            return _DB.UpdProduit(
                                    id: _Id,
                                    reference: _Reference,
                                    libelle: _Libelle,
                                    descriptif: _Descriptif,
                                    poids: _Poids,
                                    hauteur: _Hauteur,
                                    largeur: _Largeur,
                                    longueur: _Longueur,
                                    depassement: _Depassement,
                                    dtDebut: _DtDebutF,
                                    dtFin: _DtFinF,
                                    image: _Image,
                                    logo: _Logo,
                                    visuel: _Visuel,
                                    categorieId: _CategorieId,
                                    prix: _Prix,
                                    stock: _Stock
                );
        }



        public static Int32? AddProduit(
                                            Int32? _Id = null,
                                            String _Reference = null,
                                            String _Libelle = null,
                                            String _Descriptif = null,
                                            Double? _Poids = null,
                                            Double? _Hauteur = null,
                                            Double? _Largeur = null,
                                            Double? _Longueur = null,
                                            Boolean? _Depassement = null,
                                            String _DtDebut = null,
                                            String _DtFin = null,
                                            String _Image = null,
                                            String _Logo = null,
                                            String _Visuel = null,
                                            Int32? _CategorieId = null,
                                            Double? _Prix = null,
                                            Int32? _Stock = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtDebutF = null;
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_DtDebut)) { _DtDebutF = DateTime.Parse(_DtDebut); }
            if (!String.IsNullOrEmpty(_DtFin)) { _DtFinF = DateTime.Parse(_DtFin); }

            return _DB.AddProduit(
                                    id: _Id,
                                    reference: _Reference,
                                    libelle: _Libelle,
                                    descriptif: _Descriptif,
                                    poids: _Poids,
                                    hauteur: _Hauteur,
                                    largeur: _Largeur,
                                    longueur: _Longueur,
                                    depassement: _Depassement,
                                    dtDebut: _DtDebutF,
                                    dtFin: _DtFinF,
                                    image: _Image,
                                    logo: _Logo,
                                    visuel: _Visuel,
                                    categorieId: _CategorieId,
                                    prix: _Prix,
                                    stock: _Stock
                );
        }


    }
}