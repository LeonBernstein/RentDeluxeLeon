using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class NewOrderModel {

		[Required]
		public DateTime StartDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		[Required]
		public int VehicleId { get; set; }
	}
}
