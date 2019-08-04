using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class VehicleModel {

		public int VehicleId { get; set; }
		[Required]
		[MaxLength(16)]
		public string VehicleNumber { get; set; }
		[Required]
		public DateTime ManufactureDate { get; set; }
		[Required]
		public int Mileage { get; set; }
		[Required]
		public bool IsProper { get; set; }
		[Required]
		public bool IsAvailable { get; set; }
		public int? AtBranchId { get; set; }
		[Required]
		public int CarClassId { get; set; }
		[Required]
		public int GearTypeId { get; set; }
		[Required]
		public int ModelId { get; set; }
	}
}
