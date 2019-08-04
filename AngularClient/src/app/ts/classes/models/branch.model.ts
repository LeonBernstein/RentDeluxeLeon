import { BranchI, AddressI } from '../../interfaces/model.interfaces';

export class Branch implements BranchI {
	public branchId: number
	public name: string
	public addressId: number
	public isActive: boolean
	
	constructor(
		public address: AddressI
	) { }
}
