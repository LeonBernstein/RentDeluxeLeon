using Common.Interfaces.DAL;
using DAL.Engine;

namespace DAL.Services {
	public static class DALFactoryService {

		public static IFileSystemEngine GetFileSystemEngine { get => new FileSystemEngine(); }

		public static IUserEngine GetUserEngine { get => new UserEngine(); }

		public static IUserRolesEngine GetUserRolesEngine { get => new UserRolesEngine(); }

		public static IPersonEngine GetPersonEngine { get => new PersonEngine(); }
	}
}
