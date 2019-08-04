import { PersonI } from '../../interfaces/model.interfaces';

export class Person implements PersonI {
	public personId: number
	public firstName: string
	public lastName: string
	public gender: string
	public birthday: Date
	public idCardNum: string
	public email: string
	public picturePath: string
	public isActive: boolean
	
	constructor() { }
	
	public assignAllData(data: Object): PersonI {
		try {
			return Object.assign(this, data)
		} catch (e) {
			console.error("Can't assign data at: ", this)
			console.error("Data: ", data)
			console.error(e)
			return null
		}
	}
}
