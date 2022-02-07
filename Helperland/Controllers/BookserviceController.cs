using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class BookserviceController : Controller
    {
        public IActionResult Bookservice()
        {
            return View();
        }
    }
}
