using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class Branches {
		public Branches() {
			Vehicles = new HashSet<Vehicles>();
		}

		public int BranchId { get; set; }
		public string Name { get; set; }
		public int AddressId { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual Addresses Address { get; set; }
		public virtual ICollection<Vehicles> Vehicles { get; set; }
	}
}
