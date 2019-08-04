using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IVehicleEngine {

		List<VehicleEntity> GetAllVehicles();
		List<VehicleEntity> GetAllRentableVehicles();
		VehicleEntity GetVehicleById(int id);
		VehicleEntity AddVehicle(VehicleEntity vehicle);
		VehicleEntity UpdateVehicle(VehicleEntity vehicle);
		VehicleEntity SetAsAvailable(int id);
		VehicleEntity SetAsUnAvailable(int id);
		VehicleEntity DeleteVehicle(int id);
		VehicleEntity RestoreVehicle(int id);
		void UpdateVehiclesPicturePath(int id, string path);
	}
}
