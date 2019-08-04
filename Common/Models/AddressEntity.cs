using Common.Interfaces.Entities;

namespace Common.Models {

	public class AddressEntity : IAddress {

		public int AddressId { get; set; }
		public string State { get; set; }
		public string City { get; set; }
		public string Street { get; set; }
		public int? HomeNumber { get; set; }
		public int? ApartmentNumber { get; set; }
		public string Entrance { get; set; }
		public int? ZipCode { get; set; }
		public int GpsCoordinatesId { get; set; }
		public bool? IsActive { get; set; }

		public GpsCoordinatesEntity GpsCoordinates { get; set; }
	}
}
