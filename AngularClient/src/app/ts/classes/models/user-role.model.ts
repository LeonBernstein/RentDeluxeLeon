import { UserRoleI } from '../../interfaces/model.interfaces';
import { UserRoleTypes } from '../../enums/user-role-types.enum';

export class UserRole implements UserRoleI {
	public userRoleId: number
	public systemName: string
	public name: string
	public isActive: boolean
	public get roleType(): UserRoleTypes {
		switch (this.systemName) {
			case 'nonUser':
				return UserRoleTypes.nonUser
			case 'user':
				return UserRoleTypes.user
			case 'employee':
				return UserRoleTypes.employee
			case 'manager':
				return UserRoleTypes.manager
			default:
				return UserRoleTypes.nonUser
		}
	}
	
	constructor() { }
}