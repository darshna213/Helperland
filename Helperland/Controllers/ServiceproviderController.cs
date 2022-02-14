using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helperland.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class ServiceproviderController : Controller
    {
        private readonly HelperlandContext _helperlandContext;
        public ServiceproviderController(HelperlandContext helperlandContext)
        {
            _helperlandContext = helperlandContext;
        }
      
        public IActionResult Upcoming_service()
        {
            //var Id = HttpContext.Session.GetInt32("id");
            //if (Id != null)
            //{
            //    var u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == Id);
            //    if (u.UserTypeId == 2)
            //    {
            //        ViewBag.Name = u.FirstName;
            //        return PartialView();
            //    }
            //    else
            //    {
            //        return RedirectToAction("Index", "Home");
            //    }
            //}
            //else if (Request.Cookies["userid"] != null)
            //{
            //    var u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == Convert.ToInt32(Request.Cookies["userid"]));
            //    if (u.UserTypeId == 2)
            //    {
            //        ViewBag.Name = u.FirstName;
            //        return PartialView();
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
