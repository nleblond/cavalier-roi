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


namespace Angular.CALL
{
    public static class ContenusManager
    {



        public static async Task<List<Contenu>> GetContenus(Int32? _EmplacementId = null, Int32? _Top = null, Int32? _ModeId = null)
        {

            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

            ContenusSearchParameters _Parameters = new ContenusSearchParameters();
            _Parameters.EmplacementId = _EmplacementId;
            _Parameters.Top = _Top;
            _Parameters.ModeId = _ModeId;

            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");
            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Contenus/GetContenus"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            List<Contenu> _Contenus = JsonConvert.DeserializeObject<List<Contenu>>(_JsonResponseContent);

            return _Contenus;

        }

    }
}