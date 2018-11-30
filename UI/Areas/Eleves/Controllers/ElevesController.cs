using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Eleves.Controllers
{
    public class ElevesController : Controller
    {

        [Route("MonCompte")]
        public ActionResult Index()
        {
            return View("~/Areas/Eleves/Views/MonCompte.cshtml");
        }

        [Route("Eleves")]
        public ActionResult Eleves()
        {
            return View("~/Areas/Eleves/Views/Eleves.cshtml");
        }

    }
}