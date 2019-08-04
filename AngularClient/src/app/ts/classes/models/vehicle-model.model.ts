import { VehicleModelI, VehicleManufacturerI, VehicleTypeI } from '../../interfaces/model.interfaces';

export class VehicleModel implements VehicleModelI {
	public vehicleModelId: number
	public name: string
	public manufacturerId: number
	public vehicleTypeId: number
	public isActive: boolean
	constructor(
		public manufacturer: VehicleManufacturerI,
		public vehicleType: VehicleTypeI,
	) { }
}
