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

namespace Angular.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {


            //GetCommandes();

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



        public async void GetCommandes()
        {
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");


            CommandesSearchParameters _Parameters = new CommandesSearchParameters();
            _Parameters.Id = 1;
            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");


            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri("http://localhost:63122/API/Commandes/GetCommandes"),
                Method = HttpMethod.Post,
                Headers = {
                    { "APIKey", "AEZRETRYTUYIUOIP" }
                },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;

            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();


            List<Commande> Commandes = JsonConvert.DeserializeObject<List<Commande>>(_JsonResponseContent);
            //List<Commande> Commandes = _JsonResponseContent.ToDeserializedJson<List<Commande>>();

        }



    }
}