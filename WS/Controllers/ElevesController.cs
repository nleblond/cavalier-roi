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
    public class ElevesController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetEleves(ElevesSearchParameters _Parameters)
        {
            List<EleveResult> _EleveResults = DB.GetEleves(
                                    id: (_Parameters.Id == null ? -1 : _Parameters.Id),
                                    nom: (String.IsNullOrEmpty(_Parameters.Nom) ? null : _Parameters.Nom),
                                    prenom: (String.IsNullOrEmpty(_Parameters.Prenom) ? null : _Parameters.Prenom),
                                    email: (String.IsNullOrEmpty(_Parameters.Email) ? null : _Parameters.Email),
                                    club: (String.IsNullOrEmpty(_Parameters.Club) ? null : _Parameters.Club),
                                    license: (String.IsNullOrEmpty(_Parameters.License) ? null : _Parameters.License),
                                    evenementId: (_Parameters.EvenementId == null ? -1 : _Parameters.EvenementId),
                                    typologieId: (_Parameters.TypologieId == null ? -1 : _Parameters.TypologieId)
                               ).ToList();

            List<Eleve> _Eleves = new List<Eleve>();
            foreach (EleveResult _Current in _EleveResults)
            {
                Eleve _NewEleve = new Eleve();
                _NewEleve.Id = Int32.Parse(_Current.Id.ToString());
                _NewEleve.Nom = _Current.Nom;
                _NewEleve.Prenom = _Current.Prenom;
                _NewEleve.Email = _Current.Email;
                _NewEleve.Club = _Current.Club;
                _NewEleve.License = _Current.License;

                _NewEleve.NbCommandes = _Current.NbCommandes;
                _NewEleve.NbStages = _Current.NbStages;
                _NewEleve.NbCours = _Current.NbCours;
                _NewEleve.NbTournois = _Current.NbTournois;

                _Eleves.Add(_NewEleve);
            }
            return Ok(_Eleves);


        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelEleve(Int32? _Id = null, String _Real = "N")
        {
            return Ok(DB.DelEleve(_Id, _Real));
        }




    }
}
