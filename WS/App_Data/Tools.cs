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
using System.Reflection;
using System.Collections;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Specialized;

/// <summary>
/// Bibliothèque Générique (Version NLEB)
/// v3.1.8
/// 14/01/2019
/// (sans BigInteger)
/// (sans SendMail)
/// C#
/// </summary>
public static class Tools
{

    /// <summary>Mettre la première lettre du mot en capitale</summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static String ToFirstLetterCapitalize(this String Value)
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
    public static String ToEncodedASCII(this String Value, Boolean ToHTMLBefore = true)
    {

        if (ToHTMLBefore) { Value = ToEncodedHTML(Value, false); }

        Value = Value.Replace("&amp;", "&");

        Value = Value.Replace("&lt;", "<");
        Value = Value.Replace("&gt;", ">");

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

        return Value;
    }

    /// <summary>Formater une chaine de caractères ASCII en HTML</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToEncodedHTML(this String Value, Boolean ToASCIIBefore = true)
    {

        if (ToASCIIBefore) { Value = ToEncodedASCII(Value, false); }

        Value = Value.Replace("<", "&lt;");
        Value = Value.Replace(">", "&gt;");

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
    public static String ToEncodedURL(this String Value)
    {
        return HttpUtility.UrlEncode(Value);
    }

    /// <summary>Supprimer le formatage d'une chaine de caractères en URL</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToDecodedURL(this String Value)
    {
        return HttpUtility.UrlDecode(Value);
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
        Serializer.MaxJsonLength = Int32.MaxValue;
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

    /// <summary>Rajouter les HTTPS à une URL</summary>
    /// <param name="Value">Url à traiter</param>
    /// <param name="Force">Remplace les HTTP potentiels par les HTTPS</param>
    /// <returns></returns>
    public static String ToHttps(this String Value, Boolean Force = false)
    {
        if (String.IsNullOrEmpty(Value))
        {
            return String.Empty;
        }
        if ((Value.ToLower().IndexOf("http://") < 0) && (Value.ToLower().IndexOf("https://") < 0))
        {
            return "https://" + Value;
        }
        else if (Value.ToLower().IndexOf("http://") == 0)
        {
            if (Force) { return Value.ToLower().Replace("http://", "https://"); }
            else { return Value; }
        }
        else
        {
            return Value;
        }
    }

    /// <summary>Rajouter les HTTP à une URL</summary>
    /// <param name="Value">Url à traiter</param>
    /// <param name="Force">Remplace les HTTP potentiels par les HTTPS</param>
    /// <returns></returns>
    public static String ToHttp(this String Value, Boolean Force = false)
    {
        if (String.IsNullOrEmpty(Value))
        {
            return String.Empty;
        }
        else if ((Value.ToLower().IndexOf("http://") < 0) && (Value.ToLower().IndexOf("https://") < 0))
        {
            return "http://" + Value;
        }
        else if (Value.Left(8).ToLower() == "https://")
        {
            if (Force) { return "http://" + Value.Substring(8); }
            else { return Value; }
        }
        else
        {
            return Value;
        }
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
        if (!String.IsNullOrEmpty(Value)) { return Value.Replace("\r\n", "<br />").Replace("\n", "<br />"); }
        else { return String.Empty; }
    }

    /// <summary>Remplacer les "<br />" en "\r\n"</summary>
    /// <param name="value">Chaines de caractères à traiter</param>
    /// <returns></returns>
    public static String ToRN(this String Value)
    {
        if (!String.IsNullOrEmpty(Value)) { return Value.Replace("<br />", "\r\n").Replace("<br/>", "\r\n").Replace("<br>", "\r\n").Replace("<BR />", "\r\n").Replace("<BR/>", "\r\n").Replace("<BR>", "\r\n"); }
        else { return String.Empty; }
    }

    /// <summary>Remplacer les "<" par des "&lt;" et les ">" par des "&gt;"</summary>
    /// <param name="Value">Chaines de caractères à traiter</param>
    /// <returns></returns>
    public static String ToLtAndRt(this String Value)
    {
        if (!String.IsNullOrEmpty(Value)) { return Value.Replace("<", "&lt;").Replace(">", "&gt;"); }
        else { return String.Empty; }
    }

    /// <summary>Remplacer la date FR [JJ/MM/AAAA] par une date US [YYYY/MM/DD]</summary>
    /// <param name="value">Date FR [JJ/MM/AAAA]</param>
    /// <returns></returns>
    public static String ToDateUS(this String Value)
    {
        if (!String.IsNullOrEmpty(Value)) { return Right(Value, 4) + "/" + Value.Substring(3, 2) + "/" + Left(Value, 2); }
        else { return String.Empty; }
    }

    /// <summary>Remplacer la date US [YYYY/MM/DD] par une date FR [JJ/MM/AAAA]</summary>
    /// <param name="value">Date US [YYYY/MM/DD]</param>
    /// <returns></returns>
    public static String ToDateFR(this String Value)
    {
        if (!String.IsNullOrEmpty(Value)) { return Right(Value, 2) + "/" + Value.Substring(5, 2) + "/" + Left(Value, 4); }
        else { return String.Empty; }
    }

    /// <summary>Supprimer les balises "génantes" d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères HTML à traiter</param>
    /// <returns></returns>
    public static String ToStripHTML(this String Value, Boolean HtmlDecode = false)
    {
        return StripHTML(Value, HtmlDecode);
    }

    /// <summary>Supprimer toutes les balises d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères HTML à traiter</param>
    /// <returns></returns>
    public static String ToStripAllHTML(this String Value, Boolean HtmlDecode = false)
    {
        return StripAllHTML(Value, HtmlDecode);
    }

    /// <summary>Récupérer la valeur Y/N à partir d'un booléen TRUE/FALSE/NULL</summary>
    /// <param name="IsOK">Booléen à traiter</param>
    /// <returns></returns>
    public static String ToSqlYn(this Boolean Value)
    {
        return Value ? "Y" : "N";
    }

    /// <summary>Récupère la valeur boolean d'une chaine de caractères</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static Boolean ToBoolean(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            if ((Value.ToUpper().Contains("Y")) || (Value.ToUpper().Contains("OUI")) || (Value.ToUpper().Contains("TRUE")) || (Value.ToUpper().Contains("1"))) { return true; }
            else { return false; }
        }
        else { return false; }
    }

    /// <summary>Récupère la valeur boolean d'une chaine de caractères</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static Boolean? ToBooleanNullable(this String Value)
    {
        if ((!String.IsNullOrEmpty(Value)) && (Value != "null")) { return Value.ToBoolean(); }
        else { return null; }
    }

    /// <summary>Permet de transformer un boolean En boolean JS</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToBooleanJS(this Boolean Value)
    {
        return Value.ToString().ToLower();
    }

    /// <summary>Transforme une string null en chaine vide</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToNotNullString(this String Value)
    {
        if (Value == null) { return String.Empty; }
        else { return Value; }
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
    public static Stream ToStream(this String ObjPath, Int16 Try = 5)
    {
        WebClient ObjReq = new WebClient();

        Int16 Count = 1;
        Stream ReturnStream = null;
        while (Count < Try)
        {
            try
            {
                ReturnStream = ObjReq.OpenRead(ObjPath);
                if (ReturnStream == null) { Count++; }
                else { break; }
            }
            catch (Exception) { Count++; }
        }
        return ReturnStream;
    }

    /// <summary>Serializer un objet en chaine de caractères XML</summary>
    /// <param name="Obj"></param>
    /// <param name="WithNameSpace"></param>
    /// <returns></returns>
    public static String ToSerializedXml(this Object Obj, String NameSpace = "", String Prefixe = "", Boolean UseDataContractSerializer = false)
    {
        String Result = String.Empty;
        try
        {
            if (!UseDataContractSerializer)
            {
                StringBuilder Sb = new StringBuilder();
                XmlWriter Xw = XmlWriter.Create(Sb, new XmlWriterSettings() { OmitXmlDeclaration = true });
                XmlSerializerNamespaces NameSpaces = new XmlSerializerNamespaces();
                if (NameSpace != "") { NameSpaces.Add(Prefixe, NameSpace); }
                else { NameSpaces.Add("", ""); }
                XmlSerializer Serializer = new XmlSerializer(Obj.GetType());
                Serializer.Serialize(Xw, Obj, NameSpaces);
                Result = Sb.ToString();
            }
            else
            {
                using (MemoryStream MemStm = new MemoryStream())
                {
                    DataContractSerializer Serializer = new DataContractSerializer(Obj.GetType());
                    Serializer.WriteObject(MemStm, Obj);
                    MemStm.Seek(0, SeekOrigin.Begin);
                    using (StreamReader StrReader = new StreamReader(MemStm)) { Result = StrReader.ReadToEnd(); }
                }
            }
        }
        catch (Exception) { }
        return Result;
    }

    /// <summary>Serializer un objet en chaine de caractères JSON</summary>
    /// <param name="Obj"></param>
    /// <returns></returns>
    public static String ToSerializedJson(this Object Obj)
    {
        DataContractJsonSerializer Serializer = new DataContractJsonSerializer(Obj.GetType());
        MemoryStream Stream = new MemoryStream();
        if (Obj.GetType() == typeof(System.String))
        {
            return Obj.ToString();
        }

        FixRecursivelyAllDatesForJson(Obj);

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

    /// <summary>Déserialise une chaine de caracteres XML sans contrat en objet</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static T ToDeserializedSimpleXml<T>(this String Value)
    {
        System.Xml.Serialization.XmlSerializer serializer = new System.Xml.Serialization.XmlSerializer(typeof(T));
        System.IO.StringReader sr = new System.IO.StringReader(Value);
        return (T)serializer.Deserialize(sr);
    }

    /// <summary>Déserializer une chaine de caractères JSON en objet</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static T ToDeserializedJson<T>(this String Value)
    {
        if (String.IsNullOrEmpty(Value))
        {
            if (typeof(T).IsValueType)
            {
                return default(T);
            }
            else
            {
                return Activator.CreateInstance<T>();
            }
        }

        try
        {
            if ((typeof(T).IsValueType) || (typeof(T) == typeof(String)))
            {
                return (T)Convert.ChangeType(Value, typeof(T));
            }
        }
        catch (Exception)
        {
            //on passe dans la méthode 
        }
        DataContractJsonSerializer JsonSerializer = new DataContractJsonSerializer(typeof(T));
        MemoryStream JsonStream = new MemoryStream(Encoding.UTF8.GetBytes(Value));
        return (T)JsonSerializer.ReadObject(JsonStream);

    }

    /// <summary>Transformer une chaine de caractère en tableau de bytes UTF8</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static Byte[] ToUTF8ByteArray(this String Value)
    {
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

    /// <summary>Récupère le jour de la semaine</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToDay(this Int16 Value)
    {
        String Day = "";
        switch (Value)
        {
            case 1:
                Day = "Lundi";
                break;
            case 2:
                Day = "Mardi";
                break;
            case 3:
                Day = "Mercredi";
                break;
            case 4:
                Day = "Jeudi";
                break;
            case 5:
                Day = "Vendredi";
                break;
            case 6:
                Day = "Samedi";
                break;
            case 7:
                Day = "Dimanche";
                break;
        }
        return Day;
    }

    /// <summary>Récupérer le mois</summary>
    /// <param name="value">Numéro du mois</param>
    /// <param name="Casse">Casse du mois : "" (normal) / "M" (majuscules) / "m" (minuscules)</param>
    /// <returns>String</returns>
    public static String ToMonth(this Int16 Value, String Casse = "")
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

    /// <summary>Retourne une string dans un bloc CData</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToProtectedCData(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            Value = "<![CDATA[" + Value + "]]>";
        }

        return Value;
    }

    /// <summary>Enlève le CData d'une chaine</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToUnProtectedCData(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            Value = Value.Replace("<![CDATA[", "");
            Value = Value.Replace("]]>", "");
        }

        return Value;
    }

    /// <summary>Retourne la valeur ou la valeur par défaut</summary>
    /// <param name="DefaultValue">Chaine de caractères par défaut</param>
    /// <returns></returns>
    public static String ToStringOrDefault(this String Value, String DefaultValue = "?")
    {
        if (!String.IsNullOrEmpty(Value)) { return Value.Trim(); }
        else { return DefaultValue; }
    }

    /// <summary>Crypter/Hasher une chaine de caractères en SHA1</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToEncryptedSHA1(this String Value)
    {
        String Vastr = HttpUtility.UrlDecode(Value);
        SHA1 Sha = new SHA1CryptoServiceProvider();
        Byte[] UTF8Text = Encoding.UTF8.GetBytes(Value);
        Byte[] Result = Sha.ComputeHash(UTF8Text);
        StringBuilder Sb = new StringBuilder();
        for (Int32 i = 0; i < Result.Length; i++)
        {
            Sb.Append(Result[i].ToString("X2"));
        }
        return Sb.ToString();
    }

    /// <summary>Hasher/Crypter une chaine avec l'algorithme MD5</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToEncryptedMD5(this String Value)
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

    /// <summary>Décrypter une chaine de caractères MD5</summary>
    /// <param name="Value">Chaine de caractères MD5 à traiter</param>
    /// <returns></returns>
    public static String ToDecryptedMD5(this String Value)
    {
        return String.Empty;
    }

    /// <summary>Coder une chaine de caractères en Triple DES (salt KALIDEA)</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <param name="Passphrase">Phrase de cryptage personnalisé</param>
    /// <returns></returns>
    public static String ToEncryptedTripleDES(this String Value, String PassPhrase)
    {
        Byte[] Results;
        System.Text.UTF8Encoding UTF8 = new System.Text.UTF8Encoding();

        // Step 1. We hash the passphrase using MD5
        // We use the MD5 hash generator as the result is a 128 bit byte array
        // which is a valid length for the TripleDES encoder we use below

        MD5CryptoServiceProvider HashProvider = new MD5CryptoServiceProvider();
        Byte[] TDESKey = HashProvider.ComputeHash(UTF8.GetBytes(PassPhrase));

        // Step 2. Create a new TripleDESCryptoServiceProvider object
        TripleDESCryptoServiceProvider TDESAlgorithm = new TripleDESCryptoServiceProvider();

        // Step 3. Setup the encoder
        TDESAlgorithm.Key = TDESKey;
        TDESAlgorithm.Mode = CipherMode.ECB;
        TDESAlgorithm.Padding = PaddingMode.PKCS7;

        // Step 4. Convert the input string to a byte[]
        Byte[] DataToEncrypt = UTF8.GetBytes(Value);

        // Step 5. Attempt to encrypt the string
        try
        {
            ICryptoTransform Encryptor = TDESAlgorithm.CreateEncryptor();
            Results = Encryptor.TransformFinalBlock(DataToEncrypt, 0, DataToEncrypt.Length);
        }
        finally
        {
            // Clear the TripleDes and Hashprovider services of any sensitive information
            TDESAlgorithm.Clear();
            HashProvider.Clear();
        }

        // Step 6. Return the encrypted string as a base64 encoded string
        return Convert.ToBase64String(Results);
    }

    /// <summary>Décoder une chaine de caractères Triple DES (salt KALIDEA)</summary>
    /// <param name="Value">Chaine de caractères Triple DES à traiter</param>
    /// <param name="PassPhrase">Phrase de cryptage personnalisé</param>
    /// <returns></returns>
    public static String ToDecryptedTripleDES(this String Value, String PassPhrase)
    {
        Byte[] Results;
        System.Text.UTF8Encoding UTF8 = new System.Text.UTF8Encoding();

        // Step 1. We hash the passphrase using MD5
        // We use the MD5 hash generator as the result is a 128 bit byte array
        // which is a valid length for the TripleDES encoder we use below

        MD5CryptoServiceProvider HashProvider = new MD5CryptoServiceProvider();
        Byte[] TDESKey = HashProvider.ComputeHash(UTF8.GetBytes(PassPhrase));

        // Step 2. Create a new TripleDESCryptoServiceProvider object
        TripleDESCryptoServiceProvider TDESAlgorithm = new TripleDESCryptoServiceProvider();

        // Step 3. Setup the decoder
        TDESAlgorithm.Key = TDESKey;
        TDESAlgorithm.Mode = CipherMode.ECB;
        TDESAlgorithm.Padding = PaddingMode.PKCS7;

        // Step 4. Convert the input string to a byte[]
        Byte[] DataToDecrypt = Convert.FromBase64String(Value);

        // Step 5. Attempt to decrypt the string
        try
        {
            ICryptoTransform Decryptor = TDESAlgorithm.CreateDecryptor();
            Results = Decryptor.TransformFinalBlock(DataToDecrypt, 0, DataToDecrypt.Length);
        }
        finally
        {
            // Clear the TripleDes and Hashprovider services of any sensitive information
            TDESAlgorithm.Clear();
            HashProvider.Clear();
        }

        // Step 6. Return the decrypted string in UTF8 format
        return UTF8.GetString(Results);
    }

    /// <summary>Retourner une adresse décomposé dans un tableau</summary>
    /// <param name="AddressInLine"></param>
    /// <returns>[0]adresse, [1]code postal, [2]ville
    /// Si la ville est vide, faire une recherche de ville par code postal
    /// </returns>
    public static String[] ToArrayAddress(this String AddressInLine)
    {
        String[] ResultListed = new String[3];

        //Définition des regex d'adresse
        Regex RegZipCode = new Regex(@"((##)?[0-9]{5}(##)?)");
        Regex RegAddressStart = new Regex(@"^((##)?([0-9]{1,4})(\s)?([a-zA-Z0-9\s\-/']+)(##)?)");
        Regex RegAddress = new Regex(@"((##)?([0-9]{1,4})(\s)?([a-zA-Z0-9\s\-/']+){1}(##)?)");
        Regex RegTypeVoieStart = new Regex(@"^((allée)|(allee)|(all)|(avenue)|(ave)|(boulevard)|(boul)|(bd)|(chemin)|(impasse)|(lieu-dit)|(rue)|(place)|(pl))\.?\s");
        Regex RegTypeVoie = new Regex(@"((allée)|(allee)|(all)|(avenue)|(ave)|(boulevard)|(boul)|(bd)|(chemin)|(impasse)|(lieu-dit)|(rue)|(place)|(pl))\.?\s");
        Regex RegSharp = new Regex(@"##");

        String Address = String.Empty;
        String ZipCode = String.Empty;
        String City = String.Empty;

        String[] SplittedAddress = null;
        Boolean StillWhiteSpace = true;

        //Remplement des double espaces par des simples
        while (StillWhiteSpace)
        {
            AddressInLine = AddressInLine.Replace("  ", " ");
            StillWhiteSpace = AddressInLine.Contains("  ");
        }

        //Filtrage des virgules
        AddressInLine = AddressInLine.Replace(" ,", ",").Replace(", ", ",").Replace(",", "##");

        // Recherche du code postal
        SplittedAddress = RegZipCode.Split(AddressInLine);
        if (SplittedAddress != null && SplittedAddress.Count() >= 1)
        {
            foreach (String CurrentString in SplittedAddress)
            {
                if (RegZipCode.Match(CurrentString).Success)
                {
                    ZipCode = CurrentString.Replace("##", "").Trim();
                }
            }
        }
        //Si le code postal n'a pas été trouvé
        if (String.IsNullOrEmpty(ZipCode))
        {
            ZipCode = "00000";
        }

        AddressInLine = RegZipCode.Replace(AddressInLine, "##").Replace(" ##", "##").Replace("## ", "##");

        // Recherche de l'adresse
        SplittedAddress = RegSharp.Split(AddressInLine);
        if (SplittedAddress != null && SplittedAddress.Count() >= 1)
        {
            // Adresse au début trouvée no soucy
            foreach (String CurrentString in SplittedAddress)
            {
                if (RegAddressStart.Match(CurrentString.Trim()).Success && RegTypeVoie.Match(CurrentString.ToLower().Trim()).Success)
                {
                    Address = CurrentString.Trim();
                }
            }
            // On cherche l'adresse n'importe où
            if (String.IsNullOrEmpty(Address))
            {
                foreach (String CurrentString in SplittedAddress)
                {
                    String[] TempSplit = RegAddress.Split(CurrentString);
                    Boolean Found = false;
                    foreach (String CurrentString2 in TempSplit)
                    {
                        if (!Found && RegAddressStart.Match(CurrentString2.Trim()).Success && RegTypeVoie.Match(CurrentString.ToLower().Trim()).Success)
                        {
                            Address = CurrentString2.Trim();
                            Found = true;
                        }
                    }
                }
            }
            // On cherche l'adresse en prédiction (rue, place...)
            if (String.IsNullOrEmpty(Address))
            {
                foreach (String CurrentString in SplittedAddress)
                {
                    Boolean IsProbableAddress = RegTypeVoieStart.Match(CurrentString.ToLower().Trim()).Success;

                    if (IsProbableAddress)
                    {
                        Address = CurrentString;
                    }
                }
            }
        }

        if (!String.IsNullOrEmpty(Address))
        {
            AddressInLine = AddressInLine.Replace(Address, "");
        }
        else
        {
            Address = "0";
        }

        AddressInLine = RegSharp.Replace(AddressInLine, "");
        City = AddressInLine.Trim();

        ResultListed[0] = Address;
        ResultListed[1] = ZipCode;
        ResultListed[2] = City;

        return ResultListed;
    }

    /// <summary>Retourner une chaine de caractères au format "Camel"</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String ToCamelCase(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            String Result = String.Empty;
            Value = Value.ToLower();
            Value = Value.ToFirstLetterCapitalize();

            foreach (String CurrentString in Value.Split('_'))
            {
                Result = Result + CurrentString.ToFirstLetterCapitalize();
            }

            return Result;
        }
        else
        {
            return String.Empty;
        }
    }

    /// <summary>Retourner un montant avec 2 chiffres derrière la virgule</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToAmount(this Object Value)
    {
        return String.Format(System.Globalization.CultureInfo.CurrentCulture.NumberFormat, "{0:N2}", Value);
    }

    /// <summary>Retourner un pourcentage au format x%</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToPercentage(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            return Value.Replace("%", "") + "%";
        }
        else
        {
            return String.Empty;
        }
    }

    /// <summary>Retourner une date au format DD/MM/YYYY</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToShortDate(this DateTime Value)
    {
        return Value.ToString("dd/MM/yyyy");
    }

    /// <summary>Retourner une date au format DD/MM/YYYY</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToShortDate(this DateTime? Value)
    {
        if (Value.HasValue) { return ToShortDate(Value.Value); }
        else { return String.Empty; }
    }

    /// <summary>Retourner une date au format DD/MM/YYYY HH:mm</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToShortDateTime(this DateTime Value)
    {
        return Value.ToString("dd/MM/yyyy HH:mm");
    }

    /// <summary>Retourner une date au format DD/MM/YYYY HH:mm</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String ToShortDateTime(this DateTime? Value)
    {
        if (Value.HasValue) { return ToShortDateTime(Value.Value); }
        else { return String.Empty; }
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

    /// <summary>Retourne true si le siret est valide</summary>
    /// <param name="Siret"></param>
    /// <returns></returns>
    public static Boolean IsValidSiret(this String Siret)
    {
        Boolean IsValid = false;
        Int32 I = 1;
        Int32 V = 0;
        Int32 iLuhnKey = 0;
        String Val = "";

        if ((Siret.Length == 14) && (Siret != "00000000000000"))
        {
            Val = Siret.Substring(0, 9);

            if (Val.IsSirenValid())
            {
                iLuhnKey = 0;
                while (I <= Siret.Length)
                {
                    V = Int32.Parse(Siret.Substring(I - 1, 1));
                    if ((I % 2) == 1)
                    {
                        V = V * 2;
                    }
                    if (V >= 10)
                    {
                        iLuhnKey = iLuhnKey + (V - 9);
                    }
                    else
                    {
                        iLuhnKey = iLuhnKey + V;
                    }

                    I++;
                }

                IsValid = ((iLuhnKey % 10) == 0);

            }
        }

        return IsValid;

    }

    /// <summary>Retourne si le siren est valide</summary>
    /// <param name="Siret"></param>
    /// <returns></returns>
    public static Boolean IsSirenValid(this String Siret)
    {
        Boolean IsValid = false;
        Int32 I = 1;
        Int32 V = 0;
        Int32 iLuhnKey = 0;

        if ((Siret.Length == 9) && (Siret != "000000000"))
        {
            iLuhnKey = 0;
            while (I <= Siret.Length)
            {
                V = Int32.Parse(Siret.Substring(I - 1, 1));
                if ((I % 2) == 0)
                {
                    V = V * 2;
                }
                if (V >= 10)
                {
                    iLuhnKey = iLuhnKey + (V - 9);
                }
                else
                {
                    iLuhnKey = iLuhnKey + V;
                }
                I++;
            }
            IsValid = ((iLuhnKey % 10) == 0);

        }


        return IsValid;

    }

    /// <summary>Check si un IBAN est correct</summary>
    /// <param name="Iban">Code iban</param>
    /// <returns>Iban ok ?</returns>
    public static Boolean IsIbanOk(String Iban)
    {
        Boolean IbanOk = false;
        Iban = Iban.ToUpper();
        try
        {
            if (!String.IsNullOrEmpty(Iban) && Iban.Length >= 17)
            {
                // 4 premiers caractères passent à droite
                Iban = Iban.Right(Iban.Length - 4) + Iban.Left(4);

                // Conversion des lettres en nombre
                String IbanTemp = String.Empty;
                foreach (Char C in Iban)
                {
                    if (Char.IsLetter(C))
                    {
                        IbanTemp += (Int32)C - (Int32)'A' + 10;
                    }
                    else
                    {
                        IbanTemp += C;
                    }
                }

                // Conversion de la chaîne en nombre
                Int64 IbanNumber = Int64.Parse(IbanTemp);

                // Calcul du modulo
                IbanOk = IbanNumber % 97 == 1;
            }
            else
            {
                IbanOk = false;
            }
        }
        catch
        {
            IbanOk = false;
        }



        return IbanOk;
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
    /// <param name="Valeur">Entier à traiter (rempli, -1 ou nul)</param>
    /// <returns></returns>
    public static Object ReturnObject(Int64? Valeur, Boolean Force = false)
    {
        if (Valeur == null) { return DBNull.Value; }
        else if ((Valeur == -1) && (Force)) { return DBNull.Value; }
        else { return Valeur; }
    }

    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="Chaine">Chaine de caractères à traiter (remplie, vide ou nulle)</param>
    /// <returns></returns>
    public static Object ReturnObject(String Chaine)
    {
        if (Chaine == null) { return DBNull.Value; }
        else
        {
            if (String.IsNullOrEmpty(Convert.ToString(Chaine))) { return DBNull.Value; }
            else { return Chaine; }
        }


    }

    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="Valeur">Nombre décimal à traiter (rempli, vide ou nul)</param>
    /// <returns></returns>
    public static Object ReturnObject(Decimal? Valeur)
    {
        if (Valeur == null) { return DBNull.Value; }
        else { return Valeur; }
    }

    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="Valeur">Nombre décimal à traiter (rempli, vide ou nul)</param>
    /// <returns></returns>
    public static Object ReturnObject(Double? Valeur)
    {
        if (Valeur == null) { return DBNull.Value; }
        else { return Valeur; }
    }

    /// <summary>Rendre la valeur "DBNull.Value" (pour Oracle)</summary>
    /// <param name="Valeur">Booleén à traiter (rempli, vide ou nul)</param>
    /// <returns></returns>
    public static Object ReturnObject(Boolean? Valeur)
    {
        if (Valeur == null) { return DBNull.Value; }
        else { return (Valeur.Value ? 1 : 0); }
    }



    /// <summary>Structure utilisée dans le cadre d'un CallBack DEV Express</summary>
    public struct SingleJSON
    {
        public String Id { get; set; }
        public String Html { get; set; }
    }

    public static String ConvertDateJSON(this String Obj)
    {
        String p = @"\\/Date\(\d+\)\\/";
        MatchEvaluator MatchEvaluator = new MatchEvaluator(ConvertJsonDateToDateString);
        Regex reg = new Regex(p);
        Obj = reg.Replace(Obj, MatchEvaluator);
        return Obj;
    }

    private static String ConvertJsonDateToDateString(Match m)
    {
        String result = String.Empty;
        DateTime Dt = new DateTime(1970, 1, 1);
        String TimeNumber = m.Groups[0].Value.Replace("\\/Date(", "").Replace(")\\/", "");
        Dt = Dt.AddMilliseconds(Int64.Parse(TimeNumber));
        result = Dt.ToString("yyyy-MM-dd HH:mm:ss");
        return result;
    }

    /// <summary>
    /// Tries the parse to date nullable.
    /// </summary>
    /// <param name="dateTimeString">The date time string.</param>
    /// <param name="result">The result.</param>
    /// <returns></returns>
    public static Boolean TryParseToDateNullable(this String dateTimeString, out DateTime? result)
    {
        DateTime tempDate;
        if (!DateTime.TryParse(dateTimeString, out tempDate))
        {
            result = null;
            return false;
        }

        result = tempDate;
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

    /// <summary>Récupérer l'IP cliente au travers d'un "Load Balancer" ALOHA</summary>
    public static String LoadBalancerIp
    {
        get
        {
            String CurrentIp;
            if (System.Web.HttpContext.Current != null)
            {
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
            }
            else
            {
                // on n'est pas en mode http, récupération de l'adresse IP
                CurrentIp = GetLocalIpAdress();
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

    /// <summary>Convertir une lettre "Y" ou "N" en un type booléen</summary>
    /// <param name="Value">Valeur à convertir</param>
    /// <returns>true si la lettre est Y, false sinon</returns>
    [Obsolete("Cette méthode est obsolète ! Utiliser l'extension ToBoolean() à la place...")]
    public static Boolean GetBoolFromString(String Value)
    {
        if (String.IsNullOrEmpty(Value)) { return false; }
        return (Value == "Y");
    }

    /// <summary>Masque les n-caractères d'un numéro de carte bancaire</summary>
    /// <param name="Value"></param>
    /// <param name="TakeFirst"></param>
    /// <param name="TakeLast"></param>
    /// <returns></returns>
    public static String ObfuscateCardNumber(String Value, Int32 TakeFirst = 4, Int32 TakeLast = 2)
    {
        String NewValue = String.Empty;
        if (!String.IsNullOrEmpty(Value) && TakeFirst > 0 && TakeLast > 0)
        {
            try
            {
                String RegexPattern = @"^(\d{" + TakeFirst.ToString() + @"})(\d*?)(\d{" + TakeLast.ToString() + "})$";
                Regex Regxp = new Regex(RegexPattern);
                if (Regxp.IsMatch(Value))
                {
                    Match RegxpMatch = Regxp.Match(Value);
                    if (RegxpMatch.Groups.Count > 3)
                    {
                        StringBuilder Sb = new StringBuilder();
                        Sb.Append(RegxpMatch.Groups[1].Value);
                        Sb.Append(Regex.Replace(RegxpMatch.Groups[2].Value, "[0-9]", "X"));
                        Sb.Append(RegxpMatch.Groups[3]);
                        NewValue = Sb.ToString();
                    }
                }
            }
            catch (Exception) { }
        }
        return NewValue;
    }

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
            return String.Empty;
        }
    }

    /// <summary>Retourne un objet avec les proriétés protegé pour un appel WS</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static Object ProtectWsAttributes(this Object Value)
    {
        System.Type ClassType = Value.GetType();
        System.Reflection.PropertyInfo[] Properties = ClassType.GetProperties();
        //Récupère toutes les propriétés
        try
        {
            foreach (System.Reflection.PropertyInfo CurrentProperty in Properties)
            {
                //Récupération du type de la propriété
                System.Type PropertyType = CurrentProperty.PropertyType;
                //Si le type en cours est String
                if (PropertyType.UnderlyingSystemType == typeof(String))
                {
                    //Si on peut écrire dans la propriété
                    if (CurrentProperty.CanWrite)
                    {
                        //Récupération de la propriété
                        String MyNewValue = CurrentProperty.GetValue(Value, null) as String;
                        //Si la valeur doit etre protegé
                        if (MyNewValue.NeedWsProtection())
                        {
                            CurrentProperty.SetValue(Value, MyNewValue.ToProtectedCData(), null);
                        }
                    }
                }

                /*
                
                //Si il s'agit d'une liste
                else if (PropertyType.IsGenericType && PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                {
                    //Récupération du type du premier element
                    System.Type UnderPropertyType = PropertyType.GetGenericArguments()[0];
                    //Récupération des objets
                    System.Reflection.PropertyInfo[] UnderProperties = PropertyType.GetProperties();
                    //Pour chaque propriété
                    foreach (System.Reflection.PropertyInfo CurrentUnderProperty in UnderProperties)
                    {
                        //Récupération du type contenu dans la liste
                        //Si il s'agit d'un string
                        if (CurrentUnderProperty.PropertyType == typeof(String))
                        {
                            //Si on peut écrire dans la propriété
                            if (CurrentUnderProperty.CanWrite)
                            {
                                //Récupération de la propriété
                                String MyNewValue = CurrentProperty.GetValue(Value, null) as String;
                                //Si la valeur doit etre protegé
                                if (MyNewValue.NeedWsProtection())
                                {
                                    CurrentUnderProperty.SetValue(Value, MyNewValue.ToCData(), null);
                                }
                            }
                        }
                        //Si il s'agit d'un Objet
                        else if (!CurrentUnderProperty.PropertyType.IsValueType)
                        {
                            //Si l'objet peut etre modifier
                            if (CurrentUnderProperty.CanWrite)
                            {
                                //Récupération de la propriété
                                Object MyNewValueObject = CurrentUnderProperty.GetValue(Value, null) as Object;
                                //Navigation dans l'objet
                                CurrentUnderProperty.SetValue(Value, MyNewValueObject.ProtectWsAttributes(), null);
                            }
                        }
                    }
                }
                //Si il s'agit d'un Dictionnaire
                else if (PropertyType.IsGenericType && PropertyType.GetGenericTypeDefinition() == typeof(Dictionary<,>))
                {
                    //Récupération des type du dictionnaire
                    System.Type[] DictTypes = PropertyType.GetGenericArguments();
                    System.Type ValueType = DictTypes[0];
                    System.Type KeyType = DictTypes[1];
                    //Récupération de la propriété
                    IDictionary MyNewValueObject = CurrentProperty.GetValue(Value, null) as IDictionary;
                    //Si le type d'objet est String
                    if(ValueType.UnderlyingSystemType == typeof(String))
                    {
                        //Parcours du dictionnaire
                        foreach (String CurrentPropertyDict in MyNewValueObject.Values)
                        {
                            CurrentProperty.SetValue(CurrentProperty, CurrentPropertyDict.ProtectWsAttributes(), null);

                            PropertyInfo IndexProp = CurrentProperty.GetType().GetProperties().First(p => p.GetIndexParameters().Length > 0 && p.GetIndexParameters()[0].ParameterType == KeyType.GetType());
                            IndexProp.SetValue(CurrentProperty, CurrentPropertyDict, new Object[] { KeyType });
                        }
                    }
                    //Si le type est un objet 
                    else if (!ValueType.IsValueType && !ValueType.IsGenericType)
                    {
                        //Parcours du dictionnaire
                       //var Dic = CurrentProperty.


                        //foreach (var CurrentPropertyDict in CurrentProperty)
                        //{
                        //    PropertyInfo IndexProp = CurrentProperty.GetType().GetProperties().First(p => p.GetIndexParameters().Length > 0 && p.GetIndexParameters()[0].ParameterType == key.GetType());
                        //    IndexProp.SetValue(CurrentProperty, CurrentPropertyDict, new Object[] { key });
                        //}
                    }
                }
                //Si il s'agit d'un Objet
                else if (!PropertyType.IsValueType && !PropertyType.IsGenericType)
                {
                    //Si l'objet peut etre modifier
                    if (CurrentProperty.CanWrite)
                    {
                        //Récupération de la propriété
                        Object MyNewValueObject = CurrentProperty.GetValue(Value, null) as Object;
                        //Si l'objet n'est pas null
                        if (MyNewValueObject != null)
                        {
                            //Protection de l'objet
                            CurrentProperty.SetValue(Value, MyNewValueObject.ProtectWsAttributes(), null);
                        }
                    }
                }
                */
            }
        }
        catch (Exception Ex)
        {
            String Error = Ex.Message;
        }

        return Value;
    }

    /// <summary>Retourne true si la string a besoin d'etre sécurisé</summary>
    /// <param name="Value">La valeur du string</param>
    /// <returns></returns>
    public static Boolean NeedWsProtection(this String Value)
    {
        if (!String.IsNullOrEmpty(Value))
        {
            if (Value.Contains("<"))
            {
                return true;
            }

            if (Value.Contains(">"))
            {
                return true;
            }
        }

        return false;
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
            return String.Empty;
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


    /// <summary>Tronquer (couper) au bout d'une certaine longueur et rajouter "..."</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <param name="NbCar">Nombre de caractères à garder</param>
    /// <param name="DeleteHTML">Suppression des balises HTML</param>
    /// <returns>String</returns>
    public static String SmartTroncate(this String Value, Int32 NbCar, Boolean DeleteHTML = false)
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
                NbCar = Value.IndexOf(" ", NbCar);
                if (NbCar > 0 && (Value.Length > NbCar))
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
    public static String StripAllHTML(this String Value, Boolean HtmlDecode = false)
    {
        if (String.IsNullOrEmpty(Value))
        {
            return String.Empty;
        }
        Regex LoRegExp = new Regex("<[^>]*>");
        Value = LoRegExp.Replace(Value, "");
        if (HtmlDecode) { Value = WebUtility.HtmlDecode(Value); }
        return Value;
    }

    /// <summary>Supprimer toutes les balises (sauf les balises de style, les sauts de ligne, les images et les liens hypertextes) d'une chaine de caractères HTML</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <returns>String</returns>
    public static String StripHTML(this String Value, Boolean HtmlDecode = false)
    {

        if (Value != "")
        {

            //Value = Value.Replace("<p align=justify>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<DIV align=justify>&nbsp;</DIV>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<div align=\"justify\">", "{#BR#}{#BR#}");
            //Value = Value.Replace("<div align=\"left\"><strong></strong></div>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<div align=left><strong></strong></div>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<p align=\"justify\">", "{#BR#}{#BR#}");
            //Value = Value.Replace("<p align=justify>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<div align=\"left\"><strong>", "{#BR#}{#BR#}");

            //Value = Value.Replace("<div align=left><strong>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<div><b></b> </div>", "{#BR#}{#BR#}");
            //Value = Value.Replace("<div><b></b></div>", "{#BR#}{#BR#}");

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

            Value = Value.Replace("<STRONG>", "{#STRONG#}");
            Value = Value.Replace("<strong>", "{#strong#}");
            Value = Value.Replace("<b>", "{#b#}");
            Value = Value.Replace("<B>", "{#B#}");
            Value = Value.Replace("<B />", "{#B#}");
            Value = Value.Replace("</STRONG>", "{#/STRONG#}");
            Value = Value.Replace("</strong>", "{#/strong#}");
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
            //Value = Value.Replace("}", ">");

            if (HtmlDecode) { Value = WebUtility.HtmlDecode(Value); }

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

    /// <summary>Rajouter le symbole €</summary>
    /// <param name="Value">Object à traiter</param>
    /// <returns></returns>
    public static String Euro(this Object Value)
    {
        return String.Format(System.Globalization.CultureInfo.CurrentCulture.NumberFormat, "{0:C2}", Value);
    }

    /// <summary>Rajouter le symbole €</summary>
    /// <param name="Value">Chaine de caractères à traiter</param>
    /// <returns></returns>
    public static String Euro(this String Value)
    {
        Decimal Amount;
        try
        {
            if (Value.Contains("€")) { Value = Value.Replace("€", ""); }
            Amount = Decimal.Parse(Value);
            return String.Format(System.Globalization.CultureInfo.CurrentCulture.NumberFormat, "{0:C2}", Amount);
        }
        catch (Exception)
        {
            return Value;
        }
    }

    /// <summary>Rajouter le symbole %</summary>
    /// <param name="Value">Nombre décimal à traiter</param>
    /// <returns></returns>
    public static String Percentage(this Decimal Value)
    {
        return Value.Precision2Digits() + " %";
    }

    /// <summary>Rajouter le symbole %</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String Percentage(this String Value, Int32 Precision = 0)
    {
        Decimal Amount;
        try
        {
            if (Value.Contains("%")) { Value = Value.Replace("%", ""); }
            Amount = Decimal.Parse(Value);
            return String.Format(System.Globalization.CultureInfo.CurrentCulture, "{0:F" + Precision + "}", Value) + " %"; ;
        }
        catch (Exception)
        {
            return Value;
        }
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

            TabValeur = Value.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
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

    /// <summary>Vérifier qu'une chaine de caractères est présente dans une autre</summary>
    /// <param name="value">Chaine de caractères à traiter</param>
    /// <param name="TestValue">Chaine de caractères à rechercher</param>
    /// <param name="StringComparison">Option de rechercher (sensibilité à la casse...)</param>
    /// <returns></returns>
    public static Boolean Contains(this String Value, String TestValue, StringComparison StringComparison)
    {
        return (Value.IndexOf(TestValue, StringComparison) >= 0);
    }

    /// <summary>Retourner un objet sur 2 chiffres après la virgule</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String Precision2Digits(this Object Value)
    {
        return String.Format(System.Globalization.CultureInfo.CurrentCulture, "{0:F2}", Value);
    }

    /// <summary>Sépare une adresse complète en 3 blocs route + code postal + ville et retourne un message d'erreur si le format de l'adresse est incorrect.</summary>
    /// <param name="Value">L'adresse complète</param>
    /// <param name="Address">La rue</param>
    /// <param name="ZipCode">Le code postal</param>
    /// <param name="City">La ville</param>
    /// <returns></returns>
    /// <exception cref="System.Exception"></exception>
    public static String SingleAddressToSplittedParts(this String Value, out String Address, out String ZipCode, out String City)
    {
        String ErrorMessage = String.Empty;
        Address = ZipCode = City = String.Empty;

        String[] SplittedLigne = null;
        Regex RegZipCode = new Regex(@"((##)?[0-9]{5}(##)?)");
        Regex RegAddressStart = new Regex(@"^((##)?([0-9]{1,4})(\s)?([a-zA-Z0-9\s\-/']+)(##)?)");
        Regex RegAddress = new Regex(@"((##)?([0-9]{1,4})(\s)?([a-zA-Z0-9\s\-/']+){1}(##)?)");
        Regex RegTypeVoieStart = new Regex(@"^((allée)|(allee)|(all)|(avenue)|(ave)|(boulevard)|(boul)|(bd)|(chemin)|(impasse)|(lieu-dit)|(rue)|(place)|(pl))\.?\s");
        Regex RegTypeVoie = new Regex(@"((allée)|(allee)|(all)|(avenue)|(ave)|(boulevard)|(boul)|(bd)|(chemin)|(impasse)|(lieu-dit)|(rue)|(place)|(pl))\.?\s");
        Regex RegSharp = new Regex(@"##");

        Boolean StillWhiteSpace = true;

        while (StillWhiteSpace)
        {
            String TempRelay = Value;
            Value = Value.Replace("  ", " ");
            StillWhiteSpace = Value.CompareTo(TempRelay) != 0;
        }

        Value = Value.Replace(" ,", ",").Replace(", ", ",").Replace(",", "##");

        // Recherche du code postal
        SplittedLigne = RegZipCode.Split(Value);
        if (SplittedLigne != null && SplittedLigne.Count() >= 1)
        {
            foreach (String CurrentString in SplittedLigne)
            {
                if (RegZipCode.Match(CurrentString).Success)
                {
                    ZipCode = CurrentString.Replace("##", "").Trim();
                }
            }
        }

        if (String.IsNullOrEmpty(ZipCode)) { ZipCode = "00000"; }
        Value = RegZipCode.Replace(Value, "##").Replace(" ##", "##").Replace("## ", "##");

        // Recherche de l'adresse
        SplittedLigne = RegSharp.Split(Value);
        if (SplittedLigne != null && SplittedLigne.Count() >= 1)
        {
            // Adresse au début trouvée no soucy
            foreach (String CurrentString in SplittedLigne)
            {
                if (RegAddressStart.Match(CurrentString.Trim()).Success && RegTypeVoie.Match(CurrentString.ToLower().Trim()).Success)
                {
                    Address = CurrentString.Trim();
                }
            }
            // On cherche l'adresse n'importe où
            if (String.IsNullOrEmpty(Address))
            {
                foreach (String CurrentString in SplittedLigne)
                {
                    String[] TempSplit = RegAddress.Split(CurrentString);
                    Boolean Found = false;
                    foreach (String CurrentString2 in TempSplit)
                    {
                        if (!Found && RegAddressStart.Match(CurrentString2.Trim()).Success && RegTypeVoie.Match(CurrentString.ToLower().Trim()).Success)
                        {
                            Address = CurrentString2.Trim();
                            Found = true;
                        }
                    }
                }
            }
            // On cherche l'adresse en prédiction (rue, place...)
            if (String.IsNullOrEmpty(Address))
            {
                foreach (String CurrentString in SplittedLigne)
                {
                    Boolean IsProbableAddress = RegTypeVoieStart.Match(CurrentString.ToLower().Trim()).Success;

                    if (IsProbableAddress)
                    {
                        Address = CurrentString;
                    }
                }
            }
        }

        if (!String.IsNullOrEmpty(Address))
        {
            Value = Value.Replace(Address, "");
        }
        else
        {
            Address = "0";
        }

        Value = RegSharp.Replace(Value, "");

        City = Value.Trim();
        if (String.IsNullOrEmpty(City) && (!String.IsNullOrEmpty(ZipCode)))
        {
            City = "0";
            /* CPAT avec SCHA : ne pas faire "Ce qui reste -> Ville" if (!String.IsNullOrEmpty(Address))
            {
                String[] SplitAddress = Address.Split(' ');
                City = SplitAddress[SplitAddress.Count() - 1];
                Address = Address.Replace(City, "").Trim();
            }
            */
        }

        try
        {
            Boolean BoolAddress, BoolZipCode, BoolCity;

            BoolAddress = String.IsNullOrEmpty(Address);
            BoolZipCode = String.IsNullOrEmpty(ZipCode);
            BoolCity = String.IsNullOrEmpty(City);

            if (!BoolAddress && !BoolZipCode && !BoolCity)
            {
                ErrorMessage = String.Empty;
            }
            else
            {
                ErrorMessage = "Il manque les informations suivantes : {0} vous pouvez essayer de les separer par des virgules !";
                String Champs = BoolAddress ? "Adresse, " : "";
                Champs = Champs + (BoolZipCode ? "Code postal, " : "");
                Champs = Champs + (BoolCity ? "Ville, " : "");

                ErrorMessage = String.Format(ErrorMessage, Champs);

                throw new Exception(ErrorMessage);
            }
        }
        catch (Exception) { ErrorMessage = "Erreur dans la définition de l'adresse"; }

        return ErrorMessage;
    }

    /// <summary>Serialize un Object C# en son équivalent Byte[]</summary>
    /// <example>Pour appel vers les méthodes WCF ne prennant qu'un Stream en entrée</example>
    public static Byte[] ObjectToByteArray(this Object Obj)
    {
        if (Obj == null)
            return null;
        BinaryFormatter Bf = new BinaryFormatter();
        MemoryStream Ms = new MemoryStream();
        Bf.Serialize(Ms, Obj);
        return Ms.ToArray();
    }

    /// <summary>Deserialize un Byte[] en Object C# du type spécifié T</summary>
    /// <example>Pour appel vers les méthodes WCF ne prennant qu'un Stream en entrée</example>
    public static T ByteArrayToObject<T>(this Stream Str)
    {
        if (Str == null)
            return default(T);
        BinaryFormatter Bf = new BinaryFormatter();
        return (T)Bf.Deserialize(Str);
    }

    /// <summary>Lit le flux du fichier posté via FileUpload en MVC et le converti en Byte[]</summary>
    /// <param name="PostedFile">Fichier passé en HTTP POST</param>
    /// <returns></returns>
    public static Byte[] MvcPostedFileToByteArray(this HttpPostedFileBase PostedFile)
    {
        if (PostedFile == null || PostedFile.ContentLength == 0) { return null; }

        Byte[] FileDatas;

        try
        {
            using (System.IO.Stream InputStream = PostedFile.InputStream)
            {
                System.IO.MemoryStream MemoryStream = InputStream as System.IO.MemoryStream;
                if (MemoryStream == null)
                {
                    MemoryStream = new System.IO.MemoryStream();
                    InputStream.CopyTo(MemoryStream);
                }
                FileDatas = MemoryStream.ToArray();
            }
        }
        catch (Exception)
        {
            FileDatas = null;
        }


        return FileDatas;
    }

    /// <summary>Découpe une chaine de caractères IBAN (FR) en un tableau de bloc de 4 caractères : 7 blocs, commencant par FR.. et finissant par un bloc de 3 caractères</summary>
    /// <param name="IbanNbr">Chaine IBAN (FR)</param>
    /// <returns></returns>
    public static String[] IbanFrStringToArray(this String IbanNbr)
    {
        if (String.IsNullOrEmpty(IbanNbr)) { return null; }

        String[] IbanSplitted = new String[6];

        try
        {
            IbanSplitted = Regex.Matches(IbanNbr, @"^(FR[0-9A-Z]{2})([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{3})$").Cast<Match>().Select(m => m.Value).ToArray();
        }
        catch (Exception)
        {
            IbanSplitted = null;
        }


        return IbanSplitted;
    }

    /// <summary>Envoi d'un fichier sur un serveur FTP</summary>
    /// <param name="File">Fichier en Byte[]</param>
    /// <param name="FileName">Nom du fichier sans l'extension</param>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Répertoire dans lequel envoyer le fichier</param>
    /// <param name="FileName">Nom du fichier</param>
    /// <param name="FileExtention">Extension du fichier</param>
    /// <param name="Ftps">Si il s'agit d'un serveur FTPS</param>
    /// <param name="Credential">Identifiant de connexion</param>
    /// <param name="Timeout">Timeout de la connexion</param>
    /// <returns>true: le fichier s'est bien uploadé, false: le fichier n'a pas pu etre uploadé</returns>
    public static Boolean UploadToFtp(this Byte[] File, String ServerAddress, String ServerPath = "", String FileName = "", String FileExtension = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 3000, Boolean CreateDirectoryFirst = true)
    {
        Boolean DirectoryCreated = true;

        try
        {
            //Si il y a des données
            if (File.Length > 0)
            {
                //Récupération des informations du fichier
                Stream Stream = new MemoryStream(File);
                FileStream FileStream = Stream as FileStream;

                //Si le nom du fichier n'est pas renseigné
                if (FileName == null && FileExtension == null)
                {
                    //Récupération du nom de fichier
                    FileName = FileStream.Name.Split('.')[0];
                    //Récupération de l'extension
                    FileExtension = Path.GetExtension(FileStream.Name);
                }
                //Si l'extension n'est pas spécifiée
                else if (FileExtension == null)
                {
                    FileExtension = Path.GetExtension(FileStream.Name);
                }
                //Si le nom de fichier n'est pas renseigné
                else if (FileName == null)
                {
                    //Récupération du nom de fichier
                    FileName = FileStream.Name.Split('.')[0];
                }

                //Nettoyage du chemin de repertoire cible
                if (ServerPath != "")
                {
                    if (ServerPath.Contains('/'))
                    {
                        //Si il y a un slash au début du chemin
                        if (ServerPath.StartsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(0, 1);
                        }
                        //Si il y a un slash à la fin du chemin
                        if (ServerPath.EndsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                        }
                    }

                    ServerPath = "/" + ServerPath;
                }

                if (CreateDirectoryFirst)
                {
                    DirectoryCreated = Tools.CreateDirectoryToFtp(ServerAddress, ServerPath, Ftps, Credential, Timeout);

                    if (!DirectoryCreated) { return false; }
                }

                //Nettoyage de l'extension
                if (FileExtension.Contains("."))
                {
                    FileExtension = FileExtension.Replace(".", "");
                }

                //Nettoyage du nom du fichier
                if (FileName.Contains("."))
                {
                    FileName = FileName.Split('.')[0];
                }

                //Ajout du slash avant le nom de fichier
                FileName = "/" + FileName;

                //Identification du protocole
                String Protocole;
                //Si le ftps est demandé
                if (Ftps)
                {
                    Protocole = "ftps://";
                }
                else
                {
                    Protocole = "ftp://";
                }

                if (ServerAddress != "")
                {
                    String UrlFtp = Protocole + ServerAddress + ServerPath + FileName + "." + FileExtension;

                    //Création de la connexion
                    System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp));

                    //Si la connexion est sécurisé
                    if (Credential != null)
                    {
                        FtpConnexion.Credentials = Credential;
                    }

                    FtpConnexion.Timeout = Timeout;

                    FtpConnexion.UsePassive = true;
                    FtpConnexion.KeepAlive = false;

                    //Spécifie le type d'acces au Ftp
                    FtpConnexion.Method = WebRequestMethods.Ftp.UploadFile;
                    FtpConnexion.UseBinary = true;
                    FtpConnexion.ContentLength = File.Length;

                    //Informe sur la direction du flux de données
                    using (Stream requestStream = FtpConnexion.GetRequestStream())
                    {
                        requestStream.Write(File, 0, File.Length);
                        requestStream.Close();
                    }

                    FtpWebResponse Response = (FtpWebResponse)FtpConnexion.GetResponse();

                    if (Response == null)
                    {
                        throw new NullReferenceException("Response recieved was null");
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }

        return true;
    }

    /// <summary>Envoi un fichier sur un serveur FTP</summary>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Dossier dans le serveur</param>
    /// <param name="FileName">Nom du fichier</param>
    /// <param name="Ftps">Si il s'agit d'un serveur FTPS</param>
    /// <param name="Credential">Identifiant de connexion</param>
    /// <param name="Timeout">Timeout de la connexion</param>
    /// <returns>Fichier</returns>
    public static Byte[] DownloadFromFtp(String ServerAddress, String FileName, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        //Fichier de retour
        Byte[] File = null;

        try
        {
            //Si il y a des données
            if (ServerAddress != "" || FileName != "")
            {
                //Nettoyage du chemin de repertoire cible
                if (ServerPath != "")
                {
                    if (ServerPath.Contains('/'))
                    {
                        //Si il y a un slash au début du chemin
                        if (ServerPath.StartsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(0, 1);
                        }
                        //Si il y a un slash à la fin du chemin
                        if (ServerPath.EndsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                        }
                    }

                    ServerPath = "/" + ServerPath;
                }

                //Ajout du slash avant le nom de fichier
                FileName = "/" + FileName;

                //Identification du protocole
                String Protocole;
                //Si le ftps est demandé
                if (Ftps)
                {
                    Protocole = "ftps://";
                }
                else
                {
                    Protocole = "ftp://";
                }

                String UrlFtp = Protocole + ServerAddress + ServerPath + FileName;

                //Création de la connexion
                System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp));

                //Si la connexion est sécurisé
                if (Credential != null)
                {
                    FtpConnexion.Credentials = Credential;
                }

                FtpConnexion.Timeout = Timeout;

                FtpConnexion.UsePassive = true;
                FtpConnexion.KeepAlive = true;

                //Spécifie le type d'acces au Ftp
                FtpConnexion.Method = WebRequestMethods.Ftp.DownloadFile;
                FtpConnexion.UseBinary = true;

                // Récupération sur le serveur FTP TicketNet
                FtpWebResponse FtpResponse = (FtpWebResponse)FtpConnexion.GetResponse();
                FtpResponse.GetResponseStream();

                using (Stream ResponseStream = FtpResponse.GetResponseStream())
                {
                    MemoryStream MemStream = new MemoryStream();
                    Byte[] MemBuffer = new Byte[2048];

                    Int32 BytesRead = 0;

                    do
                    {
                        BytesRead = ResponseStream.Read(MemBuffer, 0, MemBuffer.Length);
                        if (BytesRead != 0)
                        {
                            MemStream.Write(MemBuffer, 0, BytesRead);
                        }
                    } while (BytesRead != 0);

                    File = MemStream.ToArray();
                    ResponseStream.Close();
                    MemStream.Close();
                    FtpResponse.Close();
                }
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }

        return File;
    }

    /// <summary>Récupère la liste des fichiers contenus dans un dossier ftp</summary>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Chemain dans le serveur</param>
    /// <param name="Ftps">Si il s'agit d'une connexion sécurisé</param>
    /// <param name="Credential">Si il y a une connexion avec identifié</param>
    /// <param name="Timeout">Time out de la fonction</param>
    /// <returns>Liste des fichiers contenus dans le repertoire</returns>
    public static List<String> GetFilesListFromFtp(String ServerAddress, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        List<String> ListFileCollection = new List<String>();

        try
        {
            //Si il y a des données
            if (ServerAddress != "")
            {
                //Nettoyage du chemin de repertoire cible
                if (ServerPath != "")
                {
                    if (ServerPath.Contains('/'))
                    {
                        //Si il y a un slash au début du chemin
                        if (ServerPath.StartsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(0, 1);
                        }
                        //Si il y a un slash à la fin du chemin
                        if (ServerPath.EndsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                        }
                    }

                    ServerPath = "/" + ServerPath;
                }

                //Identification du protocole
                String Protocole;
                //Si le ftps est demandé
                if (Ftps)
                {
                    Protocole = "ftps://";
                }
                else
                {
                    Protocole = "ftp://";
                }

                String UrlFtp = Protocole + ServerAddress + ServerPath;

                //Création de la connexion
                System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp));

                //Si la connexion est sécurisé
                if (Credential != null)
                {
                    FtpConnexion.Credentials = Credential;
                }

                FtpConnexion.Timeout = Timeout;

                FtpConnexion.UsePassive = true;
                FtpConnexion.KeepAlive = true;

                //Spécifie le type d'acces au Ftp
                FtpConnexion.Method = WebRequestMethods.Ftp.ListDirectoryDetails;
                FtpConnexion.UseBinary = true;

                // Récupération sur le serveur FTP
                WebResponse FtpResponse = FtpConnexion.GetResponse();
                StreamReader StreamReader = new StreamReader(FtpResponse.GetResponseStream());

                String Dirname;
                String Dirdate;

                String ProcessString = StreamReader.ReadLine();

                while (ProcessString != null)
                {
                    if (ProcessString.IndexOf("<DIR>", 0) != -1)
                    {
                        String ProcessedString = RemoveWhiteSpaces(ProcessString);
                        Dirdate = ProcessString.Substring(0, ProcessString.IndexOf("<DIR>", 0));
                        Dirname = ProcessString.Substring(ProcessedString.IndexOf("<DIR>", 0) + 5, ProcessString.Length - (ProcessedString.IndexOf("<DIR>", 0) + 5));

                    }
                    else
                    {
                        String[] ProcessedString = ResolveFiles(ProcessString);
                        ListFileCollection.Add(ProcessedString[3].ToString());
                    }

                    ProcessString = StreamReader.ReadLine();
                }

                StreamReader.Close();
                FtpResponse.Close();
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }

        return ListFileCollection;
    }

    /// <summary>Supprime le dernier dossier indiqué par serveur path</summary>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Chemain dans le serveur</param>
    /// <param name="Ftps">Si il s'agit d'une connexion sécurisé</param>
    /// <param name="Credential">Si il y a une connexion avec identifié</param>
    /// <param name="Timeout">Time out de la fonction</param>
    /// <returns>true dossier supprimé, false erreur</returns>
    public static Boolean RemoveDirectoryFromFtp(String ServerAddress, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        try
        {
            //Nettoyage du chemin de repertoire cible
            if (ServerPath != "")
            {
                if (ServerPath.Contains('/'))
                {
                    //Si il y a un slash au début du chemin
                    if (ServerPath.StartsWith("/"))
                    {
                        //Suppression du slash
                        ServerPath = ServerPath.Remove(0, 1);
                    }
                    //Si il y a un slash à la fin du chemin
                    if (ServerPath.EndsWith("/"))
                    {
                        //Suppression du slash
                        ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                    }
                }

                ServerPath = "/" + ServerPath;
            }

            //Identification du protocole
            String Protocole;
            //Si le ftps est demandé
            if (Ftps)
            {
                Protocole = "ftps://";
            }
            else
            {
                Protocole = "ftp://";
            }

            if (ServerAddress != "")
            {
                String UrlFtp = Protocole + ServerAddress + ServerPath;

                //Création de la connexion
                System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp));

                //Si la connexion est sécurisé
                if (Credential != null)
                {
                    FtpConnexion.Credentials = Credential;
                }

                FtpConnexion.Timeout = Timeout;

                FtpConnexion.UsePassive = true;
                FtpConnexion.KeepAlive = false;

                //Spécifie le type d'acces au Ftp
                FtpConnexion.Method = WebRequestMethods.Ftp.RemoveDirectory;
                FtpConnexion.UseBinary = true;

                FtpWebResponse Response = (FtpWebResponse)FtpConnexion.GetResponse();
                Response.Close();

                if (Response.StatusDescription.Contains("250 RMD command successful"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }

    }

    /// <summary>Crée le dernier dossier indiqué par serveur path</summary>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Chemain dans le serveur</param>
    /// <param name="Ftps">Si il s'agit d'une connexion sécurisé</param>
    /// <param name="Credential">Si il y a une connexion avec identifié</param>
    /// <param name="Timeout">Time out de la fonction</param>
    /// <returns>true dossier supprimé, false erreur</returns>
    public static Boolean CreateDirectoryToFtp(String ServerAddress, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        String OriginalPath = String.Empty;

        try
        {
            //Nettoyage du chemin de repertoire cible
            if (ServerPath != "")
            {
                if (ServerPath.Contains('/'))
                {
                    //Si il y a un slash au début du chemin
                    if (ServerPath.StartsWith("/"))
                    {
                        //Suppression du slash
                        ServerPath = ServerPath.Remove(0, 1);
                    }
                    //Si il y a un slash à la fin du chemin
                    if (ServerPath.EndsWith("/"))
                    {
                        //Suppression du slash
                        ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                    }
                }

                OriginalPath = ServerPath;
            }

            //Identification du protocole
            String Protocole;
            //Si le ftps est demandé
            if (Ftps)
            {
                Protocole = "ftps://";
            }
            else
            {
                Protocole = "ftp://";
            }

            if (ServerAddress != "")
            {
                String Path = String.Empty;
                //Pour chaque dossier
                Path = Path + ServerPath;
                String UrlFtp = Protocole + ServerAddress;

                // On ne peut créer plusieurs répertoires imbriqués si il y en a dans [Path] :
                // Il faut donc les créer un par un ...

                // 1- On liste les différentes parties qui composent
                String[] Paths = Path.Split('/');

                // 2- Au fur et à mesure on compose la chaine répertoire FTP, chaque dossier aura déjà été créé
                Path = String.Empty;

                Boolean SingleFolderCreated = true;

                // 3- On commence la boucle de création des dossiers
                foreach (String SingleFolder in Paths)
                {
                    if (SingleFolderCreated)
                    {
                        Path += "/" + SingleFolder;

                        //Création de la connexion
                        System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp + Path));

                        //Si la connexion est sécurisé
                        if (Credential != null)
                        {
                            FtpConnexion.Credentials = Credential;
                        }

                        FtpConnexion.Timeout = Timeout;
                        FtpConnexion.UsePassive = true;
                        FtpConnexion.KeepAlive = false;

                        //Spécifie le type d'acces au Ftp
                        FtpConnexion.Method = WebRequestMethods.Ftp.MakeDirectory;
                        FtpConnexion.UseBinary = true;

                        try
                        {
                            using (FtpWebResponse Response = (FtpWebResponse)FtpConnexion.GetResponse())
                            {
                                SingleFolderCreated = Response.StatusCode == FtpStatusCode.PathnameCreated;
                            }
                        }
                        catch (WebException WEx) // Attention une exception ne signifie ici pas nécessairement une erreur : le dossier peut déjà exister...
                        {
                            FtpWebResponse Response = (FtpWebResponse)WEx.Response;
                            if (Response.StatusCode == FtpStatusCode.ActionNotTakenFileUnavailable) // Le dossier existait déjà... ce n'est pas une erreur...
                            {
                                SingleFolderCreated = true;
                            }
                            else // Autre erreur... plutôt génante cette fois...
                            {
                                SingleFolderCreated = false;
                            }
                        }
                    }
                }

                return SingleFolderCreated;

            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }

    }

    /// <summary>Supprime le fichier indiqué par filename</summary>
    /// <param name="FileName">Nom du fichier</param>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Chemain dans le serveur</param>
    /// <param name="Ftps">Si il s'agit d'une connexion sécurisé</param>
    /// <param name="Credential">Si il y a une connexion avec identifié</param>
    /// <param name="Timeout">Time out de la fonction</param>
    /// <returns>true dossier supprimé, false erreur</returns>
    public static Boolean RemoveFileFromFtp(String ServerAddress, String FileName, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        try
        {
            //Nettoyage du chemin de repertoire cible
            if (ServerPath != "")
            {
                if (ServerPath.Contains('/'))
                {
                    //Si il y a un slash au début du chemin
                    if (ServerPath.StartsWith("/"))
                    {
                        //Suppression du slash
                        ServerPath = ServerPath.Remove(0, 1);
                    }
                    //Si il y a un slash à la fin du chemin
                    if (ServerPath.EndsWith("/"))
                    {
                        //Suppression du slash
                        ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                    }
                }

                ServerPath = "/" + ServerPath;
            }

            FileName = "/" + FileName;

            //Identification du protocole
            String Protocole;
            //Si le ftps est demandé
            if (Ftps)
            {
                Protocole = "ftps://";
            }
            else
            {
                Protocole = "ftp://";
            }

            if (ServerAddress != "")
            {
                String UrlFtp = Protocole + ServerAddress + ServerPath + FileName;

                //Création de la connexion
                System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp));

                //Si la connexion est sécurisé
                if (Credential != null)
                {
                    FtpConnexion.Credentials = Credential;
                }

                FtpConnexion.Timeout = Timeout;

                FtpConnexion.UsePassive = true;
                FtpConnexion.KeepAlive = false;

                //Spécifie le type d'acces au Ftp
                FtpConnexion.Method = WebRequestMethods.Ftp.DeleteFile;
                FtpConnexion.UseBinary = true;

                FtpWebResponse Response = (FtpWebResponse)FtpConnexion.GetResponse();
                Response.Close();

                if (Response.StatusDescription.Contains("250 DELE command successful"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>Récupère la liste des répertories contenus dans un dossier ftp</summary>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Chemain dans le serveur</param>
    /// <param name="Ftps">Si il s'agit d'une connexion sécurisé</param>
    /// <param name="Credential">Si il y a une connexion avec identifié</param>
    /// <param name="Timeout">Time out de la fonction</param>
    /// <returns>Liste des repertoires</returns>
    public static Dictionary<String, String> GetDirectoriesListFromFtp(String ServerAddress, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        Dictionary<String, String> ListDirectoryCollection = new Dictionary<String, String>();

        try
        {
            //Si il y a des données
            if (ServerAddress != "")
            {
                //Nettoyage du chemin de repertoire cible
                if (ServerPath != "")
                {
                    if (ServerPath.Contains('/'))
                    {
                        //Si il y a un slash au début du chemin
                        if (ServerPath.StartsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(0, 1);
                        }
                        //Si il y a un slash à la fin du chemin
                        if (ServerPath.EndsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                        }
                    }

                    ServerPath = "/" + ServerPath;
                }

                //Identification du protocole
                String Protocole;
                //Si le ftps est demandé
                if (Ftps)
                {
                    Protocole = "ftps://";
                }
                else
                {
                    Protocole = "ftp://";
                }

                String UrlFtp = Protocole + ServerAddress + ServerPath;

                //Création de la connexion
                System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(new Uri(UrlFtp));

                //Si la connexion est sécurisé
                if (Credential != null)
                {
                    FtpConnexion.Credentials = Credential;
                }

                FtpConnexion.Timeout = Timeout;

                FtpConnexion.UsePassive = true;
                FtpConnexion.KeepAlive = true;

                //Spécifie le type d'acces au Ftp
                FtpConnexion.Method = WebRequestMethods.Ftp.ListDirectoryDetails;
                FtpConnexion.UseBinary = true;

                // Récupération sur le serveur FTP
                WebResponse FtpResponse = FtpConnexion.GetResponse();
                StreamReader StreamReader = new StreamReader(FtpResponse.GetResponseStream());

                String Dirname;
                String Dirdate;

                String ProcessString = StreamReader.ReadLine();

                while (ProcessString != null)
                {
                    if (ProcessString.IndexOf("<DIR>", 0) != -1)
                    {
                        String ProcessedString = RemoveWhiteSpaces(ProcessString);
                        Dirdate = ProcessString.Substring(0, ProcessString.IndexOf("<DIR>", 0));
                        Dirname = ProcessString.Substring(ProcessedString.IndexOf("<DIR>", 0) + 5, ProcessString.Length - (ProcessedString.IndexOf("<DIR>", 0) + 5));
                        ListDirectoryCollection.Add(Dirname, Dirdate);
                    }

                    ProcessString = StreamReader.ReadLine();
                }

                StreamReader.Close();
                FtpResponse.Close();
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }

        return ListDirectoryCollection;
    }

    /// <summary>Informe si le dossier indiqué existe</summary>
    /// <param name="ServerAddress">Adresse du serveur</param>
    /// <param name="ServerPath">Chemain dans le serveur</param>
    /// <param name="Ftps">Si il s'agit d'une connexion sécurisé</param>
    /// <param name="Credential">Si il y a une connexion avec identifié</param>
    /// <param name="Timeout">Time out de la fonction</param>
    /// <returns>True: Exist, false: n'existe pas</returns>
    public static Boolean CheckDirectoryExistFromFtp(String ServerAddress, String ServerPath = "", Boolean Ftps = false, NetworkCredential Credential = null, Int32 Timeout = 10000)
    {
        try
        {
            //Si il y a des données
            if (ServerAddress != "")
            {
                //Nettoyage du chemin de repertoire cible
                if (ServerPath != "")
                {
                    if (ServerPath.Contains('/'))
                    {
                        //Si il y a un slash au début du chemin
                        if (ServerPath.StartsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(0, 1);
                        }
                        //Si il y a un slash à la fin du chemin
                        if (ServerPath.EndsWith("/"))
                        {
                            //Suppression du slash
                            ServerPath = ServerPath.Remove(ServerPath.Length - 1, 1);
                        }
                    }

                    ServerPath = "/" + ServerPath;
                }

                //Identification du protocole
                String Protocole;
                //Si le ftps est demandé
                if (Ftps)
                {
                    Protocole = "ftps://";
                }
                else
                {
                    Protocole = "ftp://";
                }

                String UrlFtp = Protocole + ServerAddress + ServerPath;

                try
                {
                    //Création de la connexion
                    System.Net.FtpWebRequest FtpConnexion = (FtpWebRequest)FtpWebRequest.Create(UrlFtp);

                    //Si la connexion est sécurisé
                    if (Credential != null)
                    {
                        FtpConnexion.Credentials = Credential;
                    }

                    //Spécifie le type d'acces au Ftp
                    FtpConnexion.Method = WebRequestMethods.Ftp.ListDirectoryDetails;
                    FtpConnexion.UseBinary = true;
                    FtpConnexion.KeepAlive = true;
                    FtpConnexion.UsePassive = true;
                    FtpConnexion.Timeout = Timeout;

                    FtpWebResponse Response = (FtpWebResponse)FtpConnexion.GetResponse();

                    StreamReader StreamReader = new StreamReader(Response.GetResponseStream());
                    List<String> Directories = new List<String>();
                    string line = StreamReader.ReadLine();
                    while (!string.IsNullOrEmpty(line))
                    {
                        Directories.Add(line);
                        line = StreamReader.ReadLine();
                    }
                    StreamReader.Close();

                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>Fonction utile à l'utilisation des FTP</summary>
    /// <param name="filesString"></param>
    /// <returns></returns>
    private static String[] ResolveFiles(String filesString)
    {
        String ResultString = String.Empty;
        Char[] ArrayOfCharacters = filesString.ToCharArray();
        Boolean flags = false;
        foreach (Char SingleCharacter in ArrayOfCharacters)
        {
            if (SingleCharacter == ' ')
            {
                if (flags == false)
                {
                    ResultString = ResultString + "#";
                }
                flags = true;


            }
            else
            {
                ResultString = ResultString + SingleCharacter;
                flags = false;
            }
        }

        Char[] seperatorCharacter = { '#' };
        String[] ReturnStringArray = ResultString.Split(seperatorCharacter);
        return ReturnStringArray;

    }

    /// <summary>Fonction utile à l'utilisation des FTP</summary>
    /// <param name="filesString"></param>
    /// <returns></returns>
    private static String RemoveWhiteSpaces(String processString)
    {
        String ResultString = string.Empty;
        Char[] ArrayOfCharacters = processString.ToCharArray();
        foreach (Char SingleCharacter in ArrayOfCharacters)
        {
            if (SingleCharacter != ' ')
            {

                ResultString = ResultString + SingleCharacter.ToString();
            }
        }
        return ResultString;
    }

    /// <summary>Permet de corriger une date qui dépasserait les valeurs autorisées pour une date JSON pour la serialization</summary>
    /// <param name="Obj">Objet</param>
    private static void FixRecursivelyAllDatesForJson(Object Obj)
    {
        try
        {
            if (Obj != null)
            {

                Type ObjType = Obj.GetType();

                PropertyInfo[] AllProperties = ObjType.GetProperties();

                if (Obj is IEnumerable)
                {
                    IEnumerable<Object> EnumObj = Obj as IEnumerable<Object>;
                    if (EnumObj != null && EnumObj.Count() > 0)
                    {
                        ActionThroughIteration<IEnumerable<Object>>(EnumObj, FixRecursivelyAllDatesForJson);
                    }
                }
                else
                {
                    foreach (PropertyInfo ThisProperty in AllProperties)
                    {

                        Type ThisType = ThisProperty.PropertyType;
                        if (Nullable.GetUnderlyingType(ThisType) == typeof(DateTime))
                        {
                            DateTime? DtFixedNullable = null;

                            if (ThisType.IsGenericType && ThisType.GetGenericTypeDefinition() == typeof(Nullable<>))
                            {
                                DtFixedNullable = ThisProperty.GetValue(Obj, null) as Nullable<DateTime>;
                                if (DtFixedNullable.HasValue)
                                {
                                    DtFixedNullable = DateTime.SpecifyKind(DtFixedNullable.Value, DateTimeKind.Utc);
                                    ThisProperty.SetValue(Obj, DtFixedNullable, null);
                                }
                            }

                        }
                        else if (ThisType == typeof(DateTime))
                        {
                            DateTime DtFixed = DateTime.MinValue;

                            DtFixed = (DateTime)ThisProperty.GetValue(Obj, null);

                            DtFixed = DateTime.SpecifyKind(DtFixed, DateTimeKind.Utc);

                            ThisProperty.SetValue(Obj, DtFixed, null);
                        }
                        else if (ThisType.IsClass && !ThisType.IsValueType && !ThisType.IsPrimitive && !ThisType.IsEnum)
                        {
                            Object ObjRecurs = ThisProperty.GetValue(Obj, null);
                            FixRecursivelyAllDatesForJson(ObjRecurs);
                        }
                    }
                }

            }

        }
        catch (Exception)
        {

        } // Boucle dans la recherche récursive des propriétés...
    }

    /// <summary>Permet d'exécuter une méthode prennant en paramètre un object, retournant void, pour chaque élément d'un type IEnumerable</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="ObjEnumerable">La liste d'objets</param>
    /// <param name="ActionForObj">Le délégué de la fonction à exécuter</param>
    public static void ActionThroughIteration<T>(T ObjEnumerable, Action<Object> ActionForObj) where T : IEnumerable
    {
        foreach (var Item in ObjEnumerable)
        {
            ActionForObj(Item);
        }
    }

    /// <summary>(LINQ) Nouvelle fonctionnalité Linq permettant de faire un distinct sur certains éléments avec le sélecteur spécifié</summary>
    /// <typeparam name="TSource">Type de la source</typeparam>
    /// <typeparam name="TKey">Type de la clé</typeparam>
    /// <param name="source">Source</param>
    /// <param name="keySelector">Sélecteur (delegate, lambda expression, ...)</param>
    /// <returns></returns>
    public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
    {
        HashSet<TKey> SeenKeys = new HashSet<TKey>();
        foreach (TSource element in source)
        {
            if (SeenKeys.Add(keySelector(element)))
            {
                yield return element;
            }
        }
    }

    /// <summary>Permet de récupérer le nombre mois entre deux dates</summary>
    /// <param name="Date1">Première date à comparer</param>
    /// <param name="Date2">Seconde date à comparer</param>
    /// <returns></returns>
    public static Int32 MonthDifference(DateTime FirstDate, DateTime SecondDate)
    {
        DateTime Result = new DateTime(1, 1, 1).Add((FirstDate > SecondDate) ? FirstDate.Subtract(SecondDate) : SecondDate.Subtract(FirstDate));
        return ((Result.Year - 1) * 12) + Result.Month - 1;
    }

    /// <summary>Récupère tout le contenu d'un BinaryReader</summary>
    /// <param name="Reader">Extension de l'objet Reader</param>
    /// <returns></returns>
    public static Byte[] ReadAllBytes(this BinaryReader Reader)
    {
        Int32 BufferSize = 16384;
        using (MemoryStream Mstream = new MemoryStream())
        {
            Byte[] Buffer = new Byte[BufferSize];
            Int32 Count;

            while ((Count = Reader.Read(Buffer, 0, Buffer.Length)) != 0)
                Mstream.Write(Buffer, 0, Count);

            return Mstream.ToArray();
        }
    }

    /// <summary>Réalise la copie d'un objet et de ses valeurs non la copie des références de l'objet</summary>
    /// <typeparam name="T">Type de l'objet à copier</typeparam>
    /// <param name="Source">Instance de l'objet à copier</param>
    /// <returns>Objet copié</returns>
    public static T Clone<T>(T Source)
    {
        if (!typeof(T).IsSerializable)
        {
            throw new ArgumentException("Le type concerné doit être 'serializable'", "Source");
        }

        if (Object.ReferenceEquals(Source, null))
        {
            return default(T);
        }

        IFormatter Formatter = new BinaryFormatter();
        Stream Stream = new MemoryStream();
        using (Stream)
        {
            Formatter.Serialize(Stream, Source);
            Stream.Seek(0, SeekOrigin.Begin);
            return (T)Formatter.Deserialize(Stream);
        }
    }

    /// <summary>Retourne une chaine de caractères à partir d'un tableau de chaine de caractères</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    static String ConvertStringArrayToString(this String[] Value)
    {
        StringBuilder Builder = new StringBuilder();
        foreach (String Key in Value)
        {
            Builder.Append(Key);
        }
        return Builder.ToString();
    }

    /// <summary>Retourner l'heure au format HH:mm</summary>
    /// <param name="Value"></param>
    /// <returns></returns>
    public static String GetTime(this DateTime Value)
    {
        return Value.ToString("HH:mm");
    }

    /// <summary>Retourner l'heure au format HH:mm</summary>
    /// <param name="TheDate"></param>
    /// <returns></returns>
    public static String GetTime(this DateTime? TheDate)
    {
        if (TheDate.HasValue)
        {
            return GetTime(TheDate.Value);
        }
        else
        {
            return String.Empty;
        }

    }

    /// <summary>Indique quelle date est la plus grande entre les deux dates spécifiées</summary>
    /// <param name="Date1">Première date</param>
    /// <param name="Date2">Deuxième date</param>
    /// <returns>Date la plus grande</returns>
    public static DateTime GreatestDate(DateTime Date1, DateTime Date2)
    {
        return new DateTime(Math.Max(Date1.Ticks, Date2.Ticks));
    }

    /// <summary>Indique quelle date est la plus petite entre les deux dates spécifiées</summary>
    /// <param name="Date1">Première date</param>
    /// <param name="Date2">Deuxième date</param>
    /// <returns>Date la plus petite</returns>
    public static DateTime SmallestDate(DateTime Date1, DateTime Date2)
    {
        return new DateTime(Math.Min(Date1.Ticks, Date2.Ticks));
    }

    public static byte[] GetBytes(this string str)
    {
        byte[] bytes = new byte[str.Length * sizeof(char)];
        System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
        return bytes;
    }

    public static string GetString(this byte[] bytes)
    {
        char[] chars = new char[bytes.Length / sizeof(char)];
        System.Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
        return new string(chars);

    }

    /// <summary>
    /// Determines a text file's encoding by analyzing its byte order mark (BOM).
    /// Defaults to ASCII when detection of the text file's endianness fails.
    /// </summary>
    /// <param name="Filename">The text file to analyze.</param>
    /// <returns>The detected encoding.</returns>
    public static Encoding GetEncoding(String Filename)
    {
        // Read the BOM
        Byte[] Bom = new Byte[4];
        using (FileStream File = new FileStream(Filename, FileMode.Open, FileAccess.Read))
        {
            File.Read(Bom, 0, 4);
        }

        // Analyze the BOM
        if (Bom[0] == 0x2b && Bom[1] == 0x2f && Bom[2] == 0x76) return Encoding.UTF7;
        if (Bom[0] == 0xef && Bom[1] == 0xbb && Bom[2] == 0xbf) return Encoding.UTF8;
        if (Bom[0] == 0xff && Bom[1] == 0xfe) return Encoding.Unicode; //UTF-16LE
        if (Bom[0] == 0xfe && Bom[1] == 0xff) return Encoding.BigEndianUnicode; //UTF-16BE
        if (Bom[0] == 0 && Bom[1] == 0 && Bom[2] == 0xfe && Bom[3] == 0xff) return Encoding.UTF32;
        return Encoding.ASCII;
    }

    /// <summary>Protege les doubles quotes</summary>
    /// <param name="Content">The content.</param>
    /// <returns></returns>
    public static String EscapeDoubleQuote(this String Content)
    {
        return Content.Replace("\"", "\\\"");
    }

    /// <summary>Change les caractères spéciaux qui ne passent pas en base</summary>
    /// <param name="Content">The content.</param>
    /// <returns></returns>
    public static String ReplaceSpecialCharactersForDB(this String Content)
    {
        return String.IsNullOrEmpty(Content) ? "" :
        Content.Replace("’", "'")
        .Replace("“", "«")
        .Replace("”", "»")
        .Replace("•", "*")
        .Replace("–", "-")
        .Replace("—", "-")
        .Replace("†", "+")
        .Replace("‡", "++")
        .Replace("™", "TM")
        .Replace("¼", "1/4")
        .Replace("½", "1/2")
        .Replace("¾", "3/4")
        .Replace("¸", ",")
        .Replace("...", "...")
        .Replace("¤", "#")
        .Replace("¦", "|")
        .Replace("ˆ", "^")
        .Replace("¨", "``")
        .Replace("‰", "/1000");
    }

    /// <summary>Permet d'automapper par le nom deux types à partir de l'objet spécifié</summary>
    /// <typeparam name="TFrom">Type de l'objet d'Origin</typeparam>
    /// <typeparam name="TResult">Type de l'objet de destination</typeparam>
    /// <param name="Obj">Objet à partir duquel récupérer les valeurs</param>
    /// <returns></returns>
    public static TResult AutoMap<TFrom, TResult>(TFrom Obj)
    {
        TResult DestObj = Activator.CreateInstance<TResult>();

        try
        {
            Type TypeDto = typeof(TResult);
            Type TypeFb = typeof(TFrom);

            PropertyInfo[] MemberInfosDestination = TypeDto.GetProperties(BindingFlags.Public | BindingFlags.Instance);
            List<PropertyInfo> MemberInfosDestLst = null;
            PropertyInfo MemberInfosDest = null;
            IEnumerable<PropertyInfo> AllPInfos = null;

            if (MemberInfosDestination != null && MemberInfosDestination.Count() > 0 && Obj != null)
            {
                MemberInfosDestLst = MemberInfosDestination.ToList();
                AllPInfos = GetAllPropertyInfos(TypeFb);

                if (AllPInfos != null && AllPInfos.Count() > 0)
                {
                    AllPInfos.ToList().ForEach(p =>
                    {
                        MemberInfosDest = MemberInfosDestLst.FirstOrDefault(m => String.Compare(m.Name, p.Name, true) == 0);
                        if (MemberInfosDest != null && p.PropertyType == MemberInfosDest.PropertyType)
                        {
                            MemberInfosDest = MemberInfosDestLst.FirstOrDefault(m => String.Compare(m.Name, p.Name, true) == 0);

                            if (MemberInfosDest != null)
                            {
                                MemberInfosDest.SetValue(DestObj, p.GetValue(Obj, null), null);
                            }
                        }
                    });
                }
            }
        }
        catch (Exception) { }

        return DestObj;
    }

    /// <summary>Récupère par reflexion toutes les propriétés d'un type spécifié, et ce, en parcourant toutes les classes parentes</summary>
    /// <param name="Typ">Type spécifié</param>
    /// <returns></returns>
    public static IEnumerable<PropertyInfo> GetAllPropertyInfos(Type Typ)
    {
        if (Typ == null)
        {
            return Enumerable.Empty<PropertyInfo>();
        }

        BindingFlags Flags = BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.Instance | BindingFlags.DeclaredOnly;

        return Typ.GetProperties(Flags).Concat(GetAllPropertyInfos(Typ.BaseType));
    }

    /// <summary>Détermine si un code postal est valide</summary>
    /// <param name="ZipCode">Code postal à vérifier</param>
    /// <returns></returns>
    public static Boolean IsValidZipCode(this String ZipCode)
    {
        Boolean IsValid = true;
        Regex Rgx = new Regex(@"^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$");

        IsValid = !String.IsNullOrEmpty(ZipCode) && Rgx.IsMatch(ZipCode);

        return IsValid;
    }

    public static Boolean IsValidIntracomVat(this String IntracomVat)
    {
        Boolean IsValid = true;
        Regex Rgx = new Regex(@"^(
                                    (AT)?U[0-9]{8} |                              # Austria
                                    (BE)?0[0-9]{9} |                              # Belgium
                                    (BG)?[0-9]{9,10} |                            # Bulgaria
                                    (CY)?[0-9]{8}L |                              # Cyprus
                                    (CZ)?[0-9]{8,10} |                            # Czech Republic
                                    (DE)?[0-9]{9} |                               # Germany
                                    (DK)?[0-9]{8} |                               # Denmark
                                    (EE)?[0-9]{9} |                               # Estonia
                                    (EL|GR)?[0-9]{9} |                            # Greece
                                    (ES)?[0-9A-Z][0-9]{7}[0-9A-Z] |               # Spain
                                    (FI)?[0-9]{8} |                               # Finland
                                    (FR)?[0-9A-Z]{2}[0-9]{9} |                    # France
                                    (GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3}) | # United Kingdom
                                    (HU)?[0-9]{8} |                               # Hungary
                                    (IE)?[0-9]S[0-9]{5}L |                        # Ireland
                                    (IT)?[0-9]{11} |                              # Italy
                                    (LT)?([0-9]{9}|[0-9]{12}) |                   # Lithuania
                                    (LU)?[0-9]{8} |                               # Luxembourg
                                    (LV)?[0-9]{11} |                              # Latvia
                                    (MT)?[0-9]{8} |                               # Malta
                                    (NL)?[0-9]{9}B[0-9]{2} |                      # Netherlands
                                    (PL)?[0-9]{10} |                              # Poland
                                    (PT)?[0-9]{9} |                               # Portugal
                                    (RO)?[0-9]{2,10} |                            # Romania
                                    (SE)?[0-9]{12} |                              # Sweden
                                    (SI)?[0-9]{8} |                               # Slovenia
                                    (SK)?[0-9]{10}                                # Slovakia
                                    )$", RegexOptions.IgnorePatternWhitespace);

        IsValid = !String.IsNullOrEmpty(IntracomVat) && Rgx.IsMatch(IntracomVat);

        return IsValid;
    }


    public static String ToStringWithSeparator(this List<String> List, String Separator)
    {
        String Result = String.Empty;
        foreach (String Str in List)
        {
            if (Result.Length > 0)
            {
                Result = Result + Separator + Str;
            }
            else
            {
                Result = Str;
            }
        }
        return Result;
    }

    /// <summary>Vérifie si une propriété existe dans un objet dynamique (ExpandoObject)</summary>
    /// <param name="Obj">L'objet dynamique à tester</param>
    /// <param name="Name">La propriété recherchée</param>
    /// <returns>Boolean</returns>
    public static Boolean IsPropExistInExpando(dynamic Obj, String Name)
    {
        return ((IDictionary<String, Object>)Obj).ContainsKey(Name);
    }

    /// <summary>Vérifie si un string fait la bonne taille ou est null / vide. Si oui retourne le String, sinon jette une exception</summary>
    /// <param name="Champ">Le champ adresse à tester</param>
    /// <param name="Size">La taille max du champ</param>
    /// <param name="Name">Le nom du champ</param>
    /// <returns>String</returns>
    public static String CheckSize(this String Champ, Int16 Size, String Name = "")
    {
        if (!String.IsNullOrEmpty(Champ) && Champ.Length > Size)
        {
            throw new Exception(!String.IsNullOrEmpty(Name) ? String.Format("[-3] Le champ {0} est trop long ({1} caractères maximum)", Name, Size) : String.Format("[-3] Le champ est trop long ({0} caractères maximum)", Size));
        }
        else
        {
            return Champ;
        }
    }

    public static Boolean AllEqual<T>(params T[] Values)
    {
        if (Values == null || Values.Length == 0)
            return true;
        return Values.Distinct().Count() == 1;
    }

    public static Boolean AllEqual<T>(this List<T> Values)
    {
        if (Values == null || Values.Count == 0)
            return true;
        return Values.Distinct().Count() == 1;
    }

    public static void AddParameter(this Uri Url, String ParamName, String ParamValue)
    {
        var UriBuilder = new UriBuilder(Url);
        var Query = HttpUtility.ParseQueryString(UriBuilder.Query);
        Query[ParamName] = ParamValue;
        UriBuilder.Query = Query.ToString();

        Url = UriBuilder.Uri;
    }

    public static void ReplaceHost(this Uri Url, String NewHostName)
    {
        var UriBuilder = new UriBuilder(Url.AbsoluteUri);
        UriBuilder.Host = NewHostName;

        Url = UriBuilder.Uri;
    }

    public static Boolean CheckUriIsValid(this String UrlToTest, out String ErrorDetail)
    {
        Boolean UriIsValid = true;
        ErrorDetail = String.Empty;

        try
        {
            new Uri(UrlToTest);
        }
        catch (System.UriFormatException Ex)
        {
            UriIsValid = false;
            ErrorDetail = Ex.Message + (Ex.InnerException != null ? "\r\n" + Ex.InnerException.ToString() : "");
        }

        return UriIsValid;
    }

    public static Boolean ContainsKey(this NameValueCollection Collection, String Key)
    {
        if (Collection.Get(Key) == null)
        {
            return Collection.AllKeys.Contains(Key);
        }

        return true;
    }

}