
namespace Common.Interfaces.Entities {

	public interface IVehicleManufacturer {

		int VehicleManufacturerId { get; set; }
		string Name { get; set; }
		bool? IsActive { get; set; }
	}
}
