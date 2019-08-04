import { RouterLinkI, RouterLinkStoreI } from '../../../interfaces/data-storage.interfaces';
import { RouterOutletTypes } from '../../../enums/router-outlet-types.enum';
import { UserRoleTypes } from '../../../enums/user-role-types.enum';


export class RouterLinksStore implements RouterLinkStoreI {
	
	public get routerLinks(): RouterLinkI[] {
		return this._routerLinks
	}
	private _routerLinks: RouterLinkI[] = [
		{
			path: 'home',
			label: 'דף הבית',
			routerOutletType: RouterOutletTypes.main,
			userType: [
				UserRoleTypes.nonUser,
				UserRoleTypes.user,
				UserRoleTypes.employee,
				UserRoleTypes.manager,
			],
		},
		{
			path: 'carsList',
			label: 'מבחר רכבים',
			routerOutletType: RouterOutletTypes.main,
			userType: [UserRoleTypes.nonUser,  UserRoleTypes.user],
		},
		{
			path: 'userOrders',
			label: 'ההזמנות שלי',
			routerOutletType: RouterOutletTypes.main,
			userType: UserRoleTypes.user,
		},
		{
			path: 'employees/carReturn',
			label: 'החזרת רכב',
			routerOutletType: RouterOutletTypes.main,
			userType: [UserRoleTypes.employee, UserRoleTypes.manager],
		},
		{
			path: 'employees/ordersList',
			label: 'רשימת הזמנות',
			routerOutletType: RouterOutletTypes.main,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'employees/carsManagement',
			label: 'ניהול רכבים',
			routerOutletType: RouterOutletTypes.main,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'employees/usersManagement',
			label: 'ניהול משתמשים',
			routerOutletType: RouterOutletTypes.main,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'carsIndex',
			label: 'אינדקס רכבים',
			routerOutletType: RouterOutletTypes.carsManagement,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'carManufacturers',
			label: 'יצרני רכב',
			routerOutletType: RouterOutletTypes.carsManagement,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'carModels',
			label: 'דגמי רכב',
			routerOutletType: RouterOutletTypes.carsManagement,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'carTypes',
			label: 'סוגי רכבים',
			routerOutletType: RouterOutletTypes.carsManagement,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'carClasses',
			label: 'דרגות רכבים',
			routerOutletType: RouterOutletTypes.carsManagement,
			userType: UserRoleTypes.manager,
		},
		{
			path: 'gearTypes',
			label: 'סוגי הילוכים',
			routerOutletType: RouterOutletTypes.carsManagement,
			userType: UserRoleTypes.manager,
		},
	]
	
	constructor() { }
}