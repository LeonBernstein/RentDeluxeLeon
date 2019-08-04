using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class Addresses {
		public Addresses() {
			Branches = new HashSet<Branches>();
		}

		public int AddressId { get; set; }
		public string State { get; set; }
		public string City { get; set; }
		public string Street { get; set; }
		public int? HomeNumber { get; set; }
		public int? ApartmentNumber { get; set; }
		public string Entrance { get; set; }
		public int? ZipCode { get; set; }
		public int GpsCoordinatesId { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual GpsCoordinates GpsCoordinates { get; set; }
		public virtual ICollection<Branches> Branches { get; set; }
	}
}
