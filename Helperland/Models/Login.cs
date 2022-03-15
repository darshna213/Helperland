using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Helperland.Models
{
    public partial class Login
    {
        public string Username { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Current Password are required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please fill the Details")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please fill the Details")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        public bool? Remember { get; set; }
    }
}
