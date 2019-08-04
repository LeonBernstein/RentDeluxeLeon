import { VehicleManufacturerI } from '../../interfaces/model.interfaces';

export class VehicleManufacturer implements VehicleManufacturerI {
	public vehicleManufacturerId: number
	public name: string
	public isActive: boolean
}
