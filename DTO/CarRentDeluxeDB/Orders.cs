using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class Orders {
		public int OrderId { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public DateTime? ActualEndDate { get; set; }
		public decimal Price { get; set; }
		public decimal? TotalPrice { get; set; }
		public int UserId { get; set; }
		public int VehicleId { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual Users User { get; set; }
		public virtual Vehicles Vehicle { get; set; }
	}
}
