using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IVehicleManufacturerEngine {

		List<VehicleManufacturerEntity> GetAllVehicleManufacturers();
		VehicleManufacturerEntity GetVehicleManufacturerById(int id);
		VehicleManufacturerEntity AddVehicleManufacturer(VehicleManufacturerEntity vehicleManufacturer);
		VehicleManufacturerEntity UpdateVehicleManufacturer(VehicleManufacturerEntity vehicleManufacturer);
		VehicleManufacturerEntity DeleteVehicleManufacturer(int id);
		VehicleManufacturerEntity RestoreVehicleManufacturer(int id);
	}
}
