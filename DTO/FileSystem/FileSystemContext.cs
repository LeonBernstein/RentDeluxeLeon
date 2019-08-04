using System;

namespace DTO.FileSystem {
	public class FileSystemContext : IDisposable {

		public string AppFolderName { get => @"\RentDeluxe_Leon"; }

		public string AppsRootFolder { get => AppDomain.CurrentDomain.BaseDirectory; }

		public string UserFolder { get => Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments); }

		public void Dispose() { }
	}
}
