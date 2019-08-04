using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Interfaces.DAL;
using Common.Models;
using DTO;
using DTO.Cache.Models;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Engine {

	public class UserRolesEngine : IUserRolesEngine {

		public List<UserRoleEntity> GetAllUserRoles() {
			using (var context = DataAccess.GetDBContext) {
				return context.UserRoles
					.ProjectTo<UserRoleEntity>()
					.ToList();
			}
		}

		public List<UserRoleEntity> GetAllUserRolesFromCache() {
			using (var context = DataAccess.GetCacheDBContext) {
				return Mapper.Map<List<UserRoleEntity>>(context.UserRoles);
			}
		}

		public UserRoleEntity GetUserRoleByIDFromCache(int userRoleId) {
			using (var context = DataAccess.GetCacheDBContext) {
				return Mapper.Map<UserRoleEntity>(context.UserRoles
					.Where(r => r.UserRoleId == userRoleId)
					.FirstOrDefault());
			}
		}

		public UserRoleEntity GetUserRoleByNameFromCache(string SystemName) {
			using (var context = DataAccess.GetCacheDBContext) {
				return Mapper.Map<UserRoleEntity>(context.UserRoles
					.Where(r => r.SystemName == SystemName)
					.FirstOrDefault());
			}
		}

		public void OverrideUserRolesCache(List<UserRoleEntity> users) {
			using (var context = DataAccess.GetCacheDBContext) {
				context.UserRoles = Mapper.Map<List<UserRoleModel>>(users);
			}
		}

		public void ClrearUserRolesCache() {
			using (var context = DataAccess.GetCacheDBContext) {
				context.UserRoles = new List<UserRoleModel>();
			}
		}
	}
}
