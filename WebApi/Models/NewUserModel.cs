using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class NewUserModel {

		[Required]
		[MaxLength(32)]
		[RegularExpression(@"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
		public string UserName { get; set; }

		[Required]
		[MinLength(64)]
		[MaxLength(64)]
		public string Password { get; set; }

		[Required]
		public NewPersonModel Person { get; set; }
	}
}
