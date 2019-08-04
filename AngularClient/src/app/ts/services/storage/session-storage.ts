import { TokenDetailsI } from '../../interfaces/data-structure.interfaces';
import { AppSessionStorageI } from '../../interfaces/data-storage.interfaces';
import { UserI } from '../../interfaces/model.interfaces';
import { ModelsFactory } from '../../classes/infrastructure/models-factory';
import { Helper } from '../../classes/infrastructure/helpers';


export class AppSessionStorage implements AppSessionStorageI {
	
	public set tokenDetails(tokenDetails: TokenDetailsI) {
		try {
			sessionStorage.setItem(this._tokenKey, JSON.stringify(tokenDetails))
		} catch {}
	}
	public get tokenDetails() {
		try {
			return JSON.parse(sessionStorage.getItem(this._tokenKey))
		} catch {
			return null
		}
	}
	
	
	public get user(): UserI {
		try {
			const user: UserI = ModelsFactory.createUserModel()
			const hexData: string = sessionStorage.getItem(this._userKey)
			return user.assignAllData(JSON.parse(Helper.decipher(hexData)))
		} catch {
			return null
		}
	}
	public set user(user: UserI) {
		try {
			const hexStr: string = Helper.cipher(JSON.stringify(user))
			sessionStorage.setItem(this._userKey, hexStr)
		} catch {}
	}
	
	
	constructor(
		private _tokenKey: string,
		private _userKey: string,
	) { }
	
	
	public removeKey(key: string): void {
		try {
			sessionStorage.removeItem(key)
		} catch {}
	}
}
