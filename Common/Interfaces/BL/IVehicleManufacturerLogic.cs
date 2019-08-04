using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.BL {

	public interface IVehicleManufacturerLogic {

		List<VehicleManufacturerEntity> GetAllVehicleManufacturers();
		VehicleManufacturerEntity GetVehicleManufacturerById(int id);
		VehicleManufacturerEntity AddVehicleManufacturer(VehicleManufacturerEntity vehicleManufacturer);
		VehicleManufacturerEntity UpdateVehicleManufacturer(VehicleManufacturerEntity vehicleManufacturer);
		VehicleManufacturerEntity DeleteVehicleManufacturer(int id);
		VehicleManufacturerEntity RestoreVehicleManufacturer(int id);
	}
}
