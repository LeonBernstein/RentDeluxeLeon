using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using System;

namespace BL.Logic {
	public class PersonLogic : IPersonLogic {

		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;
		private readonly IFileSystemEngine _fileSystemEngine;
		private readonly IUserLogic _userLogic;
		private readonly IPersonEngine _personEngine;

		public PersonLogic(
			IExceptionHandlerLogic exceptionHandlerLogic,
			IFileSystemEngine fileSystemEngine,
			IUserLogic userLogic,
			IPersonEngine personEngine
		) {
			_exceptionHandlerLogic = exceptionHandlerLogic;
			_fileSystemEngine = fileSystemEngine;
			_userLogic = userLogic;
			_personEngine = personEngine;
		}

		public string SavePersonsAvatar(string fileName, byte[] file, int userId) {
			try {
				if (string.IsNullOrEmpty(fileName) ||
					file.Length == 0 ||
					!_userLogic.IsUserExist(userId)
				) {
					return "";
				}
				int personsId = _userLogic.GetPersonsId(userId);
				if (personsId == 0) return "";

				string filePath = _fileSystemEngine.ImageWriter(fileName, file, @"StaticFiles\Bucket\Images\Avatars\");
				filePath = filePath.StartsWith(@"\Bucket") ? filePath : filePath.Substring(filePath.IndexOf(@"\Bucket"));
				filePath = filePath.Replace(@"\", "/");

				_personEngine.UpdatePersonsImagePath(personsId, filePath);
				_personEngine.UpdatePersonsImagePathInCache(personsId, filePath);

				return filePath;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
