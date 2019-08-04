import { PersonDataI } from '../../interfaces/data-structure.interfaces';

export class PersonData implements PersonDataI {
	firstName: string
	lastName: string
	gender: string
	birthday: Date
	idCardNum: string
	
	constructor() { }
	
	public assignAllData(data: object): PersonDataI {
		return Object.assign(this, data)
	}
}