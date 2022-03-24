using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Models.ViewModels
{
    public class RatespViewModel
    {
       
        public int ServiceId { get; set; }
       
        public int ServiceProviderId { get; set; }
      
        public string? Comments { get; set; }
      
        public int OnTime { get; set; }

        public int Friendly { get; set; }
      
        public int QualityOfService { get; set; }

        public double Average { get; set; }
    }
}
