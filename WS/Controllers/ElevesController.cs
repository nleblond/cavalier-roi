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
        public IHttpActionResult GetEleves(
                                                [FromUri] int? Id = null,
                                                [FromUri] string Nom = null,
                                                [FromUri] string Prenom = null,
                                                [FromUri] string Email = null,
                                                [FromUri] string Club = null,
                                                [FromUri] string License = null,
                                                [FromUri] int? EvenementId = null,
                                                [FromUri] int? TypologieId = null
                                            )
        {
            return Ok(DB.GetEleves(
                                    id: Id,
                                    nom: Nom,
                                    prenom: Prenom,
                                    email: Email,
                                    club: Club,
                                    license: License,
                                    evenementId: EvenementId,
                                    typologieId: TypologieId
                               ).ToList());
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelEleve(
                                                [FromUri] int? Id = null,
                                                [FromUri] string Real = "N"
                                            )
        {
            return Ok(DB.DelEleve(Id, Real));
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetEvenementsAndTypologies()
        {
            return Ok(DB.GetEvenementsAndTypologies().ToList());
        }


    }
}
