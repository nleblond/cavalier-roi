using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;


namespace WS.Controllers
{
    public class DiversController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();

        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetId(String _Table = null)
        {
            return Ok(DB.GetId(_Table));
        }


    }
}
