using System;
using System.Threading.Tasks;

namespace Common.Interfaces.BL {

	public interface IExceptionHandlerLogic {

		void LogException(Exception ex, string customError = "");
		void LogException(string customError);
		Task LogExceptionAsync(Exception ex, string customError = "");
		Task LogExceptionAsync(string customError);
	}
}
