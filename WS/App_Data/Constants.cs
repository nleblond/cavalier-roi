using System;


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

        public static String LOGO_URL
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["LOGO_URL"];
            }
        }

        public static String SITE_URL
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["SITE_URL"];
            }
        }

        public static String MAILSERVER_HOST
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["MAILSERVER_HOST"];
            }
        }
        public static Int32 MAILSERVER_PORT
        {
            get
            {
                try
                {
                    return Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["MAILSERVER_PORT"]);
                }
                catch (Exception)
                {
                    return -1;
                }
            }
        }




        public static String COMMANDES_EMAIL
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["COMMANDES_EMAIL"];
            }
        }
        public static String COMMANDES_SENDER
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["COMMANDES_SENDER"];
            }
        }
        public static String COMMANDES_USERNAME
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["COMMANDES_USERNAME"];
            }
        }
        public static String COMMANDES_PASSWORD
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["COMMANDES_PASSWORD"];
            }
        }
        public static String COMMANDES_CC
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["COMMANDES_CC"];
            }
        }
        public static String COMMANDES_CCI
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["COMMANDES_CCI"];
            }
        }

        public static String INSCRIPTIONS_EMAIL
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["INSCRIPTIONS_EMAIL"];
            }
        }
        public static String INSCRIPTIONS_SENDER
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["INSCRIPTIONS_SENDER"];
            }
        }
        public static String INSCRIPTIONS_USERNAME
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["INSCRIPTIONS_USERNAME"];
            }
        }
        public static String INSCRIPTIONS_PASSWORD
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["INSCRIPTIONS_PASSWORD"];
            }
        }
        public static String INSCRIPTIONS_CC
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["INSCRIPTIONS_CC"];
            }
        }
        public static String INSCRIPTIONS_CCI
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["INSCRIPTIONS_CCI"];
            }
        }

    }

}