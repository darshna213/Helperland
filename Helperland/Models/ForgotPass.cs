using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Helperland.Models
{
    public partial class ForgotPass
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
