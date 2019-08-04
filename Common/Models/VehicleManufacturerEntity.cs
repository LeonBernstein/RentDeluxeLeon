
using Common.Interfaces.Entities;

namespace Common.Models {

	public class VehicleManufacturerEntity : IVehicleManufacturer {

		public int VehicleManufacturerId { get; set; }
		public string Name { get; set; }
		public bool? IsActive { get; set; }
	}
}
