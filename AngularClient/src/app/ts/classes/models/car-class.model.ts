import { CarClassI } from '../../interfaces/model.interfaces';

export class CarClass implements CarClassI {
	public carClassId: number
	public name: string
	public dailyPrice: number
	public delayDailyPrice: number
	public isActive: boolean
}
