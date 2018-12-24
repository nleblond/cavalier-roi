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
using WS.Controllers;
using System.Web.Http;

namespace Angular.CALL
{
    public static class ElevesManager
    {


        public static async Task<Eleve> GetEleve(Int32? _Id)
        {
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");


            ElevesSearchParameters _Parameters = new ElevesSearchParameters();
            _Parameters.Id = _Id;
            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");


            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Eleves/GetEleves"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            List<Eleve> _Eleves = JsonConvert.DeserializeObject<List<Eleve>>(_JsonResponseContent);

            Eleve _Eleve = new Eleve();
            if (_Eleves.Count > 0) { _Eleve = _Eleves[0]; }

            return _Eleve;
        }


        public static async Task<Int32?> ConnectEleve(String _Email = null, String _Password = null)
        {
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");


            ElevesSearchParameters _Parameters = new ElevesSearchParameters();
            _Parameters.Email = _Email;
            _Parameters.Password = _Password;
            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");


            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Eleves/ConnectEleve"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            Int32? _Id = JsonConvert.DeserializeObject<Int32?>(_JsonResponseContent);

            return _Id;
        }

        public static async Task<Int32?> ReinitEleve(String _Email = null, String _Password = null)
        {
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");


            EleveUpdateParameters _Parameters = new EleveUpdateParameters();
            _Parameters.Email = _Email;
            _Parameters.Password = _Password;
            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");


            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Eleves/ReinitEleve"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            Int32? _Id = JsonConvert.DeserializeObject<Int32?>(_JsonResponseContent);

            return _Id;
        }



        public static async Task<Int32?> AddEleve(
                                       String _Nom = null,
                                       String _Prenom = null,
                                       String _Email = null,
                                       String _Password = null,
                                       String _DtNaissance = null,
                                       String _Sexe = null,
                                       String _Club = null,
                                       String _Photo = null,
                                       String _Fixe = null,
                                       String _Portable = null,
                                       String _Commentaire = null,
                                       String _License = null,
                                       String _Classement = null
                               )
        {
            var _Client = new HttpClient();
            _Client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

            Eleve _Parameters = new Eleve();
            _Parameters.Nom = _Nom;
            _Parameters.Prenom = _Prenom;
            _Parameters.Email = _Email;
            _Parameters.Password = _Password;
            _Parameters.DtNaissance = _DtNaissance;
            _Parameters.Sexe = _Sexe;
            _Parameters.Club = _Club;
            _Parameters.Photo = _Photo;
            _Parameters.Fixe = _Fixe;
            _Parameters.Portable = _Portable;
            _Parameters.Commentaire = _Commentaire;
            _Parameters.License = _License;
            _Parameters.Classement = _Classement;
            HttpContent _JsonRequestContent = new StringContent(_Parameters.ToSerializedJson(), Encoding.UTF8, "application/json");


            HttpRequestMessage _Request = new HttpRequestMessage
            {
                RequestUri = new Uri(Constants.WS_URL + "/Eleves/AddEleve"),
                Method = HttpMethod.Post,
                Headers = { { "APIKey", Constants.WS_PASSKEY } },
                Content = _JsonRequestContent
            };

            HttpResponseMessage _Response = _Client.SendAsync(_Request).Result;
            String _JsonResponseContent = await _Response.Content.ReadAsStringAsync();
            Int32? _Id = JsonConvert.DeserializeObject<Int32?>(_JsonResponseContent);

            return _Id;

        }


    }
}