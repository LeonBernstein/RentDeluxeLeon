using Common.Interfaces.Entities;

namespace Common.Models {

	public class VehicleModelEntity : IVehicleModel {

		public int VehicleModelId { get; set; }
		public string Name { get; set; }
		public int ManufacturerId { get; set; }
		public int VehicleTypeId { get; set; }
		public bool? IsActive { get; set; }

		public VehicleManufacturerEntity Manufacturer { get; set; }
		public VehicleTypeEntity VehicleType { get; set; }
	}
}
