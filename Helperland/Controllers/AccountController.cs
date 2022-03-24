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
                user.Status = 1;

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
                signup.UserTypeId = 2;
                signup.CreatedDate = DateTime.Now;
                signup.ModifiedDate = DateTime.Now;
                signup.IsRegisteredUser = true;
                signup.ModifiedBy = 123;
                signup.Status = 2;

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
            var U = _helperlandContext.Users.Where(x => x.Email == user.Email && x.Password == user.Password ).FirstOrDefault();
           


            if (U != null)
            {
                var Name = U.FirstName + " " + U.LastName;
                HttpContext.Session.SetString("Name", Name);
                HttpContext.Session.SetString("CurrentUser", JsonSerializer.Serialize(U));
                if (U.UserTypeId == 1)
                {
                    if(U.Status==1){
                        return RedirectToAction("Service_history", "Bookservice");
                    }
                    else
                    {
                        TempData["ActiveMessage"] = "Your Success Message";
                        return RedirectToAction("Index", "Home");
                    }
                    
                }
                if (U.UserTypeId == 2)
                {
                    return RedirectToAction("Upcoming_service", "Serviceprovider");
                }
                if(U.UserTypeId == 3)
                {
                    return RedirectToAction("Admin", "Admin");
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
                Id.ForgetPass = "true";
                _helperlandContext.Update(Id);
                _helperlandContext.SaveChanges();
                string to = forgotPass.Email;
                string token = BCrypt.Net.BCrypt.HashPassword(forgotPass.Email);
                string subject = "Reset password";
                string body = "<p>Reset your password by click below link " +
                    "<a href='" + Url.Action("Resetpassword", "Account", new { userid = Id.UserId, token = token }, "https") + "'>Reset Password</a></p>";
                Console.WriteLine(body);
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
        public IActionResult Resetpassword(int userid, string token)
        {
            TempData["id"] = userid;
            User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == userid);
            bool isValidId = BCrypt.Net.BCrypt.Verify(user.Email, token);

            if (isValidId /*&& user.ForgetPass == "true"*/)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
           
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public string Resetpasswod(ResetPass resetPass)

        {
            Console.WriteLine("rrrrrrrrrrrrrrrrrr");
            User u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == resetPass.UserId);

            
            u.Password = BCrypt.Net.BCrypt.HashPassword(resetPass.NewPassword);
            //u.Password = HashPass;
            u.ModifiedDate = DateTime.Now;
            //u.ForgotPass = "false";
            _helperlandContext.Users.Update(u);
            _helperlandContext.SaveChanges();


            return "true";
        }


        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home", new { loginModal = "true" });
        }






    }
}
