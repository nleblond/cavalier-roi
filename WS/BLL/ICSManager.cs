using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;


/// <summary>
/// Bibliothèque d'envoi de mail
/// v0.8
/// 14/01/2019
/// C#
/// </summary>
public static class ICSManager
{

     

    public static Boolean SendMail(
                                            String _SenderMail = null,
                                            String _SenderName = null,
                                            String _RecipientToMails = null,
                                            String _RecipientCCMails = null,
                                            String _RecipientBCCMails = null,
                                            String _Subject = null,
                                            String _BodyMessage = null,
                                            Boolean _IsBodyHtml = true,
                                                
                                            List<ICalendar> _ICalendars = null,
            
                                            IDictionary<String, Byte[]> Attachments = null,

                                            String _MailHost = null,
                                            Int32? _MailPort = null,
                                            String _Username = null,
                                            String _Password = null,
                                            Int32? _TimeOut = 100000,
                                            Boolean? _EnableSsl = true
                                            )
    {

        try
        {
            Char[] Delimiters = new Char[] { ';' };
                
            //contrôle de cohérence
            if ((String.IsNullOrEmpty(_MailHost)) || (_MailPort == null)) { return false; }

            //initialisation du serveur                
            var _SmtpClient = new SmtpClient(_MailHost, Int32.Parse(_MailPort.ToString()));
            if (!String.IsNullOrEmpty(_Username) && !String.IsNullOrEmpty(_Password))
            {
                _SmtpClient.Credentials = new NetworkCredential(_Username, _Password);
            };
            _SmtpClient.EnableSsl = Boolean.Parse(_EnableSsl.ToString());
            _SmtpClient.Timeout = Int32.Parse(_TimeOut.ToString());

            //initialisation du message
            MailMessage _MailMessage = new MailMessage();
            _MailMessage.Subject = _Subject;
            _MailMessage.SubjectEncoding = System.Text.Encoding.UTF8;
            _MailMessage.Body = _BodyMessage;
            _MailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            _MailMessage.IsBodyHtml = _IsBodyHtml;
            _MailMessage.Priority = MailPriority.Normal;

            //expéditeur
            _MailMessage.From = new MailAddress(_SenderMail, _SenderName);

            //destinataires
            String[] _Recipients = _RecipientToMails.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
            for (Int32 i = 0; i < _Recipients.Length; i++)
            {
                MailAddress CurrentMailAddress = new MailAddress(_Recipients[i].ToString().Trim());
                _MailMessage.To.Add(CurrentMailAddress);
            }
            //destinataires en copie carbone
            if (!String.IsNullOrEmpty(_RecipientCCMails))
            {
                String[] _RecipientCCs = _RecipientCCMails.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
                for (Int32 i = 0; i < _RecipientCCs.Length; i++)
                {
                    MailAddress CurrentMailAddress = new MailAddress((String)_RecipientCCs[i].ToString().Trim());
                    _MailMessage.CC.Add(CurrentMailAddress);
                }
            }
            //destinataires en copie carbone invisible
            if (!String.IsNullOrEmpty(_RecipientBCCMails))
            {
                String[] _RecipientBCCs = _RecipientBCCMails.Split(Delimiters, StringSplitOptions.RemoveEmptyEntries);
                for (Int32 i = 0; i < _RecipientBCCs.Length; i++)
                {
                    MailAddress CurrentMailAddress = new MailAddress(_RecipientBCCs[i].ToString().Trim());
                    _MailMessage.Bcc.Add(CurrentMailAddress);
                }
            }


            //invitations
            if ((_ICalendars != null) && (_ICalendars.Count > 0))
            {
                List<String> _Calendars = ConvertICalendars(_ICalendars);

                Int32 _Index = 1;
                foreach (String _Current in _Calendars)
                {
                    var _CurrentBytes = Encoding.UTF8.GetBytes(_Current);
                    MemoryStream _MemoryStream = new MemoryStream(_CurrentBytes);
                    Attachment _Attachment = new System.Net.Mail.Attachment(_MemoryStream, String.Format("Invitation{0}.ics", _Index), "text/calendar");
                    _MailMessage.Attachments.Add(_Attachment);
                    _Index++;
                }
            }

            //pièces jointes
            if (Attachments != null && Attachments.Count > 0)
            {
                foreach (KeyValuePair<String, Byte[]> Current in Attachments)
                {
                    String Name = (Current.Key != null ? Current.Key : "Fichier");
                    Stream Stream = new MemoryStream(Current.Value);
                    Attachment Attachment = new Attachment(Stream, Name);
                    _MailMessage.Attachments.Add(Attachment);
                }
            }

            _SmtpClient.Send(_MailMessage);
            _SmtpClient.Dispose();

        }
        catch (Exception Ex)
        {
            return false;
        }
        return true;
    }



    public static List<String> ConvertICalendars (List<ICalendar> _ICalendars)
    {
        List<String> Calendars = new List<String>();
        foreach (ICalendar _Current in _ICalendars)
        {
            StringBuilder sb = new StringBuilder();
            //Calendar
            sb.AppendLine("BEGIN:VCALENDAR");
            sb.AppendLine("PRODID:-//" + _Current.EventOrganizer + "//EN");
            sb.AppendLine("VERSION:2.0");
            //sb.AppendLine("METHOD:REQUEST");
            sb.AppendLine("METHOD:PUBLISH");
            sb.AppendLine("PRIORITY:0");


            //Event
            sb.AppendLine("BEGIN:VEVENT");
            sb.AppendLine("DTSTART:" + _Current.EventStartDateTime.ToUniversalTime().ToString("yyyyMMddTHHmmssZ"));
            sb.AppendLine("DTEND:" + _Current.EventEndDateTime.ToUniversalTime().ToString("yyyyMMddTHHmmssZ"));
            sb.AppendLine("DTSTAMP:" + _Current.EventTimeStamp.ToUniversalTime().ToString("yyyyMMddTHHmmssZ"));
            sb.AppendLine("UID:" + _Current.UID);
            sb.AppendLine("ORGANIZER;CN=" + _Current.EventOrganizer);
            sb.AppendLine("X-ALT-DESC;FMTTYPE=text/html:" + _Current.EventDescription);

            sb.AppendLine("CREATED:" + _Current.EventCreatedDateTime.ToUniversalTime().ToString("yyyyMMddTHHmmssZ"));
            sb.AppendLine("LAST-MODIFIED:" + _Current.EventLastModifiedTimeStamp.ToUniversalTime().ToString("yyyyMMddTHHmmssZ"));

            //sb.AppendLine("LOCATION:" + _Current.EventLocation);
            //sb.AppendLine("URL:" + _Current.Url);

            sb.AppendLine("SEQUENCE:0");
            sb.AppendLine("STATUS:CONFIRMED");
            sb.AppendLine("SUMMARY:" + _Current.EventSummary);
            sb.AppendLine("TRANSP:OPAQUE");

            //Alarm
            //sb.AppendLine("BEGIN:VALARM");
            //sb.AppendLine("TRIGGER:" + String.Format("-PT{0}M", _Current.AlarmTrigger));
            //sb.AppendLine("REPEAT:" + _Current.AlarmRepeat);
            //sb.AppendLine("DURATION:" + String.Format("PT{0}M", _Current.AlarmDuration));
            //sb.AppendLine("ACTION:DISPLAY");
            //sb.AppendLine("DESCRIPTION:" + _Current.AlarmDescription);
            //sb.AppendLine("END:VALARM");


            sb.AppendLine("END:VEVENT");
            sb.AppendLine("END:VCALENDAR");
            Calendars.Add(sb.ToString());
        }
        return Calendars;
    }

}


public class ICalendar
{

    public ICalendar()
    {
        EventTimeStamp = DateTime.Now;
        EventCreatedDateTime = EventTimeStamp;
        EventLastModifiedTimeStamp = EventTimeStamp;
    }

    public String UID { get; set; }

    public String EventOrganizer { get; set; }
    public DateTime EventStartDateTime { get; set; }
    public DateTime EventEndDateTime { get; set; }
    public DateTime EventTimeStamp { get; set; }
    public DateTime EventCreatedDateTime { get; set; }
    public DateTime EventLastModifiedTimeStamp { get; set; }
    public String EventSummary { get; set; }
    public String EventPriority { set; get; }
    public String EventDescription { get; set; }
    public String EventLocation { get; set; }
    public String EventUrl { get; set; }


    public String AlarmTrigger { get; set; }
    public String AlarmRepeat { get; set; }
    public String AlarmDuration { get; set; }
    public String AlarmDescription { get; set; }

}
