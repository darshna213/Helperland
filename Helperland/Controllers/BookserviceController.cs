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
            var zipcodes = _helperlandContext.Zipcodes.Where(x => x.ZipcodeValue == setupservice.PostalCode);
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
            if(completeBookViewModel.Extras.Length != 0)
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

            return "true";

        }


    }

}