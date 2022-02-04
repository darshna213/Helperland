using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helperland.Data;
using Microsoft.AspNetCore.Mvc;

namespace Helperland.Controllers
{
    public class ClientController : Controller
    {
        private readonly HelperlandContext _helperlandContext;
        public ClientController(HelperlandContext helperlandContext)
        {
            _helperlandContext = helperlandContext;
        }
        public IActionResult Service_history()
        {
            return View();
        }
    }
}
