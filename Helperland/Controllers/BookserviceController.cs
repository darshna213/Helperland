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
        //public string Paymentdone(Scheduleservice )
    }
}
