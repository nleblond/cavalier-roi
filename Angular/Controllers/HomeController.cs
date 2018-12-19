using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using WS.Models;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Dynamic;
using System.Text;
using WS.Models.IN;
using WS.Models.OUT;


namespace Angular.Controllers
{
    public class HomeController : Controller
    {

        //frontoffice
        public ActionResult Index()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(0).Result;

            //contenu : actualités
            List<Contenu> _ContenuActualites = BLL.ContenusManager.GetContenus(54, 4).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = BLL.ContenusManager.GetContenus(38, 1).Result;

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(3, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(52, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(50, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones;
            _Model.ContenuActualites = _ContenuActualites;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos;
            _Model.ContenusModals = _ContenusModals;

            return View("~/Views/Accueil.cshtml", _Model);
        }



        [Route("Actualites")]
        public ActionResult Actualites()
        {

            //contenu : zone
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(1, 1).Result;

            //contenu : actualités
            List<Contenu> _ContenuActualites = BLL.ContenusManager.GetContenus(54, 15).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = BLL.ContenusManager.GetContenus(38, 1).Result;

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(4, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(27, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(16, 3).Result;
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
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(42, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(8, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(31, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(20, 3).Result;
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
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(55, 1).Result;

            //contenu : actualités
            List<Contenu> _ContenuPartenariats = BLL.ContenusManager.GetContenus(null, 15, 2).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            //List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            //List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(56, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            //List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            //List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(58, 1).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            //List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            //foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            //List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(57, 3).Result;
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
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(45, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(11, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(35, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(24, 3).Result;
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
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(47, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(13, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(36, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(25, 3).Result;
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
            //contenu : zone
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(40, 1).Result;

            //evenements : stages
            List<Evenement> _EvenementsStages = BLL.EvenementsManager.GetEvenements(0).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(6, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(29, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(18, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
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
            //contenu : zone
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(39, 1).Result;

            //evenements : cours
            List<Evenement> _EvenementsCours = BLL.EvenementsManager.GetEvenements(3).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(5, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(28, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(17, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
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
            //contenu : zones
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(41, 1).Result;
            List<Contenu> _ContenusZones2 = BLL.ContenusManager.GetContenus(43, 1).Result;

            //evenements : tournois
            List<Evenement> _EvenementsTournois = BLL.EvenementsManager.GetEvenements(1).Result;

            //evenements : tournois
            List<Evenement> _EvenementsCompetitions = BLL.EvenementsManager.GetEvenements(2).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(7, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(30, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(19, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
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
        public ActionResult MonCompte()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(48, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(14, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(37, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(26, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/MonCompte.cshtml", _Model);
        }



        [Route("Boutique")]
        public ActionResult Boutique()
        {
            //contenu : zone
            List<Contenu> _ContenusZones = BLL.ContenusManager.GetContenus(44, 1).Result;

            //contenu : modal message
            List<Contenu> _ContenusModals = new List<Contenu>();

            //contenus : partenariats "encart"
            List<Contenu> _ContenusPartenariatsEncarts = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsEncartsGeneral = BLL.ContenusManager.GetContenus(2, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsGeneral) { _ContenusPartenariatsEncarts.Add(_Current); }
            List<Contenu> _ContenusPartenariatsEncartsContext = BLL.ContenusManager.GetContenus(10, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsEncartsContext) { _ContenusPartenariatsEncarts.Add(_Current); }

            //contenus : partenariats "bandeau"
            List<Contenu> _ContenusPartenariatsBandeaux = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsBandeauxGeneral = BLL.ContenusManager.GetContenus(49, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxGeneral) { _ContenusPartenariatsBandeaux.Add(_Current); }
            List<Contenu> _ContenusPartenariatsBandeauxContext = BLL.ContenusManager.GetContenus(33, 1).Result;
            foreach (Contenu _Current in _ContenusPartenariatsBandeauxContext) { _ContenusPartenariatsBandeaux.Add(_Current); }

            //contenus : partenariats "promo"
            List<Contenu> _ContenusPartenariatsPromos = new List<Contenu>();
            List<Contenu> _ContenusPartenariatsPromosGeneral = BLL.ContenusManager.GetContenus(15, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosGeneral) { _ContenusPartenariatsPromos.Add(_Current); }
            List<Contenu> _ContenusPartenariatsPromosContext = BLL.ContenusManager.GetContenus(22, 3).Result;
            foreach (Contenu _Current in _ContenusPartenariatsPromosContext) { _ContenusPartenariatsPromos.Add(_Current); }

            dynamic _Model = new ExpandoObject();
            _Model.ContenusZones = _ContenusZones as List<Contenu>;
            _Model.ContenusPartenariatsEncarts = _ContenusPartenariatsEncarts as List<Contenu>;
            _Model.ContenusPartenariatsBandeaux = _ContenusPartenariatsBandeaux as List<Contenu>;
            _Model.ContenusPartenariatsPromos = _ContenusPartenariatsPromos as List<Contenu>;
            _Model.ContenusModals = _ContenusModals as List<Contenu>;

            return View("~/Views/Boutique.cshtml", _Model);
        }
    }
}