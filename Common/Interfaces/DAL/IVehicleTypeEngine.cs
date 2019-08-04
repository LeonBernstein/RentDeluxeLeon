using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IVehicleTypeEngine {

		List<VehicleTypeEntity> GetAllVehicleTypes();
		VehicleTypeEntity GetVehicleTypeById(int id);
		VehicleTypeEntity AddVehicleType(VehicleTypeEntity vehicleType);
		VehicleTypeEntity UpdateVehicleType(VehicleTypeEntity vehicleType);
		VehicleTypeEntity DeleteVehicleType(int id);
		VehicleTypeEntity RestoreVehicleType(int id);
	}
}
