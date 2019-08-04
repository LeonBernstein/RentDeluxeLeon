using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models {

	public class OrderModel {

		[Required]
		public int OrderId { get; set; }
		[Required]
		public DateTime StartDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		public DateTime? ActualEndDate { get; set; }
		[Required]
		public decimal Price { get; set; }
		public decimal? TotalPrice { get; set; }
		[Required]
		public int UserId { get; set; }
		[Required]
		public int VehicleId { get; set; }
	}
}
