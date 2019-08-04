using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class VehicleTypeModel {

		public int VehicleTypeId { get; set; }
		[Required]
		[MaxLength(32)]
		public string Name { get; set; }
	}
}
