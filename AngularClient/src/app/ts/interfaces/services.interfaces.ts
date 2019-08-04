import { ErrorTypes } from '../enums/error-types.enum';
import { User } from '../classes/models/user.model';
import { UserRoleTypes } from '../enums/user-role-types.enum';
import { AuthApi } from '../services/http/auth.api';
import { UsersApi } from '../services/http/users.api';
import { ImagesStoreI, RouterLinkStoreI, AppCacheI, AppLocalStorageI, AppSessionStorageI } from './data-storage.interfaces';
import { TokenDetailsI, DialogSubjectI } from './data-structure.interfaces';
import { UserI } from './model.interfaces';
import { Subject } from 'rxjs';
import { DialogComponents } from '../enums/dialog-components.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonsApi } from '../services/http/persons.api';
import { BranchesApiI, CarClassesApiI, GearTypesApiI, OrdersApiI, VehiclesApiI, VehicleTypesApiI, VehicleModelsApiI, VehicleManufacturersApiI } from './api.interfaces';

export interface OnServiceInit {
	init(...args: any): void
}

export interface MatDialogsI {
	dialogSubject: Subject<DialogComponents | DialogSubjectI>
	openLoginDialog(): void
	openSignUpDialog(): void
	openForgotPassDialog(): void
	openErrorDialog(
		error: any,
		errorType?: ErrorTypes,
	): void
}

export interface CurrentUserI {
	user: User
	userRole: UserRoleTypes
	userFullName: string
	getNonUserToken(): void
}

export interface HttpI {
	AuthApi: AuthApi
	UsersApi: UsersApi
	PersonsApi: PersonsApi
	BranchesApi: BranchesApiI
	CarClassesApi: CarClassesApiI
	GearTypesApi: GearTypesApiI
	OrdersApi: OrdersApiI
	VehiclesApi: VehiclesApiI
	VehicleTypesApi: VehicleTypesApiI
	VehicleModelsApi: VehicleModelsApiI
	VehicleManufacturersApi: VehicleManufacturersApiI
	httpErrorSubject: Subject<HttpErrorResponse>
}

export interface StorageServiceI {
	doSaveLastUser: boolean
	tokenDetails: TokenDetailsI
	isLoggedIn: boolean
	user: UserI
	imagesStore: ImagesStoreI
	routerLinksStore: RouterLinkStoreI
	cache: AppCacheI
	appLocalStorage: AppLocalStorageI
	appSessionStorage: AppSessionStorageI
}

export interface ChangesServiceI {
	userChange: Subject<void>
}
