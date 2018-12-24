using System;
using System.Web.Http;
using System.Collections.Generic;
using System.Linq;


using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using WS.BLL;


namespace WS.Controllers
{
    public class EvenementsController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetEvenements(EvenementsSearchParameters _Parameters)
        {
            return Ok(EvenementsManager.GetEvenements(
                                                        _Id: _Parameters.Id,
                                                        _Libelle: _Parameters.Libelle,
                                                        _DtMin: _Parameters.DtMin,
                                                        _DtMax: _Parameters.DtMax,
                                                        _TypologieId: _Parameters.TypologieId,
                                                        _EvenementParentId: _Parameters.EvenementParentId,
                                                        _EleveId: _Parameters.EleveId,
                                                        _OnlyParentsYN: _Parameters.OnlyParentsYN
                                                    ));
        }





        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelEvenement(Int32? _Id = null)
        {
            return Ok(EvenementsManager.DelEvenement(_Id));
        }


        [HttpPost]
        public IHttpActionResult UpdEvenement(Evenement _Evenement)
        {
            return Ok(EvenementsManager.UpdEvenement(
                                                        _Id: _Evenement.Id,
                                                        _Libelle: _Evenement.Libelle,
                                                        _Descriptif: _Evenement.Descriptif,
                                                        _Minimum: _Evenement.Minimum,
                                                        _Maximum: _Evenement.Maximum,
                                                        _Prix: _Evenement.Prix,
                                                        _Duree: _Evenement.Duree,
                                                        _DtDebut: _Evenement.DtDebut,
                                                        _DtFin: _Evenement.DtFin,
                                                        _DtLimiteInscription: _Evenement.DtLimiteInscription,
                                                        _Logo: _Evenement.Logo,
                                                        _Photo: _Evenement.Photo,
                                                        _Bandeau: _Evenement.Bandeau,
                                                        _Lien: _Evenement.Lien,
                                                        _TypologieId: _Evenement.Typologie.Id,
                                                        _EvenementParentId: (_Evenement.EvenementParent != null ? _Evenement.EvenementParent.Id : null) //pas instancié à la création de l'évènement
                ));
        }



        [HttpPost]
        public IHttpActionResult AddEvenement(Evenement _Evenement)
        {

            return Ok(EvenementsManager.AddEvenement(
                                                         _Id: _Evenement.Id,
                                                         _Libelle: _Evenement.Libelle,
                                                         _Descriptif: _Evenement.Descriptif,
                                                         _Minimum: _Evenement.Minimum,
                                                         _Maximum: _Evenement.Maximum,
                                                         _Prix: _Evenement.Prix,
                                                         _Duree: _Evenement.Duree,
                                                         _DtDebut: _Evenement.DtDebut,
                                                         _DtFin: _Evenement.DtFin,
                                                         _DtLimiteInscription: _Evenement.DtLimiteInscription,
                                                         _Logo: _Evenement.Logo,
                                                         _Photo: _Evenement.Photo,
                                                         _Bandeau: _Evenement.Bandeau,
                                                         _Lien: _Evenement.Lien,
                                                         _TypologieId: _Evenement.Typologie.Id,
                                                         _EvenementParentId: (_Evenement.EvenementParent != null ? _Evenement.EvenementParent.Id : null) //pas instancié à la création de l'évènement
                 ));
        }








        [HttpPost]
        public IHttpActionResult GetPlanningsFront(PlanningsSearchParameters _Parameters)
        {
            return Ok(EvenementsManager.GetPlanningsFront(_Parameters.EvenementId));
        }


        [HttpPost]
        public IHttpActionResult GetPlanningsBack(PlanningsSearchParameters _Parameters)
        {
            return Ok(EvenementsManager.GetPlanningsBack(
                                                            _Parameters.Mois,
                                                            _Parameters.Annee,
                                                            _Parameters.Plus
                                                        ));
        }



        [HttpPost]
        public IHttpActionResult UpdPlannings(List<Planning> _Plannings)
        {
            return Ok(EvenementsManager.UpdPlannings(_Plannings));
        }











    }
}
