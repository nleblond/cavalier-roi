using System;
using System.Collections.Generic;
using System.Linq;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;


namespace WS.BLL
{
    public static class EvenementsManager
    {

        public static List<Evenement> GetEvenements(Int32? _Id = null, String _Libelle = null, String _DtMin = null, String _DtMax = null, Int32? _TypologieId = null, Int32? _EvenementParentId = null, Int32? _EleveId = null, String _OnlyParentsYN = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<EvenementResult> _EvenementResults = _DB.GetEvenements(
                                    id: (_Id == null ? -1 : _Id),
                                    libelle: (String.IsNullOrEmpty(_Libelle) ? null : _Libelle),
                                    dtMin: (String.IsNullOrEmpty(_DtMin) ? null : _DtMin.Replace("/", "-")),
                                    dtMax: (String.IsNullOrEmpty(_DtMax) ? null : _DtMax.Replace("/", "-")),
                                    typologieId: (_TypologieId == null ? -1 : _TypologieId),
                                    evenementParentId: (_EvenementParentId == null ? -1 : _EvenementParentId),
                                    eleveId: (_EleveId == null ? -1 : _EleveId),
                                    onlyParentsYN: _OnlyParentsYN
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


                //récupération des réservations sur l'évènement
                _NewEvenement.Reservations = new List<Reservation>();
                List<ReservationResult> _ReservationResults = _DB.GetReservations(eleveId: null, evenementId: _NewEvenement.Id).ToList();
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

            return _Evenements;
        }


        public static Int32? DelEvenement(Int32? _Id = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelEvenement(_Id);
        }


        public static Int32? UpdEvenement(
                                            Int32? _Id = null,
                                            String _Libelle = null,
                                            String _Descriptif = null, 
                                            Int32? _Minimum = null, 
                                            Int32? _Maximum = null,
                                            Double? _Prix = null,
                                            Double? _Duree = null,
                                            String _DtDebut = null,
                                            String _DtFin = null,
                                            String _DtLimiteInscription = null,
                                            String _Logo = null,
                                            String _Photo = null,
                                            String _Bandeau = null,
                                            String _Lien = null,
                                            Int32? _TypologieId = null,
                                            Int32? _EvenementParentId = null,
                                            List<Planning> _Plannings = null
                                        )
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtDebutF = null;
            if (!String.IsNullOrEmpty(_DtDebut)) { _DtDebutF = DateTime.Parse(_DtDebut); }
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_DtFin)) { _DtFinF = DateTime.Parse(_DtFin); }
            DateTime? _DtLimiteInscriptionF = null;
            if (!String.IsNullOrEmpty(_DtLimiteInscription)) { _DtLimiteInscriptionF = DateTime.Parse(_DtLimiteInscription); }

            Int32? _ReturnValue = _DB.UpdEvenement(
                                                    id: _Id,
                                                    libelle: _Libelle.ToLower().Accents().ToUpper().Trim(),
                                                    descriptif: _Descriptif,
                                                    dtDebut: _DtDebutF,
                                                    dtFin: _DtFinF,
                                                    dtLimiteInscription: _DtLimiteInscriptionF,
                                                    minimum: _Minimum,
                                                    maximum: _Maximum,
                                                    prix: _Prix,
                                                    duree: _Duree,
                                                    logo: _Logo,
                                                    photo: _Photo,
                                                    bandeau: _Bandeau,
                                                    lien: _Lien,
                                                    typologieId: _TypologieId,
                                                    evenementParentId: _EvenementParentId
                                                );


            //if ((_Plannings != null) && (_Plannings.Count > 0))
            //{
            //    foreach (Planning _Current in _Plannings)
            //    {

            //        DateTime? _JourF = null;
            //        if (!String.IsNullOrEmpty(_Current.Jour)) { _JourF = DateTime.Parse(_Current.Jour); }

            //        _ReturnValue = DB.UpdPlanning(
            //            id: _Current.Id,
            //            jour: _JourF,
            //            creneau0809: _Current.Creneau0809,
            //            creneau0910: _Current.Creneau0910,
            //            creneau1011: _Current.Creneau1011,
            //            creneau1112: _Current.Creneau1112,
            //            creneau1213: _Current.Creneau1213,
            //            creneau1314: _Current.Creneau1314,
            //            creneau1415: _Current.Creneau1415,
            //            creneau1516: _Current.Creneau1516,
            //            creneau1617: _Current.Creneau1617,
            //            creneau1718: _Current.Creneau1718
            //        );
            //    }
            //}

            return _ReturnValue;
        }


        public static Int32? AddEvenement(
                                            Int32? _Id = null,
                                            String _Libelle = null,
                                            String _Descriptif = null,
                                            Int32? _Minimum = null,
                                            Int32? _Maximum = null,
                                            Double? _Prix = null,
                                            Double? _Duree = null,
                                            String _DtDebut = null,
                                            String _DtFin = null,
                                            String _DtLimiteInscription = null,
                                            String _Logo = null,
                                            String _Photo = null,
                                            String _Bandeau = null,
                                            String _Lien = null,
                                            Int32? _TypologieId = null,
                                            Int32? _EvenementParentId = null,
                                            List<Planning> _Plannings = null
                                    )
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtDebutF = null;
            if (!String.IsNullOrEmpty(_DtDebut)) { _DtDebutF = DateTime.Parse(_DtDebut); }
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_DtFin)) { _DtFinF = DateTime.Parse(_DtFin); }
            DateTime? _DtLimiteInscriptionF = null;
            if (!String.IsNullOrEmpty(_DtLimiteInscription)) { _DtLimiteInscriptionF = DateTime.Parse(_DtLimiteInscription); }

            Int32? _ReturnValue = _DB.AddEvenement(
                                                    id: _Id,
                                                    libelle: _Libelle.ToLower().Accents().ToUpper().Trim(),
                                                    descriptif: _Descriptif,
                                                    dtDebut: _DtDebutF,
                                                    dtFin: _DtFinF,
                                                    dtLimiteInscription: _DtLimiteInscriptionF,
                                                    minimum: _Minimum,
                                                    maximum: _Maximum,
                                                    prix: _Prix,
                                                    duree: _Duree,
                                                    logo: _Logo,
                                                    photo: _Photo,
                                                    bandeau: _Bandeau,
                                                    lien: _Lien,
                                                    typologieId: _TypologieId,
                                                    evenementParentId: _EvenementParentId
                                                );
            //if ((_Plannings != null) && (_Plannings.Count > 0))
            //{
            //    foreach (Planning _Current in _Plannings)
            //    {

            //        DateTime? _JourF = null;
            //        if (!String.IsNullOrEmpty(_Current.Jour)) { _JourF = DateTime.Parse(_Current.Jour); }

            //        _ReturnValue = DB.UpdPlanning(
            //            id: _Current.Id,
            //            jour: _JourF,
            //            creneau0809: _Current.Creneau0809,
            //            creneau0910: _Current.Creneau0910,
            //            creneau1011: _Current.Creneau1011,
            //            creneau1112: _Current.Creneau1112,
            //            creneau1213: _Current.Creneau1213,
            //            creneau1314: _Current.Creneau1314,
            //            creneau1415: _Current.Creneau1415,
            //            creneau1516: _Current.Creneau1516,
            //            creneau1617: _Current.Creneau1617,
            //            creneau1718: _Current.Creneau1718
            //        );
            //    }
            //}

            return _ReturnValue;

        }












        public static List<Planning> GetPlanningsFront(Int32? _EvenementId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<PlanningResult> _PlanningResults = _DB.GetPlanningsFront(_EvenementId).ToList();

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

            return _Plannings;
        }


        public static List<Planning> GetPlanningsBack(Int32? _Mois = null, Int32? _Annee = null, Int32? _Plus = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<PlanningResult> _PlanningResults = _DB.GetPlanningsBack(_Mois, _Annee, _Plus).ToList();

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

            return _Plannings;
        }





        public static Int32? UpdPlannings(List<Planning> _Plannings)
        {
            Int32? _ReturnValue = null;
            if ((_Plannings != null) && (_Plannings.Count > 0))
            {
                foreach(Planning _Current in _Plannings)
                {
                    _ReturnValue = UpdPlanning(
                                        _Id: _Current.Id,
                                        _Jour: _Current.Jour,
                                        _Creneau0809: _Current.Creneau0809,
                                        _Creneau0910: _Current.Creneau0910,
                                        _Creneau1011: _Current.Creneau1011,
                                        _Creneau1112: _Current.Creneau1112,
                                        _Creneau1213: _Current.Creneau1213,
                                        _Creneau1314: _Current.Creneau1314,
                                        _Creneau1415: _Current.Creneau1415,
                                        _Creneau1516: _Current.Creneau1516,
                                        _Creneau1617: _Current.Creneau1617,
                                        _Creneau1718: _Current.Creneau1718
                        );
                }
            }
            return _ReturnValue;
        }
        


        public static Int32? UpdPlanning(
                                    Int32? _Id = null,
                                    String _Jour = null, 
                                    String _Creneau0809 = null,
                                    String _Creneau0910 = null,
                                    String _Creneau1011 = null,
                                    String _Creneau1112 = null,
                                    String _Creneau1213 = null,
                                    String _Creneau1314 = null,
                                    String _Creneau1415 = null,
                                    String _Creneau1516 = null,
                                    String _Creneau1617 = null,
                                    String _Creneau1718 = null
                                )
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _JourF = null;
            if (!String.IsNullOrEmpty(_Jour)) { _JourF = DateTime.Parse(_Jour); }

            return _DB.UpdPlanning(
                                    id: _Id,
                                    jour: _JourF,
                                    creneau0809: _Creneau0809,
                                    creneau0910: _Creneau0910,
                                    creneau1011: _Creneau1011,
                                    creneau1112: _Creneau1112,
                                    creneau1213: _Creneau1213,
                                    creneau1314: _Creneau1314,
                                    creneau1415: _Creneau1415,
                                    creneau1516: _Creneau1516,
                                    creneau1617: _Creneau1617,
                                    creneau1718: _Creneau1718
                                );
        }


    }
}