using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Net;
using System.Net.Mail;
using System.Security;
using System.Security.Cryptography;
using System.Dynamic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.IO;
using System.Xml;
using System.Xml.Serialization;
using System.Xml.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

/// <summary>
/// Bibliothèque Générique
/// v2.86
/// 14/05/2013
/// C#
/// </summary>
public static class Tools
{

    /// <summary>Récupérer le chemin absolu d'un fichier à partir de l'url de base ("BASE_ROOT" dans le Web.Config)</summary>
    /// <param name="Url">Chemin du fichier</param>
    /// <returns></returns>
    public static String BaseUrl(String Url)
    {
        return System.Configuration.ConfigurationManager.AppSettings["BASE_ROOT"] + Url;
    }

    /// <summary>Récupérer un certain nombre de caractères en partant de la droite</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <param name="Length">Nombre de caractères à récuperer</param>
    /// <returns>String</returns>
    public static String Right(this String Value, Int32 Length)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            if (Length > Value.Length)
            {
                Length = Value.Length;
            }
            return Value.Substring(Value.Length - Length);
        }
        else
        {
            return "";
        }
    }

    /// <summary>Récupérer un certain nombre de caractères en partant de la gauche</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <param name="length">Nombre de caractères à récuperer</param>
    /// <returns>String</returns>
    public static String Left(this String Value, Int32 Length)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            if (Length > Value.Length)
            {
                Length = Value.Length;
            }
            return Value.Substring(0, Length);
        }
        else
        {
            return "";
        }
    }

    /// <summary>Tronquer (couper) au bout d'une certaine longueur et rajouter "..."</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <param name="NbCar">Nombre de caractères à garder</param>
    /// <param name="DeleteHTML">Suppression des balises HTML</param>
    /// <returns>String</returns>
    public static String Troncate(this String Value, Int32 NbCar, Boolean DeleteHTML = false)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            if (DeleteHTML)
            {
                Value = Value.ToStripAllHTML();
            }
            Value = Value.Trim();
            if ((Value.Length > 0) && (Value.Length > NbCar))
            {
                Value = Value.Substring(0, NbCar) + "...";
            }
        }
        return Value;
    }

    /// <summary>Protéger un mot pour éviter un "replace"</summary>
    /// <param name="value">Mot à traiter</param>
    /// <returns>String</returns>
    public static String Proteger(this String Value)
    {
        String Temp;

        Temp = Value.Substring(0, 1);
        Temp += "§";
        if (Value.Length > 1)
        {
            Temp += Value.Substring(1);
        }

        return Temp;
    }

    /// <summary>Supprimer toutes les balises d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    [Obsolete("Cette méthode est obsolète ! Utiliser la méthode StripAllHTML ou l'extension ToStripAllHTML() à la place...")]
    public static String StripHTMLAll(this String Value)
    {
        Regex LoRegExp = new Regex("<[^>]*>");
        return LoRegExp.Replace(Value, "");
    }

    /// <summary>Supprimer toutes les balises d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    public static String StripAllHTML(this String Value)
    {
        Regex LoRegExp = new Regex("<[^>]*>");
        return LoRegExp.Replace(Value, "");
    }

    /// <summary>Supprimer toutes les balises (sauf les balises de style, les sauts de ligne, les images et les liens hypertextes) d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    public static String StripHTML(this String Value)
    {

        if (Value != "")
        {

            Value = Value.Replace("<p align=justify>", "{#BR#}{#BR#}");
            Value = Value.Replace("<DIV align=justify>&nbsp;</DIV>", "{#BR#}{#BR#}");
            Value = Value.Replace("<div align=\"justify\">", "{#BR#}{#BR#}");
            Value = Value.Replace("<div align=\"left\"><strong></strong></div>", "{#BR#}{#BR#}");
            Value = Value.Replace("<div align=left><strong></strong></div>", "{#BR#}{#BR#}");
            Value = Value.Replace("<p align=\"justify\">", "{#BR#}{#BR#}");
            Value = Value.Replace("<p align=justify>", "{#BR#}{#BR#}");
            Value = Value.Replace("<div align=\"left\"><strong>", "{#BR#}{#BR#}");

            Value = Value.Replace("<div align=left><strong>", "{#BR#}{#BR#}");
            Value = Value.Replace("<div><b></b> </div>", "{#BR#}{#BR#}");
            Value = Value.Replace("<div><b></b></div>", "{#BR#}{#BR#}");

            Value = Value.Replace("<img src=", "{#IMG SRC=");
            Value = Value.Replace("<IMG SRC=", "{#IMG SRC=");

            Value = Value.Replace("<BR>", "{#BR#}");
            Value = Value.Replace("<BR />", "{#BR#}");
            Value = Value.Replace("<div>&nbsp;</div>", "{#BR#}");
            Value = Value.Replace("<br>", "{#BR#}");
            Value = Value.Replace("<br />", "{#BR#}");

            Value = Value.Replace("<A href=", "{#A HREF=");
            Value = Value.Replace("</A>", "{#/A#}");
            Value = Value.Replace("<a href=", "{#A HREF=");
            Value = Value.Replace("</a>", "{#/A#}");

            Value = Value.Replace("<STRONG>", "{#STRONG}");
            Value = Value.Replace("<strong>", "{#strong}");
            Value = Value.Replace("<b>", "{#b#}");
            Value = Value.Replace("<B>", "{#B#}");
            Value = Value.Replace("<B />", "{#B#}");
            Value = Value.Replace("</STRONG>", "{#/STRONG}");
            Value = Value.Replace("</strong>", "{#/strong}");
            Value = Value.Replace("</B>", "{#/B#}");
            Value = Value.Replace("</b>", "{#/b#}");

            Value = Value.Replace("<EM>", "{#EM#}");
            Value = Value.Replace("<em>", "{#EM#}");
            Value = Value.Replace("<i>", "{#i#}");
            Value = Value.Replace("<I>", "{#I#}");
            Value = Value.Replace("</EM>", "{#/EM#}");
            Value = Value.Replace("</em>", "{#/EM#}");
            Value = Value.Replace("</I>", "{#/I#}");
            Value = Value.Replace("</i>", "{#/i#}");

            Value = Value.ToStripAllHTML();

            Value = Value.Replace("{#", "<");
            Value = Value.Replace("#}", ">");
            Value = Value.Replace("}", ">");
        }

        return Value;
    }

    /// <summary>Remplacer les cotes par des apostrophes ('=>’)</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    public static String Apostrophe(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            return Value.Replace("'", "’");
        }
        return Value;
    }

    /// <summary>Supprimer les accents sur les voyelles</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    public static String Accents(this String Value)
    {
        if (Value != "")
        {
            Value = Value.Replace("é", "e").Replace("è", "e").Replace("ê", "e").Replace("ë", "e");
            Value = Value.Replace("à", "a").Replace("â", "a").Replace("ä", "a");
            Value = Value.Replace("ò", "o").Replace("ô", "o").Replace("ö", "o");
            Value = Value.Replace("ç", "c");
            Value = Value.Replace("ì", "i").Replace("î", "i").Replace("ï", "i");
            Value = Value.Replace("ù", "u").Replace("û", "u").Replace("ü", "u");
        }
        return Value;
    }

    /// <summary>Nettoyer une chaine de caractères pour upload ou urlrewriting</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    public static String Cleaner(this String Value)
    {

        if (Value != "")
        {

            Value = Value.Trim();
            Value = StripAllHTML(Value);
            Value = Accents(Value);

            Value = Value.Replace(" ", "-");
            Value = Value.Replace("&nbsp;", "-");
            Value = Value.Replace("«", "");
            Value = Value.Replace("«", "");
            Value = Value.Replace("&", "-");
            Value = Value.Replace("~", "-");
            Value = Value.Replace("#", "-");
            Value = Value.Replace("'", "-");
            Value = Value.Replace("(", "-");
            Value = Value.Replace("[", "");
            Value = Value.Replace("|", "-");
            Value = Value.Replace("`", "-");
            Value = Value.Replace("\\", "-");
            Value = Value.Replace("ç", "-");
            Value = Value.Replace("^", "-");
            Value = Value.Replace("\"\"", "-");
            Value = Value.Replace("]", "");
            Value = Value.Replace("=", "-");
            Value = Value.Replace("+", "-");
            Value = Value.Replace("$", "-");
            Value = Value.Replace("*", "-");
            Value = Value.Replace("%", "-");
            Value = Value.Replace("ù", "-");
            Value = Value.Replace("µ", "-");
            Value = Value.Replace("?", "-");
            Value = Value.Replace(",", "-");
            Value = Value.Replace(":", "-");
            Value = Value.Replace("§", "-");
            Value = Value.Replace("!", "-");
            Value = Value.Replace("<", "-");
            Value = Value.Replace(">", "-");
            Value = Value.Replace("²", "2");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("%", "-");
            Value = Value.Replace("’", "-");
            Value = Value.Replace("« ", "-");
            Value = Value.Replace("/", "-");
            Value = Value.Replace(" ", "");
            Value = Value.Replace(" ", "");
            Value = Value.Replace(" ", "");
            Value = Value.Replace("À", "A");
            Value = Value.Replace("»", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("--", "-");
            Value = Value.Replace("\\r\\n", "-");
            //Value = Value.Replace(".", "-");
        }

        return Value;
    }

    /// <summary>Highlighter des mots</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <param name="SearchText">Mot(s) à highlighter espacé(s) par des " "</param>
    /// <returns>String</returns>
    public static String Highlight(this String Value, String SearchText)
    {

        String[] TabSearch, TabValeur;

        Char[] Delimiters = new Char[] { ' ' };

        //caractères exacts
        TabSearch = SearchText.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
        for (Int32 i = 0; i < TabSearch.Length; i++)
        {

            String Search = TabSearch[i].ToLower();

            TabValeur = Value.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
            Value = "";
            for (int j = 0; j < TabValeur.Length; j++)
            {
                if (TabValeur[j].ToLower().IndexOf(Search) > -1)
                {
                    TabValeur[j].ToLower().Replace(Search, "§" + Search + "µ");
                }
                Value += TabValeur[j] + " ";
            }

        }

        //caractéres spéciaux
        for (Int32 i = 0; i < TabSearch.Length; i++)
        {

            String SearchClean = Accents(TabSearch[i].ToString());

            TabValeur = Value.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries); ;
            Value = "";
            for (Int32 j = 0; j < TabValeur.Length; j++)
            {

                if (TabValeur[j].IndexOf("§") < 0)
                { //on a bidouillé les caractères spéciaux, c'est pour ca qu'on a pas encore de "replace"

                    TabValeur[j] = Accents(TabValeur[j].ToString());

                    if (TabValeur[j].ToLower().IndexOf(SearchClean) > -1)
                    {
                        TabValeur[j].ToLower().Replace(SearchClean, "§#" + SearchClean + "µ");
                    }

                }
                Value += TabValeur[j] + " ";
            }

        }

        Value = Value.Replace("§#", "<b style=\"color:red; text-decoration:underline;\">");
        Value = Value.Replace("§", "<b style=\"color:red;\">");
        Value = Value.Replace("µ", "</b>");

        return Value;

    }

    /// <summary>Récupérer le mois</summary>
    /// <param name="value">Numéro du mois</param>
    /// <param name="Casse">Casse du mois : "" (normal) / "M" (majuscules) / "m" (minuscules)</param>
    /// <returns>String</returns>
    public static String Recuperer_Mois(this Int32 Value, String Casse = "")
    {
        String NomMois = "";
        if ((Value > 0) && (Value < 13))
        {

            String[] TabMois = new String[13];
            TabMois[1] = "Janvier";
            TabMois[2] = "Février";
            TabMois[3] = "Mars";
            TabMois[4] = "Avril";
            TabMois[5] = "Mai";
            TabMois[6] = "Juin";
            TabMois[7] = "Juillet";
            TabMois[8] = "Août";
            TabMois[9] = "Septembre";
            TabMois[10] = "Octobre";
            TabMois[11] = "Novembre";
            TabMois[12] = "Décembre";

            NomMois = TabMois[Value];

            if (Casse == "")
            {
                return NomMois;
            }
            else if (Casse == "M")
            {
                return NomMois.ToUpper();
            }
            else
            {
                return NomMois.ToLower();
            }
        }
        return NomMois;
    }

    /// <summary>Vérifier qu'une chaine de caractères est présente dans une autre</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <param name="TestValue">Chaine de caractères à rechercher</param>
    /// <param name="StringComparison">Option de rechercher (sensibilité à la casse...)</param>
    /// <returns></returns>
    public static Boolean Contains(this String Value, String TestValue, StringComparison StringComparison)
    {
        return (Value.IndexOf(TestValue, StringComparison) >= 0);
    }

    /// <summary>Mettre la première lettre du mot en capitale</summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static String FirstLetterCapitalize(this String Value)
    {
        if (Value.Length > 0)
        {
            String Firstletter = Value.Substring(0, 1);
            Firstletter = Firstletter.ToUpper();
            Value = Firstletter + Value.Substring(1);
        }
        return Value;
    }



    /// <summary>Formater une chaine de caractères pour de l'url rewriting/// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static String ToUrlRewriting(this String Value)
    {
        Value = Value.Trim();

        Value = Value.Replace(" ", "-");
        Value = Value.Replace("&nbsp;", "-");

        Value = Value.Replace("«", "");
        Value = Value.Replace("«", "");
        Value = Value.Replace("&", "-");
        Value = Value.Replace("ô", "o");
        Value = Value.Replace("é", "e");
        Value = Value.Replace("è", "e");
        Value = Value.Replace("ê", "e");
        Value = Value.Replace("~", "-");
        Value = Value.Replace("#", "-");
        Value = Value.Replace("à", "a");
        Value = Value.Replace("'", "-");
        Value = Value.Replace("(", "-");
        Value = Value.Replace("[", "");
        Value = Value.Replace("|", "-");
        Value = Value.Replace("`", "-");
        Value = Value.Replace("\\", "-");
        Value = Value.Replace("ç", "-");
        Value = Value.Replace("^", "-");
        Value = Value.Replace("à", "a");
        Value = Value.Replace("\"", "-");
        Value = Value.Replace("]", "");
        Value = Value.Replace("=", "-");
        Value = Value.Replace("+", "-");
        Value = Value.Replace("$", "-");
        Value = Value.Replace("*", "-");
        Value = Value.Replace("%", "-");
        Value = Value.Replace("ù", "-");
        Value = Value.Replace("µ", "-");
        Value = Value.Replace("?", "-");
        Value = Value.Replace(",", "-");
        Value = Value.Replace(";", "-");
        Value = Value.Replace(":", "-");
        Value = Value.Replace("§", "-");
        Value = Value.Replace("!", "-");
        Value = Value.Replace("<", "-");
        Value = Value.Replace(">", "-");
        Value = Value.Replace("²", "2");

        Value = Value.Replace("--", "-");
        Value = Value.Replace("--", "-");
        Value = Value.Replace("--", "-");
        Value = Value.Replace("--", "-");

        Value = Value.Replace("%", "-");
        Value = Value.Replace("’", "-");
        Value = Value.Replace(".", "-");
        Value = Value.Replace("« ", "-");
        Value = Value.Replace("/", "-");
        Value = Value.Replace(" ", "");
        Value = Value.Replace(" ", "");
        Value = Value.Replace(" ", "");
        Value = Value.Replace("À", "A");
        Value = Value.Replace("î", "i");
        Value = Value.Replace("û", "u");
        Value = Value.Replace("è", "e");
        Value = Value.Replace("»", "-");

        Value = Value.Replace("--", "-");
        Value = Value.Replace("--", "-");
        Value = Value.Replace("--", "-");
        Value = Value.Replace("--", "-");

        Value = Value.Replace("\r\n", "-");
        Value = Value.Replace("\r\n", "-");

        return Value;
    }

    /// <summary>Formater une chaine de caractères HTML en ASCII</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToASCII(this String Value, Boolean ToHTMLBefore = true)
    {

        if (ToHTMLBefore) { Value = ToHTML(Value, false); }

        Value = Value.Replace("&nbsp;", " ");
        Value = Value.Replace("&agrave;", "à");
        Value = Value.Replace("&aacute;", "á");
        Value = Value.Replace("&acirc;", "â");
        Value = Value.Replace("&atilde;", "ã");
        Value = Value.Replace("&auml;", "ä");
        Value = Value.Replace("&aring;", "å");
        Value = Value.Replace("&aelig;", "æ");

        Value = Value.Replace("&egrave;", "è");
        Value = Value.Replace("&eacute;", "é");
        Value = Value.Replace("&ecirc;", "ê");
        Value = Value.Replace("&euml;", "ë");

        Value = Value.Replace("&igrave;", "ì");
        Value = Value.Replace("&iacute;", "í");
        Value = Value.Replace("&icirc;", "î");
        Value = Value.Replace("&iuml;", "ï");

        Value = Value.Replace("&eth;", "ð");
        Value = Value.Replace("&ograve;", "ò");
        Value = Value.Replace("&oacute;", "ó");
        Value = Value.Replace("&ocirc;", "ô");
        Value = Value.Replace("&otilde;", "õ");
        Value = Value.Replace("&ouml;", "ö");
        Value = Value.Replace("&oslash;", "ø");

        Value = Value.Replace("&ugrave;", "ù");
        Value = Value.Replace("&uacute;", "ú");
        Value = Value.Replace("&Ucirc;", "û");
        Value = Value.Replace("&uuml;", "ü");

        Value = Value.Replace("&yacute;", "ý");
        Value = Value.Replace("&yuml;", "ÿ");

        Value = Value.Replace("&ccedil;", "ç");
        Value = Value.Replace("&ntilde;", "ñ");
        Value = Value.Replace("&divide;", "÷");

        Value = Value.Replace("&amp;", "&");

        return Value;
    }

    /// <summary>Formater une chaine de caractères ASCII en HTML</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToHTML(this String Value, Boolean ToASCIIBefore = true)
    {

        if (ToASCIIBefore) { Value = ToASCII(Value, false); }

        Value = Value.Replace("à", "&agrave;");
        Value = Value.Replace("á", "&aacute;");
        Value = Value.Replace("â", "&acirc;");
        Value = Value.Replace("ã", "&atilde;");
        Value = Value.Replace("ä", "&auml;");
        Value = Value.Replace("å", "&aring;");
        Value = Value.Replace("æ", "&aelig;");

        Value = Value.Replace("è", "&egrave;");
        Value = Value.Replace("é", "&eacute;");
        Value = Value.Replace("ê", "&ecirc;");
        Value = Value.Replace("ë", "&euml;");

        Value = Value.Replace("ì", "&igrave;");
        Value = Value.Replace("í", "&iacute;");
        Value = Value.Replace("î", "&icirc;");
        Value = Value.Replace("ï", "&iuml;");

        Value = Value.Replace("ð", "&eth;");
        Value = Value.Replace("ò", "&ograve;");
        Value = Value.Replace("ó", "&oacute;");
        Value = Value.Replace("ô", "&ocirc;");
        Value = Value.Replace("õ", "&otilde;");
        Value = Value.Replace("ö", "&ouml;");
        Value = Value.Replace("ø", "&oslash;");

        Value = Value.Replace("ù", "&ugrave;");
        Value = Value.Replace("ú", "&uacute;");
        Value = Value.Replace("û", "&Ucirc;");
        Value = Value.Replace("ü", "&uuml;");

        Value = Value.Replace("ý", "&yacute;");
        Value = Value.Replace("ÿ", "&yuml;");

        Value = Value.Replace("ç", "&ccedil;");
        Value = Value.Replace("ñ", "&ntilde;");
        Value = Value.Replace("÷", "&divide;");

        Value = Value.Replace("&", "&amp;");

        return Value;
    }

    /// <summary>Formater une chaine de caractères en URL</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToURL(this String Value)
    {
        return HttpUtility.UrlEncode(Value);
    }

    /// <summary>Formater une chaine de caractères en URL PATH</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToPathURL(this String Value)
    {
        return HttpUtility.UrlPathEncode(Value);
    }

    /// <summary>Formater un objet dynamique en chaine JSON</summary>
    /// <param name="value">Objet dynamique à traiter</param>
    /// <returns></returns>
    public static String ToJSON(this ExpandoObject Obj)
    {
        JavaScriptSerializer Serializer = new JavaScriptSerializer();
        //return serializer.Serialize((IDictionary<string, object>)obj);
        StringBuilder Sb = new StringBuilder();
        List<String> Contents = new List<String>();
        var d = Obj as IDictionary<String, Object>;
        Sb.Append("{");
        foreach (KeyValuePair<String, Object> kvp in d)
        {
            Contents.Add(String.Format("{0}: {1}", kvp.Key, Serializer.Serialize(kvp.Value)));
        }
        Sb.Append(String.Join(",", Contents.ToArray()));
        Sb.Append("}");
        return Sb.ToString();
    }

    /// <summary></summary>
    /// <param name="Htm"></param>
    /// <param name="Id"></param>
    /// <returns></returns>
    public static String ToSingleJSON(this String Htm, String Id)
    {
        JavaScriptSerializer Serializer = new JavaScriptSerializer();

        SingleJSON Sj = new SingleJSON();

        Sj.Html = Htm;
        Sj.Id = Id;

        return Serializer.Serialize(Sj);
    }

    /// <summary>Remplacer les "\r\n" en "<br />"</summary>
    /// <param name="value">Chaines de caractères à traiter</param>
    /// <returns></returns>
    public static String ToBR(this String Value)
    {
        return Value.Replace("\r\n", "<br />").Replace("\n", "<br />");
    }

    /// <summary>Remplacer les "<br />" en "\r\n"</summary>
    /// <param name="value">Chaines de caractères à traiter</param>
    /// <returns></returns>
    public static String ToRN(this String Value)
    {
        return Value.Replace("<br />", "\r\n").Replace("<br/>", "\r\n").Replace("<br>", "\r\n").Replace("<BR />", "\r\n").Replace("<BR/>", "\r\n").Replace("<BR>", "\r\n");
    }

    /// <summary>Remplacer les "<" par des "&lt;" et les ">" par des "&rt;"</summary>
    /// <param name="Value">Chaines de caractères à traiter</param>
    /// <returns></returns>
    public static String ToLtAndRt(this String Value)
    {
        return Value.Replace("<", "&lt;").Replace(">", "&rt;");
    }

    /// <summary>Remplacer la date FR [JJ/MM/AAAA] par une date US [YYYY/MM/DD]</summary>
    /// <param name="value">Date FR [JJ/MM/AAAA]</param>
    /// <returns></returns>
    public static String ToDateUS(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            return Right(Value, 4) + "/" + Value.Substring(3, 2) + "/" + Left(Value, 2);
        }
        else
        {
            return "";
        }
    }

    /// <summary>Remplacer la date US [YYYY/MM/DD] par une date FR [JJ/MM/AAAA]</summary>
    /// <param name="value">Date US [YYYY/MM/DD]</param>
    /// <returns></returns>
    public static String ToDateFR(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            return Right(Value, 2) + "/" + Value.Substring(5, 2) + "/" + Left(Value, 4);
        }
        else
        {
            return "";
        }
    }

    /// <summary>Hache une chaine avec l'algorithme MD5</summary>
    /// <param name="Value">The STR.</param>
    /// <returns></returns>
    public static String ToMD5(this String Value)
    {
        System.Security.Cryptography.MD5CryptoServiceProvider x = new System.Security.Cryptography.MD5CryptoServiceProvider();
        Byte[] Temp = System.Text.Encoding.UTF8.GetBytes(Value);
        Temp = x.ComputeHash(Temp);
        System.Text.StringBuilder s = new System.Text.StringBuilder();
        foreach (Byte b in Temp)
        {
            s.Append(b.ToString("x2").ToLower());
        }
        return s.ToString();
    }

    /// <summary>Supprimer les balises "génantes" d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères HTML à traiter</param>
    /// <returns></returns>
    public static String ToStripHTML(this String Value)
    {
        return StripHTML(Value);
    }

    /// <summary>Supprimer toutes les balises d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères HTML à traiter</param>
    /// <returns></returns>
    public static String ToStripAllHTML(this String Value)
    {
        return StripAllHTML(Value);
    }

    /// <summary>Récupérer la valeur Y/N à partir d'un booléen TRUE/FALSE</summary>
    /// <param name="IsOK">Booléen à traiter</param>
    /// <returns></returns>
    public static String ToSqlYn(this Boolean IsOK)
    {
        return IsOK ? "Y" : "N";
    }

    /// <summary>Récupérer le corps HTML de l'objet lors d'un CallBack</summary>
    /// <param name="value">Objet dynamique à traiter</param>
    /// <returns></returns>
    public static String ToRenderHTML(this System.Web.UI.WebControls.WebControl Obj)
    {
        System.IO.TextWriter StringWriter = new System.IO.StringWriter();
        HtmlTextWriter Htw = new HtmlTextWriter(StringWriter);
        Obj.RenderControl(Htw);
        Htw.Flush();

        return StringWriter.ToString();
    }

    /// <summary>Récupérer le "memorystream" d'une image</summary>
    /// <param name="ImagePath">Chemin de l'image à "streamer"</param>
    /// <returns></returns>
    public static MemoryStream ToImageMemoryStream(this String ImagePath)
    {
        MemoryStream ImageAsMemoryStream = new MemoryStream();
        System.Drawing.Bitmap Image = new System.Drawing.Bitmap(ImagePath);
        Image.Save(ImageAsMemoryStream, System.Drawing.Imaging.ImageFormat.Jpeg);
        ImageAsMemoryStream.Position = 0;
        return ImageAsMemoryStream;
    }

    /// <summary>Récupérer le "filestream" d'un fichier</summary>
    /// <param name="imagePath">Chemin du fichier à "streamer"</param>
    /// <returns></returns>
    public static FileStream ToFileStream(this String ObjPath)
    {
        return File.OpenRead(ObjPath) as FileStream;
    }

    /// <summary>Récupérer le "stream" d'un objet</summary>
    /// <param name="imagePath">Objet à "streamer"</param>
    /// <returns></returns>
    public static Stream ToStream(this String ObjPath)
    {
        HttpWebRequest ObjReq = (HttpWebRequest)HttpWebRequest.Create(ObjPath);
        //objReq.Headers["Cache-Control"] = "no-cache";
        //objReq.Headers["Pragma"] = "no-cache";
        ObjReq.AllowWriteStreamBuffering = false;
        HttpWebResponse ObjResp = (HttpWebResponse)ObjReq.GetResponse();
        return ObjResp.GetResponseStream();
    }

    /// <summary>Serializer un objet en chaine de caractères XML</summary>
    /// <param name="Obj"></param>
    /// <param name="WithNameSpace"></param>
    /// <returns></returns>
    public static String ToSerializedXml(this Object Obj, String NameSpace = "", String Prefixe = "")
    {
        try
        {
            StringBuilder Sb = new StringBuilder();
            XmlWriter Xw = XmlWriter.Create(Sb, new XmlWriterSettings() { OmitXmlDeclaration = true });
            XmlSerializerNamespaces NameSpaces = new XmlSerializerNamespaces();
            if (NameSpace != "")
            {
                NameSpaces.Add(Prefixe, NameSpace);
            }
            else
            {
                NameSpaces.Add("", "");
            }
            XmlSerializer Serializer = new XmlSerializer(Obj.GetType());
            Serializer.Serialize(Xw, Obj, NameSpaces);
            return Sb.ToString();
        }
        catch (Exception)
        {
            return String.Empty;
        }
    }

    /// <summary>Serializer un objet en chaine de caractères JSON</summary>
    /// <param name="Obj"></param>
    /// <returns></returns>
    public static String ToSerializedJson(this Object Obj)
    {
        DataContractJsonSerializer Serializer = new DataContractJsonSerializer(Obj.GetType());
        MemoryStream Stream = new MemoryStream();
        Serializer.WriteObject(Stream, Obj);
        return Encoding.UTF8.GetString(Stream.ToArray());
    }

    /// <summary>Déserializer une chaine de caractères XML en objet</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static T ToDeserializedXml<T>(this String Value)
    {
        DataContractSerializer XmlSerializer = new DataContractSerializer(typeof(T));
        MemoryStream XmlStream = new MemoryStream(Encoding.UTF8.GetBytes(Value));
        return (T)XmlSerializer.ReadObject(XmlStream);
    }

    /// <summary>Déserializer une chaine de caractères JSON en objet</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static T ToDeserializedJson<T>(this String Value)
    {
        DataContractJsonSerializer JsonSerializer = new DataContractJsonSerializer(typeof(T));
        MemoryStream JsonStream = new MemoryStream(Encoding.UTF8.GetBytes(Value));
        return (T)JsonSerializer.ReadObject(JsonStream);
    }

    /// <summary>Transformer une chaine de caractère en tableau de bytes UTF8</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static Byte[] ToUTF8ByteArray(this String Value) {
        UTF8Encoding Encoding = new UTF8Encoding();
        Byte[] ByteArray = Encoding.GetBytes(Value);
        return ByteArray;
    }

    /// <summary>Transformer une stream en tableau de bytes</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static Byte[] ToByteArray(this Stream Value)
    {
        Byte[] Buffer = new Byte[16 * 1024];
        using (MemoryStream Ms = new MemoryStream())
        {
            Int32 Read;
            while ((Read = Value.Read(Buffer, 0, Buffer.Length)) > 0)
            {
                Ms.Write(Buffer, 0, Read);
            }
            return Ms.ToArray();
        }
    }

    /// <summary>Envoyer un mail</summary>
    /// <param name="Emetteur">Emetteur du mail</param>
    /// <param name="Destinataires">Destinataire(s) du mail séparé(s) par des ";"</param>
    /// <param name="SubjectMsg">Objet du mail</param>
    /// <param name="BodyMsgHTML">Corps du mail</param>
    /// <param name="IsBodyHtml">HTML ou simple texte</param>
    /// <param name="CCdestinataires">Destinatair(s) du mail caché(s) séparé(s) par des ";"</param>
    /// <returns>Boolean (OK/KO)</returns>
    public static Boolean SendMail(String Emetteur, String Destinataires, String SubjectMsg, String BodyMsgHTML, Boolean IsBodyHtml, String MailHost, Int32 MailPort, String Username = null, String Password = null, String CCdestinataires = "", List<String> Attachments = null)
    {
        try
        {
            SmtpClient SmtpClient = new SmtpClient();
            MailAddress MsgFrom = new MailAddress(Emetteur, "", System.Text.Encoding.UTF8);
            MailMessage MailMsg = new MailMessage();
            //From
            MailMsg.From = MsgFrom;
            //To
            Char[] Delimiters = new Char[] { ';' };
            String[] MsgTo = Destinataires.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
            for (Int32 i = 0; i < MsgTo.Length; i++)
            {
                MailAddress MsgTo1 = new MailAddress(MsgTo[i].ToString().Trim());
                MailMsg.To.Add(MsgTo1);
            }
            if (CCdestinataires != "")
            {
                String[] MsgCC = Destinataires.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
                for (Int32 i = 0; i < MsgTo.Length; i++)
                {
                    MailAddress msgCC1 = new MailAddress(MsgCC[i].ToString().Trim());
                    MailMsg.CC.Add(msgCC1);
                }
            }
            // Attachments
            if (Attachments != null && Attachments.Count > 0)
                foreach (String CheminDuFichierAAttacher in Attachments)
                {
                    Attachment attachment = new Attachment(CheminDuFichierAAttacher.ToString().Trim());
                    MailMsg.Attachments.Add(attachment);
                }

            MailMsg.IsBodyHtml = IsBodyHtml;
            MailMsg.Body = MailMsg.Body + BodyMsgHTML;
            MailMsg.BodyEncoding = System.Text.Encoding.UTF8;
            MailMsg.Subject = SubjectMsg;
            MailMsg.SubjectEncoding = System.Text.Encoding.UTF8;
            MailMsg.Priority = MailPriority.Normal;
            SmtpClient.Host = MailHost;
            SmtpClient.Port = MailPort;
            if ((Username != null) && (Password != null)) { SmtpClient.Credentials = new NetworkCredential(Username, Password); }
            SmtpClient.Send(MailMsg);
            MailMsg.Dispose();
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }





    /// <summary>Récupérer une chaine de caractères aléatoires</summary>
    /// <param name="Size">Taille de la chaine de caractères aléatoires</param>
    /// <returns></returns>
    public static String CreateAleatoire(Int32 Size)
    {
        return RandomString(Size, false);
    }
    /// <summary>Récupérer une chaine de caractères aléatoires</summary>
    /// <param name="Size">Taille de la chaine de caractères aléatoires</param>
    /// <param name="LowerCase">Minuscule(s) ou non</param>
    /// <returns></returns>
    public static String RandomString(Int32 Size, Boolean LowerCase)
    {
        StringBuilder Builder = new StringBuilder();
        Random Random = new Random();
        Char Caractere;
        for (Int32 i = 0; i < Size; i++)
        {
            Caractere = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * Random.NextDouble() + 65)));
            Builder.Append(Caractere);
        }
        if (LowerCase) return Builder.ToString().ToLower();
        return Builder.ToString();
    }
    /// <summary>Récupérer un nombre aléatoire</summary>
    /// <param name="Min">Minimum pour le nombre aléatoire</param>
    /// <param name="Max">Maximum pour le nombre aléatoire</param>
    /// <returns>Int</returns>
    public static Int32 RandomNumber(Int32 Min, Int32 Max)
    {
        Random Rand = new Random();
        return Rand.Next(Min, Max);
    }
    /// <summary>Récupérer un mot de passe aléatoire de 10 lettres + 4 chiffres + 2 lettres</summary>
    /// <returns>String</returns>
    public static String GetPassword()
    {
        StringBuilder Builder = new StringBuilder();
        Builder.Append(RandomString(4, true));
        Builder.Append(RandomNumber(1000, 9999));
        Builder.Append(RandomString(2, false));
        return Builder.ToString();
    }







    /// <summary>Remplace la fonction IsDate, présente en vb.net</summary>
    /// <param name="Expression">Objet à tester</param>
    public static Boolean IsDate(Object Expression)
    {
        if (Expression != null)
        {
            if (Expression is DateTime)
            {
                return true;
            }
            if (Expression is String)
            {
                DateTime Dt;
                DateTime.TryParse((String)Expression, out Dt);
                if (Dt != DateTime.MinValue && Dt != DateTime.MaxValue)
                    return true;
                return false;
            }
        }
        return false;
    }

    /// <summary>Remplace la fonction IsNumeric, présente en vb.net</summary>
    /// <param name="Expression">String à tester</param>
    /// <returns>Boolean indiquant si la String testée est Numérique</returns>
    public static Boolean IsNumeric(this String Obj)
    {
        Int32 Number;
        Boolean Result = Int32.TryParse(Obj, out Number);

        return Result;
    }

    /// <summary>Vérifier un format "email"</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static Boolean IsEmail(this String Value)
    {
        Regex RegEx = new Regex(@"^[^@]+@(([\w\-]+\.){1,4}[a-zA-Z]{2,4}|(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5]))$");
        Match Mt = RegEx.Match(Value);

        return Mt.Success;
    }


    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="Dt">Date à traiter (remplie, nulle ou minimale)</param>
    /// <returns></returns>
    public static Object ReturnObject(DateTime? Dt)
    {
        if (Dt == DateTime.MinValue) { return DBNull.Value; }
        else if (Dt == null) { return DBNull.Value; }
        else { return Dt; }
    }

    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="Entier">Entier à traiter (rempli, -1 ou nul)</param>
    /// <returns></returns>
    public static Object ReturnObject(Int64? Entier)
    {
        if (Entier == null) { return DBNull.Value; }
        else if (Entier == -1) { return DBNull.Value; }
        else { return Entier; }
    }

    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="myValue">Chaine de caractères à traiter (remplie, vide ou nulle)</param>
    /// <returns></returns>
    public static Object ReturnObject(String Chaine)
    {
        if (Chaine == null) { return DBNull.Value; }
        if (Chaine == "") { return DBNull.Value; }
        else { return Chaine; }
    }

    
    
    /// <summary>Structure utilisée dans le cadre d'un CallBack DEV Express</summary>
    public struct SingleJSON
    {
        public String Id { get; set; }
        public String Html { get; set; }
    }


    
    /// <summary>Récupérer l'IP cliente au travers d'un "Load Balancer" ALOHA</summary>
    public static String LoadBalancerIp
    {
        get
        {
            String CurrentIp;
            CurrentIp = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (String.IsNullOrEmpty(CurrentIp))
            {
                CurrentIp = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_HOST"];
                if (!CurrentIp.Equals("::1"))
                {
                    CurrentIp = GetLocalIpAdress();
                }
                CurrentIp = System.Web.HttpContext.Current.Request.UserHostAddress;
            }
            return CurrentIp;
        }
    }
    public static String GetLocalIpAdress()
    {
        IPHostEntry Host;
        String LocalIp = "?";
        Host = Dns.GetHostEntry(Dns.GetHostName());
        foreach (IPAddress CurrentIp in Host.AddressList)
        {
            if (CurrentIp.AddressFamily.ToString() == "InterNetwork")
            {
                LocalIp = CurrentIp.ToString();
            }
        }
        return LocalIp;
    }

}