using DTO.Cache.Models;
using System.Collections.Generic;

namespace DTO.Cache.Data {

	public class UserCache {

		public static List<UserModel> Users { get; set; } = new List<UserModel>();
		public static List<UserRoleModel> UserRoles { get; set; } = new List<UserRoleModel>();
	}
}
