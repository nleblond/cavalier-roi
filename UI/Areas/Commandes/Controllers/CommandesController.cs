using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Commandes.Controllers
{
    public class CommandesController : Controller
    {

        [Route("Commandes")]
        public ActionResult Commandes()
        {
            return View("~/Areas/Commandes/Views/Commandes.cshtml");
        }

    }
}