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
                return RedirectToAction("Upcoming_service", "Serviceprovider");
            }
            else
            {
                return RedirectToAction("Index", "Home");

            }
        }

        [HttpPost]
        public ActionResult getScheduleServiceDetails(Scheduleservice data)
        {

            if (ModelState.IsValid)
            {
                return Ok(Json("true"));
            }
            else
            {
                return Ok(Json("false"));
            }

        }
        [HttpGet]
        public JsonResult getAddressDetails()



        {
            int? Id = HttpContext.Session.GetInt32("id");
            List<Addaddress> addresses = new List<Addaddress>();
            var zipCode = Request.Cookies["zipcode"];
            var userAddress = _helperlandContext.UserAddresses.Where(x => x.PostalCode == zipCode && x.UserId == Id).ToList();

            foreach (var address in userAddress)
            {
                Addaddress addr = new Addaddress();
                addr.Id = address.AddressId;
                addr.AddressLine1 = address.AddressLine1;
                addr.AddressLine2 = address.AddressLine2;
                addr.City = address.City;
                addr.Mobile = address.Mobile;
                addr.PostalCode = address.PostalCode;
                addr.IsDefault = address.IsDefault;

                addresses.Add(addr);
            }

            return new JsonResult(addresses);

        }
        [HttpPost]
        public IActionResult addAddress(UserAddress address)
        {
            int? Id = HttpContext.Session.GetInt32("id");
            if (Id != null)
            {
                User user = _helperlandContext.Users.FirstOrDefault(x => x.UserId == Id);
                address.Email = user.Email;
                address.UserId = user.UserId;
                address.IsDefault = false;
                address.IsDeleted = false;
                _helperlandContext.UserAddresses.Add(address);
                _helperlandContext.SaveChanges();

                return Ok(Json("true"));


            }
            return Ok(Json("false"));

        }


    }
}
