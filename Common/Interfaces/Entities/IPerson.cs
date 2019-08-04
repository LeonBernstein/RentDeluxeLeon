using System;

namespace Common.Interfaces.Entities {

	public interface IPerson {

		int PersonId { get; set; }
		string FirstName { get; set; }
		string LastName { get; set; }
		char Gender { get; set; }
		DateTime? Birthday { get; set; }
		string IdCardNum { get; set; }
		string Email { get; set; }
		string PicturePath { get; set; }
		bool IsActive { get; set; }
	}
}
