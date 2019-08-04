using Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Interfaces.BL {

	public interface IVehicleLogic {

		List<VehicleEntity> GetAllVehicles();
		List<VehicleEntity> GetAllRentableVehicles();
		VehicleEntity GetVehicleById(int id);
		VehicleEntity AddVehicle(VehicleEntity vehicle);
		VehicleEntity UpdateVehicle(VehicleEntity vehicle);
		VehicleEntity SetAsAvailable(int id);
		VehicleEntity SetAsUnAvailable(int id);
		Task SetAsAvailableAsync(int id);
		Task SetAsUnAvailableAsync(int id);
		VehicleEntity DeleteVehicle(int id);
		VehicleEntity RestoreVehicle(int id);
		string SaveVehiclesPicturePath(string fileName, byte[] file, int vehicleId);
	}
}
