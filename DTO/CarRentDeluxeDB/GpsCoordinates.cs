using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class GpsCoordinates {
		public GpsCoordinates() {
			Addresses = new HashSet<Addresses>();
		}

		public int GpsCoordinatesId { get; set; }
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual ICollection<Addresses> Addresses { get; set; }
	}
}
