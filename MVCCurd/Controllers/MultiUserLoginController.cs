using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVCCurd.Models;
using MVCCurd.Data;

namespace MVCCurd.Controllers
{
    public class MultiUserLoginController : Controller
    {
        // GET: MultiUserLogin
        public ActionResult LoginIndex()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]

        public ActionResult UserLogin(MultiUserModel obj)
        {
            if (ModelState.IsValid)
            {
                using (EmployeeEntities db = new EmployeeEntities())
                {
                    var model = db.tblRegs.Where(a=>a.UserName.Equals(obj.UserId) && a.PassWord.Equals(obj.PassWord)).FirstOrDefault();
                    if (model != null)
                    {
                        Session["RegId"] = model.RegId.ToString();
                        Session["UserName"] = model.UserName.ToString();
                        return RedirectToAction("UserDashboard");
                    }
                }
            }
            return RedirectToAction("Index", "Employee");
        }
        public ActionResult UserDashboard()
        {
            if (Session[""] != null)
            {
                return RedirectToAction("Index","");
            }
            else
            {
                return RedirectToAction("","");
            }
        }
    }
}