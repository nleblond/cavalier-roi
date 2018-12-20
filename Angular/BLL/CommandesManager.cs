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

namespace Angular.BLL
{
    public class CommandesManager
    {


        public async void GetCommandes()
        {
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");


            CommandesSearchParameters _Parameters = new CommandesSearchParameters();
            _Parameters.Id = 1;
            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");


            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Commandes/GetCommandes"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;

            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();


            List<Commande> Commandes = JsonConvert.DeserializeObject<List<Commande>>(_JsonResponseContent);
            //List<Commande> Commandes = _JsonResponseContent.ToDeserializedJson<List<Commande>>();

        }



    }
}