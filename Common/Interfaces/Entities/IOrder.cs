using Common.Models;
using System;

namespace Common.Interfaces.Entities {

	public interface IOrder {

		int OrderId { get; set; }
		DateTime StartDate { get; set; }
		DateTime EndDate { get; set; }
		DateTime? ActualEndDate { get; set; }
		decimal Price { get; set; }
		decimal? TotalPrice { get; set; }
		int UserId { get; set; }
		int VehicleId { get; set; }
		bool? IsActive { get; set; }

		UserEntity User { get; set; }
		VehicleEntity Vehicle { get; set; }
	}
}
