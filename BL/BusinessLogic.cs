using Common.Helpers;
using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using System;

namespace BL {
	public class BusinessLogic : IBusinessLogic {

		private readonly IUserLogic _userLogic;
		private readonly IDataLayerEngine _dataLayerEngine;
		private readonly IUserRolesLogic _userRolesLogic;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public BusinessLogic(
			IDataLayerEngine dataLayerEngine,
			IUserLogic userLogic,
			IUserRolesLogic userRolesLogic,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_dataLayerEngine = dataLayerEngine;
			_userLogic = userLogic;
			_userRolesLogic = userRolesLogic;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public void Init() {
			try {
				_dataLayerEngine.Init();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
			}
			FillCache();
		}

		public void ClreaAllCache() {
			LanguageUtils.IgnoreErrors(() => _userLogic.ClearUsersCache());
			LanguageUtils.IgnoreErrors(() => _userRolesLogic.ClearUserRolesCache());
		}

		public void FillCache() {
			LanguageUtils.IgnoreErrors(() => _userLogic.GetAllUsersAsync());
			LanguageUtils.IgnoreErrors(() => _userRolesLogic.GetUserRolesAsync());
		}
	}
}
