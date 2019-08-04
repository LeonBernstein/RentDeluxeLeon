
using Common.Models;

namespace Common.Interfaces.Entities {

	public interface IVehicleModel {

		int VehicleModelId { get; set; }
		string Name { get; set; }
		int ManufacturerId { get; set; }
		int VehicleTypeId { get; set; }
		bool? IsActive { get; set; }

		VehicleManufacturerEntity Manufacturer { get; set; }
		VehicleTypeEntity VehicleType { get; set; }
	}
}
