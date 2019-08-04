using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class UserModel {

		[Required]
		public int UserId { get; set; }
		[Required]
		public int UserRoleId { get; set; }
		[Required]
		public PersonModel Person { get; set; }
	}
}
