using System;
using System.Collections.Generic;

namespace DTO.CarRentDeluxeDB {
	public partial class Persons {
		public Persons() {
			Users = new HashSet<Users>();
		}

		public int PersonId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Gender { get; set; }
		public DateTime? Birthday { get; set; }
		public string IdCardNum { get; set; }
		public string Email { get; set; }
		public string PicturePath { get; set; }
		public bool? IsActive { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime ModifiedDate { get; set; }
		public Guid RowGuid { get; set; }

		public virtual ICollection<Users> Users { get; set; }
	}
}
