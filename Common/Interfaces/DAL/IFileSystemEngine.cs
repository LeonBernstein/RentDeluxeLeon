
namespace Common.Interfaces.DAL {

	public interface IFileSystemEngine {

		void DataLogger(string fileName, string[] data, string subFolder = "");
		string ImageWriter(string fileName, byte[] file, string relativeFolder);
	}
}
