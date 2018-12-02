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

namespace WS.Controllers
{
    public class ElevesController : ApiController
    {

        private DBModelsParameters DB = new DBModelsParameters();


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetEleves(ElevesSearchParameters _Parameters)
        {
            return Ok(DB.GetEleves(
                                    id: (_Parameters.Id == null ? -1 : _Parameters.Id),
                                    nom: (String.IsNullOrEmpty(_Parameters.Nom) ? null : _Parameters.Nom),
                                    prenom: (String.IsNullOrEmpty(_Parameters.Prenom) ? null : _Parameters.Prenom),
                                    email: (String.IsNullOrEmpty(_Parameters.Email) ? null : _Parameters.Email),
                                    club: (String.IsNullOrEmpty(_Parameters.Club) ? null : _Parameters.Club),
                                    license: (String.IsNullOrEmpty(_Parameters.License) ? null : _Parameters.License),
                                    evenementId: (_Parameters.EvenementId == null ? -1 : _Parameters.EvenementId),
                                    typologieId: (_Parameters.TypologieId == null ? -1 : _Parameters.TypologieId)
                               ).ToList());
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelEleve(Int32? _Id = null, String _Real = "N")
        {
            return Ok(DB.DelEleve(_Id, _Real));
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetEvenementsAndTypologies()
        {
            return Ok(DB.GetEvenementsAndTypologies().ToList());
        }


    }
}
