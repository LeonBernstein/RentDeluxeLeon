using BL.Logic;
using Common.Interfaces.BL;
using DAL.Services;

namespace BL.Services {

	public static class BLFactoryService {

		public static IExceptionHandlerLogic GetExceptionHandlerLogic {
			get => new ExceptionHandlerLogic(
				DALFactoryService.GetFileSystemEngine
			);
		}

		public static IUserLogic GetUserLogic {
			get => new UserLogic(
				DALFactoryService.GetUserEngine,
				GetExceptionHandlerLogic
			);
		}

		public static IUserRolesLogic GetUserRolesLogic {
			get => new UserRolesLogic(
				DALFactoryService.GetUserRolesEngine,
				GetExceptionHandlerLogic
			);
		}

		public static IPersonLogic GetPersonLogic {
			get => new PersonLogic(
				GetExceptionHandlerLogic,
				DALFactoryService.GetFileSystemEngine,
				GetUserLogic,
				DALFactoryService.GetPersonEngine
			);
		}
	}
}
