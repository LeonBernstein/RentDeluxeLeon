
using Common.Interfaces.Entities;

namespace Common.Models {

	public class VehicleTypeEntity : IVehicleType {

		public int VehicleTypeId { get; set; }
		public string Name { get; set; }
		public bool? IsActive { get; set; }
	}
}
