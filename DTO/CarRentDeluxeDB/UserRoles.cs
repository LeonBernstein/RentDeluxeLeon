using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class UserRoles {
		public UserRoles() {
			Users = new HashSet<Users>();
		}

		public int UserRoleId { get; set; }
		public string SystemName { get; set; }
		public string Name { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual ICollection<Users> Users { get; set; }
	}
}
