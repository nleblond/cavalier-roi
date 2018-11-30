using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Net;

namespace WS.MessageHandlers
{
    public class APIKeyMessageHandler : DelegatingHandler
    {
        private const string APIKey = "AEZRETRYTUYIUOIP";

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage HttpRequestMessage, CancellationToken CancellationToken)
        {
            bool Valid = false;

            IEnumerable<string> RequestHeaders;
            var ApiKeyExists = HttpRequestMessage.Headers.TryGetValues("APIKey", out RequestHeaders);
            if (ApiKeyExists)
            {
                if (RequestHeaders.FirstOrDefault().Equals(APIKey)) {
                    Valid = true;
                }

            }

            if (!Valid)
            {
                return HttpRequestMessage.CreateResponse(HttpStatusCode.Forbidden, "APIKey invalide");
            }

            //hack
            Valid = true;
            var Response = await base.SendAsync(HttpRequestMessage, CancellationToken);
            return Response;

        }



    }
}