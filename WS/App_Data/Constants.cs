using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WS
{

    public class Constants
    {

        public static String PASSPHRASE
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["PASSPHRASE"];
            }
        }


    }

}