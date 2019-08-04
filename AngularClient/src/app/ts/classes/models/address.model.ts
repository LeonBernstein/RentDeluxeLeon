import { AddressI, GpsCoordinatesI } from '../../interfaces/model.interfaces';

export class Address implements AddressI {
	public addressId: number
	public state: string
	public city: string
	public street: number
	public homeNumber: number
	public apartmentNumber: number
	public entrance: string
	public zipCode: number
	public gpsCoordinatesId: number
	public isActive: boolean
	
	constructor(
		public gpsCoordinates: GpsCoordinatesI
	) { }
}
