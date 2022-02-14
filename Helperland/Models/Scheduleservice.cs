using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helperland.Models
{
    public class Scheduleservice
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string time { get; set; }

        [Required]
        public int Duration { get; set; }

        public string extra { get; set; }

        public string Comments { get; set; }

        public bool havePet { get; set; }


    }
}

