using Common.Interfaces.Entities;

namespace Common.Models {

	public class GpsCoordinatesEntity : IGpsCoordinates {

		public int GpsCoordinatesId { get; set; }
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public bool? IsActive { get; set; }
	}
}
