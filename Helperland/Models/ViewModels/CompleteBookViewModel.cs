using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Models.ViewModels
{
    public class CompleteBookViewModel
    {
        public string Pincode { get; set; }
        public string DateTime { get; set; }
        public double BasicHour { get; set; }
        public int[] Extras { get; set; }
        public string Comments{ get; set; }
        public bool HavePet { get; set; }
        public int AddressId { get; set; }
    }
}
