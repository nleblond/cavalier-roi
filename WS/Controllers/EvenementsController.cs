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
    public class EvenementsController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetEvenements(EvenementsSearchParameters _Parameters)
        {
            List<EvenementResult> _EvenementResults = DB.GetEvenements(
                                    id: (_Parameters.Id == null ? -1 : _Parameters.Id),
                                    libelle: (String.IsNullOrEmpty(_Parameters.Libelle) ? null : _Parameters.Libelle),
                                    dtMin: (String.IsNullOrEmpty(_Parameters.DtMin) ? null : _Parameters.DtMin.Replace("/", "-")),
                                    dtMax: (String.IsNullOrEmpty(_Parameters.DtMax) ? null : _Parameters.DtMax.Replace("/", "-")),
                                    typologieId: (_Parameters.TypologieId == null ? -1 : _Parameters.TypologieId),
                                    evenementParentId: (_Parameters.EvenementParentId == null ? -1 : _Parameters.EvenementParentId),
                                    eleveId: (_Parameters.EleveId == null ? -1 : _Parameters.EleveId),
                                    onlyParentsYN: _Parameters.OnlyParentsYN
                               ).ToList();

            List<Evenement> _Evenements = new List<Evenement>();
            foreach (EvenementResult _CurrentE in _EvenementResults)
            {
                Evenement _NewEvenement = new Evenement();
                _NewEvenement.Id = _CurrentE.Id;
                _NewEvenement.Libelle = (String.IsNullOrEmpty(_CurrentE.Libelle) ? null : _CurrentE.Libelle.ToLower().Accents().ToUpper().Trim());

                _NewEvenement.Descriptif = (String.IsNullOrEmpty(_CurrentE.Descriptif) ? null : _CurrentE.Descriptif.Trim());

                _NewEvenement.DtDebut = (String.IsNullOrEmpty(_CurrentE.DtDebut) ? null : _CurrentE.DtDebut.Trim());
                _NewEvenement.DtFin = (String.IsNullOrEmpty(_CurrentE.DtFin) ? null : _CurrentE.DtFin.Trim());

                _NewEvenement.DtLimiteInscription = (String.IsNullOrEmpty(_CurrentE.DtLimiteInscription) ? null : _CurrentE.DtLimiteInscription.Trim());
                _NewEvenement.Minimum = _CurrentE.Minimum;
                _NewEvenement.Maximum = _CurrentE.Maximum;

                _NewEvenement.Prix = _CurrentE.Prix;
                _NewEvenement.Duree = _CurrentE.Duree;

                _NewEvenement.Logo = (String.IsNullOrEmpty(_CurrentE.Logo) ? null : _CurrentE.Logo.Trim());
                _NewEvenement.Photo = (String.IsNullOrEmpty(_CurrentE.Photo) ? null : _CurrentE.Photo.Trim());
                _NewEvenement.Bandeau = (String.IsNullOrEmpty(_CurrentE.Bandeau) ? null : _CurrentE.Bandeau.Trim());
                _NewEvenement.Lien = (String.IsNullOrEmpty(_CurrentE.Lien) ? null : _CurrentE.Lien.Trim());

                _NewEvenement.Typologie = new Typologie();
                _NewEvenement.Typologie.Id = _CurrentE.TypologieId;
                _NewEvenement.Typologie.Libelle = _CurrentE.TypologieLibelle.Trim();

                if (_CurrentE.EvenementParentId != null)
                {
                    _NewEvenement.EvenementParent = new Evenement();
                    _NewEvenement.EvenementParent.Id = _CurrentE.EvenementParentId;
                    _NewEvenement.EvenementParent.Libelle = _CurrentE.EvenementParentLibelle.Trim();
                }

                _NewEvenement.VisibledYN = _CurrentE.VisibledYN;

                //récupération du planning général (mode "backoffice" : tous les jours avec tous les évenements)
                //_NewEvenement.Plannings = new List<Planning>();
                //List<PlanningResult> _PlanningResults = DB.GetPlanningsBack(DateTime.Now.Month, DateTime.Now.Year, 3).ToList();
                //foreach (PlanningResult _CurrentP in _PlanningResults)
                //{
                //    Planning _NewPlanning = new Planning();
                //    _NewPlanning.Id = _CurrentP.Id;
                //    _NewPlanning.Creneau0809 = (String.IsNullOrEmpty(_CurrentP.Creneau0809) ? null : _CurrentP.Creneau0809.Trim());
                //    _NewPlanning.Creneau0910 = (String.IsNullOrEmpty(_CurrentP.Creneau0910) ? null : _CurrentP.Creneau0910.Trim());
                //    _NewPlanning.Creneau1011 = (String.IsNullOrEmpty(_CurrentP.Creneau1011) ? null : _CurrentP.Creneau1011.Trim());
                //    _NewPlanning.Creneau1112 = (String.IsNullOrEmpty(_CurrentP.Creneau1112) ? null : _CurrentP.Creneau1112.Trim());
                //    _NewPlanning.Creneau1213 = (String.IsNullOrEmpty(_CurrentP.Creneau1213) ? null : _CurrentP.Creneau1213.Trim());
                //    _NewPlanning.Creneau1314 = (String.IsNullOrEmpty(_CurrentP.Creneau1314) ? null : _CurrentP.Creneau1314.Trim());
                //    _NewPlanning.Creneau1415 = (String.IsNullOrEmpty(_CurrentP.Creneau1415) ? null : _CurrentP.Creneau1415.Trim());
                //    _NewPlanning.Creneau1516 = (String.IsNullOrEmpty(_CurrentP.Creneau1516) ? null : _CurrentP.Creneau1516.Trim());
                //    _NewPlanning.Creneau1617 = (String.IsNullOrEmpty(_CurrentP.Creneau1617) ? null : _CurrentP.Creneau1617.Trim());
                //    _NewPlanning.Creneau1718 = (String.IsNullOrEmpty(_CurrentP.Creneau1718) ? null : _CurrentP.Creneau1718.Trim());
                //    _NewPlanning.Jour = _CurrentP.Jour.ToString();

                //    _NewEvenement.Plannings.Add(_NewPlanning);
                //}

                //récupération des réservations sur l'évènement
                _NewEvenement.Reservations = new List<Reservation>();
                List<ReservationResult> _ReservationResults = DB.GetReservations(eleveId: null, evenementId: _NewEvenement.Id).ToList();
                foreach (ReservationResult _CurrentR in _ReservationResults)
                {
                    Reservation _NewReservation = new Reservation();
                    _NewReservation.Id = _CurrentR.Id;
                    _NewReservation.Jour = _CurrentR.Jour.Trim();
                    _NewReservation.Creneau = _CurrentR.Creneau.Trim();

                    _NewReservation.Eleve = new Eleve();
                    _NewReservation.Eleve.Id = Int32.Parse(_CurrentR.EleveId.ToString());
                    _NewReservation.Eleve.Nom = _CurrentR.Nom.Trim();
                    _NewReservation.Eleve.Prenom = _CurrentR.Prenom.Trim();

                    _NewReservation.Evenement = new Evenement();
                    _NewReservation.Evenement.Id = Int32.Parse(_CurrentR.EvenementId.ToString());
                    _NewReservation.Evenement.Libelle = _CurrentR.EvenementLibelle.Trim();


                    _NewEvenement.Reservations.Add(_NewReservation);
                }

                _Evenements.Add(_NewEvenement);
            }

            return Ok(_Evenements);
        }


        [HttpPost]
        public IHttpActionResult GetPlanningsFront(PlanningsSearchParameters _Parameters)
        {
            List<PlanningResult> _PlanningResults = DB.GetPlanningsFront(_Parameters.EvenementId).ToList();

            List<Planning> _Plannings = new List<Planning>();
            foreach (PlanningResult _CurrentP in _PlanningResults)
            {
                Planning _NewPlanning = new Planning();
                _NewPlanning.Id = _CurrentP.Id;
                _NewPlanning.Creneau0809 = (String.IsNullOrEmpty(_CurrentP.Creneau0809) ? null : _CurrentP.Creneau0809.Trim());
                _NewPlanning.Creneau0910 = (String.IsNullOrEmpty(_CurrentP.Creneau0910) ? null : _CurrentP.Creneau0910.Trim());
                _NewPlanning.Creneau1011 = (String.IsNullOrEmpty(_CurrentP.Creneau1011) ? null : _CurrentP.Creneau1011.Trim());
                _NewPlanning.Creneau1112 = (String.IsNullOrEmpty(_CurrentP.Creneau1112) ? null : _CurrentP.Creneau1112.Trim());
                _NewPlanning.Creneau1213 = (String.IsNullOrEmpty(_CurrentP.Creneau1213) ? null : _CurrentP.Creneau1213.Trim());
                _NewPlanning.Creneau1314 = (String.IsNullOrEmpty(_CurrentP.Creneau1314) ? null : _CurrentP.Creneau1314.Trim());
                _NewPlanning.Creneau1415 = (String.IsNullOrEmpty(_CurrentP.Creneau1415) ? null : _CurrentP.Creneau1415.Trim());
                _NewPlanning.Creneau1516 = (String.IsNullOrEmpty(_CurrentP.Creneau1516) ? null : _CurrentP.Creneau1516.Trim());
                _NewPlanning.Creneau1617 = (String.IsNullOrEmpty(_CurrentP.Creneau1617) ? null : _CurrentP.Creneau1617.Trim());
                _NewPlanning.Creneau1718 = (String.IsNullOrEmpty(_CurrentP.Creneau1718) ? null : _CurrentP.Creneau1718.Trim());
                _NewPlanning.Jour = _CurrentP.Jour.Trim();

                _Plannings.Add(_NewPlanning);
            }

            return Ok(_Plannings);

        }


        [HttpPost]
        public IHttpActionResult GetPlanningsBack(PlanningsSearchParameters _Parameters)
        {
            List<PlanningResult> _PlanningResults = DB.GetPlanningsBack(_Parameters.Mois, _Parameters.Annee, _Parameters.Plus).ToList();

            List<Planning> _Plannings = new List<Planning>();
            foreach (PlanningResult _CurrentP in _PlanningResults)
            {
                Planning _NewPlanning = new Planning();
                _NewPlanning.Id = _CurrentP.Id;
                _NewPlanning.Creneau0809 = (String.IsNullOrEmpty(_CurrentP.Creneau0809) ? null : _CurrentP.Creneau0809.Trim());
                _NewPlanning.Creneau0910 = (String.IsNullOrEmpty(_CurrentP.Creneau0910) ? null : _CurrentP.Creneau0910.Trim());
                _NewPlanning.Creneau1011 = (String.IsNullOrEmpty(_CurrentP.Creneau1011) ? null : _CurrentP.Creneau1011.Trim());
                _NewPlanning.Creneau1112 = (String.IsNullOrEmpty(_CurrentP.Creneau1112) ? null : _CurrentP.Creneau1112.Trim());
                _NewPlanning.Creneau1213 = (String.IsNullOrEmpty(_CurrentP.Creneau1213) ? null : _CurrentP.Creneau1213.Trim());
                _NewPlanning.Creneau1314 = (String.IsNullOrEmpty(_CurrentP.Creneau1314) ? null : _CurrentP.Creneau1314.Trim());
                _NewPlanning.Creneau1415 = (String.IsNullOrEmpty(_CurrentP.Creneau1415) ? null : _CurrentP.Creneau1415.Trim());
                _NewPlanning.Creneau1516 = (String.IsNullOrEmpty(_CurrentP.Creneau1516) ? null : _CurrentP.Creneau1516.Trim());
                _NewPlanning.Creneau1617 = (String.IsNullOrEmpty(_CurrentP.Creneau1617) ? null : _CurrentP.Creneau1617.Trim());
                _NewPlanning.Creneau1718 = (String.IsNullOrEmpty(_CurrentP.Creneau1718) ? null : _CurrentP.Creneau1718.Trim());
                _NewPlanning.Jour = _CurrentP.Jour;

                _Plannings.Add(_NewPlanning);
            }

            return Ok(_Plannings);
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelEvenement(Int32 _Id)
        {
            return Ok(DB.DelEvenement(_Id));
        }


        [HttpPost]
        public IHttpActionResult UpdEvenement(Evenement _Evenement)
        {

            DateTime? _DtDebut = null;
            if (!String.IsNullOrEmpty(_Evenement.DtDebut)) { _DtDebut = DateTime.Parse(_Evenement.DtDebut); }
            DateTime? _DtFin = null;
            if (!String.IsNullOrEmpty(_Evenement.DtFin)) { _DtFin = DateTime.Parse(_Evenement.DtFin); }
            DateTime? _DtLimiteInscription = null;
            if (!String.IsNullOrEmpty(_Evenement.DtLimiteInscription)) { _DtLimiteInscription = DateTime.Parse(_Evenement.DtLimiteInscription); }

            Int32? _TypologieId = null;
            if (_Evenement.Typologie != null) { _TypologieId = _Evenement.Typologie.Id; }

            Int32? _EvenementParentId = null;
            if (_Evenement.EvenementParent != null) { _EvenementParentId = _Evenement.EvenementParent.Id; }


            Int32? _ReturnValue = DB.UpdEvenement(
                                                    id: _Evenement.Id,
                                                    libelle: _Evenement.Libelle.ToLower().Accents().ToUpper().Trim(),
                                                    descriptif : _Evenement.Descriptif,
                                                    dtDebut: _DtDebut,
                                                    dtFin: _DtFin,
                                                    dtLimiteInscription: _DtLimiteInscription,
                                                    maximum: _Evenement.Maximum,
                                                    prix: _Evenement.Prix,
                                                    duree: _Evenement.Duree,
                                                    logo: _Evenement.Logo,
                                                    photo: _Evenement.Photo,
                                                    bandeau: _Evenement.Bandeau,
                                                    lien: _Evenement.Lien,
                                                    typologieId: _TypologieId,
                                                    evenementParentId: _EvenementParentId
                                                );
            return Ok(_ReturnValue);
        }


        [HttpPost]
        public IHttpActionResult UpdPlannings(List<Planning> _Plannings)
        {

            Int32? _ReturnValue = null;
            foreach (Planning _Current in _Plannings)
            {
                DateTime? _Jour = null;
                if (!String.IsNullOrEmpty(_Current.Jour)) { _Jour = DateTime.Parse(_Current.Jour); }

                _ReturnValue =  DB.UpdPlanning(
                                            id: _Current.Id,
                                            jour: _Jour,
                                            creneau0809: _Current.Creneau0809,
                                            creneau0910: _Current.Creneau0910,
                                            creneau1011: _Current.Creneau1011,
                                            creneau1112: _Current.Creneau1112,
                                            creneau1213: _Current.Creneau1213,
                                            creneau1314: _Current.Creneau1314,
                                            creneau1415: _Current.Creneau1415,
                                            creneau1516: _Current.Creneau1516,
                                            creneau1617: _Current.Creneau1617,
                                            creneau1718: _Current.Creneau1718
                                        );
            }
            return Ok(_ReturnValue);
        }


        [HttpPost]
        public IHttpActionResult AddEvenement(Evenement _Evenement)
        {

            DateTime? _DtDebut = null;
            if (!String.IsNullOrEmpty(_Evenement.DtDebut)) { _DtDebut = DateTime.Parse(_Evenement.DtDebut); }
            DateTime? _DtFin = null;
            if (!String.IsNullOrEmpty(_Evenement.DtFin)) { _DtFin = DateTime.Parse(_Evenement.DtFin); }
            DateTime? _DtLimiteInscription = null;
            if (!String.IsNullOrEmpty(_Evenement.DtLimiteInscription)) { _DtLimiteInscription = DateTime.Parse(_Evenement.DtLimiteInscription); }

            Int32? _TypologieId = null;
            if (_Evenement.Typologie != null) { _TypologieId = _Evenement.Typologie.Id; }

            Int32? _EvenementParentId = null;
            if (_Evenement.EvenementParent != null) { _EvenementParentId = _Evenement.EvenementParent.Id; }


            Int32? _ReturnValue = DB.AddEvenement(
                                                    id: _Evenement.Id,
                                                    libelle: _Evenement.Libelle.ToLower().Accents().ToUpper().Trim(),
                                                    descriptif: _Evenement.Descriptif,
                                                    dtDebut: _DtDebut,
                                                    dtFin: _DtFin,
                                                    dtLimiteInscription: _DtLimiteInscription,
                                                    maximum: _Evenement.Maximum,
                                                    prix: _Evenement.Prix,
                                                    duree: _Evenement.Duree,
                                                    logo: _Evenement.Logo,
                                                    photo: _Evenement.Photo,
                                                    bandeau: _Evenement.Bandeau,
                                                    lien: _Evenement.Lien,
                                                    typologieId: _TypologieId,
                                                    evenementParentId: _EvenementParentId
                                                );

            if ((_Evenement.Plannings != null) && (_Evenement.Plannings.Count > 0))
            {
                foreach (Planning _Current in _Evenement.Plannings)
                {

                    DateTime? _Jour = null;
                    if (!String.IsNullOrEmpty(_Current.Jour)) { _DtDebut = DateTime.Parse(_Current.Jour); }

                    _ReturnValue = DB.UpdPlanning(
                        id: _Current.Id,
                        jour: _Jour,
                        creneau0809: _Current.Creneau0809,
                        creneau0910: _Current.Creneau0910,
                        creneau1011: _Current.Creneau1011,
                        creneau1112: _Current.Creneau1112,
                        creneau1213: _Current.Creneau1213,
                        creneau1314: _Current.Creneau1314,
                        creneau1415: _Current.Creneau1415,
                        creneau1516: _Current.Creneau1516,
                        creneau1617: _Current.Creneau1617,
                        creneau1718: _Current.Creneau1718
                    );



                }
            }

            return Ok(_ReturnValue);
        }
    }
}
