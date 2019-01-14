using System.Web.Mvc;

using Angular;
using WS.Models.OUT;

namespace UI.Areas.Eleves.Controllers
{
    public class ElevesController : Controller
    {

        //backoffice
        [Route("Eleves")]
        public ActionResult Eleves()
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

            return View("~/Areas/Eleves/Views/Eleves.cshtml");
        }

    }
}