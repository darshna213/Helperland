using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Helperland.Data;
using Helperland.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Protocols;

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
            var U = _helperlandContext.Users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
            if (U != null)
            {
                if (U.UserTypeId == 1)
                {
                    return RedirectToAction("Service_history", "Client");
                }
                if (U.UserTypeId == 2)
                {
                    return RedirectToAction("Upcoming_service", "Client");
                }
            }
            else
            {
                TempData["SuccessMessage"] = "Your Success Message";
                return RedirectToAction("Index", "Home" );
            }
            return RedirectToAction("Singup", "Account");
        }    
     
        public IActionResult Forgotpassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Forgotpassword(ForgotPass forgotPass)
        {
            if (_helperlandContext.Users.Where(x => x.Email == forgotPass.Email).Count() > 0)
            {
                User Id = _helperlandContext.Users.FirstOrDefault(x => x.Email == forgotPass.Email);
                Id.ForgotPass = "true";
                _helperlandContext.Users.Update(Id);
                _helperlandContext.SaveChanges();
                string to = forgotPass.Email;
                string token = BCrypt.Net.BCrypt.HashPassword(forgotPass.Email);
                string subject = "Reset password";
                string body = "<p>Reset your password by click below link " +
                    "<a href='" + Url.Action("ResetPassword", "Registration", new { userid = Id.UserId, token = token }, "https") + "'>Reset Password</a></p>";
                MailMessage msg = new MailMessage();
                msg.To.Add(to);
                msg.Subject = subject;
                msg.Body = body;
                msg.From = new MailAddress("darshnakhokhariya@gmail.com");
                msg.IsBodyHtml = true;
                SmtpClient setup = new SmtpClient("smtp.gmail.com");
                setup.Port = 587;
                setup.UseDefaultCredentials = true;
                setup.EnableSsl = true;
                setup.Credentials = new System.Net.NetworkCredential("username", "password");
                setup.Send(msg);

                TempData["add"] = "alert show alert-success";
                TempData["message"] = "mail successfully!";
                return RedirectToAction("Index", "Home", new { ForgetModal = "true" });

            }
            else
            {
                TempData["Add"] = "alert show alert-danger";
                TempData["message"] = "mail is not found!";
                return RedirectToAction("Index", "Home", new { ForgetModal = "true" });
            }

        }


        [HttpGet]
        public IActionResult ResetPassword(int userID, string token)
        {
            TempData["id"] = userID;
            User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == userID);
            bool isValidId = BCrypt.Net.BCrypt.Verify(user.Email, token);

            if (isValidId && user.ForgotPass == "true")
            {

                return PartialView();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }

        }
        public IActionResult Resetpassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ResetPassword(ResetPass user)
        {
            User u = _helperlandContext.Users.FirstOrDefault(x => x.UserId == user.userid);
            string HashPass = BCrypt.Net.BCrypt.HashPassword(user.newPassword);
            u.Password = HashPass;
            u.ModifiedDate = DateTime.Now;
            u.ForgotPass = "false";
            _helperlandContext.Users.Update(u);
            _helperlandContext.SaveChanges();


            return PartialView();
        }


        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home", new { loginModal = "true" });
        }







        //protected void btPassRec_Click(object sender ,EventArgs e)
        // {
        //     String CS = ConfigurationManager.ConnectionStrings["MyDatabaseConnectionString1"].ConnectionString;
        //     using(SqlConnection con = new SqlConnection(CS))
        //     {
        //         SqlCommand cmd = new SqlCommand("Select * from User Email= '" + EmailId.Text + " '", con);
        //         con.Open();
        //         SqlDataAdapter sda = new DataTable();
        //     }

        // }

    }
}
