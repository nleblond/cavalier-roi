using System;
using System.Web.Http;

using WS.Models;
using WS.Models.IN;
using WS.Models.OUT;
using WS.BLL;

namespace WS.Controllers
{
    public class ContenusController : ApiController
    {

        private WS.Models.DBModelsParameters DB = new WS.Models.DBModelsParameters();


        [HttpPost]
        public IHttpActionResult GetContenus(ContenusSearchParameters _Parameters)
        {
            

            return Ok(ContenusManager.GetContenus(
                                                        _Id: _Parameters.Id,
                                                        _Titre: _Parameters.Titre,
                                                        _DtMin: _Parameters.DtMin,
                                                        _DtMax: _Parameters.DtMax,
                                                        _EmplacementId: _Parameters.EmplacementId,
                                                        _ModeId: _Parameters.ModeId,
                                                        _EvenementId: _Parameters.EvenementId,
                                                        _TypologieId: _Parameters.TypologieId,
                                                        _Top: _Parameters.Top
                                            ));
        }


        [HttpPost]
        [HttpGet]
        public IHttpActionResult DelContenu(Int32 _Id)
        {
            return Ok(ContenusManager.DelContenu(_Id));
        }
        

        [HttpPost]
        public IHttpActionResult UpdContenu(Contenu _Contenu)
        {
            return Ok(ContenusManager.UpdContenu(
                                                    _Id: _Contenu.Id,
                                                    _Titre: _Contenu.Titre,
                                                    _Texte: _Contenu.Texte,
                                                    _Lien: _Contenu.Lien,
                                                    _Script: _Contenu.Script,
                                                    _DtDebut: _Contenu.DtDebut,
                                                    _DtFin: _Contenu.DtFin,
                                                    _ModeId: _Contenu.Mode.Id,
                                                    _EvenementId: _Contenu.Evenement.Id,
                                                    _Logo: _Contenu.Logo,
                                                    _Horizontale: _Contenu.Horizontale,
                                                    _Carree: _Contenu.Carree,
                                                    _Verticale: _Contenu.Verticale,
                                                    _Full: _Contenu.Full,
                                                    _Exclusif: _Contenu.Exclusif,
                                                    _Publications: _Contenu.Publications
                ));
        }


        [HttpPost]
        public IHttpActionResult AddContenu(Contenu _Contenu)
        {

            return Ok(ContenusManager.AddContenu(
                                                    _Id: _Contenu.Id,
                                                    _Titre: _Contenu.Titre,
                                                    _Texte: _Contenu.Texte,
                                                    _Lien: _Contenu.Lien,
                                                    _Script: _Contenu.Script,
                                                    _DtDebut: _Contenu.DtDebut,
                                                    _DtFin: _Contenu.DtFin,
                                                    _ModeId: _Contenu.Mode.Id,
                                                    _EvenementId: _Contenu.Evenement.Id,
                                                    _Logo: _Contenu.Logo,
                                                    _Horizontale: _Contenu.Horizontale,
                                                    _Carree: _Contenu.Carree,
                                                    _Verticale: _Contenu.Verticale,
                                                    _Full: _Contenu.Full,
                                                    _Exclusif: _Contenu.Exclusif,
                                                    _Publications: _Contenu.Publications
                ));
        }

    }
}
