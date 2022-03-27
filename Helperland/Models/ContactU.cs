using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Helperland.Models
{
    public partial class ContactU
    {
        public int ContactUsId { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "FirstName required")]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "EmailID required ")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string Subject { get; set; }
        [Required]
        [StringLength(10, ErrorMessage = "invalid number")]
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
        public string UploadFileName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public string FileName { get; set; }

        [Display(Name = "Attech the file")]
        [Required]
        [NotMapped]
        public IFormFile AttechmentFile { get; set; }
    }
}
