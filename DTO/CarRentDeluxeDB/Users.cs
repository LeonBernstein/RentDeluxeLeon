using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class Users {
		public Users() {
			Orders = new HashSet<Orders>();
		}

		public int UserId { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public int UserRoleId { get; set; }
		public int? PersonId { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual Persons Person { get; set; }
		public virtual UserRoles UserRole { get; set; }
		public virtual ICollection<Orders> Orders { get; set; }
	}
}
