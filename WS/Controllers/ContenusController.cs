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
    public class ContenusController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetContenus(ContenusSearchParameters _Parameters)
        {
            List<ContenuResult> _ContenuResults = DB.GetContenus(
                                    id: (_Parameters.Id == null ? -1 : _Parameters.Id),
                                    titre: (String.IsNullOrEmpty(_Parameters.Titre) ? null : _Parameters.Titre),
                                    dtMin: (String.IsNullOrEmpty(_Parameters.DtMin) ? null : _Parameters.DtMin.Replace("/", "-")),
                                    dtMax: (String.IsNullOrEmpty(_Parameters.DtMax) ? null : _Parameters.DtMax.Replace("/", "-")),
                                    emplacementId: (_Parameters.EmplacementId == null ? -1 : _Parameters.EmplacementId),
                                    modeId: (_Parameters.ModeId == null ? -1 : _Parameters.ModeId),
                                    evenementId: (_Parameters.EvenementId == null ? -1 : _Parameters.EvenementId),
                                    typologieId: (_Parameters.TypologieId == null ? -1 : _Parameters.TypologieId),
                                    top: _Parameters.Top
                               ).ToList();

            List<Contenu> _Contenus = new List<Contenu>();
            foreach (ContenuResult _CurrentC in _ContenuResults)
            {
                Contenu _NewContenu = new Contenu();
                _NewContenu.Id = _CurrentC.Id;
                _NewContenu.Titre = _CurrentC.Titre.ToLower().Accents().ToUpper();

                _NewContenu.DtCreation = _CurrentC.DtCreation;
                _NewContenu.DtModification = _CurrentC.DtModification;

                _NewContenu.DtDebut = _CurrentC.DtDebut;
                _NewContenu.DtFin = _CurrentC.DtFin;

                _NewContenu.Texte = _CurrentC.Texte;

                _NewContenu.Lien = _CurrentC.Lien;
                _NewContenu.Script = _CurrentC.Script;

                _NewContenu.Logo = _CurrentC.Logo;
                _NewContenu.Horizontale = _CurrentC.Horizontale;
                _NewContenu.Carree = _CurrentC.Carree;
                _NewContenu.Verticale = _CurrentC.Verticale;
                _NewContenu.Full = _CurrentC.Full;

                _NewContenu.Exclusif = _CurrentC.Exclusif;

                _NewContenu.Mode = new Mode();
                _NewContenu.Mode.Id = _CurrentC.ModeId;
                _NewContenu.Mode.Libelle = _CurrentC.ModeLibelle;

                if (_CurrentC.EvenementId != null)
                {
                    _NewContenu.Evenement = new Evenement();
                    _NewContenu.Evenement.Id = _CurrentC.EvenementId;
                    _NewContenu.Evenement.Libelle = _CurrentC.EvenementLibelle;
                }


                //récupération des publications
                List<PublicationResult> _PublicationsResults = DB.GetPublications(_CurrentC.Id).ToList();
                foreach (PublicationResult _CurrentP in _PublicationsResults)
                {
                    Publication _NewPublication = new Publication();
                    _NewPublication.Id = _CurrentP.Id;
                    _NewPublication.Emplacement = new Emplacement();
                    _NewPublication.Emplacement.Id = _CurrentP.EmplacementId;
                    _NewPublication.Contenu = new Contenu();
                    _NewPublication.Contenu.Id = _CurrentP.ContenuId;
                    _NewContenu.Publications.Add(_NewPublication);
                }

                _Contenus.Add(_NewContenu);
            }

            return Ok(_Contenus);
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelContenu(Int32 _Id)
        {
            return Ok(DB.DelContenu(_Id));
        }
        

        [HttpPost]
        public IHttpActionResult UpdContenu(Contenu _Contenu)
        {

            DateTime? _DtDebut = null;
            if (!String.IsNullOrEmpty(_Contenu.DtDebut)) { _DtDebut = DateTime.Parse(_Contenu.DtDebut); }
            DateTime? _DtFin = null;
            if (!String.IsNullOrEmpty(_Contenu.DtFin)) { _DtFin = DateTime.Parse(_Contenu.DtFin); }
            Int32? _ModeId = null;
            if (_Contenu.Mode != null) { _ModeId = _Contenu.Mode.Id; }
            Int32? _EvenementId = null;
            if (_Contenu.Evenement != null) { _EvenementId = _Contenu.Evenement.Id; }

            Int32? _ReturnValue = DB.UpdContenu(
                id: _Contenu.Id,
                titre: _Contenu.Titre.ToLower().Accents().ToUpper(),
                texte: _Contenu.Texte,

                dtDebut: _DtDebut,
                dtFin: _DtFin,
                
                lien: _Contenu.Lien,
                script: _Contenu.Script,

                logo: _Contenu.Logo,
                horizontale: _Contenu.Horizontale,
                carree: _Contenu.Carree,
                verticale: _Contenu.Verticale,
                full: _Contenu.Full,
                exclusif: _Contenu.Exclusif,

                modeId: _ModeId,
                evenementId: _EvenementId
            );

            if ((_Contenu.Publications != null) && (_Contenu.Publications.Count > 0))
            {
                _ReturnValue = DB.DelPublication(contenuId: _Contenu.Id, id: null);
                foreach (Publication _Current in _Contenu.Publications)
                {
                    _ReturnValue = DB.AddPublication(contenuId: _Contenu.Id, emplacementId: _Current.Emplacement.Id);
                }
            }

            return Ok(_ReturnValue);
        }


        [HttpPost]
        public IHttpActionResult AddContenu(Contenu _Contenu)
        {

            DateTime? _DtDebut = null;
            if (!String.IsNullOrEmpty(_Contenu.DtDebut)) { _DtDebut = DateTime.Parse(_Contenu.DtDebut); }
            DateTime? _DtFin = null;
            if (!String.IsNullOrEmpty(_Contenu.DtFin)) { _DtFin = DateTime.Parse(_Contenu.DtFin); }
            Int32? _ModeId = null;
            if (_Contenu.Mode != null) { _ModeId = _Contenu.Mode.Id; }
            Int32? _EvenementId = null;
            if (_Contenu.Evenement != null) { _EvenementId = _Contenu.Evenement.Id; }

            Int32? _ReturnValue = DB.AddContenu(
                id: _Contenu.Id,
                titre: _Contenu.Titre.ToLower().Accents().ToUpper(),
                texte: _Contenu.Texte,

                dtDebut: _DtDebut,
                dtFin: _DtFin,

                lien: _Contenu.Lien,
                script: _Contenu.Script,

                logo: _Contenu.Logo,
                horizontale: _Contenu.Horizontale,
                carree: _Contenu.Carree,
                verticale: _Contenu.Verticale,
                full: _Contenu.Full,
                exclusif: _Contenu.Exclusif,

                modeId: _ModeId,
                evenementId: _EvenementId
            );

            if ((_Contenu.Publications != null) && (_Contenu.Publications.Count > 0))
            {
                foreach (Publication _Current in _Contenu.Publications)
                {
                    _ReturnValue = DB.AddPublication(contenuId: _Contenu.Id, emplacementId: _Current.Emplacement.Id);
                }
            }

            return Ok(_ReturnValue);

        }

    }
}
