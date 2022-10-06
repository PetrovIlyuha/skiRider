using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=^.{6,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
         ErrorMessage = "Password is too weak. Use at least 1 uppercase & 1 lowercase letter, 1 number & 1 special character. Password min length is 6 characters.")
        ]
        public string Password { get; set; }
    }
}