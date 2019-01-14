using System.Web.Mvc;

using Angular;
using WS.Models.OUT;

namespace UI.Areas.Evenements
{
    public class EvenementsController : Controller
    {

        //backoffice
        [Route("Evenements")]
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

            return View("~/Areas/Evenements/Views/Evenements.cshtml");
        }
    }
}