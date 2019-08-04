import { LoginDataI } from '../../interfaces/data-structure.interfaces';


export class LoginUserData implements LoginDataI{
	
	public email: string
	public password: string
	public stayLoggedIn: boolean
	
	
	constructor() {}
	
	
	public assignAllData(data: object): LoginDataI {
		return Object.assign(this, data)
	}
}