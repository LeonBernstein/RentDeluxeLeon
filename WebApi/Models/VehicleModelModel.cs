using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class VehicleModelModel {

		public int VehicleModelId { get; set; }
		[Required]
		[MaxLength(32)]
		public string Name { get; set; }
		[Required]
		public int ManufacturerId { get; set; }
		[Required]
		public int VehicleTypeId { get; set; }
	}
}
