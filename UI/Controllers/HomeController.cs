using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/Accueil.cshtml");
        }

        [Route("Echecs")]
        public ActionResult Echecs()
        {
            return View("~/Views/Echecs.cshtml");
        }

        [Route("MentionsLegales")]
        public ActionResult MentionsLegales()
        {
            return View("~/Views/MentionsLegales.cshtml");
        }

        [Route("Plan")]
        public ActionResult Plan()
        {
            return View("~/Views/Plan.cshtml");
        }

    }
}