import { OrderI, UserI, VehicleI } from '../../interfaces/model.interfaces';

export class Order implements OrderI {
	public orderId: number
	public startDate: Date
	public endDate: Date
	public actualEndDate: Date
	public price: number
	public totalPrice: number
	public userId: number
	public vehicleId: number
	public isActive: boolean
	constructor(
		public user: UserI,
		public vehicle: VehicleI,
	) { }
}
