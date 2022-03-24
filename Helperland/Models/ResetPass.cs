using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Helperland.Models
{
    public partial class ResetPass
    {
        public int UserId { get; set; }
       
        public string NewPassword { get; set; }
    }
}
