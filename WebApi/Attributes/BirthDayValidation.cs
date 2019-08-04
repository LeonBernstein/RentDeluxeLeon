using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Attributes {
	public class BirthDayValidation : ValidationAttribute {

		private readonly DateTime _minDate;
		private readonly string _format;

		public BirthDayValidation() {
			_minDate = new DateTime(1899, 12, 31, 0, 0, 0, DateTimeKind.Utc);
			_format = "dd/MM/yyyy HH:mm:ss";
		}

		public override bool IsValid(object value) {
			if (value == null) {
				return true;
			}
			DateTime birthDay = (DateTime)value;
			DateTime maxDate = DateTime.UtcNow;
			return birthDay >= _minDate &&
						 birthDay <= maxDate;
		}

		public override string FormatErrorMessage(string name) {
			DateTime maxDate = DateTime.UtcNow;
			return $"The field {name} must be between {_minDate.ToString(_format)} and {maxDate.ToString(_format)}.";
		}
	}
}
