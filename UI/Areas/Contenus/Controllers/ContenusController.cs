using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Contenus
{
    public class ContenusController : Controller
    {

        [Route("Contenus")]
        public ActionResult Index()
        {
            return View("~/Areas/Contenus/Views/Contenus.cshtml");
        }
    }
}