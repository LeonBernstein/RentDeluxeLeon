
namespace DTO.Cache.Models {

	public class UserModel {

		public int UserId { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public int UserRoleId { get; set; }
		public UserRoleModel UserRole { get; set; }
		public PersonModel Person { get; set; }
		public bool IsActive { get; set; }
	}
}
