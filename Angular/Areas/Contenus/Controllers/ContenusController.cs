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

namespace UI.Areas.Contenus
{
    public class ContenusController : Controller
    {

        //backoffice
        [Route("Contenus")]
        public ActionResult Index()
        {
            if (Constants.BACKOFFICE_SECURITY)
            {
                //connexion
                if (Session["www.cavalier-roi.fr"] == null)
                {
                    Response.Redirect("/");
                }
                else if ((Session["www.cavalier-roi.fr"] != null) && ((Session["www.cavalier-roi.fr"] as Eleve).Administration == false))
                {
                    Response.Redirect("/");
                }
            }

            return View("~/Areas/Contenus/Views/Contenus.cshtml");
        }




    }
}