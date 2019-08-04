using DTO.CarRentDeluxeDB;
using DTO.Cache;
using DTO.FileSystem;

namespace DTO {

	public static class DataAccess {

		static public CarRentDeluxeDBContext GetDBContext { get => new CarRentDeluxeDBContext(); }

		static public CacheDBContext GetCacheDBContext { get => new CacheDBContext(); }

		static public FileSystemContext GetFileSystemContext { get => new FileSystemContext(); }
	}
}
