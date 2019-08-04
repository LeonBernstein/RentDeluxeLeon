using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Logic {

	public class UserRolesLogic : IUserRolesLogic {

		private readonly IUserRolesEngine _userRolesEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public UserRolesLogic(
			IUserRolesEngine userRolesEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_userRolesEngine = userRolesEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<UserRoleEntity> GetUserRoles() {
			try {
				var userRoles = _userRolesEngine.GetAllUserRolesFromCache();
				if (userRoles.Count > 0) {
					return userRoles;
				}
				userRoles = _userRolesEngine.GetAllUserRoles();
				if (userRoles.Count == 0) {
					throw new Exception("No user roles in DB!");
				}
				Task.Run(() => {
					_userRolesEngine.OverrideUserRolesCache(userRoles);
				});
				return userRoles;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public async Task<List<UserRoleEntity>> GetUserRolesAsync() {
			try {
				return await Task.Run(() => GetUserRoles());
			} catch (Exception e) {
				throw e;
			}
		}

		public UserRoleEntity GetUserRole(int roleID) {
			try {
				var userRole = _userRolesEngine.GetUserRoleByIDFromCache(roleID);
				if (userRole != null) {
					return userRole;
				}
				var userRoles = _userRolesEngine.GetAllUserRoles();
				if (userRoles.Count == 0) {
					throw new Exception("No user roles in DB!");
				}
				_userRolesEngine.OverrideUserRolesCache(userRoles);
				userRole = _userRolesEngine.GetUserRoleByIDFromCache(roleID);
				if (userRole != null) {
					return userRole;
				}
				throw new Exception($"Can't find user role by id: {roleID}!");
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserRoleEntity GetUserRole(string systemName) {
			try {
				var userRole = _userRolesEngine.GetUserRoleByNameFromCache(systemName);
				if (userRole != null) {
					return userRole;
				}
				var userRoles = _userRolesEngine.GetAllUserRoles();
				if (userRoles.Count == 0) {
					throw new Exception("No user roles in DB!");
				}
				_userRolesEngine.OverrideUserRolesCache(userRoles);
				userRole = _userRolesEngine.GetUserRoleByNameFromCache(systemName);
				if (userRole != null) {
					return userRole;
				}
				throw new Exception($"Can't find user role by system name: {systemName}!");
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public void ClearUserRolesCache() {
			try {
				_userRolesEngine.ClrearUserRolesCache();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
