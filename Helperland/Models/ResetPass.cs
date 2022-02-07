using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

#nullable disable
namespace Helperland.Models
{
    public class ResetPass
    {
        public int userID { get; set; }
        public string newPassword { get; set; }
    }
}
