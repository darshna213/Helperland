using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text.Json;
using System.Threading.Tasks;
using Helperland.Data;
using Helperland.Models;
using Helperland.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class BookserviceController : Controller
    {
        private readonly HelperlandContext _helperlandContext;
        public BookserviceController(HelperlandContext helperlandContext)
        {
            _helperlandContext = helperlandContext;

        }


        public IActionResult Bookservice()
        {
            return View();
        }



        [HttpPost]
        public ActionResult IsValidZipcode(Setupservice setupservice)
        {
            var zipcodes = _helperlandContext.Users.Where(u => u.ZipCode == setupservice.PostalCode && u.UserTypeId == 2).ToList();
            if (zipcodes.Count() > 0)
            {
                CookieOptions cookie = new CookieOptions();
                Response.Cookies.Append("zipcode", setupservice.PostalCode, cookie);
                return Ok(Json("True"));
            }
            else
            {
                return Ok(Json("false"));
            }
        }

        [HttpPost]
        public ActionResult getScheduleServiceDetails(Scheduleservice data)
        {

            if (ModelState.IsValid)
            {
                return Ok(Json("True"));
            }
            else
            {
                return Ok(Json("false"));
            }

        }

        [HttpPost]
        public string AddAddress(Addaddress addAddress)
        {

            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            UserAddress address = new UserAddress();
            address.UserId = u.UserId;
            address.AddressLine1 = addAddress.StreetName;
            address.AddressLine2 = addAddress.HouseNumber;
            address.City = addAddress.City;
            address.Mobile = addAddress.Mobile;
            address.PostalCode = addAddress.PostalCode;
            _helperlandContext.UserAddresses.Add(address);
            _helperlandContext.SaveChanges();

            return "true";

        }

        public string GetAddress(string postalcode)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            int userId = u.UserId;
            Console.WriteLine(userId);
            List<UserAddress> userAddress = _helperlandContext.UserAddresses.Where(u => u.UserId == userId && u.PostalCode == postalcode).ToList();

            return JsonSerializer.Serialize(userAddress);
        }

        public string CompleteBooking(CompleteBookViewModel completeBookViewModel)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            int userId = u.UserId;

            ServiceRequest serviceRequest = new ServiceRequest();

            serviceRequest.UserId = userId;
            serviceRequest.ZipCode = completeBookViewModel.Pincode;
            if (_helperlandContext.ServiceRequests.Max(u => (int?)u.ServiceRequestId) == null)
            {
                serviceRequest.ServiceId = 1;
            }
            else
            {
                serviceRequest.ServiceId = (int)(_helperlandContext.ServiceRequests.Max(u => (int?)u.ServiceRequestId) + 1);
            }
            serviceRequest.ServiceStartDate = DateTime.ParseExact(completeBookViewModel.DateTime, "yyyy-MM-dd HH:mm", null);
            serviceRequest.ServiceHourlyRate = 18;
            serviceRequest.ServiceHours = completeBookViewModel.BasicHour;
            serviceRequest.ExtraHours = completeBookViewModel.Extras.Length / 2.0;
            serviceRequest.SubTotal = (decimal)(completeBookViewModel.BasicHour + completeBookViewModel.Extras.Length / 2);
            serviceRequest.TotalCost = (Decimal)(serviceRequest.SubTotal * serviceRequest.ServiceHourlyRate);
            serviceRequest.Comments = completeBookViewModel.Comments;
            serviceRequest.HasPets = completeBookViewModel.HavePet;
            serviceRequest.Status = 1;
            serviceRequest.CreatedDate = DateTime.Now;
            serviceRequest.ModifiedDate = DateTime.Now;
            serviceRequest.ModifiedBy = userId;

            _helperlandContext.ServiceRequests.Add(serviceRequest);
            _helperlandContext.SaveChanges();


            int serviceId = _helperlandContext.ServiceRequests.Where(u => u.UserId == userId).Max(u => u.ServiceRequestId);
            if (completeBookViewModel.Extras.Length != 0)
            {
                for (int i = 0; i < completeBookViewModel.Extras.Length; i++)
                {
                    ServiceRequestExtra serviceRequestExtra = new ServiceRequestExtra();
                    serviceRequestExtra.ServiceRequestId = serviceId;
                    serviceRequestExtra.ServiceExtraId = completeBookViewModel.Extras[i];
                    _helperlandContext.ServiceRequestExtras.Add(serviceRequestExtra);
                }
                _helperlandContext.SaveChanges();

            }

            UserAddress userAddress = _helperlandContext.UserAddresses.Where(u => u.AddressId == completeBookViewModel.AddressId).FirstOrDefault();

            ServiceRequestAddress serviceRequestAddress = new ServiceRequestAddress();
            serviceRequestAddress.ServiceRequestId = serviceId;
            serviceRequestAddress.AddressLine1 = userAddress.AddressLine1;
            serviceRequestAddress.AddressLine2 = userAddress.AddressLine2;
            serviceRequestAddress.PostalCode = userAddress.PostalCode;
            serviceRequestAddress.City = userAddress.City;
            serviceRequestAddress.Mobile = userAddress.Mobile;

            _helperlandContext.ServiceRequestAddresses.Add(serviceRequestAddress);
            _helperlandContext.SaveChanges();

            return "" + serviceId;

        }
        public IActionResult Service_history()
        {
            return View();
        }

        public string GetServicesDashboard(CustomerServiceNewRequest customerServiceNewRequest)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int userid = user.UserId;
            var servicedashboard = (from sr in _helperlandContext.ServiceRequests
                                  join u in _helperlandContext.Users on sr.UserId equals u.UserId
                                  join add in _helperlandContext.ServiceRequestAddresses on sr.ServiceRequestId equals add.ServiceRequestId
                                  where sr.UserId == userid && sr.Status == 1
                                  select new
                                  {
                                      RequestId = sr.ServiceRequestId,
                                      ServiceStartDate = sr.ServiceStartDate.ToString("d"),
                                      ServiceStartTime = sr.ServiceStartDate.ToString("HH:mm"),
                                      CustomerName = u.FirstName + " " + u.LastName,
                                      ServiceTotalHour = sr.ServiceHours + sr.ExtraHours,
                                      TotalCost = sr.TotalCost,
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

            return JsonSerializer.Serialize(servicedashboard);

        }


        public string GetServiceHistory(string s)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int userid = user.UserId;
            var servicehistory = (from sr in _helperlandContext.ServiceRequests
                                    join u in _helperlandContext.Users on sr.UserId equals u.UserId
                                    join add in _helperlandContext.ServiceRequestAddresses on sr.ServiceRequestId equals add.ServiceRequestId
                                    where sr.UserId == userid && sr.Status != 1
                                    select new
                                    {
                                        RequestId = sr.ServiceRequestId,
                                        ServiceStartDate = sr.ServiceStartDate.ToString("d"),
                                        ServiceStartTime = sr.ServiceStartDate.ToString("HH:mm"),
                                        CustomerName = u.FirstName + " " + u.LastName,
                                        ServiceTotalHour = sr.ServiceHours + sr.ExtraHours,
                                        TotalCost = sr.TotalCost,
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

            return JsonSerializer.Serialize(servicehistory);

        }

        [HttpPost]
        public string CancelServiceRequest(int serviceRequestId, ServiceRequest s)
        {
            Console.WriteLine("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userId = u.UserId;

            if (userId != null)
            {
                ServiceRequest request = _helperlandContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == serviceRequestId);
                request.Comments = s.Comments;
                request.Status = 3;
                _helperlandContext.ServiceRequests.Update(request);
                _helperlandContext.SaveChanges();

                return "true";

            }
            return "false";
        }



        public string UpdateServiceRequest(int serviceRequestId, string serviceStartDate, string startTime)
        {
            Console.WriteLine("ccccccccccccccccccccccccccccc");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? Id = u.UserId;

            if (Id != null)
            {
                ServiceRequest request = _helperlandContext.ServiceRequests.FirstOrDefault(x => x.ServiceRequestId == serviceRequestId);

                request.ServiceStartDate = DateTime.Parse(serviceStartDate + " " + startTime);

                _helperlandContext.ServiceRequests.Update(request);
                _helperlandContext.SaveChanges();


                return "true";
            }

            return "false";
        }

        public string UpdateUserAddress(int AddressId, string addressLine1, string addressLine2, string postalCode, string city, string mobile)
        {
            Console.WriteLine("aaaaaaaaaaaaaaaaaaaaaaaa");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? Id = u.UserId;
            if(Id != null)
            {
                
                UserAddress userAddress = _helperlandContext.UserAddresses.Where(x => x.AddressId == AddressId && x.UserId == u.UserId).FirstOrDefault();
                userAddress.AddressLine1 = addressLine1;
                userAddress.AddressLine2 = addressLine2;
                //userAddress.PostalCode = postalCode;
                userAddress.City = city;
                userAddress.Mobile = mobile;
                _helperlandContext.UserAddresses.Update(userAddress);
                _helperlandContext.SaveChanges();

                return "true";
            }
            return "false";
        }

        [HttpPost]
        public string CancelUserAddress(int addressId)
        {
            Console.WriteLine("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu" + addressId);
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userId = u.UserId;

            if (userId != null)
            {
                UserAddress userAddress = _helperlandContext.UserAddresses.Where(x => x.AddressId == addressId && x.UserId==u.UserId).FirstOrDefault();
                userAddress.IsDeleted = true;
                _helperlandContext.UserAddresses.Update(userAddress);
                _helperlandContext.SaveChanges();

                return "true";

            }
            return "false";
           
        }



        [HttpPost]
        public string UserAddAddress(Addaddress addAddress)
        {
            Console.WriteLine("");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            UserAddress address = new UserAddress();
            address.UserId = u.UserId;
            address.AddressLine1 = addAddress.StreetName;
            address.AddressLine2 = addAddress.HouseNumber;
            address.City = addAddress.City;
            address.Mobile = addAddress.Mobile;
            address.PostalCode = addAddress.PostalCode;
            _helperlandContext.UserAddresses.Add(address);
            _helperlandContext.SaveChanges();

            return "true";

        }
        public string GetUserAddress(string s)
        {
            Console.WriteLine("ffffffffffffffffffffff");
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            int userId = u.UserId;

            List<UserAddress> userAddress = _helperlandContext.UserAddresses.Where(u => u.UserId == userId && u.IsDeleted == false).ToList();
            return JsonSerializer.Serialize(userAddress);
        }

        public string GetUserDetails(string s)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));

            var currentUserDetails = _helperlandContext.Users.Where(u => u.UserId == user.UserId).FirstOrDefault();
            Console.WriteLine(currentUserDetails.FirstName);
            return JsonSerializer.Serialize(currentUserDetails);
        }
        public string GetStoredPassword(string StoredPassword)
        {
            User user = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));


            var s = _helperlandContext.Users.Where(x => x.UserId == user.UserId).FirstOrDefault();
            return JsonSerializer.Serialize(s);

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
                    return "true";
                }
                else
                {
                    ViewBag.message = "old password is not matched with current password";
                    return "false";
                }
               
            }
            else
            {
                return "false";
               
            }
           

        }
        public string SaveDetails(Savedetails savedetails)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userid = u.UserId;
            if (userid != null)
            {
                User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == userid);

                user.FirstName = savedetails.FirstName;
                user.LastName = savedetails.LastName;
                user.Email = savedetails.Email;
                user.Mobile = savedetails.Mobile;

                _helperlandContext.Users.Update(user);

                _helperlandContext.SaveChanges();
                return "true";

            }
            else
            {
                return "false";
               
            }

        }

        public string RateService(RatespViewModel ratespViewModel)
        {
            User u = JsonSerializer.Deserialize<User>(HttpContext.Session.GetString("CurrentUser"));
            int? userid = u.UserId;
            if (userid != null)
            {
                int n = _helperlandContext.Ratings.Count(u => u.ServiceRequestId == ratespViewModel.ServiceId);
                if(n==0)
                {
                    Rating rating = new Rating();
                    rating.ServiceRequestId = ratespViewModel.ServiceId;
                    rating.RatingFrom = u.UserId;
                    rating.RatingTo = ratespViewModel.ServiceProviderId;
                    rating.Ratings = (int)ratespViewModel.Average;
                    rating.Comments = ratespViewModel.Comments;
                    rating.RatingDate = DateTime.Now;
                    rating.OnTimeArrival = ratespViewModel.OnTime;
                    rating.Friendly = ratespViewModel.Friendly;
                    rating.QualityOfService = ratespViewModel.QualityOfService;

                    _helperlandContext.Ratings.Update(rating);
                    _helperlandContext.SaveChanges();
                }
            }

                return "true";
        }
    }

}