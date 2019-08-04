
using Common.Models;

namespace Common.Interfaces.Entities {

	public interface IAddress {

		int AddressId { get; set; }
		string State { get; set; }
		string City { get; set; }
		string Street { get; set; }
		int? HomeNumber { get; set; }
		int? ApartmentNumber { get; set; }
		string Entrance { get; set; }
		int? ZipCode { get; set; }
		int GpsCoordinatesId { get; set; }
		bool? IsActive { get; set; }

		GpsCoordinatesEntity GpsCoordinates { get; set; }
	}
}
