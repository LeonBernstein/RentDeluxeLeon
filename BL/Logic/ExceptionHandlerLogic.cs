using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Logic {

	public class ExceptionHandlerLogic : IExceptionHandlerLogic {

		private readonly IFileSystemEngine _fileSystemEngine;

		public ExceptionHandlerLogic(IFileSystemEngine fileSystemEngine) {
			_fileSystemEngine = fileSystemEngine;
		}


		public void LogException(string customError) {
			try {
				List<string> data = new List<string> { DateTimeHelper(out string fileName) };
				AddCustomMessage(data, customError);
				_fileSystemEngine.DataLogger(fileName, data.ToArray());
			} catch { }
		}


		public void LogException(Exception ex, string customError = "") {
			try {
				List<string> data = new List<string> { DateTimeHelper(out string fileName) };
				AddCustomMessage(data, customError);
				data = data.Concat(ExceptionHelper(ex)).ToList();
				_fileSystemEngine.DataLogger(fileName, data.ToArray());
			} catch { }
		}


		public Task LogExceptionAsync(string customError) {
			return Task.Run(() => {
				LogException(customError);
			});
		}

		public Task LogExceptionAsync(Exception ex, string customError = "") {
			return Task.Run(() => {
				LogException(ex, customError);
			});
		}


		private string DateTimeHelper(out string fileName) {
			var now = DateTime.Now;
			fileName = now.ToString("yyyyMMdd_HHmmss");
			return "Exception time: " + now.ToString("yyyy/MM/dd HH:mm:ss.ffff");
		}


		private void AddCustomMessage(List<string> data, string customError) {
			if (!string.IsNullOrWhiteSpace(customError)) data.Add("Custom error message: " + customError);
		}


		private List<string> ExceptionHelper(Exception ex) {
			var data = new List<string> {
				ex.GetType().FullName,
				"Message: " + ex.Message,
				"StackTrace" + ex.StackTrace,
			};
			if (ex.InnerException != null) {
				data.Add("Inner Exception:");
				data = data.Concat(ExceptionHelper(ex.InnerException)).ToList();
			}
			return data;
		}
	}
}
