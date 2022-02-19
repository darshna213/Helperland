using System;
using System.Collections.Generic;

#nullable disable

namespace Helperland.Models
{
    public partial class Scheduleservice
    {
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public int Duration { get; set; }
        public string Extra { get; set; }
        public string Comments { get; set; }
        public bool? HavePet { get; set; }
        public string PostalCode { get; internal set; }
    }
}
