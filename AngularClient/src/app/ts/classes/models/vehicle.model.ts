import { VehicleI, BranchI, CarClassI, GearTypeI, VehicleModelI } from '../../interfaces/model.interfaces';

export class Vehicle implements VehicleI {
	public vehicleId: number
	public vehicleNumber: string
	public manufactureDate: Date
	public mileage: number
	public isProper: boolean
	public isAvailable: boolean
	public atBranchId: number
	public carClassId: number
	public gearTypeId: number
	public modelId: number
	public picturePath: string
	public isActive: boolean
	constructor(
		public atBranch: BranchI,
		public carClass: CarClassI,
		public gearType: GearTypeI,
		public model: VehicleModelI,
	) { }
}
