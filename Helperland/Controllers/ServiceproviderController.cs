using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Helperland.Data;
using Helperland.Models;
using Helperland.Models.ViewModels;
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
            return View();
        }

        [HttpPost]
        public string GetNewServiceRequest(CustomerServiceNewRequest customerServiceNewRequest)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            if (user.UserId != 0)
            {
                var table = _helperlandContext.ServiceRequests.Where(u => u.Status == 1).ToList();
                return JsonSerializer.Serialize(table);
            }
            else
            {
                return "loginModal";
            }

        }

        [HttpPost]
        public string AcceptServiceRequest(int servicerequestId, ServiceRequest s)
        {
            Console.WriteLine("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userId = u.UserId;

            if (userId != null)
            {
                ServiceRequest request = _helperlandContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == servicerequestId);
                request.Comments = s.Comments;
                request.Status = 4;
                _helperlandContext.ServiceRequests.Update(request);
                _helperlandContext.SaveChanges();

                return "true";

            }
            return "false";
        }

        [HttpPost]
        public string GetUpcomingServiceRequest(CustomerServiceNewRequest customerServiceNewRequest)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            if (user.UserId != 0)
            {
                var table = _helperlandContext.ServiceRequests.Where(u => u.Status == 4).ToList();
                return JsonSerializer.Serialize(table);
            }
            else
            {
                return "loginModal";
            }

        }

        [HttpPost]
        public string CancelUpcomingServiceRequest(int servicerequestId, ServiceRequest s)
        {

            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userId = u.UserId;

            if (userId != null)
            {
                ServiceRequest request = _helperlandContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == servicerequestId);
                request.Comments = s.Comments;
                request.Status = 3;
                _helperlandContext.ServiceRequests.Update(request);
                _helperlandContext.SaveChanges();

                return "true";

            }
            return "false";
        }

        [HttpPost]
        public string CompleteUpcomingServiceRequest(int servicerequestId, ServiceRequest s)
        {

            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userId = u.UserId;

            if (userId != null)
            {
                ServiceRequest request = _helperlandContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == servicerequestId);
                request.Comments = s.Comments;
                request.Status = 2;
                _helperlandContext.ServiceRequests.Update(request);
                _helperlandContext.SaveChanges();

                return "true";

            }
            return "false";
        }


        [HttpPost]
        public string GetBlockCustomer(string s)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userId = u.UserId;

            if (userId != null)
            {
                var table = _helperlandContext.Users.Where(u => u.UserTypeId == 1).ToList();
                    return JsonSerializer.Serialize(table);
            }
            else
            {
                return "loginModal";
            }
        }

        public string BlockCustomerService(int BlockUserId)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userid = u.UserId;
           // var p = _helperlandContext.FavoriteAndBlockeds.Where(c =>c.TargetUserId == BlockUserId).FirstOrDefault();
            //_helperlandContext.FavoriteAndBlockeds.Where(x => x.UserId == userid).FirstOrDefault();
            if (userid !=null)
            {
                var p = _helperlandContext.FavoriteAndBlockeds.Where(c => c.TargetUserId == BlockUserId).FirstOrDefault();
                //    FavoriteAndBlocked favoriteAndBlocked = _helperlandContext.FavoriteAndBlockeds.FirstOrDefault(x => x.TargetUserId == BlockUserId);
                if (p == null)
                {
                    FavoriteAndBlocked favoriteAndBlocked = new FavoriteAndBlocked
                    {
                        UserId = (int)userid,
                        TargetUserId = BlockUserId,
                        IsBlocked = true,
                        IsFavorite = false
                    };
                    _helperlandContext.FavoriteAndBlockeds.Add(favoriteAndBlocked);
                    _helperlandContext.SaveChanges();
                }
                else
                {
                    p.IsBlocked = true;
                    _helperlandContext.SaveChanges();
                }

                //favoriteAndBlocked.UserId = u.UserId;
                ////favoriteAndBlocked.TargetUserId = BlockUserId;
                //favoriteAndBlocked.IsBlocked = true;
                //favoriteAndBlocked.IsFavorite = false;
                //_helperlandContext.FavoriteAndBlockeds.Update(favoriteAndBlocked);
                //_helperlandContext.SaveChanges();
                return "true";
            }
            return "false";
        }








        public string GetUserDetails(string s)
        {
           User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
 
            var currentProviderDetails = _helperlandContext.Users.Where(u => u.UserId == user.UserId).FirstOrDefault();
            Console.WriteLine(currentProviderDetails.FirstName);
            
           
            return JsonSerializer.Serialize(currentProviderDetails) ;
        }
        public string GetAddressDetails(string s)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            var currentProviderAddressDetails = _helperlandContext.UserAddresses.Where(u => u.UserId == user.UserId).FirstOrDefault();
            return JsonSerializer.Serialize(currentProviderAddressDetails);
        }

        public string SaveDetails(SPsavedetails sPsavedetails)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userid = u.UserId;
            if (userid != null)
            {
                User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == userid);
                UserAddress userAddress = new UserAddress();
                user.FirstName = sPsavedetails.FirstName;
                user.LastName = sPsavedetails.LastName;
                user.Email = sPsavedetails.Email;
                user.Mobile = sPsavedetails.Mobile;

                //UserAddress userAddress = _helperlandContext.UserAddresses.Where(x => x.AddressId == sPsavedetails.AddressId).FirstOrDefault();
                userAddress.AddressLine1 = sPsavedetails.AddressLine1;
                userAddress.AddressLine2 = sPsavedetails.AddressLine2;
                userAddress.City = sPsavedetails.City;
                userAddress.PostalCode = sPsavedetails.PostalCode;
                userAddress.Mobile = sPsavedetails.Mobile;

                _helperlandContext.Users.Update(user);
                _helperlandContext.SaveChanges();
            }
            else
            {
                return "something wrong please check";
            }



            return "true";
        }

        public string AddproviderAddress(User user)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userid = u.UserId;
            if (userid != null)
            {
                UserAddress serviceadd = new UserAddress();
                serviceadd.UserId = (int)userid;
                serviceadd.AddressLine1 = user.AddressLine1;
                serviceadd.AddressLine2 = user.AddressLine2;
                serviceadd.City = user.City;
                serviceadd.Mobile = user.Mobile;
                serviceadd.PostalCode = user.PostalCode;
                var serviceaddResult = _helperlandContext.UserAddresses.Add(serviceadd);
                _helperlandContext.SaveChanges();
                return "true";
            }
            return "false";
        }


        public string ChangePassword(Login changepassword)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userid = u.UserId;
            if (userid != null)
            {
                User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == userid);
                if(user.Password==changepassword.Password)
                { 
                user.Password = changepassword.NewPassword;

                _helperlandContext.Users.Update(user);
                _helperlandContext.SaveChanges();
                }
                else
                {
                    return "Old password is not matched with current password";
                }
            }
            else
            {
                return "something wrong please check";
            }

            return "true";
        }
    }
}
