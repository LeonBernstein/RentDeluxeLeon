
namespace Common.Interfaces.Entities {

	public interface IGpsCoordinates {

		int GpsCoordinatesId { get; set; }
		decimal Latitude { get; set; }
		decimal Longitude { get; set; }
		bool? IsActive { get; set; }
	}
}
