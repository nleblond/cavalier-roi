using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Dynamic;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using Angular.CALL;

using Microsoft.VisualBasic;
using System.Net.Mail;
using System.Net;
using System.Linq;

namespace Angular.Controllers
{
    public class HomeController : Controller
    {

        [Route("")]
        public ActionResult Index()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(0).Result;

            //contenu : actualités
            List<Contenu> _ContenuActualites = ContenusManager.GetContenus(54, 4).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = ContenusManager.GetContenus(38, 1).Result;

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(3, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(52, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(50, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones;
            _Model.ContenuActualites = _ContenuActualites;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos;
            _Model.ContenusModals = _ContenusModals;




            //Tools.SendMail("L'École DU CAVALIER ROI <inscriptions@cavalier-roi.fr>", "leniko@gmail.com", "Test", "Test", true, "authsmtp.securemail.pro", 465, "inscriptions@cavalier-roi.fr", "Hokage2348+");


            return View("~/Views/Accueil.cshtml", _Model);
        }



        [Route("Actualites")]
        public ActionResult Actualites()
        {

            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(1, 1).Result;

            //contenu : actualités
            List<Contenu> _ContenuActualites = ContenusManager.GetContenus(54, 15).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = ContenusManager.GetContenus(38, 1).Result;

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(4, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(27, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(16, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones;
            _Model.ContenuActualites = _ContenuActualites;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos;
            _Model.ContenusModals = _ContenusModals;

            return View("~/Views/Actualites.cshtml", _Model);
        }



        //frontoffice
        [Route("Echecs")]
        public ActionResult Echecs()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(42, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(8, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(31, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(20, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/Echecs.cshtml", _Model);
        }





        [Route("Partenariats")]
        public ActionResult Partenariats()
        {

            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(55, 1).Result;

            //contenu : actualités
            List<Contenu> _ContenuPartenariats = ContenusManager.GetContenus(null, 15, 2).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            //List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            //List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(56, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            //List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            //List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(58, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            //List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            //List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(57, 3).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones;
            _Model.ContenuPartenariats = _ContenuPartenariats;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos;
            _Model.ContenusModals = _ContenusModals;

            return View("~/Views/Partenariats.cshtml", _Model);
        }












        [Route("MentionsLegales")]
        public ActionResult MentionsLegales()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(45, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(11, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(35, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(24, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/MentionsLegales.cshtml", _Model);
        }



        [Route("Plan")]
        public ActionResult Plan()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(47, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(13, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(36, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(25, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/Plan.cshtml", _Model);
        }













        [Route("Stages")]
        public ActionResult Stages()
        {

            //connexion
            Eleve _Eleve = null;
            Boolean _Connected = false;
            if (Session["www.cavalier-roi.fr"] == null)
            {
                _Connected = false;
            }
            else if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Id != null))
            {
                try
                {
                    _Eleve = ElevesManager.GetEleve((Session["www.cavalier-roi.fr"] as Eleve).Id).Result;
                    _Connected = true;
                }
                catch (Exception)
                {
                    _Connected = false;
                }
            }

            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(40, 1).Result;

            //evenements : stages
            List<Evenement> _EvenementsStages = EvenementsManager.GetEvenements(0).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(6, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(29, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(18, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.Connected = _Connected;
            _Model.Eleve = _Eleve as Eleve;
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.EvenementsStages = _EvenementsStages as List<Evenement>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/Stages.cshtml", _Model);
        }


        [Route("Cours")]
        public ActionResult Cours()
        {

            //connexion
            Eleve _Eleve = null;
            Boolean _Connected = false;
            if (Session["www.cavalier-roi.fr"] == null)
            {
                _Connected = false;
            }
            else if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Id != null))
            {
                try
                {
                    _Eleve = ElevesManager.GetEleve((Session["www.cavalier-roi.fr"] as Eleve).Id).Result;
                    _Connected = true;
                }
                catch (Exception)
                {
                    _Connected = false;
                }
            }

            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(39, 1).Result;

            //evenements : cours
            List<Evenement> _EvenementsCours = EvenementsManager.GetEvenements(3).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(5, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(28, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(17, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.Connected = _Connected;
            _Model.Eleve = _Eleve as Eleve;
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.EvenementsCours = _EvenementsCours as List<Evenement>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/Cours.cshtml", _Model);
        }


        [Route("Tournois")]
        public ActionResult Tournois()
        {

            //connexion
            Eleve _Eleve = null;
            Boolean _Connected = false;
            if (Session["www.cavalier-roi.fr"] == null)
            {
                _Connected = false;
            }
            else if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Id != null))
            {
                try
                {
                    _Eleve = ElevesManager.GetEleve((Session["www.cavalier-roi.fr"] as Eleve).Id).Result;
                    _Connected = true;
                }
                catch (Exception)
                {
                    _Connected = false;
                }
            }

            //contenu : zones
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(41, 1).Result;
            List<Contenu> _ContenusZones2 = ContenusManager.GetContenus(43, 1).Result;

            //evenements : tournois
            List<Evenement> _EvenementsTournois = EvenementsManager.GetEvenements(1).Result;

            //evenements : tournois
            List<Evenement> _EvenementsCompetitions = EvenementsManager.GetEvenements(2).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(7, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(30, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(19, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.Connected = _Connected;
            _Model.Eleve = _Eleve as Eleve;
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusZones2 = _ContenusZones2 as List<Contenu>;
            _Model.EvenementsTournois = _EvenementsTournois as List<Evenement>;
            _Model.EvenementsCompetitions = _EvenementsCompetitions as List<Evenement>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/Tournois.cshtml", _Model);
        }
















        [Route("MonCompte")]
        public ActionResult MonCompte(Int32? _Id = null)
        {

            //connexion
            Eleve _Eleve = null;
            Boolean _Connected = false;
            if (Session["www.cavalier-roi.fr"] == null)
            {
                _Connected = false;
                Response.Redirect("/");
            }
            else if ((Session["www.cavalier-roi.fr"] != null) && (_Id != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Administration == true))
            {
                try
                {
                    _Eleve = ElevesManager.GetEleve(Int32.Parse(_Id.ToString())).Result;
                    _Connected = true;
                }
                catch (Exception) {
                    _Connected = false;
                }

            }
            else if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Id != null))
            {
                try
                {
                    _Eleve = ElevesManager.GetEleve((Session["www.cavalier-roi.fr"] as Eleve).Id).Result;
                    _Connected = true;
                }
                catch (Exception)
                {
                    _Connected = false;
                }
            }

            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(48, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(14, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(37, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(26, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.Connected = _Connected;
            _Model.Eleve = _Eleve as Eleve;
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/MonCompte.cshtml", _Model);
        }

        [Route("ConnectEleve")]
        public JsonResult ConnectEleve(String _Email = null, String _Password = null)
        {

            Int32? _Id = ElevesManager.ConnectEleve(_Email, _Password).Result;

            if (_Id != null)
            {
                Eleve _Eleve = ElevesManager.GetEleve(_Id).Result;
                Session["www.cavalier-roi.fr"] = _Eleve;

                return Json(true);
            }

            return Json(false);

        }

        [Route("CheckConnectedEleve")]
        public JsonResult CheckConnectedEleve()
        {
            if (Session["www.cavalier-roi.fr"] != null) { return Json(true); }
            else { return Json(false); }
        }


        [Route("ReinitEleve")]
        public JsonResult ReinitEleve(String _Email = null, String _Password = null)
        {

            Int32? _Id = ElevesManager.ReinitEleve(_Email, _Password).Result;

            return Json(true);

        }

        [Route("AddEleve")]
        public JsonResult AddEleve(
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
                                       String _Classement = null
                               )
        {
            Int32? _Id = ElevesManager.AddEleve(
                                                    _Nom: _Nom,
                                                    _Prenom: _Prenom,
                                                    _Email: _Email,
                                                    _Password: _Password,
                                                    _DtNaissance: _DtNaissance,
                                                    _Sexe: _Sexe,
                                                    _Club: _Club,
                                                    _Photo: _Photo,
                                                    _Fixe: _Fixe,
                                                    _Portable: _Portable,
                                                    _Commentaire: _Commentaire,
                                                    _License: _License,
                                                    _Classement: _Classement
                                        ).Result;

            if (_Id != null)
            {
                Eleve _Eleve = ElevesManager.GetEleve(_Id).Result;
                Session["www.cavalier-roi.fr"] = _Eleve;

                return Json(true);
            }

            return Json(false);

        }

        //public JsonResult UpdEleve() { } //fait directement en jquery dans "Mon Compte" sans passer par le controlleur









        [Route("Boutique")]
        public ActionResult Boutique(Int32? _CategorieId = null)
        {

            //connexion
            Eleve _Eleve = null;
            Boolean _Connected = false;
            if (Session["www.cavalier-roi.fr"] == null)
            {
                _Connected = false;
            }
            else if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Id != null))
            {
                try
                {
                    _Eleve = (Session["www.cavalier-roi.fr"] as Eleve);
                    _Connected = true;
                }
                catch (Exception)
                {
                    _Connected = false;
                }
            }

            //contenu : zone
            List<Contenu> _ContenusZones = ContenusManager.GetContenus(44, 1).Result;

            //produits
            List<Produit> _Produits = ProduitsManager.GetProduits(_CategorieId).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = ContenusManager.GetContenus(10, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = ContenusManager.GetContenus(33, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = ContenusManager.GetContenus(22, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }


            //panier (commande)
            Commande _Commande = new Commande();
            if (Session["www.cavalier-roi.fr"] != null)
            {
                if ((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours == null)
                {
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours = new Commande();
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes = new List<Ligne>();

                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Adresse = new Adresse();
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Adresse.Destinataire = (Session["www.cavalier-roi.fr"] as Eleve).Nom + " " + (Session["www.cavalier-roi.fr"] as Eleve).Prenom;
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Adresse.Email = (Session["www.cavalier-roi.fr"] as Eleve).Email;
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Adresse.Telephone = (String.IsNullOrEmpty((Session["www.cavalier-roi.fr"] as Eleve).Portable) == true ? (Session["www.cavalier-roi.fr"] as Eleve).Fixe : (Session["www.cavalier-roi.fr"] as Eleve).Portable);
                }
                _Commande = (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours;
            }
            else
            {
                _Commande = new Commande();
            }

            dynamic _Model = new ExpandoObject();
            _Model.Connected = _Connected;
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.CategorieId = _CategorieId as Int32?;
            _Model.Produits = _Produits as List<Produit>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;
            _Model.Commande = _Commande;

            return View("~/Views/Boutique.cshtml", _Model);
        }


        [Route("AddLigneToCommandeEnCours")]
        public ActionResult AddLigneToCommandeEnCours(Int32 _ProduitId, Int32 _Quantite)
        {

            if (Session["www.cavalier-roi.fr"] != null)
            {
                //contrôle sur la quantité
                Int32 _QuantiteDejaMiseAuPanier = 0;
                foreach (Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.FindAll(l => l.Produit.Id == _ProduitId))
                {
                    _QuantiteDejaMiseAuPanier += Int32.Parse(_Current.Quantite.ToString());
                }
                Ligne _NewLigne = ProduitsManager.AddLigneToCommandeEnCours(_ProduitId, _Quantite, _QuantiteDejaMiseAuPanier).Result;
                if (_NewLigne != null)
                {
                    //génération d'un LigneId temporaire pour faciliter la suppression
                    Int32 _LigneId = 0;
                    if (((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes != null) && ((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.Count > 0))
                    {
                        List<Ligne> _Lignes = (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.OrderByDescending(l => l.Id).ToList();
                        _LigneId = Int32.Parse(_Lignes[0].Id.ToString()) + 1;
                    }
                    _NewLigne.Id = _LigneId;
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.Add(_NewLigne);

                    //recalculs
                    //------------------------------------------------------------------------------------------------------------------------------------------------------
                    //poids
                    Double _Poids = 0;
                    foreach (Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes)
                    {
                        _Poids += Double.Parse(_Current.Produit.Poids.ToString());
                    }

                    //frais de port
                    List<Frai> _Frais = ProduitsManager.GetFrais(_Poids).Result;
                    Double _Depassement = 0;
                    foreach (Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.FindAll(l => l.Produit.Depassement == true))
                    {
                        _Depassement += 15;
                    }
                    if ((_Frais != null) && (_Depassement == 0))
                    {
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai = _Frais[0];
                    }
                    else if ((_Frais != null) && (_Depassement > 0))
                    {
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai = new Frai();
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Id = 7;
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Libelle = "Envoi exceptionnel";
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Prix = _Frais[0].Prix + _Depassement;
                    }
                    else
                    {
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai = new Frai();
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Id = 6;
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Libelle = "Envoi gratuit";
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Prix = 0;
                    }

                    //prix
                    Double _PrixLignes = 0;
                    foreach(Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes)
                    {
                        _PrixLignes += Double.Parse(_Current.Prix.ToString());
                    }
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Prix = _PrixLignes + (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Prix;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------

                    return PartialView("~/Views/Shared/PanierEtape1.cshtml", (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours);

                }

            }
            else
            {
                //reconnexion obligatoire : ça ne peut pas arriver car il y a un controle de connexion avant l'appel
                return null;
            }

            return PartialView("~/Views/Shared/Panier.cshtml", new Commande());

        }


        [Route("DelLigneFromCommandeEnCours")]
        public ActionResult DelLigneFromCommandeEnCours(Int32 _LigneId)
        {

            if (Session["www.cavalier-roi.fr"] != null)
            {

                if ((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.Any(l => l.Id == _LigneId) == true)
                {
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.RemoveAll(l => l.Id == _LigneId);

                    //recalculs
                    //------------------------------------------------------------------------------------------------------------------------------------------------------
                    //poids
                    Double _Poids = 0;
                    foreach (Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes)
                    {
                        _Poids += Double.Parse(_Current.Produit.Poids.ToString());
                    }

                    //frais de port
                    List<Frai> _Frais = ProduitsManager.GetFrais(_Poids).Result;
                    Double _Depassement = 0;
                    foreach (Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes.FindAll(l => l.Produit.Depassement == true))
                    {
                        _Depassement += 15;
                    }
                    if ((_Frais != null) && (_Depassement == 0))
                    {
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai = _Frais[0];
                    }
                    else if ((_Frais != null) && (_Depassement > 0))
                    {
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai = new Frai();
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Id = 7;
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Libelle = "Envoi exceptionnel";
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Prix = _Frais[0].Prix + _Depassement;
                    }
                    else
                    {
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai = new Frai();
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Id = 6;
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Libelle = "Envoi gratuit";
                        (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Prix = 0;
                    }

                    //prix
                    Double _PrixLignes = 0;
                    foreach (Ligne _Current in (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Lignes)
                    {
                        _PrixLignes += Double.Parse(_Current.Prix.ToString());
                    }
                    (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Prix = _PrixLignes + (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Frai.Prix;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------

                    return PartialView("~/Views/Shared/PanierEtape1.cshtml", (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours);

                }

            }
            return PartialView("~/Views/Shared/Panier.cshtml", new Commande());

        }


        [Route("AddAdresseToCommandeEnCours")]
        public JsonResult AddAdresseToCommandeEnCours(Adresse _Adresse)
        {
            if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours != null))
            {
                (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Adresse = _Adresse;
                return Json(true);
            }
            return Json(false);
        }


        [Route("AddCommande")]
        public JsonResult AddCommande(Int32? _StatutId = null, String _PaymentId = null)
        {
            if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours != null))
            {

                (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.ReferenceTransaction = _PaymentId;

                (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Statut = new Statut();
                (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Statut.Id = _StatutId;

                (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Eleve = new Eleve();
                (Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours.Eleve.Id = (Session["www.cavalier-roi.fr"] as Eleve).Id;

                Int32? _Id = CommandesManager.AddCommande((Session["www.cavalier-roi.fr"] as Eleve).CommandeEnCours).Result;

                //commande passé, raffraichissement de la sessions
                if (_Id != null)
                {
                    Session["www.cavalier-roi.fr"] = ElevesManager.GetEleve((Session["www.cavalier-roi.fr"] as Eleve).Id).Result;
                }
                return Json(_Id);
            }
            else
            {
                //reconnexion obligatoire : ça ne peut pas arriver car il y a un controle de connexion avant l'appel
                return null;
            }
        }

    }
}