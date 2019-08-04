import { RouterOutletTypes } from '../enums/router-outlet-types.enum';
import { UserRoleTypes } from '../enums/user-role-types.enum';
import { ImageTypes } from '../enums/image-names.enum';
import { ImageI, TokenDetailsI } from './data-structure.interfaces';
import { UserI } from './model.interfaces';
import { CommonCacheTokens } from '../enums/common-cache-tokens.enum';

export interface RouterLinkI {
	path: string,
	label: string,
	routerOutletType: RouterOutletTypes | RouterOutletTypes[],
	userType: UserRoleTypes | UserRoleTypes[],
}

export interface RouterLinkStoreI {
	routerLinks: RouterLinkI[]
}

export interface ImagesStoreI {
	getImages(names: ImageTypes | ImageTypes[]): ImageI | ImageI[]
	swapAltWithSrc(imgIdentifier: string | ImageTypes): void
}

export interface AppCacheI {
	getData(
		objectSender: object,
		dataIndex: number | string,
	): any
	setData(
		objectSender: object,
		dataIndex: number | string,
		data: any,
	): void
	hasData(
		objectSender: object,
		dataIndex: number | string,
	): boolean
}

export interface CommonCacheI {
	getData(cacheToken: CommonCacheTokens): any
	setData(
		cacheToken: CommonCacheTokens,
		data: any,
	): void
	hasData(cacheToken: CommonCacheTokens): boolean
}

export interface AppLocalStorageI {
	tokenDetails: TokenDetailsI
	doSaveLastUser: boolean
	user: UserI
	removeKey(key: string): void
	getFavoriteCars(userId: number | string): number[]
	setFavoriteCars(userId: number | string, favoriteCarId: number): void
}

export interface AppSessionStorageI {
	tokenDetails: TokenDetailsI
	user: UserI
	removeKey(key: string): void
}
