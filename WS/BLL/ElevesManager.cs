using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;



namespace WS.BLL
{
    public static class ElevesManager
    {

     
        public static List<Eleve> GetEleves(Int32? _Id = null, String _Nom = null, String _Prenom = null, String _Email = null, String _Club = null, String _License = null, Int32? _EvenementId = null, Int32? _TypologieId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<EleveResult> _EleveResults = _DB.GetEleves(
                                    id: (_Id == null ? -1 : _Id),
                                    nom: (String.IsNullOrEmpty(_Nom) ? null : _Nom),
                                    prenom: (String.IsNullOrEmpty(_Prenom) ? null : _Prenom),
                                    email: (String.IsNullOrEmpty(_Email) ? null : _Email),
                                    club: (String.IsNullOrEmpty(_Club) ? null : _Club),
                                    license: (String.IsNullOrEmpty(_License) ? null : _License),
                                    evenementId: (_EvenementId == null ? -1 : _EvenementId),
                                    typologieId: (_TypologieId == null ? -1 : _TypologieId)
                               ).ToList();

            List<Eleve> _Eleves = new List<Eleve>();
            foreach (EleveResult _Current in _EleveResults)
            {

                Eleve _NewEleve = new Eleve();
                _NewEleve.Id = Int32.Parse(_Current.Id.ToString());
                _NewEleve.Nom = (!String.IsNullOrEmpty(_Current.Nom) ? _Current.Nom.Trim() : null);
                _NewEleve.Prenom = (!String.IsNullOrEmpty(_Current.Prenom) ? _Current.Prenom.Trim() : null);
                _NewEleve.Email = (!String.IsNullOrEmpty(_Current.Email) ? _Current.Email.Trim() : null);

                _NewEleve.Password = (!String.IsNullOrEmpty(_Current.Password) ? _Current.Password.ToDecodedURL().ToDecryptedTripleDES(Constants.PASSPHRASE).Trim() : null);

                _NewEleve.DtNaissance = (!String.IsNullOrEmpty(_Current.DtNaissance) ? _Current.DtNaissance.Trim() : null);
                _NewEleve.Sexe = (!String.IsNullOrEmpty(_Current.Sexe) ? _Current.Sexe.Trim() : null);
                _NewEleve.Club = (!String.IsNullOrEmpty(_Current.Club) ? _Current.Club.Trim() : null);
                _NewEleve.Photo = (!String.IsNullOrEmpty(_Current.Photo) ? _Current.Photo.Trim() : null);
                _NewEleve.Fixe = (!String.IsNullOrEmpty(_Current.Fixe) ? _Current.Fixe.Trim() : null);
                _NewEleve.Portable = (!String.IsNullOrEmpty(_Current.Portable) ? _Current.Portable.Trim() : null);
                _NewEleve.Commentaire = (!String.IsNullOrEmpty(_Current.Commentaire) ? _Current.Commentaire.Trim() : null);
                _NewEleve.License = (!String.IsNullOrEmpty(_Current.License) ? _Current.License.Trim() : null);
                _NewEleve.Classement = (!String.IsNullOrEmpty(_Current.Classement) ? _Current.Classement.Trim() : null);

                _NewEleve.Suivi = (!String.IsNullOrEmpty(_Current.Suivi) ? _Current.Suivi.Trim() : null);

                _NewEleve.NbCommandes = _Current.NbCommandes;
                _NewEleve.NbStages = _Current.NbStages;
                _NewEleve.NbCours = _Current.NbCours;
                _NewEleve.NbTournois = _Current.NbTournois;

                _NewEleve.Administration = _Current.Administration;


                //récupération des réservations de l'élève
                _NewEleve.Reservations = new List<Reservation>();
                List<ReservationResult> _ReservationResults = _DB.GetReservations(eleveId: _NewEleve.Id, evenementId: null).ToList();
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

                    _NewReservation.PaymentId = _CurrentR.PaymentId;

                    _NewEleve.Reservations.Add(_NewReservation);
                }


                //récupération des participations de l'élève
                _NewEleve.Participations = new List<Participation>();
                List<ParticipationResult> _ParticipationResults = _DB.GetParticipations(eleveId: _NewEleve.Id, evenementId: null).ToList();

                foreach (ParticipationResult _CurrentP in _ParticipationResults)
                {
                    Participation _NewParticipation = new Participation();
                    _NewParticipation.Id = _CurrentP.Id;
                    _NewParticipation.Quantite = _CurrentP.Quantite;

                    _NewParticipation.Eleve = new Eleve();
                    _NewParticipation.Eleve.Id = Int32.Parse(_CurrentP.EleveId.ToString());
                    _NewParticipation.Eleve.Nom = _CurrentP.Nom.Trim();
                    _NewParticipation.Eleve.Prenom = _CurrentP.Prenom.Trim();

                    _NewParticipation.Evenement = new Evenement();
                    _NewParticipation.Evenement.Id = Int32.Parse(_CurrentP.EvenementId.ToString());
                    _NewParticipation.Evenement.Libelle = _CurrentP.EvenementLibelle.Trim();
                    _NewParticipation.Evenement.Typologie.Id = _CurrentP.TypologieId;
                    _NewParticipation.Evenement.Typologie.Libelle = _CurrentP.TypologieLibelle;
                    _NewParticipation.Evenement.DtDebut = _CurrentP.DtDebut;
                    _NewParticipation.Evenement.DtFin = _CurrentP.DtFin;
                    _NewParticipation.Evenement.Duree = _CurrentP.Duree;
                    if (_CurrentP.EvenementParentId != null) {
                        _NewParticipation.Evenement.EvenementParent = new Evenement();
                        _NewParticipation.Evenement.EvenementParent.Id = _CurrentP.EvenementParentId;
                    }

                    _NewEleve.Participations.Add(_NewParticipation);
                }


                //récupération des commandes de l'élève
                _NewEleve.Commandes = CommandesManager.GetCommmandes(_EleveId: _NewEleve.Id);



                _Eleves.Add(_NewEleve);


            }

            return _Eleves;
        }



        public static Int32? ConnectEleve(String _Email = null, String _Password = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            ObjectResult<Int32?> _IdResult = _DB.ConnectEleve(
                                    email: _Email.Trim(),
                                    password: _Password.Trim().ToEncryptedTripleDES(Constants.PASSPHRASE).ToEncodedURL()
                               );
            Int32? _Id = null;
            try
            {
                _Id = _IdResult.FirstOrDefault().Value; //identifiants ok
            }
            catch (Exception)
            {
                //identifiants ko
            }

            return _Id;
        }


        public static Int32? ReinitEleve(String _Email = null, String _Password = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            if (String.IsNullOrEmpty(_Password)) { _Password = Tools.RandomString(8, true); }

            return _DB.ReinitEleve(
                                    email: _Email.Trim(),
                                    password: _Password.Trim().ToEncryptedTripleDES(Constants.PASSPHRASE).ToEncodedURL()
                               );
        }





        public static Int32? DelEleve(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelEleve(_Id, _Real);

        }



        public static Int32? UpdEleve(
                                        Int32? _Id = null,
                                        String _Nom = null,
                                        String _Prenom = null,
                                        String _Email = null,
                                        String _Password = null,
                                        String _DtNaissance = null,
                                        String _Sexe = null,
                                        String _Club = null,
                                        String _Photo = null,
                                        String _Fixe = null,
                                        String _Portable = null,
                                        String _Commentaire = null,
                                        String _License = null,
                                        String _Classement = null,
                                        String _Suivi = null
                                )
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtNaissanceF = null;
            if (!String.IsNullOrEmpty(_DtNaissance)) { _DtNaissanceF = DateTime.Parse(_DtNaissance); }

            String _CryptedPassword = null;
            if (!String.IsNullOrEmpty(_Password)) { _CryptedPassword = _Password.Trim().ToEncryptedTripleDES(Constants.PASSPHRASE).ToEncodedURL(); }

            Int32 _Test = _DB.UpdEleve(
                                    id: _Id,
                                    nom: (!String.IsNullOrEmpty(_Nom) ? _Nom.Trim() : null),
                                    prenom: (!String.IsNullOrEmpty(_Prenom) ? _Prenom.Trim() : null),
                                    dtNaissance: _DtNaissanceF,
                                    sexe: (!String.IsNullOrEmpty(_Sexe) ? _Sexe.Trim() : null),
                                    club: (!String.IsNullOrEmpty(_Club) ? _Club.Trim() : null),
                                    photo: (!String.IsNullOrEmpty(_Photo) ? _Photo.Trim() : null),
                                    email: (!String.IsNullOrEmpty(_Email) ? _Email.Trim() : null),
                                    password: _CryptedPassword,
                                    fixe: (!String.IsNullOrEmpty(_Fixe) ? _Fixe.Trim() : null),
                                    portable: (!String.IsNullOrEmpty(_Portable) ? _Portable.Trim() : null),
                                    commentaire: (!String.IsNullOrEmpty(_Commentaire) ? _Commentaire.Trim() : null),
                                    license: (!String.IsNullOrEmpty(_License) ? _License.Trim() : null),
                                    classement: (!String.IsNullOrEmpty(_Classement) ? _Classement.Trim() : null),
                                    suivi: (!String.IsNullOrEmpty(_Suivi) ? _Suivi.Trim() : null)
                             );

            return _Test;

        }



        public static Int32? AddEleve(
                                       String _Nom = null,
                                       String _Prenom = null,
                                       String _Email = null,
                                       String _Password = null,
                                       String _DtNaissance = null,
                                       String _Sexe = null,
                                       String _Club = null,
                                       String _Photo = null,
                                       String _Fixe = null,
                                       String _Portable = null,
                                       String _Commentaire = null,
                                       String _License = null,
                                       String _Classement = null,
                                       String _Suivi = null
                               )
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtNaissanceF = null;
            if (!String.IsNullOrEmpty(_DtNaissance)) { _DtNaissanceF = DateTime.Parse(_DtNaissance); }

            String _CryptedPassword = null;
            if (!String.IsNullOrEmpty(_Password)) { _CryptedPassword = _Password.Trim().ToEncryptedTripleDES(Constants.PASSPHRASE).ToEncodedURL(); }

            ObjectResult<Int32?> _IdResult = _DB.AddEleve(
                                    nom: (!String.IsNullOrEmpty(_Nom) ? _Nom.Trim() : null),
                                    prenom: (!String.IsNullOrEmpty(_Prenom) ? _Prenom.Trim() : null),
                                    dtNaissance: _DtNaissanceF,
                                    sexe: (!String.IsNullOrEmpty(_Sexe) ? _Sexe.Trim() : null),
                                    club: (!String.IsNullOrEmpty(_Club) ? _Club.Trim() : null),
                                    photo: (!String.IsNullOrEmpty(_Photo) ? _Photo.Trim() : null),
                                    email: (!String.IsNullOrEmpty(_Email) ? _Email.Trim() : null),
                                    password: _CryptedPassword,
                                    fixe: (!String.IsNullOrEmpty(_Fixe) ? _Fixe.Trim() : null),
                                    portable: (!String.IsNullOrEmpty(_Portable) ? _Portable.Trim() : null),
                                    commentaire: (!String.IsNullOrEmpty(_Commentaire) ? _Commentaire.Trim() : null),
                                    license: (!String.IsNullOrEmpty(_License) ? _License.Trim() : null),
                                    classement: (!String.IsNullOrEmpty(_Classement) ? _Classement.Trim() : null),
                                    suivi: (!String.IsNullOrEmpty(_Suivi) ? _Suivi.Trim() : null)
                              );

            //je n'arrive pas à récupérer l'id de l'élève créé, je vais donc utiliser la procédure pour connecter l'élève
            _IdResult = _DB.ConnectEleve(
                                    email: _Email.Trim(),
                                    password: _Password.Trim().ToEncryptedTripleDES(Constants.PASSPHRASE).ToEncodedURL()
                               );
            Int32? _Id = null;
            try
            {
                _Id = _IdResult.FirstOrDefault().Value; //identifiants ok
            }
            catch (Exception)
            {
                //identifiants ko
            }

            return _Id;

        }








        public static Int32? AddParticipation(Int32? _EleveId = null, Int32? _EvenementId = null, Double? _Quantite = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.AddParticipation(
                                            eleveId: _EleveId,
                                            evenementId: _EvenementId,
                                            quantite: _Quantite);
        }
        
        public static Int32? UpdParticipation(Int32? _Id = null, Int32? _Quantite = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.UpdParticipation(_Id, _Quantite);
        }
               
        public static Int32? DelParticipation(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelParticipation(_Id, _Real);
        }





        public static Int32? AddAllReservations(Int32? _EleveId = null, Int32? _EvenementId = null, String _PaymentId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.AddAllReservations(
                                            eleveId: _EleveId,
                                            evenementId:_EvenementId,
                                            paymentId: _PaymentId
                                         );
        }

        public static Int32? AddReservations(List<Reservation> _Reservations)
        {
            Int32? _ReturnValue = null;
            if ((_Reservations != null) && (_Reservations.Count > 0))
            {
                foreach (Reservation _Current in _Reservations)
                {
                    _ReturnValue = AddReservation(
                                                    _EleveId: _Current.Eleve.Id,
                                                    _EvenementId: _Current.Evenement.Id,
                                                    _Jour: _Current.Jour,
                                                    _Creneau: _Current.Creneau,
                                                    _PaymentId: _Current.PaymentId
                                                );
                }
            }
            return _ReturnValue;
        }

        public static Int32? AddReservation(Int32? _EleveId = null, Int32? _EvenementId = null, String _Jour = null, String _Creneau = null, String _PaymentId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _JourF = null;
            if (!String.IsNullOrEmpty(_Jour)) { _JourF = DateTime.Parse(_Jour); }

            return _DB.AddReservation(
                                        eleveId: _EleveId,
                                        evenementId: _EvenementId,
                                        jour: _JourF,
                                        creneau: _Creneau,
                                        paymentId: _PaymentId
                                    );
        }

        public static Int32? DelReservation(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelReservation(_Id, _Real);
        }




    }
}