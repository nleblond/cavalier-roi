using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Produits
{
    public class ProduitsController : Controller
    {

        [Route("Produits")]
        public ActionResult Produits()
        {
            return View("~/Areas/Produits/Views/Produits.cshtml");
        }
    }
}