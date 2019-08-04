import { TokenDetailsI } from '../../interfaces/data-structure.interfaces';
import { AppLocalStorageI } from '../../interfaces/data-storage.interfaces';
import { UserI } from '../../interfaces/model.interfaces';
import { ModelsFactory } from '../../classes/infrastructure/models-factory';
import { Helper } from '../../classes/infrastructure/helpers';


export class AppLocalStorage implements AppLocalStorageI {
	
	public get tokenDetails() {
		try {
			return JSON.parse(localStorage.getItem(this._tokenKey))
		} catch {
			return null
		}
	}
	public set tokenDetails(tokenDetails: TokenDetailsI) {
		try {
			localStorage.setItem(this._tokenKey, JSON.stringify(tokenDetails))
		} catch {}
	}
	
	
	public get doSaveLastUser(): boolean {
		try {
			return JSON.parse(localStorage.getItem(this._saveLastUserKey)) ? true : false
		} catch {
			return false
		}
	}
	public set doSaveLastUser(doSave: boolean) {
		try {
			localStorage.setItem(this._saveLastUserKey, JSON.stringify(doSave))
		} catch {}
	}
	
	
	public get user(): UserI {
		try {
			const user: UserI = ModelsFactory.createUserModel()
			const hexData: string = localStorage.getItem(this._userKey)
			return user.assignAllData(JSON.parse(Helper.decipher(hexData)))
		} catch {
			return null
		}
	}
	public set user(user: UserI) {
		try {
			const hexStr: string = Helper.cipher(JSON.stringify(user))
			localStorage.setItem(this._userKey, hexStr)
		} catch {}
	}
	
	
	constructor(
		private _saveLastUserKey: string,
		private _tokenKey: string,
		private _userKey: string,
		private _favoriteCarsKey: string,
	) { }
	
	
	public removeKey(key: string): void {
		try {
			localStorage.removeItem(key)
		} catch {}
	}
	
	public getFavoriteCars(userId: number | string): number[] {
		try {
			const arr: {id: number | string, values: number[]}[] = JSON.parse(localStorage.getItem(this._favoriteCarsKey))
			if (!arr) return null
			const obj = arr.find(x => x.id == userId)
			if (obj && obj.values && obj.values.length > 0) {
				return obj.values
			} else {
				return null
			}
		} catch {
			localStorage.removeItem(this._favoriteCarsKey)
			return null
		}
	}
	public setFavoriteCars(userId: number | string, favoriteCarId: number): void {
		try {
			let arr: {id: number | string, values: number[]}[] = JSON.parse(localStorage.getItem(this._favoriteCarsKey))
			if (!arr) {
				arr = new Array<{id: number | string, values: number[]}>()
				arr.push({id: userId, values: [favoriteCarId]})
			} else {
				const obj = arr.find(x => x.id == userId)
				if (obj) {
					if (obj.values.length >= 5) obj.values.shift()
					obj.values.push(favoriteCarId)
				} else {
					arr.push({id: userId, values: [favoriteCarId]})
				}
			}
			localStorage.setItem(this._favoriteCarsKey, JSON.stringify(arr))
		} catch {
			localStorage.removeItem(this._favoriteCarsKey)
		}
	}
}
