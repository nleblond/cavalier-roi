﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Contenus.Controllers
{
    public class PartenariatsController : Controller
    {

        [Route("Partenariats")]
        public ActionResult Index()
        {
            return View("~/Areas/Contenus/Views/Partenariats.cshtml");
        }
    }
}