using Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Interfaces.BL {

	public interface IUserRolesLogic {

		List<UserRoleEntity> GetUserRoles();
		Task<List<UserRoleEntity>> GetUserRolesAsync();
		UserRoleEntity GetUserRole(int roleID);
		UserRoleEntity GetUserRole(string systemName);
		void ClearUserRolesCache();
	}
}
