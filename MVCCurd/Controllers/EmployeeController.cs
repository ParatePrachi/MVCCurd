using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVCCurd.Models;

namespace MVCCurd.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SaveEmp(EmployeeModel model)
        {
            try
            {
                HttpPostedFileBase fb0 = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb0 = Request.Files[0];
                }

                return Json(new { Message = (new EmployeeModel().SaveEmp(fb0 ,model)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = new EmployeeModel().GetList() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult deleteEmp(int id)
        {
            try
            {
                return Json(new { model = (new EmployeeModel().deleteEmp(id)) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Details(int Id)
        {
            ViewBag.Id = Id;
            return View();
        }
        public ActionResult EditdetailsEmp(int id)
        {
            try
            {
                return Json(new { model = (new EmployeeModel().EditEmp(id)) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}