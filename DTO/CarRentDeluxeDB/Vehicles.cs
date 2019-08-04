using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class Vehicles {
		public Vehicles() {
			Orders = new HashSet<Orders>();
		}

		public int VehicleId { get; set; }
		public string VehicleNumber { get; set; }
		public DateTime ManufactureDate { get; set; }
		public int Mileage { get; set; }
		public bool IsProper { get; set; }
		public bool IsAvailable { get; set; }
		public int? AtBranchId { get; set; }
		public int CarClassId { get; set; }
		public int GearTypeId { get; set; }
		public int ModelId { get; set; }
		public string PicturePath { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }
		public virtual Branches AtBranch { get; set; }
		public virtual CarClasses CarClass { get; set; }
		public virtual GearTypes GearType { get; set; }
		public virtual VehicleModels Model { get; set; }
		public virtual ICollection<Orders> Orders { get; set; }
	}
}
