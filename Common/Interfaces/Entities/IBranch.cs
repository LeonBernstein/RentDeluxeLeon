
using Common.Models;

namespace Common.Interfaces.Entities {

	public interface IBranch {

		int BranchId { get; set; }
		string Name { get; set; }
		int AddressId { get; set; }
		bool? IsActive { get; set; }

		AddressEntity Address { get; set; }
	}
}
