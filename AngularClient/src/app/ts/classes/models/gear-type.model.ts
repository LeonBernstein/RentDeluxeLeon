import { GearTypeI } from '../../interfaces/model.interfaces';

export class GearType implements GearTypeI {
	public gearTypeId: number
	public name: string
	public isActive: boolean
}
