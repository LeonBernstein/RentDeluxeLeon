import { SignUpDataI } from '../../interfaces/data-structure.interfaces';
import { LoginUserData } from './login.structure';


export class SignUpUserData extends LoginUserData implements SignUpDataI {
	
	public rePassword: string
	
	constructor() { super() }
	
	
	public assignAllData(data: Object): SignUpDataI {
		return Object.assign(this, data)
	}
}
