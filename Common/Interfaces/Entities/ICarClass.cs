
namespace Common.Interfaces.Entities {

	public interface ICarClass {

		int CarClassId { get; set; }
		string Name { get; set; }
		int DailyPrice { get; set; }
		int DelayDailyPrice { get; set; }
		bool? IsActive { get; set; }
	}
}
