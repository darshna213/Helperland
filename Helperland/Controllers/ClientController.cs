using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helperland.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class ClientController : Controller
    {
        private readonly HelperlandContext _helperlandContext;
        public ClientController(HelperlandContext helperlandContext)
        {
            _helperlandContext = helperlandContext;
        }
        public IActionResult Service_history()
        {
            //var Id = HttpContext.Session.GetInt32("id");
            //if (Id != null)
            //{
            //    var u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == Id);
            //    if (u.UserTypeId == 1)
            //    {
            //        ViewBag.Name = u.FirstName;
            //        return View();
            //    }
            //    else
            //    {
            //        return RedirectToAction("Index", "Home");
            //    }
            //}
            //else if (Request.Cookies["userid"] != null)
            //{
            //    var u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == Convert.ToInt32(Request.Cookies["userid"]));
            //    if (u.UserTypeId == 1)
            //    {
            //        ViewBag.Name = u.FirstName;
            //        return View();
            //    }
            //    else
            //    {
            //        return RedirectToAction("Index", "Home");
            //    }
            //}

            return View();
        }
       
    }
}
