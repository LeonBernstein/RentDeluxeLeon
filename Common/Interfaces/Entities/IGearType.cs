
namespace Common.Interfaces.Entities {

	public interface IGearType {

		int GearTypeId { get; set; }
		string Name { get; set; }
		bool? IsActive { get; set; }
	}
}
