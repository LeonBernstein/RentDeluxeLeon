using DTO.Cache.Models;
using DTO.Cache.Data;
using System;
using System.Collections.Generic;

namespace DTO.Cache {

	public class CacheDBContext : IDisposable {

		public List<UserModel> Users { get => UserCache.Users; set => UserCache.Users = value; }
		public List<UserRoleModel> UserRoles { get => UserCache.UserRoles; set => UserCache.UserRoles = value; }
		public void Dispose() { }
	}
}
