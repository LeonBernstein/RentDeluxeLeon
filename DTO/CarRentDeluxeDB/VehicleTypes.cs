using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class VehicleTypes {
		public VehicleTypes() {
			VehicleModels = new HashSet<VehicleModels>();
		}

		public int VehicleTypeId { get; set; }
		public string Name { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual ICollection<VehicleModels> VehicleModels { get; set; }
	}
}
