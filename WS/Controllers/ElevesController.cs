using System;
using System.Web.Http;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using WS.BLL;

namespace WS.Controllers
{
    public class ElevesController : ApiController
    {

       
        [HttpPost]
        public IHttpActionResult GetEleves(ElevesSearchParameters _Parameters)
        {
            return Ok(ElevesManager.GetEleves(
                                                _Id: _Parameters.Id,
                                                _Nom: _Parameters.Nom,
                                                _Prenom: _Parameters.Prenom,
                                                _Email: _Parameters.Email,
                                                _Club: _Parameters.Club,
                                                _License: _Parameters.License,
                                                _EvenementId: _Parameters.EvenementId,
                                                _TypologieId:_Parameters.TypologieId
                                                ));
        }


        [HttpPost]
        public IHttpActionResult ConnectEleve(ElevesSearchParameters _Parameters)
        {
            return Ok(ElevesManager.ConnectEleve(
                                                _Email: _Parameters.Email,
                                                _Password: _Parameters.Password
                                                ));
        }

        [HttpPost]
        public IHttpActionResult ReinitEleve(EleveUpdateParameters _Parameters)
        {
            return Ok(ElevesManager.ReinitEleve(
                                                    _Email: _Parameters.Email,
                                                    _Password: _Parameters.Password
                                                ));
        }






        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelEleve(Int32? _Id = null, String _Real = "N")
        {
            return Ok(ElevesManager.DelEleve(
                                                _Id: _Id,
                                                _Real:_Real
                                             ));
        }


        [HttpPost]
        public IHttpActionResult UpdEleve(Eleve _Eleve)
        {

            DateTime? _DtNaissanceF = null;
            if (!String.IsNullOrEmpty(_Eleve.DtNaissance)) { _DtNaissanceF = DateTime.Parse(_Eleve.DtNaissance); }

            return Ok(ElevesManager.UpdEleve(
                _Id: _Eleve.Id, 
                _Nom: _Eleve.Nom,
                _Prenom: _Eleve.Prenom,
                _Email: _Eleve.Email,
                _Password: _Eleve.Password,
                _DtNaissance: _Eleve.DtNaissance,
                _Sexe: _Eleve.Sexe,
                _Club: _Eleve.Club,
                _Photo: _Eleve.Photo,
                _Fixe: _Eleve.Fixe,
                _Portable: _Eleve.Portable,
                _Commentaire: _Eleve.Commentaire,
                _License: _Eleve.License,
                _Classement: _Eleve.Classement,
                _Suivi: _Eleve.Suivi
            ));
        }


        [HttpPost]
        public IHttpActionResult AddEleve(Eleve _Eleve)
        {

            DateTime? _DtNaissanceF = null;
            if (!String.IsNullOrEmpty(_Eleve.DtNaissance)) { _DtNaissanceF = DateTime.Parse(_Eleve.DtNaissance); }

            return Ok(ElevesManager.AddEleve(
                _Nom: _Eleve.Nom,
                _Prenom: _Eleve.Prenom,
                _Email: _Eleve.Email,
                _Password: _Eleve.Password,
                _DtNaissance: _Eleve.DtNaissance,
                _Sexe: _Eleve.Sexe,
                _Club: _Eleve.Club,
                _Photo: _Eleve.Photo,
                _Fixe: _Eleve.Fixe,
                _Portable: _Eleve.Portable,
                _Commentaire: _Eleve.Commentaire,
                _License: _Eleve.License,
                _Classement: _Eleve.Classement,
                _Suivi: _Eleve.Suivi
            ));
        }















        [HttpPost]
        public IHttpActionResult UpdParticipation(ParticipationUpdateParameters _Parameters)
        {
            return Ok(ElevesManager.UpdParticipation(
                                                _Id: _Parameters.Id,
                                                _Quantite: _Parameters.Quantite
                                             ));
        }


        [HttpPost]
        public IHttpActionResult DelParticipation(ParticipationDeleteParameters _Parameters)
        {
            return Ok(ElevesManager.DelParticipation(
                                    _Id: _Parameters.Id,
                                    _Real: _Parameters.Real
                                ));
        }


        [HttpPost]
        public IHttpActionResult DelReservation(ReservationDeleteParameters _Parameters)
        {
            return Ok(ElevesManager.DelReservation(
                                    _Id: _Parameters.Id,
                                    _Real: _Parameters.Real
                                ));
        }

        
    }
}
