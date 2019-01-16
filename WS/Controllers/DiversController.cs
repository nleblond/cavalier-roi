using System;
using System.Web.Http;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using WS.BLL;

namespace WS.Controllers
{
    public class DiversController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();

        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetId(String _Table = null)
        {
            return Ok(DiversManager.GetId(_Table));
        }



        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetStatuts()
        {
            return Ok(DiversManager.GetStatuts());
        }




        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetCategories()
        {
            return Ok(DiversManager.GetCategories());
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetModes(Int32? _ModeId = null)
        {
            return Ok(DiversManager.GetModes());
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetTypologies(Int32? _TypologieId = null)
        {
            return Ok(DiversManager.GetTypologies());
        }






        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetModesEmplacements(Int32? _ModeId = null)
        {
            return Ok(DiversManager.GetModesEmplacements(_ModeId));
        }


        

        [HttpPost]
        [HttpGet]
        public IHttpActionResult GetTypologiesEvenements(String _OnlyParentsYN = "N")
        {
            return Ok(DiversManager.GetTypologiesEvenements(_OnlyParentsYN));
        }



        [HttpPost]
        [HttpGet]
        public IHttpActionResult TestMail(String _ReceiptEmail = "")
        {
            return Ok(DiversManager.TestMail(_ReceiptEmail));
        }
    }
}
