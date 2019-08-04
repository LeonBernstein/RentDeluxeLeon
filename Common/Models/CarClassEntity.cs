using Common.Interfaces.Entities;

namespace Common.Models {

	public class CarClassEntity : ICarClass {

		public int CarClassId { get; set; }
		public string Name { get; set; }
		public int DailyPrice { get; set; }
		public int DelayDailyPrice { get; set; }
		public bool? IsActive { get; set; }
	}
}
