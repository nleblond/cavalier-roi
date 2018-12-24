using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class Constants
{

    public static String WS_URL
    {
        get
        {
            return System.Configuration.ConfigurationManager.AppSettings["WS_URL"];
        }
    }

    public static String WS_PASSKEY
    {
        get
        {
            return System.Configuration.ConfigurationManager.AppSettings["WS_PASSKEY"];
        }
    }


    public static String IMG_URL
    {
        get
        {
            return System.Configuration.ConfigurationManager.AppSettings["IMG_URL"];
        }
    }


    public static String ROOT_URL
    {
        get
        {
            return System.Configuration.ConfigurationManager.AppSettings["ROOT_URL"];
        }
    }
    
}
