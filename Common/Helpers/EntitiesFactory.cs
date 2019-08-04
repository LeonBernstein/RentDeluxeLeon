using Common.Interfaces;
using Common.Interfaces.Entities;
using Common.Models;

namespace Common.Helpers {

	public static class EntitiesFactory {

		public static IUser GetUser { get => new UserEntity(); }
		public static IUserRole GetUserRole { get => new UserRoleEntity(); }
		public static IPerson GetPerson { get => new PersonEntity(); }
	}
}
