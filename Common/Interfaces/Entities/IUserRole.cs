
namespace Common.Interfaces.Entities {

	public interface IUserRole {

		int UserRoleId { get; set; }
		string SystemName { get; set; }
		string Name { get; set; }
		bool IsActive { get; set; }
	}
}
