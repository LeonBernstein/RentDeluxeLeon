using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.BL {

	public interface IVehicleTypeLogic {

		List<VehicleTypeEntity> GetAllVehicleTypes();
		VehicleTypeEntity GetVehicleTypeById(int id);
		VehicleTypeEntity AddVehicleType(VehicleTypeEntity vehicleType);
		VehicleTypeEntity UpdateVehicleType(VehicleTypeEntity vehicleType);
		VehicleTypeEntity DeleteVehicleType(int id);
		VehicleTypeEntity RestoreVehicleType(int id);
	}
}
