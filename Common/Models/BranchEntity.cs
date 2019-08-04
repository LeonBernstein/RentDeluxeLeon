using Common.Interfaces.Entities;

namespace Common.Models {

	public class BranchEntity : IBranch {

		public int BranchId { get; set; }
		public string Name { get; set; }
		public int AddressId { get; set; }
		public bool? IsActive { get; set; }

		public AddressEntity Address { get; set; }
	}
}
