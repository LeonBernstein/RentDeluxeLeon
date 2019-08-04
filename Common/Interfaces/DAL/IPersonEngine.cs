
namespace Common.Interfaces.DAL {

	public interface IPersonEngine {

		void UpdatePersonsImagePath(int personId, string path);
		void UpdatePersonsImagePathInCache(int personId, string path);
	}
}
