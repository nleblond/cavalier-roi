using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Evenements
{
    public class StagesController : Controller
    {

        [Route("Stages")]
        public ActionResult Index()
        {
            return View("~/Areas/Evenements/Views/Stages.cshtml");
        }
    }
}