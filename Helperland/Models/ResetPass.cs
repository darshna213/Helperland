using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Helperland.Models
{
    public partial class ResetPass
    {
        public int UserId { get; set; }

        [Required(ErrorMessage = "New password is required", AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; } 
      
       
        //public string NewPassword { get; set; }

        //[DataType(DataType.Password)]
        //[Compare("NewPassword", ErrorMessage = "Both password does not match")]
        //public string ConfirmNewPassword { get; set; }

        //[Required]
        //public string ResetCode { get; set; }
    }
}
