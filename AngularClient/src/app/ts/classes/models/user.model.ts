import { UserI, UserRoleI, PersonI } from '../../interfaces/model.interfaces';
import { UserRoleTypes } from '../../enums/user-role-types.enum';

export class User implements UserI {
	public userId: number
	public userName: string
	public isActive: boolean
	public password: string
	public userRoleId: UserRoleTypes
	
	constructor(
		public userRole: UserRoleI,
		public person: PersonI,
	) { }
	
	public assignAllData(data: Object): UserI {
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