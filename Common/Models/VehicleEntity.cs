
using Common.Interfaces.Entities;
using System;

namespace Common.Models {

	public class VehicleEntity : IVehicle {

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
		public BranchEntity AtBranch { get; set; }
		public CarClassEntity CarClass { get; set; }
		public GearTypeEntity GearType { get; set; }
		public VehicleModelEntity Model { get; set; }
	}
}
