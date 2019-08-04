using Common.Interfaces.Entities;

namespace Common.Models {

	public class UserRoleEntity : IUserRole {

		public int UserRoleId { get; set; }
		public string SystemName { get; set; }
		public string Name { get; set; }
		public bool IsActive { get; set; }
	}
}
