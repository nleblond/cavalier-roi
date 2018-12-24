using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;



namespace WS.BLL
{
    public static class DiversManager
    {

        public static Int32? GetId(String _Table = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            ObjectResult<Int32?> _NewIdResult = _DB.GetId(_Table);
            Int32? _NewId = _NewIdResult.FirstOrDefault().Value;

            return _NewId;
        }



        public static List<WS.Models.Statuts> GetStatuts()
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.GetStatuts().ToList();
        }



        public static List<WS.Models.Categories> GetCategories()
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.GetCategories().ToList();
        }


        public static List<WS.Models.Modes> GetModes()
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.GetModes().ToList();
        }


        public static List<WS.Models.Typologies> GetTypologies(Int32? TypologieId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            return _DB.GetTypologies().ToList();
        }


        public static List<Emplacement> GetModesEmplacements(Int32? ModeId = null)
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<ModeEmplacementResult> _ModeEmplacementResults = _DB.GetModesEmplacements(modeId: ModeId).ToList();

            List<Emplacement> _Emplacements = new List<Emplacement>();
            foreach (ModeEmplacementResult _Current in _ModeEmplacementResults)
            {
                Emplacement _NewEmplacement = new Emplacement();
                _NewEmplacement.Id = _Current.Id;
                _NewEmplacement.Libelle = _Current.Libelle.Trim();
                _NewEmplacement.Key = (String.IsNullOrEmpty(_Current.Key) ? null : _Current.Key.Trim());
                _NewEmplacement.Visuel = (String.IsNullOrEmpty(_Current.Visuel) ? null : _Current.Visuel.Trim());
                _NewEmplacement.FormatedId = _Current.FormatedId.Trim();

                _NewEmplacement.Mode = new Mode();
                _NewEmplacement.Mode.Id = _Current.ModeId;
                //_NewEmplacement.Mode.Libelle = _Current.ModeLibelle.Trim();
                _Emplacements.Add(_NewEmplacement);
            }

            return _Emplacements;
        }


        public static List<Evenement> GetTypologiesEvenements(String _OnlyParentsYN = "N")
        {
            DBModelsParameters _DB = new WS.Models.DBModelsParameters();

            List<TypologieEvenementResult> _TypologieEvenementResults = _DB.GetTypologiesEvenements(onlyParentsYN: _OnlyParentsYN).ToList();

            List<Evenement> _Evenements = new List<Evenement>();
            foreach (TypologieEvenementResult _Current in _TypologieEvenementResults)
            {
                Evenement _NewEvenement = new Evenement();
                _NewEvenement.Id = _Current.Id;
                _NewEvenement.Libelle = _Current.Libelle.Trim();
                _NewEvenement.FormatedId = _Current.FormatedId.Trim();

                if (_Current.EvenementParentId != null)
                {
                    _NewEvenement.EvenementParent = new Evenement();
                    _NewEvenement.EvenementParent.Id = _Current.EvenementParentId;
                    //_NewEvenement.EvenementParent.Libelle = _Current.EvenementParentLibelle;
                }

                _NewEvenement.Typologie = new Typologie();
                _NewEvenement.Typologie.Id = _Current.TypologieId;
                //_NewEvenement.Typologie.Libelle = _Current.TypologieLibelle;
                _Evenements.Add(_NewEvenement);
            }

            return _Evenements;
        }

    }
}