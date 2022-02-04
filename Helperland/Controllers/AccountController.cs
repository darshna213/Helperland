using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helperland.Data;
using Helperland.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class AccountController : Controller
    {
        private readonly HelperlandContext _helperlandContext;
        public AccountController(HelperlandContext helperlandContext)
        {
            _helperlandContext = helperlandContext;
        }
        public IActionResult Signup()
        {
            User user = new User();
            return View(user);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public IActionResult Signup(User user)
        {

            if (_helperlandContext.Users.Where(x => x.Email == user.Email).Count() == 0 && _helperlandContext.Users.Where(x => x.Mobile == user.Mobile).Count() == 0)
            {
                user.UserTypeId = 1;
                user.CreatedDate = DateTime.Now;
                user.ModifiedDate = DateTime.Now;
                user.IsRegisteredUser = true;
                user.ModifiedBy = 123;

                _helperlandContext.Users.Add(user);
                _helperlandContext.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.message = "User already exist.";
            }
            return View();

        }
        public IActionResult Provider()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Provider(User signup)
        {

            if (_helperlandContext.Users.Where(x => x.Email == signup.Email).Count() == 0 && _helperlandContext.Users.Where(x => x.Mobile == signup.Mobile).Count() == 0)
            {
                //signup.UserTypeId = 2;
                signup.CreatedDate = DateTime.Now;
                signup.ModifiedDate = DateTime.Now;
                signup.IsRegisteredUser = true;
                signup.ModifiedBy = 123;

                _helperlandContext.Users.Add(signup);
                _helperlandContext.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.message = "User already exist.";
            }
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }




[Route("login")]
    [HttpPost]
        public IActionResult Login(string username, string password)
        {

        if (username != null && password != null && username.Equals("demo@mail.com") && password.Equals("1234"))
        {

            var U = _helperlandContext.Users.FirstOrDefault(x => x.Email == username.Email);


                      if (U.UserTypeId == 1)
                     {
                return RedirectToAction("Signup", "Account");
    }
                        if (U.UserTypeId == 2)
                       {
                           return RedirectToAction("Faq", "Home");
}

            return RedirectToAction("Signup", "Account");
        }
            else
            {
                ViewBag.error = "Invalid Account";
                return RedirectToAction("Faq", "Home");

            }
           
      
    }

























    //[HttpPost]
    //public IActionResult Login(User login)
    //{

    //    if (_helperlandContext.Users.Where(x => x.Email == login.Email && x.Password == login.Password).Count() < 0)
    //    {
    //        var U = _helperlandContext.Users.FirstOrDefault(x => x.Email == login.Email);


    //            if (U.UserTypeId == 1)
    //            {
    //                return RedirectToAction("Signup", "Account");
    //            }
    //            if (U.UserTypeId == 2)
    //            {
    //                return RedirectToAction("Faq", "Home");
    //            }


    //        return RedirectToAction("Service_history", "Client");
    //    }
    //    else
    //    {
    //        ViewBag.Message = "Details are invalid";
    //        return RedirectToAction("Index", "Home");
    //    }


    //}








    //[HttpPost]
    //public IActionResult Index(User login)
    //{


    //        var U = _helperlandContext.Users.Where(c => c.Email == login.Email && c.Password == login.Password).ToList();

    //        if (U.Count == 1)
    //        {
    //            if (U.FirstOrDefault().UserTypeId == 1)
    //            {
    //                return RedirectToAction("Signup", "Account");
    //            }
    //            if (U.FirstOrDefault().UserTypeId == 2)
    //            {
    //                return RedirectToAction("Faq", "Home");
    //            }
    //        }



    //    else
    //    {
    //        ViewBag.Message = "Details are invalid";

    //    }
    //    return View();
    //}

    //[HttpPost]
    //public IActionResult Index(User user)
    //{
    //    using (HelperlandContext helperlandContext = new HelperlandContext())
    //    {
    //        string email = user.Email;
    //        var p = helperlandContext.Users.Where(c => c.Email == email && c.Password == user.Password).ToList();
    //        if (p.Count == 1)
    //        {
    //            if (p.FirstOrDefault().UserTypeId == 1)
    //            {
    //                return RedirectToAction("Signup", "Account");
    //            }
    //            if (p.FirstOrDefault().UserTypeId == 2)
    //            {
    //                return RedirectToAction("Faq", "Home");
    //            }
    //        }
    //        else
    //        {
    //            ViewBag.Message = "Details are invalid";
    //        }
    //    }
    //    return View();
    //}


}
}
