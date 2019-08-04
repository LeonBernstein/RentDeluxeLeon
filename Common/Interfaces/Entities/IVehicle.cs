using Common.Models;
using System;

namespace Common.Interfaces.Entities {

	public interface IVehicle {

		int VehicleId { get; set; }
		string VehicleNumber { get; set; }
		DateTime ManufactureDate { get; set; }
		int Mileage { get; set; }
		bool IsProper { get; set; }
		bool IsAvailable { get; set; }
		int? AtBranchId { get; set; }
		int CarClassId { get; set; }
		int GearTypeId { get; set; }
		int ModelId { get; set; }
		string PicturePath { get; set; }
		bool? IsActive { get; set; }
		BranchEntity AtBranch { get; set; }
		CarClassEntity CarClass { get; set; }
		GearTypeEntity GearType { get; set; }
		VehicleModelEntity Model { get; set; }
	}
}
