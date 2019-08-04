using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class GearTypeModel {

		public int GearTypeId { get; set; }
		[Required]
		[MaxLength(32)]
		public string Name { get; set; }
	}
}
