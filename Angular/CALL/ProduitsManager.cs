using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using WS.Models;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Dynamic;
using System.Text;
using WS.Models.IN;
using WS.Models.OUT;


namespace Angular.CALL
{
    public static class ProduitsManager
    {



        public static async Task<List<Produit>> GetProduits(Int32? _CategorieId = null)
        {

            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

            ProduitsSearchParameters _Parameters = new ProduitsSearchParameters();
            _Parameters.CategorieId = _CategorieId;
            _Parameters.Top = 0;

            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");
            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Produits/GetProduits"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            List<Produit> _Produits = JsonConvert.DeserializeObject<List<Produit>>(_JsonResponseContent);

            return _Produits;

        }



        public static Commande CreateCommande()
        {
            Commande _Commande = new Commande();
            _Commande.DtCreation = DateTime.Now.ToString();

            _Commande.Eleve = new Eleve();
            _Commande.Eleve.Id = 0;
            _Commande.Eleve.Nom = "LEBLOND";
            _Commande.Eleve.Prenom = "Nicolas";

            Ligne _Ligne1 = new Ligne();
            _Ligne1.Produit = new Produit();
            _Ligne1.Produit.Id = 0;
            _Ligne1.Produit.Libelle = "NOUVELLE ARMURE DU CHEVALIER DU ZODIAQUE / SAINT SEIYA: HADES V4 15TH";
            _Ligne1.Produit.Prix = 151;
            _Ligne1.Produit.Poids = 10;
            _Ligne1.Produit.Hauteur = 100;
            _Ligne1.Produit.Largeur = 50;
            _Ligne1.Produit.Longueur = 15;
            _Ligne1.Quantite = 2;
            _Ligne1.Prix = 302;

            Ligne _Ligne2 = new Ligne();
            _Ligne2.Produit = new Produit();
            _Ligne2.Produit.Id = 1;
            _Ligne2.Produit.Libelle = "ARMURE DU CHEVALIER DU ZODIAQUE / SAINT SEIYA : ATHENA V4 10TH";
            _Ligne2.Produit.Prix = 121;
            _Ligne2.Produit.Poids = 10;
            _Ligne2.Produit.Hauteur = 100;
            _Ligne2.Produit.Largeur = 50;
            _Ligne2.Produit.Longueur = 15;
            _Ligne2.Quantite = 1;
            _Ligne2.Prix = 121;

            _Commande.Lignes = new List<Ligne>();
            _Commande.Lignes.Add(_Ligne1);
            _Commande.Lignes.Add(_Ligne2);

            _Commande.Frai = new Frai();
            _Commande.Frai.Id = 2;
            _Commande.Frai.Libelle = "Colissimo (2 < kg ≤ 5)";
            _Commande.Frai.Prix = 13.15;

            _Commande.Adresse = new Adresse();
            _Commande.Adresse.Id = null;
            _Commande.Adresse.Destinataire = "LEBLOND Nicolas";
            _Commande.Adresse.Ligne1 = "4 rue Parmentier";
            _Commande.Adresse.Ligne2 = "Code : A2569";
            _Commande.Adresse.CodePostal = "94130";
            _Commande.Adresse.Ville = "Nogent sur Marne";
            _Commande.Adresse.Pays = "France";
            _Commande.Adresse.Telephone = "0641930458";
            _Commande.Adresse.Email = "leniko@gmail.com";

            _Commande.Prix = 436.15;

            return _Commande;
        }


        public static async Task<List<Frai>> GetFrais(Double? _Poids = null)
        {

            //vérification de la dispo et récupération des informations sur le produit pour créer la ligne de commande
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

            FraisSearchParameters _Parameters = new FraisSearchParameters();
            _Parameters.Poids = _Poids;

            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");
            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Produits/GetFrais"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            List<Frai> _Frais = JsonConvert.DeserializeObject<List<Frai>>(_JsonResponseContent).OrderByDescending(f => f.Prix).ToList(); //le plus cher d'abord

            return _Frais;
        }


        public static async Task<Ligne> AddLigneToCommandeEnCours(Int32 _Id, Int32 _Quantite, Int32 _QuantiteDejaMiseAuPanier)
        {

            //vérification de la dispo et récupération des informations sur le produit pour créer la ligne de commande
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

            ProduitsSearchParameters _Parameters = new ProduitsSearchParameters();
            _Parameters.Id = _Id;

            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");
            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Produits/GetProduits"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            List<Produit> _Produits = JsonConvert.DeserializeObject<List<Produit>>(_JsonResponseContent);

            Produit _NewProduit = null;
            if ((_Produits != null)  && (_Produits.Count == 1)) {
                _NewProduit = _Produits[0];

                if (_Quantite + _QuantiteDejaMiseAuPanier <= _NewProduit.Stock)
                {
                    Ligne _NewLigne = new Ligne();
                    _NewLigne.Produit = _NewProduit;
                    _NewLigne.Quantite = _Quantite;
                    _NewLigne.Prix = _NewProduit.Prix * _Quantite;
                    return _NewLigne;
                }
                else if (_Quantite + _QuantiteDejaMiseAuPanier > _NewProduit.Stock)
                {
                    Int32 _NewQuantite = Int32.Parse(_NewProduit.Stock.ToString()) - Int32.Parse(_QuantiteDejaMiseAuPanier.ToString());
                    if (_NewQuantite > 0)
                    {
                        Ligne _NewLigne = new Ligne();
                        _NewLigne.Produit = _NewProduit;
                        _NewLigne.Quantite = _NewQuantite;
                        _NewLigne.Prix = _NewProduit.Prix * _NewQuantite;
                        return _NewLigne;
                    }
                }

            }

            return null;            

        }


    }
}