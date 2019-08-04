import { GpsCoordinatesI } from '../../interfaces/model.interfaces';

export class GpsCoordinates implements GpsCoordinatesI {
	public gpsCoordinatesId: number
	public latitude: number
	public longitude: number
	public isActive: boolean
}
