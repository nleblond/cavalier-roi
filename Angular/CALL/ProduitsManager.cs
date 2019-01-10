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
    public static class ProduitsManager
    {



        public static async Task<List<Produit>> GetProduits(Int32? _CategorieId = null)
        {

            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

            ProduitsSearchParameters _Parameters = new ProduitsSearchParameters();
            _Parameters.CategorieId = _CategorieId;

            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");
            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Produits/GetProduits"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            List<Produit> _Produits = JsonConvert.DeserializeObject<List<Produit>>(_JsonResponseContent);

            return _Produits;

        }

    }
}