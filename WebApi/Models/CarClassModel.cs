
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class CarClassModel {

		public int CarClassId { get; set; }
		[Required]
		[MaxLength(32)]
		public string Name { get; set; }
		[Required]
		public int DailyPrice { get; set; }
		[Required]
		public int DelayDailyPrice { get; set; }
	}
}
