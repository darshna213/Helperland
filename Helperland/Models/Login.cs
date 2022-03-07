using System;
using System.Collections.Generic;

#nullable disable

namespace Helperland.Models
{
    public partial class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public bool? Remember { get; set; }
    }
}
