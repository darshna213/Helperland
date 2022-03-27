using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Helperland.Models;
using Helperland.Data;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace Helperland.Controllers
{
    public class HomeController : Controller
    {
        //private readonly ILogger<HomeController> _logger;

        //public HomeController(ILogger<HomeController> logger)
        //{
        //    _logger = logger;
        //}

        private readonly HelperlandContext _helperlandContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public HomeController(HelperlandContext helperlandContext, IWebHostEnvironment webHostEnvironment)
        {
            _helperlandContext = helperlandContext;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }

       

        public IActionResult Faq()
        {
            return View();
        }
        public IActionResult Price()
        {
            return View();
        }
        public IActionResult Contact()
        {
            ContactU contactU = new ContactU();
            return View(contactU);

        }

        [HttpPost]


        public IActionResult Contact(ContactU contactU)
        {
            if (contactU.AttechmentFile != null)
            {
                string folder = "ContactUsFiles/";
                folder += Guid.NewGuid().ToString() + "_" + contactU.AttechmentFile.FileName;
                string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
                contactU.AttechmentFile.CopyToAsync(new FileStream(serverFolder, FileMode.Create));
                contactU.FileName = folder;

            }

            contactU.CreatedOn = DateTime.Now;
            contactU.CreatedBy = 1;
            _helperlandContext.ContactUs.Add(contactU);
            _helperlandContext.SaveChanges();
            return RedirectToAction("Index");
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Provider()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
