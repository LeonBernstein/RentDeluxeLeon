
using Common.Models;

namespace Common.Interfaces.Entities {

	public interface IUser {

		int UserId { get; set; }
		string UserName { get; set; }
		string Password { get; set; }
		int UserRoleId { get; set; }
		UserRoleEntity UserRole { get; set; }
		PersonEntity Person { get; set; }
		bool IsActive { get; set; }
	}
}
