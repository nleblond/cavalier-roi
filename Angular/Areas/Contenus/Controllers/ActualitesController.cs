using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Contenus.Controllers
{
    public class ActualitesController : Controller
    {

        [Route("Actualites")]
        public ActionResult Index()
        {
            return View("~/Areas/Contenus/Views/Actualites.cshtml");
        }
    }
}