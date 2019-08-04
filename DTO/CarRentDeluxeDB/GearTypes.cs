using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class GearTypes {
		public GearTypes() {
			Vehicles = new HashSet<Vehicles>();
		}

		public int GearTypeId { get; set; }
		public string Name { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual ICollection<Vehicles> Vehicles { get; set; }
	}
}
