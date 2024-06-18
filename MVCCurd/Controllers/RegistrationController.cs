using MVCCurd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCCurd.Controllers
{
    public class RegistrationController : Controller
    {
        // GET: Registration
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SaveReg(RegistrationModel model)
        {
            try
            {
                return Json(new { Message = (new RegistrationModel().SaveReg(model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Getlist()
        {
            try
            {
                return Json(new { model = new RegistrationModel().GetList() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }
        public ActionResult DetailsIndex(int RegId)
        {
            ViewBag.RegId = RegId;
            return View();
        }
        public ActionResult DetailsShow(int RegId)
        {
            try
            {
                return Json(new { Model = (new RegistrationModel().Details(RegId)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}