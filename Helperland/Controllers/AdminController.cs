using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Helperland.Data;
using Helperland.Models;
using Helperland.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class AdminController : Controller
    {
        private readonly HelperlandContext _helperlandContext;
        public AdminController(HelperlandContext helperlandContext)
        {
            _helperlandContext = helperlandContext;
        }
        public IActionResult Admin()
        {
            return View();
        }

        [HttpPost]
        public string GetServiceHistoryDetails(CustomerServiceNewRequest customerServiceNewRequest)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int userid = user.UserId;
            Console.WriteLine("dddaaddddddddddddddddddddddddddddddddddddddddddddddddddd");
            var servicerequest = (from sr in _helperlandContext.ServiceRequests
                                  join u in _helperlandContext.Users on sr.UserId equals u.UserId
                                  join add in _helperlandContext.ServiceRequestAddresses on sr.ServiceRequestId equals add.ServiceRequestId
                                  where sr.Status == 1 || sr.Status == 2 || sr.Status == 3 || sr.Status == 4
                                  select new
                                  {

                                      RequestId = sr.ServiceRequestId,
                                      ServiceStartDate = sr.ServiceStartDate.ToString("d"),
                                      ServiceStartTime = sr.ServiceStartDate.ToString("HH:mm"),
                                      CustomerName = u.FirstName + " " + u.LastName,
                                      ServiceTotalHour = sr.ServiceHours + sr.ExtraHours,
                                      TotalCost = sr.TotalCost,
                                      SubTotal = sr.SubTotal,
                                      Status = sr.Status,

                                      ServiceProviderId = sr.ServiceProviderId,
                                      SpFirstName = _helperlandContext.Users.Where(u => u.UserId == sr.ServiceProviderId).Select(u => u.FirstName).FirstOrDefault(),
                                      SpLastName = _helperlandContext.Users.Where(u => u.UserId == sr.ServiceProviderId).Select(u => u.LastName).FirstOrDefault(),
                                      AverageRatings = _helperlandContext.Ratings.Where(u => u.RatingTo == sr.ServiceProviderId).Select(u => u.Ratings).ToList(),

                                      AddressLine1 = add.AddressLine1,
                                      AddressLine2 = add.AddressLine2,
                                      City = add.City,
                                      PostalCode = add.PostalCode,
                                      Mobile = add.Mobile,

                                  }).ToList();

            return JsonSerializer.Serialize(servicerequest);



        }


        public string UpdateServiceRequest(int ServiceId, string NewServiceDate, string NewServicetime, string AddressLine1, string AddressLine2, string City, string PostalCode, string Reason)
        {
            Console.WriteLine("ccccccccccccccccccccccccccccc");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            string? Name = u.FirstName + " " + u.LastName;
            ServiceRequest request = _helperlandContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == ServiceId);
            if (request != null)
            {
                if (request.ServiceProviderId != null)
                {
                    var SP = _helperlandContext.Users.Where(u => u.UserId == request.ServiceProviderId).Select(u => new { u.Email, u.FirstName, u.LastName }).FirstOrDefault();
                    if(SP != null)
                    {
                        Mail mail = new Mail();
                        string Email = SP.Email;
                        string name = SP.FirstName + " " + SP.LastName;
                        string Subject = "Service Rescheduled";
                        string Body =
                        "Hello,\n" +
                        SP.FirstName + " " + SP.LastName + "\n\n" +
                        "Changes made by Admin" + "\n" +
                        Name + " has rescheduled service on\n" +
                        NewServiceDate + " " + NewServicetime + "\n" +
                        "Service ID: " + ServiceId;

                        MailMessage msg = new MailMessage();
                        msg.To.Add(Email);
                        msg.Subject = Subject;
                        msg.Body = Body;
                        msg.From = new MailAddress("sirijery@gmail.com");
                        msg.IsBodyHtml = true;
                        SmtpClient setup = new SmtpClient("smtp.gmail.com");
                        setup.Port = 587;
                        setup.UseDefaultCredentials = true;
                        setup.EnableSsl = true;
                        setup.Credentials = new System.Net.NetworkCredential("sirijery@gmail.com", "siri@90543");
                        setup.Send(msg);

                    }
                }
              
                var customer = _helperlandContext.Users.Where(u => u.UserId == request.UserId).Select(u => new { u.Email, u.FirstName, u.LastName }).FirstOrDefault();
                if (customer != null)
                {
                    Mail mail = new Mail();
                    string Email = customer.Email;
                    string name = customer.FirstName + " " + customer.LastName;
                    string Subject = "Service Rescheduled";
                    string Body =
                    "Hello,\n" +
                    customer.FirstName + " " + customer.LastName + "\n\n" +
                    "Changes made by Admin" + "\n" +
                    Name + " has rescheduled service on\n" +
                    NewServiceDate + " " + NewServicetime + "\n" +
                    "Service ID: " + ServiceId;

                    MailMessage msg = new MailMessage();
                    msg.To.Add(Email);
                    msg.Subject = Subject;
                    msg.Body = Body;
                    msg.From = new MailAddress("sirijery@gmail.com");
                    msg.IsBodyHtml = true;
                    SmtpClient setup = new SmtpClient("smtp.gmail.com");
                    setup.Port = 587;
                    setup.UseDefaultCredentials = true;
                    setup.EnableSsl = true;
                    setup.Credentials = new System.Net.NetworkCredential("sirijery@gmail.com", "siri@90543");
                    setup.Send(msg);
                }


                User userId = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
                int UserId = userId.UserId;
                request.ServiceStartDate = DateTime.Parse(NewServiceDate + " " + NewServicetime);
                request.ModifiedDate = DateTime.Now;
                request.ModifiedBy = UserId;
                request.Comments = Reason;
                _helperlandContext.ServiceRequests.Update(request);

                var serviceAddress = _helperlandContext.ServiceRequestAddresses.Where(sa => sa.ServiceRequestId == ServiceId).FirstOrDefault();
                if (serviceAddress != null)
                {
                    serviceAddress.AddressLine1 = AddressLine1;
                    serviceAddress.AddressLine2 = AddressLine2;
                    serviceAddress.City = City;
                    serviceAddress.PostalCode = PostalCode;
                    _helperlandContext.ServiceRequestAddresses.Update(serviceAddress);
                    _helperlandContext.SaveChanges();
                }
                else
                {
                    return "Address not found by that id";
                }



                return "true";
            }

            return "false";
        }

        public string CancelService(int ServiceId, string Comments)
        {
            User userId = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int UserId = userId.UserId;

            ServiceRequest? serviceRequest = _helperlandContext.ServiceRequests.Find(ServiceId);
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            string? Name = u.FirstName + " " + u.LastName;
            if (serviceRequest != null)
            {
                var SP = _helperlandContext.Users.Where(u => u.UserId == serviceRequest.ServiceProviderId).Select(u => new { u.Email, u.FirstName, u.LastName }).FirstOrDefault();
                if (SP != null)
                {
                    Mail mail = new Mail();
                    string Email = SP.Email;
                    string name = SP.FirstName + " " + SP.LastName;
                    string Subject = "Service Cancelled";
                    string Body =
                    "Hello,\n" +
                    SP.FirstName + " " + SP.LastName + "\n\n" +
                    "Changes made by Admin" + "\n" +
                    Name + " has Cancelled service on\n" +
                    "Service ID: " + ServiceId;
                    MailMessage msg = new MailMessage();
                    msg.To.Add(Email);
                    msg.Subject = Subject;
                    msg.Body = Body;
                    msg.From = new MailAddress("sirijery@gmail.com");
                    msg.IsBodyHtml = true;
                    SmtpClient setup = new SmtpClient("smtp.gmail.com");
                    setup.Port = 587;
                    setup.UseDefaultCredentials = true;
                    setup.EnableSsl = true;
                    setup.Credentials = new System.Net.NetworkCredential("sirijery@gmail.com", "siri@90543");
                    setup.Send(msg);

                }


                var customer = _helperlandContext.Users.Where(u => u.UserId == serviceRequest.UserId).Select(u => new { u.Email, u.FirstName, u.LastName }).FirstOrDefault();
                if(customer !=null)
                {
                    Mail mail = new Mail();
                    string Email = customer.Email;
                    string name = customer.FirstName + " " + customer.LastName;
                    string Subject = "Service Cancelled";
                    string Body =
                    "Hello,\n" +
                    customer.FirstName + " " + customer.LastName + "\n\n" +
                    "Changes made by Admin" + "\n" +
                    Name + " has cancelled service on\n" +
                    "Service ID: " + ServiceId;

                    MailMessage msg = new MailMessage();
                    msg.To.Add(Email);
                    msg.Subject = Subject;
                    msg.Body = Body;
                    msg.From = new MailAddress("sirijery@gmail.com");
                    msg.IsBodyHtml = true;
                    SmtpClient setup = new SmtpClient("smtp.gmail.com");
                    setup.Port = 587;
                    setup.UseDefaultCredentials = true;
                    setup.EnableSsl = true;
                    setup.Credentials = new System.Net.NetworkCredential("sirijery@gmail.com", "siri@90543");
                    setup.Send(msg);
                }
               

                serviceRequest.Comments = Comments;
                serviceRequest.Status = 3;
                serviceRequest.ModifiedDate = DateTime.Now;
                serviceRequest.ModifiedBy = UserId;
                serviceRequest.ServiceProviderId = null;
                _helperlandContext.ServiceRequests.Update(serviceRequest);
                _helperlandContext.SaveChanges();
            }
            else
            {
                return "No service found by that id";
            }



            return "true";
        }




        [HttpPost]
        public string GetUserManagementDetails(CustomerServiceNewRequest customerServiceNewRequest)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int userid = user.UserId;
            var userdetails = (
                                  from u in _helperlandContext.Users
                                  select new
                                  {
                                      UserId = u.UserId,
                                      CustomerName = u.FirstName + " " + u.LastName,
                                      UserType = u.UserTypeId,
                                      RegistrationDate = u.CreatedDate.ToString("d"),
                                      Phone = u.Mobile,
                                      PostalCode = u.ZipCode,
                                      Status = u.Status,
                                      Email = u.Email
                                  }).ToList();

            return JsonSerializer.Serialize(userdetails);
        }

        public string ActivateInActivate(string Status, string Email)
        {
            User users = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int userid = users.UserId;
           
            int StatusID = 0;
            if (Status == "1")
            {
                StatusID = 2;
            }
            else
            {
                StatusID = 1;
            }

            
            var user = _helperlandContext.Users.Where(u => u.Email == Email).FirstOrDefault();
            if (user != null)
            {
                user.Status = StatusID;
                user.ModifiedBy = userid;
                user.ModifiedDate = DateTime.Now;
                _helperlandContext.Users.Update(user);
                _helperlandContext.SaveChanges();
            }
            else
            {
                return "User not found";
            }
            return "true";
        }
        public IActionResult adminLogout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home", new { loginModal = "true" });
        }

    }
}
