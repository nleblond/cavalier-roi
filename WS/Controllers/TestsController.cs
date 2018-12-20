using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WS.Controllers
{
    public class TestsController : ApiController
    {



        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok("TEST");
        }

    }
}