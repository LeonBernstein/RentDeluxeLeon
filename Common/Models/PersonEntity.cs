﻿using Common.Interfaces.Entities;
using System;

namespace Common.Models {

	public class PersonEntity : IPerson {

		public int PersonId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public char Gender { get; set; }
		public DateTime? Birthday { get; set; }
		public string IdCardNum { get; set; }
		public string Email { get; set; }
		public string PicturePath { get; set; }
		public bool IsActive { get; set; }
	}
}
