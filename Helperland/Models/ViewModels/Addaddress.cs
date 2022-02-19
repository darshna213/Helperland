using System;
using System.Collections.Generic;

#nullable disable

namespace Helperland.Models.ViewModels
{
    public partial class Addaddress
    {
        public int UseraddressID { get; set; }
        public string StreetName { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }

        public string City { get; set; }
        public string Mobile { get; set; }
    }
}
