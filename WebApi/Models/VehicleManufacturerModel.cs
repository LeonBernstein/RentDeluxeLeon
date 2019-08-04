using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class VehicleManufacturerModel {

		public int VehicleManufacturerId { get; set; }
		[MaxLength(32)]
		public string Name { get; set; }
	}
}
