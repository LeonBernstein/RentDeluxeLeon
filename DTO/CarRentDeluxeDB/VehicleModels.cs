using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class VehicleModels {
		public VehicleModels() {
			Vehicles = new HashSet<Vehicles>();
		}

		public int VehicleModelId { get; set; }
		public string Name { get; set; }
		public int ManufacturerId { get; set; }
		public int VehicleTypeId { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual VehicleManufacturers Manufacturer { get; set; }
		public virtual VehicleTypes VehicleType { get; set; }
		public virtual ICollection<Vehicles> Vehicles { get; set; }
	}
}
