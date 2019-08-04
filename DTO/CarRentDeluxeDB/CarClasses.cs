using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class CarClasses {
		public CarClasses() {
			Vehicles = new HashSet<Vehicles>();
		}

		public int CarClassId { get; set; }
		public string Name { get; set; }
		public int DailyPrice { get; set; }
		public int DelayDailyPrice { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual ICollection<Vehicles> Vehicles { get; set; }
	}
}
