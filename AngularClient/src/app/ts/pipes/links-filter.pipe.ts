import { Pipe, PipeTransform } from '@angular/core';
import { RouterLinkI } from '../interfaces/data-storage.interfaces';
import { RouterOutletTypes } from '../enums/router-outlet-types.enum';
import { UserRoleTypes } from '../enums/user-role-types.enum';

@Pipe({
	name: 'linksFilter'
})
export class LinksFilterPipe implements PipeTransform {

	transform(
		value: RouterLinkI[],
		userType: UserRoleTypes = UserRoleTypes.nonUser,
		routerOutletTypes: RouterOutletTypes | RouterOutletTypes[] = RouterOutletTypes.main,
	): RouterLinkI[] {
		if (!Array.isArray(routerOutletTypes)) {
			let temp = routerOutletTypes
			routerOutletTypes = new Array<RouterOutletTypes>()
			routerOutletTypes.push(temp)
		}
		return value.filter(link =>
			(Array.isArray(link.userType) &&
			link.userType.includes(userType) ||
			link.userType === userType) &&
			(Array.isArray(link.routerOutletType) &&
			link.routerOutletType.some(r => (<RouterOutletTypes[]>routerOutletTypes).includes(r)) ||
			(<RouterOutletTypes[]>routerOutletTypes).includes(<RouterOutletTypes>link.routerOutletType))
		)
	}

}
