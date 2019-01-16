using System;
using System.Collections.Generic;
using System.Linq;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;



namespace WS.BLL
{
    public static class ContenusManager
    {

        
        public static List<Contenu> GetContenus(Int32? _Id = null, String _Titre = null, String _DtMin = null, String _DtMax = null, Int32? _EmplacementId = null, Int32? _ModeId = null, Int32? _EvenementId = null, Int32? _TypologieId = null, Int32? _Top = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<ContenuResult> _ContenuResults = _DB.GetContenus(
                                    id: (_Id == null ? -1 : _Id),
                                    titre: (String.IsNullOrEmpty(_Titre) ? null : _Titre),
                                    dtMin: (String.IsNullOrEmpty(_DtMin) ? null : _DtMin.Replace("/", "-")),
                                    dtMax: (String.IsNullOrEmpty(_DtMax) ? null : _DtMax.Replace("/", "-")),
                                    emplacementId: (_EmplacementId == null ? -1 : _EmplacementId),
                                    modeId: (_ModeId == null ? -1 : _ModeId),
                                    evenementId: (_EvenementId == null ? -1 : _EvenementId),
                                    typologieId: (_TypologieId == null ? -1 : _TypologieId),
                                    top: (_Top == null ? -1 : _Top)
                               ).ToList();

            List<Contenu> _Contenus = new List<Contenu>();
            foreach (ContenuResult _CurrentC in _ContenuResults)
            {
                Contenu _NewContenu = new Contenu();
                _NewContenu.Id = _CurrentC.Id;
                _NewContenu.Titre = _CurrentC.Titre.ToLower().Accents().ToUpper().Trim();

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
                List<PublicationResult> _PublicationsResults = _DB.GetPublications(_CurrentC.Id).ToList();
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

            return _Contenus;

        }



        public static Int32? DelContenu(Int32? _Id = null, String _Real = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.DelContenu(_Id);
        }


        public static Int32? UpdContenu(
                                                Int32? _Id = null,
                                                String _Titre = null,
                                                String _Texte = null,
                                                String _Lien = null,
                                                String _Script = null,
                                                String _DtDebut = null,
                                                String _DtFin = null,
                                                Int32? _ModeId = null,
                                                Int32? _EvenementId = null,
                                                String _Logo = null,
                                                String _Horizontale = null,
                                                String _Carree = null,
                                                String _Verticale = null,
                                                String _Full = null,
                                                Boolean? _Exclusif = null,
                                                List<Publication> _Publications = null
                                    )
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtDebutF = null;
            if (!String.IsNullOrEmpty(_DtDebut)) { _DtDebutF = DateTime.Parse(_DtDebut); }
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_DtFin)) { _DtFinF = DateTime.Parse(_DtFin); }

            Int32? _ReturnValue = _DB.UpdContenu(
                id: _Id,
                titre: _Titre.ToLower().Accents().ToUpper().Trim(),
                texte: _Texte,

                dtDebut: _DtDebutF,
                dtFin: _DtFinF,

                lien: _Lien,
                script: _Script,

                logo: _Logo,
                horizontale: _Horizontale,
                carree: _Carree,
                verticale: _Verticale,
                full: _Full,
                exclusif: _Exclusif,

                modeId: _ModeId,
                evenementId: _EvenementId
            );

            _ReturnValue = _DB.DelPublication(contenuId: _Id, id: null);
            if ((_Publications != null) && (_Publications.Count > 0))
            {
                foreach (Publication _Current in _Publications)
                {
                    _ReturnValue = _DB.AddPublication(contenuId: _Id, emplacementId: _Current.Emplacement.Id);
                }
            }

            return _ReturnValue;
        }


        public static Int32? AddContenu(
                                            Int32? _Id = null,
                                            String _Titre = null,
                                            String _Texte = null,
                                            String _Lien = null,
                                            String _Script = null,
                                            String _DtDebut = null,
                                            String _DtFin = null,
                                            Int32? _ModeId = null,
                                            Int32? _EvenementId = null,
                                            String _Logo = null,
                                            String _Horizontale = null,
                                            String _Carree = null,
                                            String _Verticale = null,
                                            String _Full = null,
                                            Boolean? _Exclusif = null,
                                            List<Publication> _Publications = null
            )
        {

            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            DateTime? _DtDebutF = null;
            if (!String.IsNullOrEmpty(_DtDebut)) { _DtDebutF = DateTime.Parse(_DtDebut); }
            DateTime? _DtFinF = null;
            if (!String.IsNullOrEmpty(_DtFin)) { _DtFinF = DateTime.Parse(_DtFin); }

            Int32? _ReturnValue = _DB.AddContenu(
                id: _Id,
                titre: _Titre.ToLower().Accents().ToUpper().Trim(),
                texte: _Texte,

                dtDebut: _DtDebutF,
                dtFin: _DtFinF,

                lien: _Lien,
                script: _Script,

                logo: _Logo,
                horizontale: _Horizontale,
                carree: _Carree,
                verticale: _Verticale,
                full: _Full,
                exclusif: _Exclusif,

                modeId: _ModeId,
                evenementId: _EvenementId
            );

            if ((_Publications != null) && (_Publications.Count > 0))
            {
                foreach (Publication _Current in _Publications)
                {
                    _ReturnValue = _DB.AddPublication(contenuId: _Id, emplacementId: _Current.Emplacement.Id);
                }
            }

            return _ReturnValue;

        }



    }
}