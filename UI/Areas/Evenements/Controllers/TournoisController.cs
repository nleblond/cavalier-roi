﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Areas.Evenements
{
    public class TournoisController : Controller
    {

        [Route("Tournois")]
        public ActionResult Index()
        {
            return View("~/Areas/Evenements/Views/Tournois.cshtml");
        }
    }
}