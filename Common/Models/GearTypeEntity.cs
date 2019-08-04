using Common.Interfaces.Entities;

namespace Common.Models {

	public class GearTypeEntity : IGearType {

		public int GearTypeId { get; set; }
		public string Name { get; set; }
		public bool? IsActive { get; set; }
	}
}
