using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Logic {

	public class VehicleLogic : IVehicleLogic {

		private readonly IVehicleEngine _vehicleEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;
		private readonly IFileSystemEngine _fileSystemEngine;

		public VehicleLogic(
			IVehicleEngine vehicleEngine,
			IExceptionHandlerLogic exceptionHandlerLogic,
			IFileSystemEngine fileSystemEngine
		) {
			_vehicleEngine = vehicleEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
			_fileSystemEngine = fileSystemEngine;
		}

		public List<VehicleEntity> GetAllVehicles() {
			try {
				return _vehicleEngine.GetAllVehicles();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public List<VehicleEntity> GetAllRentableVehicles() {
			try {
				return _vehicleEngine.GetAllRentableVehicles();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleEntity GetVehicleById(int id) {
			try {
				return _vehicleEngine.GetVehicleById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleEntity AddVehicle(VehicleEntity Vehicle) {
			try {
				return _vehicleEngine.AddVehicle(Vehicle);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleEntity UpdateVehicle(VehicleEntity Vehicle) {
			try {
				return _vehicleEngine.UpdateVehicle(Vehicle);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleEntity SetAsAvailable(int id) {
			try {
				return _vehicleEngine.SetAsAvailable(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleEntity SetAsUnAvailable(int id) {
			try {
				return _vehicleEngine.SetAsUnAvailable(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public Task SetAsAvailableAsync(int id) {
			return Task.Run(() => SetAsAvailable(id));
		}

		public Task SetAsUnAvailableAsync(int id) {
			return Task.Run(() => SetAsUnAvailable(id));
		}

		public VehicleEntity DeleteVehicle(int id) {
			try {
				return _vehicleEngine.DeleteVehicle(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleEntity RestoreVehicle(int id) {
			try {
				return _vehicleEngine.RestoreVehicle(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public string SaveVehiclesPicturePath(string fileName, byte[] file, int vehicleId) {
			try {
				if (string.IsNullOrEmpty(fileName) ||
					file.Length == 0
				) {
					return "";
				}

				string filePath = _fileSystemEngine.ImageWriter(fileName, file, @"StaticFiles\Bucket\Images\Vehicles\");
				filePath = filePath.StartsWith(@"\Bucket") ? filePath : filePath.Substring(filePath.IndexOf(@"\Bucket"));
				filePath = filePath.Replace(@"\", "/");

				_vehicleEngine.UpdateVehiclesPicturePath(vehicleId, filePath);

				return filePath;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
