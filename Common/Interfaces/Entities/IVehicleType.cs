
namespace Common.Interfaces.Entities {

	public interface IVehicleType {

		int VehicleTypeId { get; set; }
		string Name { get; set; }
		bool? IsActive { get; set; }
	}
}
