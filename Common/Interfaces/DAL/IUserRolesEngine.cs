using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IUserRolesEngine {

		List<UserRoleEntity> GetAllUserRoles();
		List<UserRoleEntity> GetAllUserRolesFromCache();
		UserRoleEntity GetUserRoleByIDFromCache(int userRoleId);
		UserRoleEntity GetUserRoleByNameFromCache(string SystemName);
		void OverrideUserRolesCache(List<UserRoleEntity> users);
		void ClrearUserRolesCache();
	}
}
