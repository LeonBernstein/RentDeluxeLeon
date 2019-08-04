using System;
using System.ComponentModel.DataAnnotations;
using WebApi.Attributes;

namespace WebApi.Models {

	public class NewPersonModel {

		[Required]
		[MaxLength(64)]
		public string FirstName { get; set; }

		[Required]
		[MaxLength(64)]
		public string LastName { get; set; }

		[Required]
		[RegularExpression(@"[mfo]{1}")]
		public char Gender { get; set; }

		[BirthDayValidation]
		public DateTime? Birthday { get; set; }

		[Required]
		[RegularExpression(@"[0-9]{8,9}")]
		public string IdCardNum { get; set; }
	}
}
