using Common.Interfaces.Entities;

namespace Common.Models {

	public class UserEntity : IUser {

		public int UserId { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public int UserRoleId { get; set; }
		public UserRoleEntity UserRole { get; set; }
		public PersonEntity Person { get; set; }
		public bool IsActive { get; set; }
	}
}
