using Common.Interfaces.Entities;
using System;

namespace Common.Models {

	public class OrderEntity : IOrder {

		public int OrderId { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public DateTime? ActualEndDate { get; set; }
		public decimal Price { get; set; }
		public decimal? TotalPrice { get; set; }
		public int UserId { get; set; }
		public int VehicleId { get; set; }
		public bool? IsActive { get; set; }

		public UserEntity User { get; set; }
		public VehicleEntity Vehicle { get; set; }
	}
}
