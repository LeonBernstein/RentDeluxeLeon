import { VehicleTypeI } from '../../interfaces/model.interfaces';

export class VehicleType implements VehicleTypeI {
	public vehicleTypeId: number
	public name: string
	public isActive: boolean
}
