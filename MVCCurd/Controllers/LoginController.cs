using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVCCurd.Models;

namespace MVCCurd.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult LoginIndex()
        {
            return View();
        }
        public ActionResult LoginIn(LodinModel model)
        {

                if (ModelState.IsValid)
                {
                    if(model.USerId =="Admin"&& model.PassWord == "12345")
                    {
                        return RedirectToAction("UserDashbord");
                    }
                    else
                    {
                        ModelState.AddModelError("", "Invalid Username And Password");
                    }
                }
                return View("..\\Login\\LoginIndex", model);
        }
        public ActionResult UserDashbord()
        {
            return View("..\\Registraion\\Index");
        }
    }
}