﻿using System;
using System.Web.Http;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using WS.BLL;

namespace WS.Controllers
{
    public class CommandesController : ApiController
    {

        private DBModelsParameters DB = new DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetCommandes(CommandesSearchParameters _Parameters)
        {
           
            return Ok(CommandesManager.GetCommmandes(
                                                        _Id: _Parameters.Id,
                                                        _DtMin: _Parameters.DtMin,
                                                        _DtMax: _Parameters.DtMax,
                                                        _ProduitId: _Parameters.ProduitId,
                                                        _ProduitReference: _Parameters.ProduitReference,
                                                        _EleveId: _Parameters.EleveId,
                                                        _ReferenceTransaction: _Parameters.ReferenceTransaction,
                                                        _ReferenceExterne: _Parameters.ReferenceExterne,
                                                        _StatutId: _Parameters.StatutId,
                                                        _TrackingNumber: _Parameters.TrackingNumber
                                            ));

        }


        public IHttpActionResult AddCommande(Commande _Commande)
        {

            DateTime? _DtCreation = null;
            DateTime? _DtValidation = null;
            if (!String.IsNullOrEmpty(_Commande.DtCreation)) { _DtCreation = DateTime.Parse(_Commande.DtCreation); }
            if (!String.IsNullOrEmpty(_Commande.DtValidation)) { _DtValidation = DateTime.Parse(_Commande.DtValidation); }

            return Ok(CommandesManager.AddCommande(
                                    _DtCreation: _DtCreation,
                                    _DtValidation: _DtValidation,
                                    _StatutId: _Commande.Statut.Id,
                                    _EleveId: _Commande.Eleve.Id,
                                    _Prix: _Commande.Prix,
                                    _FraiId: _Commande.Frai.Id,
                                    _ReferenceTransaction: _Commande.ReferenceTransaction,
                                    _ReferenceExterne: _Commande.ReferenceExterne,
                                    _Adresse: _Commande.Adresse,
                                    _Lignes: _Commande.Lignes
                                ));
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelCommande(Int32 _Id, String _Real = "N")
        {
            return Ok(CommandesManager.DelCommande(
                                                    _Id: _Id,
                                                    _Real: _Real
                                                    ));
        }


        [HttpPost]
        public IHttpActionResult UpdCommande(CommandeUpdateParameters _Parameters)
        {
            return Ok(CommandesManager.UpdCommande(
                                                    _Id: _Parameters.Id,
                                                    _StatutId: _Parameters.StatutId,
                                                    _StatutLibelle: _Parameters.StatutLibelle,
                                                    _ReferenceTransaction: _Parameters.ReferenceTransaction,
                                                    _ReferenceExterne: _Parameters.ReferenceExterne,
                                                    _EleveId: _Parameters.EleveId,
                                                    _TrackingNumber: _Parameters.TrackingNumber
                                                ));
        }

        


    }
}
