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

            //envoi du mail de reinitialisation
            #region "Mail"
            String _EmailReinitialisation = String.Empty;
            _EmailReinitialisation += "<html>";
            _EmailReinitialisation += "<body>";
            _EmailReinitialisation += "<img src=\"http://www.cavalier-roi.fr/Content/Images/LogoMail.jpg\" />";
            _EmailReinitialisation += "<br /><hr /><br />";
            _EmailReinitialisation += "Votre mot de passe a bien été réinitialisé !";
            _EmailReinitialisation += "<br /><br />";
            _EmailReinitialisation += "<u>Email/Identifiant</u> : " + _Email;
            _EmailReinitialisation += "<br />";
            _EmailReinitialisation += "<u>Nouveau mot de passe</u> : " + _Password;
            _EmailReinitialisation += "<br /><br />";
            _EmailReinitialisation += "Pensez à bien le changer à votre prochaine connexion dans la partie \"Mon Compte\" du site de l'École du Cavalier Roi : <a href=\"" + WS.Constants.SITE_URL + "/MonCompte\" target=\"_blank\">" + WS.Constants.SITE_URL + "/MonCompte</a>.";
            _EmailReinitialisation += "<br /><br />";
            _EmailReinitialisation += "Pour plus d'informations, n'hésitez pas à contacter l'École du Cavalier Roi à <a href=\"mailto:" + WS.Constants.INSCRIPTIONS_EMAIL + "\" target=\"_blank\">" + WS.Constants.INSCRIPTIONS_EMAIL + "</a>.";
            _EmailReinitialisation += "<br /><br />";
            _EmailReinitialisation += "L'École du Cavalier Roi";
            _EmailReinitialisation += "<br /><br />";
            _EmailReinitialisation += "</body>";
            _EmailReinitialisation += "</html>";
            ICSManager.SendMail(WS.Constants.INSCRIPTIONS_EMAIL, WS.Constants.INSCRIPTIONS_SENDER, _Email, WS.Constants.INSCRIPTIONS_CC, WS.Constants.INSCRIPTIONS_CCI, "Réinitialisation de mot de passe", _EmailReinitialisation, true, null, null, WS.Constants.MAILSERVER_HOST, WS.Constants.MAILSERVER_PORT, WS.Constants.INSCRIPTIONS_USERNAME, WS.Constants.INSCRIPTIONS_PASSWORD, 100000, false);
            #endregion

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
                                        String _Suivi = null,
                                        Boolean? _SendMail = false
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

            //envoi du mail de récapitulation
            #region "Mail"
            if (_SendMail == true)
            {
                String _EmailModification = String.Empty;
                _EmailModification += "<html>";
                _EmailModification += "<body>";
                _EmailModification += "<img src=\"http://www.cavalier-roi.fr/Content/Images/LogoMail.jpg\" />";
                _EmailModification += "<br /><hr /><br />";
                _EmailModification += "La modification de vos informations personnelles a bien été prise en compte !";
                _EmailModification += "<br /><br />";
                _EmailModification += "<u>Email/Identifiant</u> : " + _Email;
                _EmailModification += "<br />";
                _EmailModification += "<u>Mot de passe</u> : *************";
                _EmailModification += "<br />";
                _EmailModification += "<u>Nom</u> : " + (!String.IsNullOrEmpty(_Nom) ? _Nom.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Prénom</u> : " + (!String.IsNullOrEmpty(_Prenom) ? _Prenom.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Date de naissance</u> : " + (!String.IsNullOrEmpty(_DtNaissance) ? _DtNaissance.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Sexe</u> : " + (!String.IsNullOrEmpty(_Sexe) ? _Sexe.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Fixe</u> : " + (!String.IsNullOrEmpty(_Fixe) ? _Fixe.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Portable</u> : " + (!String.IsNullOrEmpty(_Portable) ? _Portable.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>License</u> : " + (!String.IsNullOrEmpty(_License) ? _License.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Classement</u> : " + (!String.IsNullOrEmpty(_Classement) ? _Classement.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<u>Club</u> : " + (!String.IsNullOrEmpty(_Club) ? _Club.Trim() : "-");
                _EmailModification += "<br />";
                _EmailModification += "<br />";
                _EmailModification += "Pour plus d'informations, n'hésitez pas à contacter l'École du Cavalier Roi à <a href=\"mailto:" + WS.Constants.INSCRIPTIONS_EMAIL + "\" target=\"_blank\">" + WS.Constants.INSCRIPTIONS_EMAIL + "</a>.";
                _EmailModification += "<br /><br />";
                _EmailModification += "L'École du Cavalier Roi";
                _EmailModification += "<br /><br />";
                _EmailModification += "</body>";
                _EmailModification += "</html>";
                ICSManager.SendMail(WS.Constants.INSCRIPTIONS_EMAIL, WS.Constants.INSCRIPTIONS_SENDER, _Email, WS.Constants.INSCRIPTIONS_CC, WS.Constants.INSCRIPTIONS_CCI, "Modification des informations personnelles", _EmailModification, true, null, null, WS.Constants.MAILSERVER_HOST, WS.Constants.MAILSERVER_PORT, WS.Constants.INSCRIPTIONS_USERNAME, WS.Constants.INSCRIPTIONS_PASSWORD, 100000, false);
            }
            #endregion

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
            Int32? _Id = _IdResult.FirstOrDefault().Value;

            //envoi du mail de récapitulation
            #region "Mail"
            String _EmailRecapitulation = String.Empty;
            _EmailRecapitulation += "<html>";
            _EmailRecapitulation += "<body>";
            _EmailRecapitulation += "<img src=\"http://www.cavalier-roi.fr/Content/Images/LogoMail.jpg\" />";
            _EmailRecapitulation += "<br /><hr /><br />";
            _EmailRecapitulation += "Votre inscription a bien été prise en compte !";
            _EmailRecapitulation += "<br /><br />";
            _EmailRecapitulation += "<u>Email/Identifiant</u> : " + _Email;
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Mot de passe</u> : *************";
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Nom</u> : " + (!String.IsNullOrEmpty(_Nom) ? _Nom.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Prénom</u> : " + (!String.IsNullOrEmpty(_Prenom) ? _Prenom.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Date de naissance</u> : " + (!String.IsNullOrEmpty(_DtNaissance) ? _DtNaissance.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Sexe</u> : " + (!String.IsNullOrEmpty(_Sexe) ? _Sexe.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Fixe</u> : " + (!String.IsNullOrEmpty(_Fixe) ? _Fixe.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Portable</u> : " + (!String.IsNullOrEmpty(_Portable) ? _Portable.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>License</u> : " + (!String.IsNullOrEmpty(_License) ? _License.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Classement</u> : " + (!String.IsNullOrEmpty(_Classement) ? _Classement.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Club</u> : " + (!String.IsNullOrEmpty(_Club) ? _Club.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<u>Commentaire</u> : " + (!String.IsNullOrEmpty(_Commentaire) ? _Commentaire.Trim() : "-");
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "<br />";
            _EmailRecapitulation += "Pour plus d'informations, n'hésitez pas à contacter l'École du Cavalier Roi à <a href=\"mailto:" + WS.Constants.INSCRIPTIONS_EMAIL + "\" target=\"_blank\">" + WS.Constants.INSCRIPTIONS_EMAIL + "</a>.";
            _EmailRecapitulation += "<br /><br />";
            _EmailRecapitulation += "L'École du Cavalier Roi";
            _EmailRecapitulation += "<br /><br />";
            _EmailRecapitulation += "</body>";
            _EmailRecapitulation += "</html>";
            ICSManager.SendMail(WS.Constants.INSCRIPTIONS_EMAIL, WS.Constants.INSCRIPTIONS_SENDER, _Email, WS.Constants.INSCRIPTIONS_CC, WS.Constants.INSCRIPTIONS_CCI, "Confirmation d'inscription", _EmailRecapitulation, true, null, null, WS.Constants.MAILSERVER_HOST, WS.Constants.MAILSERVER_PORT, WS.Constants.INSCRIPTIONS_USERNAME, WS.Constants.INSCRIPTIONS_PASSWORD, 100000, false);
            #endregion

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

            //récupération de l'évènement
            Evenement _Evenement = EvenementsManager.GetEvenements(_Id: _EvenementId)[0];

            //récupération du planning pour créer toutes les réservations
            List<PlanningOnly> _Plannings = EvenementsManager.GetPlanningsOnly(_EvenementId: _EvenementId);

            List<Reservation> _AllReservations = new List<Reservation>();
            foreach (PlanningOnly _Current in _Plannings)
            {
                Reservation _NewReservation = new Reservation();
                _NewReservation.Eleve = new Eleve();
                _NewReservation.Eleve.Id = _EleveId;
                _NewReservation.Evenement = new Evenement();
                _NewReservation.Evenement.Id = _EvenementId;
                _NewReservation.PaymentId = _PaymentId;
                _NewReservation.Jour = _Current.Jour;
                _NewReservation.Creneau = _Current.Creneau;
                _AllReservations.Add(_NewReservation);
            }

            return AddReservations(_AllReservations);

            //return _DB.AddAllReservations(
            //                                eleveId: _EleveId,
            //                                evenementId:_EvenementId,
            //                                paymentId: (String.IsNullOrEmpty(_PaymentId) ? null : _PaymentId)
            //                             );
        }

        public static Int32? AddReservations(List<Reservation> _Reservations)
        {
            Int32? _ReturnValue = null;
            if ((_Reservations != null) && (_Reservations.Count > 0))
            {

                //récupération de l'évènement
                Evenement _Evenement = EvenementsManager.GetEvenements(_Id: _Reservations[0].Evenement.Id)[0];

                //récupération de l'élève
                Eleve _Eleve = ElevesManager.GetEleves(_Id: _Reservations[0].Eleve.Id)[0];

                //insertion des réservations en base
                List<ICalendar> _Invitations = new List<ICalendar>();
                foreach (Reservation _Current in _Reservations)
                {
                    _ReturnValue = ElevesManager.AddReservation(
                                                    _EleveId: _Current.Eleve.Id,
                                                    _EvenementId: _Current.Evenement.Id,
                                                    _Jour: _Current.Jour,
                                                    _Creneau: _Current.Creneau,
                                                    _PaymentId: (String.IsNullOrEmpty(_Current.PaymentId) ? null : _Current.PaymentId)
                                                );
                }

                //envoi du mail de confirmation
                #region "Mail"
                String _EmailReservation = String.Empty;
                _EmailReservation += "<html>";
                _EmailReservation += "<body>";
                _EmailReservation += "<img src=\"http://www.cavalier-roi.fr/Content/Images/LogoMail.jpg\" />";
                _EmailReservation += "<br /><hr /><br />";

                if (_Evenement.Typologie.Id == 3) //cours
                {
                    if (String.IsNullOrEmpty(_Reservations[0].PaymentId))
                    {
                        _EmailReservation += "Votre inscription à cette formule de cours a bien été prise en compte et vos réservations ont bien été enregistrées !";
                    }
                    else if (_Reservations[0].PaymentId == "KO")
                    {
                        _EmailReservation += "Votre inscription à cette formule de cours a bien été prise en compte, vos réservations ont bien été enregistrées mais votre paiement a rencontré un problème !";
                    }
                    else if (_Reservations[0].PaymentId == "MON COMPTE")
                    {
                        _EmailReservation += "Vos réservations ont bien été enregistrées !";
                    }
                    else
                    {
                        _EmailReservation += "Votre inscription à cette formule de cours a bien été prise en compte, vos réservations ont bien été enregistrées et votre paiement a bien été effectué !";
                    }
                }
                else if (_Evenement.Typologie.Id == 1) //tournois
                {
                    if (String.IsNullOrEmpty(_Reservations[0].PaymentId))
                    {
                        _EmailReservation += "Votre participation à cet évènement a bien été prise en compte !";
                    }
                    else if (_Reservations[0].PaymentId == "KO")
                    {
                        _EmailReservation += "Votre participation à cet évènement a bien été prise en compte mais votre paiement a rencontré un problème !";
                    }
                    else
                    {
                        _EmailReservation += "Votre participation à cet évènement a bien été prise en compte et votre paiement a bien été effectué !";
                    }
                }
                else if (_Evenement.Typologie.Id == 0) //stages
                {
                    if ((_Evenement.Prix == null) || ((_Evenement.Prix != null) && (_Evenement.Prix == 0))) //stage gratuit : formule complete
                    {
                        if (_Evenement.EvenementParent == null) //stage "parent" : formule complete
                        {
                            _EmailReservation += "Votre inscription à cette formule de stage gratuite a bien été prise en compte !";
                        }
                        else //stage "enfant" : formule partielle (avec choix de réservations)
                        {
                            _EmailReservation += "Votre inscription à cette formule de stage gratuite a bien été prise en compte et vos réservations ont bien été enregistrées !";
                        }
                    }
                    else
                    {
                        if (_Evenement.EvenementParent == null) //stage "parent" : formule complete
                        {
                            if (String.IsNullOrEmpty(_Reservations[0].PaymentId))
                            {
                                _EmailReservation += "Votre inscription à cette formule de stage a bien été prise en compte !";
                            }
                            else if (_Reservations[0].PaymentId == "KO")
                            {
                                _EmailReservation += "Votre inscription à cette formule de stage a bien été prise en compte mais votre paiement a rencontré un problème !";
                            }
                            else
                            {
                                _EmailReservation += "Votre inscription à cette formule de stage a bien été prise en compte et votre paiement a bien été effectué !";
                            }
                        }
                        else //stage "enfant" : formule partielle (avec choix de réservations)
                        {
                            if (String.IsNullOrEmpty(_Reservations[0].PaymentId))
                            {
                                _EmailReservation += "Votre inscription à cette formule de stage a bien été prise en compte et vos réservations ont bien été enregistrées !";
                            }
                            else if (_Reservations[0].PaymentId == "KO")
                            {
                                _EmailReservation += "Votre inscription à cette formule de stage a bien été prise en compte, vos réservations ont bien été enregistrées mais votre paiement a rencontré un problème !";
                            }
                            else
                            {
                                _EmailReservation += "Votre inscription à cette formule de stage a bien été prise en compte, vos réservations ont bien été enregistrées et votre paiement a bien été effectué !";
                            }
                        }
                    }
                }
                _EmailReservation += "<br /><br />";
                _EmailReservation += _Evenement.Libelle;
                _EmailReservation += "<br />";
                _EmailReservation += "<table cellpadding=\"2\" cellspacing=\"2\" border=\"1\">";
                _EmailReservation += "<tr>";
                _EmailReservation += "     <th>Jour</th>";
                _EmailReservation += "     <th>Heure de début</th>";
                _EmailReservation += "     <th>Heure de fin</th>";

                if (_Evenement.Typologie.Id == 3) //cours
                {
                    foreach (Reservation _Current in _Reservations)
                    {
                        String _HeureDebut = _Current.Creneau.Replace("Creneau", "").Left(2) + ":00:00";
                        String _HeureFin = _Current.Creneau.Replace("Creneau", "").Right(2) + ":00:00";

                        //création du ICS à envoyer
                        ICalendar _NewICalendar = new ICalendar
                        {
                            EventStartDateTime = Convert.ToDateTime(_Current.Jour + " " + _HeureDebut),
                            EventEndDateTime = Convert.ToDateTime(_Current.Jour + " " + _HeureFin),
                            UID = Guid.NewGuid().ToString(),
                            EventOrganizer = WS.Constants.COMMANDES_SENDER,
                            EventPriority = "0",
                            EventSummary = _Evenement.Libelle,
                            EventDescription = _Evenement.Descriptif
                        };
                        _Invitations.Add(_NewICalendar);

                        //création de la ligne du tableau
                        _EmailReservation += "<tr>";
                        _EmailReservation += "     <td>" + _Current.Jour + "</td>";
                        _EmailReservation += "     <td>" + _HeureDebut + "</td>";
                        _EmailReservation += "     <td>" + _HeureFin + "</td>";
                        _EmailReservation += "</tr>";
                    }
                }
                else if (_Evenement.Typologie.Id == 1) //tournois
                {
                    String _Jour = String.Empty;
                    foreach (Reservation _Current in _Reservations)
                    {
                        if (_Jour != _Current.Jour)
                        {
                            _Jour = _Current.Jour;
                            String _HeureDebut = (_Reservations.FindAll(p => p.Jour == _Jour).OrderBy(p => p.Creneau).FirstOrDefault().Creneau.Replace("Creneau", "").Left(2) + ":00:00");
                            String _HeureFin = (_Reservations.FindAll(p => p.Jour == _Jour).OrderByDescending(p => p.Creneau).FirstOrDefault().Creneau.Replace("Creneau", "").Right(2) + ":00:00");

                            //création du ICS à envoyer
                            ICalendar _NewICalendar = new ICalendar
                            {
                                EventStartDateTime = Convert.ToDateTime(_Current.Jour + " " + _HeureDebut),
                                EventEndDateTime = Convert.ToDateTime(_Current.Jour + " " + _HeureFin),
                                UID = Guid.NewGuid().ToString(),
                                EventOrganizer = WS.Constants.COMMANDES_SENDER,
                                EventPriority = "0",
                                EventSummary = _Evenement.Libelle,
                                EventDescription = _Evenement.Descriptif
                            };
                            _Invitations.Add(_NewICalendar);

                            //création de la ligne du tableau
                            _EmailReservation += "<tr>";
                            _EmailReservation += "     <td>" + _Jour + "</td>";
                            _EmailReservation += "     <td>" + _HeureDebut + "</td>";
                            _EmailReservation += "     <td>" + _HeureFin + "</td>";
                            _EmailReservation += "</tr>";

                        }
                    }
                }
                else if (_Evenement.Typologie.Id == 0) //stages
                {
                    String _Jour = String.Empty;
                    foreach (Reservation _Current in _Reservations)
                    {
                        if (_Jour != _Current.Jour)
                        {
                            _Jour = _Current.Jour;
                            String _HeureDebut = (_Reservations.FindAll(p => p.Jour == _Jour).OrderBy(p => p.Creneau).FirstOrDefault().Creneau.Replace("Creneau", "").Left(2) + ":00:00");
                            String _HeureFin = (_Reservations.FindAll(p => p.Jour == _Jour).OrderByDescending(p => p.Creneau).FirstOrDefault().Creneau.Replace("Creneau", "").Right(2) + ":00:00");

                            //création du ICS à envoyer
                            ICalendar _NewICalendar = new ICalendar
                            {
                                EventStartDateTime = Convert.ToDateTime(_Current.Jour + " " + _HeureDebut),
                                EventEndDateTime = Convert.ToDateTime(_Current.Jour + " " + _HeureFin),
                                UID = Guid.NewGuid().ToString(),
                                EventOrganizer = WS.Constants.COMMANDES_SENDER,
                                EventPriority = "0",
                                EventSummary = _Evenement.Libelle,
                                EventDescription = _Evenement.Descriptif
                            };
                            _Invitations.Add(_NewICalendar);

                            //création de la ligne du tableau
                            _EmailReservation += "<tr>";
                            _EmailReservation += "     <td>" + _Jour + "</td>";
                            _EmailReservation += "     <td>" + _HeureDebut + "</td>";
                            _EmailReservation += "     <td>" + _HeureFin + "</td>";
                            _EmailReservation += "</tr>";

                        }
                    }
                }
                _EmailReservation += "</table>";
                _EmailReservation += "<br /><br />";
                _EmailReservation += "Les invitations pour ces dates sont disponibles en pièces jointes (fichiers ICS).";
                _EmailReservation += "<br /><br />";

                if (_Evenement.Typologie.Id == 3) //cours
                {
                    _EmailReservation += "Vous pouvez retrouver toutes vos inscriptions/réservations dans la partie \"Mon Compte\" du site de l'École du Cavalier Roi : <a href=\"" + WS.Constants.SITE_URL + "/MonCompte\" target=\"_blank\">" + WS.Constants.SITE_URL + "/MonCompte</a>.";
                }
                else if (_Evenement.Typologie.Id == 1) //tournois
                {
                    _EmailReservation += "Vous pouvez retrouver toutes vos participations dans la partie \"Mon Compte\" du site de l'École du Cavalier Roi : <a href=\"" + WS.Constants.SITE_URL + "/MonCompte\" target=\"_blank\">" + WS.Constants.SITE_URL + "/MonCompte</a>.";
                }
                else if (_Evenement.Typologie.Id == 0) //stages
                {
                    //stage "parent" : formule complete
                    if (_Evenement.EvenementParent == null)
                    {
                        _EmailReservation += "Vous pouvez retrouver toutes vos inscriptions dans la partie \"Mon Compte\" du site de l'École du Cavalier Roi : <a href=\"" + WS.Constants.SITE_URL + "/MonCompte\" target=\"_blank\">" + WS.Constants.SITE_URL + "/MonCompte</a>.";
                    }
                    //stage "enfant" : formule partielle (avec choix de réservations)
                    else
                    {
                        _EmailReservation += "Vous pouvez retrouver toutes vos inscriptions/réservations dans la partie \"Mon Compte\" du site de l'École du Cavalier Roi : <a href=\"" + WS.Constants.SITE_URL + "/MonCompte\" target=\"_blank\">" + WS.Constants.SITE_URL + "/MonCompte</a>.";
                    }
                }

                _EmailReservation += "<br /><br />";
                if ((!String.IsNullOrEmpty(_Reservations[0].PaymentId)) && (_Reservations[0].PaymentId != "KO")) //"PAYPAL PAYMENTID" OU "MON COMPTE"
                {
                    _EmailReservation += "Pour plus d'informations, n'hésitez pas à contacter l'École du Cavalier Roi à <a href=\"mailto:" + WS.Constants.COMMANDES_EMAIL + "\" target=\"_blank\">" + WS.Constants.COMMANDES_EMAIL + "</a>.";
                }
                else
                {
                    _EmailReservation += "Merci de contacter au plus vite l'École du Cavalier Roi à <a href=\"mailto:" + WS.Constants.COMMANDES_EMAIL + "\" target=\"_blank\">" + WS.Constants.COMMANDES_EMAIL + "</a> pour régler le paiement.";
                }
                _EmailReservation += "<br /><br />";
                _EmailReservation += "L'École du Cavalier Roi";
                _EmailReservation += "<br /><br />";
                _EmailReservation += "</body>";
                _EmailReservation += "</html>";

                String _EmailSubject = String.Empty;
                if (_Evenement.Typologie.Id == 3) //cours
                {
                    if (_Reservations[0].PaymentId == "MON COMPTE")
                    {
                        _EmailSubject += "Confirmation de réservations";
                    }
                    else
                    {
                        _EmailSubject += "Confirmation d'inscription/réservations";
                    }
                }
                else if (_Evenement.Typologie.Id == 1) //tournois
                {
                    _EmailSubject = "Confirmation de participation";
                }
                else if (_Evenement.Typologie.Id == 0) //stages
                {
                    //stage "parent" : formule complete
                    if (_Evenement.EvenementParent == null)
                    {
                        _EmailSubject = "Confirmation d'inscription";
                    }
                    //stage "enfant" : formule partielle (avec choix de réservations)
                    else
                    {
                        _EmailSubject = "Confirmation d'inscription/réservations";
                    }
                }
                ICSManager.SendMail(WS.Constants.COMMANDES_EMAIL, WS.Constants.COMMANDES_SENDER, _Eleve.Email, WS.Constants.COMMANDES_CC, WS.Constants.COMMANDES_CCI, _EmailSubject, _EmailReservation, true, _Invitations, null, WS.Constants.MAILSERVER_HOST, WS.Constants.MAILSERVER_PORT, WS.Constants.COMMANDES_USERNAME, WS.Constants.COMMANDES_PASSWORD, 100000, false);
                #endregion
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
                                        paymentId: (String.IsNullOrEmpty(_PaymentId) ? null : _PaymentId)
                                    );

        }

        public static Int32? DelReservation(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelReservation(_Id, _Real);
        }




    }
}