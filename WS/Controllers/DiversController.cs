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
    public class DiversController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();

        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetId(String _Table = null)
        {
            return Ok(DB.GetId(_Table));
        }



        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetStatuts()
        {
            return Ok(DB.GetStatuts().ToList());
        }




        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetCategories()
        {
            return Ok(DB.GetCategories().ToList());
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetModes(Int32? ModeId = null)
        {
            return Ok(DB.GetModes().ToList());
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetTypologies(Int32? TypologieId = null)
        {
            return Ok(DB.GetTypologies().ToList());
        }






        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetModesEmplacements(Int32? ModeId = null)
        {
            List<ModeEmplacementResult> _ModeEmplacementResults = DB.GetModesEmplacements(modeId: ModeId).ToList();

            List<Emplacement> _Emplacements = new List<Emplacement>();
            foreach (ModeEmplacementResult _Current in _ModeEmplacementResults)
            {
                Emplacement _NewEmplacement = new Emplacement();
                _NewEmplacement.Id = _Current.Id;
                _NewEmplacement.Libelle = _Current.Libelle.Trim();
                _NewEmplacement.Key = (String.IsNullOrEmpty(_Current.Key) ? null : _Current.Key.Trim());
                _NewEmplacement.Visuel = (String.IsNullOrEmpty(_Current.Visuel) ? null : _Current.Visuel.Trim());
                _NewEmplacement.FormatedId = _Current.FormatedId.Trim();

                _NewEmplacement.Mode = new Mode();
                _NewEmplacement.Mode.Id = _Current.ModeId;
                //_NewEmplacement.Mode.Libelle = _Current.ModeLibelle.Trim();
                _Emplacements.Add(_NewEmplacement);
            }
            return Ok(_Emplacements);
        }


        

        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetTypologiesEvenements(String _OnlyParentsYN = "N")
        {
            List<TypologieEvenementResult> _TypologieEvenementResults = DB.GetTypologiesEvenements(onlyParentsYN: _OnlyParentsYN).ToList();

            List<Evenement> _Evenements = new List<Evenement>();
            foreach (TypologieEvenementResult _Current in _TypologieEvenementResults)
            {
                Evenement _NewEvenement = new Evenement();
                _NewEvenement.Id = _Current.Id;
                _NewEvenement.Libelle = _Current.Libelle.Trim();
                _NewEvenement.FormatedId = _Current.FormatedId.Trim();

                if (_Current.EvenementParentId != null)
                {
                    _NewEvenement.EvenementParent = new Evenement();
                    _NewEvenement.EvenementParent.Id = _Current.EvenementParentId;
                    //_NewEvenement.EvenementParent.Libelle = _Current.EvenementParentLibelle;
                }

                _NewEvenement.Typologie = new Typologie();
                _NewEvenement.Typologie.Id = _Current.TypologieId;
                //_NewEvenement.Typologie.Libelle = _Current.TypologieLibelle;
                _Evenements.Add(_NewEvenement);
            }
            return Ok(_Evenements);
        }



    }
}
