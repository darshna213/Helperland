using Helperland.Data;
using Helperland.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Text.Json;

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
        public IActionResult Login(User user)
        {
            var U = _helperlandContext.Users.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();

            
            if (U != null)
            {
                HttpContext.Session.SetString("CurrentUser", JsonSerializer.Serialize(U));
                if (U.UserTypeId == 1)
                {
                    return RedirectToAction("Service_history", "Client");
                }
                if (U.UserTypeId == 2)
                {
                    return RedirectToAction("Upcoming_service", "Serviceprovider");
                }
            }
            else
            {
                TempData["SuccessMessage"] = "Your Success Message";
                return RedirectToAction("Index", "Home");
            }
            return RedirectToAction("Singup", "Account");
        }

        public IActionResult Forgotpassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Forgotpassword(User forgotPass)
        {
            var userrecord = _helperlandContext.Users.Where(x => x.Email == forgotPass.Email).FirstOrDefault();
            if (userrecord != null)
            {
                User Id = _helperlandContext.Users.FirstOrDefault(x => x.Email == forgotPass.Email);
                //Id.ForgotPass = "true";
                //_helperlandContext.Users.Update(Id);
                //_helperlandContext.SaveChanges();
                string to = forgotPass.Email;
                string token = BCrypt.Net.BCrypt.HashPassword(forgotPass.Email);
                string subject = "Reset password";
                string body = "<p>Reset your password by click below link " +
                    "<a href='" + Url.Action("Resetpassword", "Account", new { userid = Id.UserId, token = token }, "http") + "'>Reset Password</a></p>";
               
                MailMessage msg = new MailMessage();
                msg.To.Add(to);
                msg.Subject = subject;
                msg.Body = body;
                msg.From = new MailAddress("drashtipatel20212021@gmail.com");
                msg.IsBodyHtml = true;
                SmtpClient setup = new SmtpClient("smtp.gmail.com");
                setup.Port = 587;
                setup.UseDefaultCredentials = true;
                setup.EnableSsl = true;
                setup.Credentials = new System.Net.NetworkCredential("drashtipatel20212021@gmail.com", "drashti9054313588");
                setup.Send(msg);
                TempData["SuccessMsg"] = "Your Success Message";
                return RedirectToAction("Index", "Home");
            }
            else
            {
                TempData["add"] = "alert show";
                TempData["fail"] = "mail is not found!";
                return RedirectToAction("Index", "Home", new { ForgetModal = "true" });
            }

        }

        public IActionResult Resetpassword()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ResetPassword(int userID, string token)
        {
            TempData["id"] = userID;
            User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == userID);
            bool isValidId = BCrypt.Net.BCrypt.Verify(user.Email, token);

            //if (isValidId && user.ForgotPass == "true")
            //{

            //    return PartialView();
            //}
            //else
            //{
            //    return RedirectToAction("Index", "Home");
            //}
            return RedirectToAction("Account", "Resetpassword");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ResetPassword(ResetPass user)
        {
            User u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == user.UserId);
            string HashPass = BCrypt.Net.BCrypt.HashPassword(user.NewPassword);
            u.Password = HashPass;
            u.ModifiedDate = DateTime.Now;
            //u.ForgotPass = "false";
            _helperlandContext.Users.Update(u);
            _helperlandContext.SaveChanges();


            return View();
        }


        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home", new { loginModal = "true" });
        }






    }
}
