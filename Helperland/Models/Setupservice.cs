﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Models
{
    public class Setupservice
    {
        [Required]
        public string PostalCode { get; set; }
    }
}
