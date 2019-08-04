import { Injectable, Injector } from '@angular/core';

import { OnServiceInit, StorageServiceI } from '../../interfaces/services.interfaces';
import { ImagesStore } from './data-stores/images-store';
import { RouterLinksStore } from './data-stores/router-links-store';
import { RouterLinkStoreI, ImagesStoreI, AppCacheI, AppLocalStorageI, AppSessionStorageI, CommonCacheI } from '../../interfaces/data-storage.interfaces';
import { AppCache } from './cache';
import { AppLocalStorage } from './local-storage';
import { AppSessionStorage } from './session-storage';
import { TokenDetailsI } from '../../interfaces/data-structure.interfaces';
import { Helper } from '../../classes/infrastructure/helpers';
import { UserI } from '../../interfaces/model.interfaces';
import { CommonCache } from './common-cache';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService implements OnServiceInit, StorageServiceI {
	
	private _wasInitiated: boolean = false
	
	private _saveLastUserKey: string = 'saveLastUser'
	private _tokenKey: string = 'token'
	private _isLoggedInKey: string = 'isLoggedInKey'
	private _userKey: string = 'user'
	private _favoriteCarsKey: string = 'favoriteCars'
	
	
	public get doSaveLastUser(): boolean {
		return this._cache.hasData(this, this._saveLastUserKey) &&
					 this._cache.getData(this, this._saveLastUserKey)
	}
	public set doSaveLastUser(doSave: boolean) {
		this._cache.setData(this, this._saveLastUserKey, doSave)
		this._appLocalStorage.doSaveLastUser = doSave
	}
	
	
	public get tokenDetails(): TokenDetailsI | null {
		const parseData = (obj: Object): TokenDetailsI | null => {
			if (obj) {
				try {
					let tokenDetails: TokenDetailsI = {} as any
					tokenDetails.token = obj['token']
					tokenDetails.issuedAt = new Date(obj['issuedAt'])
					tokenDetails.expiration = new Date(obj['expiration'])
				
					if (typeof(tokenDetails.token) === 'string' &&
							tokenDetails.token.length > 0 &&
							!isNaN(tokenDetails.issuedAt.getTime()) &&
							!isNaN(tokenDetails.expiration.getTime())
					) {
						if (tokenDetails.expiration > Helper.dateNow) {
							return tokenDetails
						} else {
							return null
						}
					} else {
						return null
					}
				} catch {
					return null
				}
			} else {
				return null
			}
		}
		if (this._cache.hasData(this, this._tokenKey)) {
			return this._cache.getData(this, this._tokenKey)
		}
		if (this.doSaveLastUser && this.isLoggedIn) {
			const value = parseData(this._appLocalStorage.tokenDetails)
			if (value) {
				this._cache.setData(this, this._tokenKey, value)
				this._appSessionStorage.removeKey(this._tokenKey)
			}
			return value
		}
		const value = parseData(this._appSessionStorage.tokenDetails)
		if (value) {
			this._cache.setData(this, this._tokenKey, value)
			this._appLocalStorage.removeKey(this._tokenKey)
		}
		return value
	}
	
	public set tokenDetails(tokenDetails: TokenDetailsI) {
		this._cache.setData(this, this._tokenKey, tokenDetails)
		if (this.doSaveLastUser && this.isLoggedIn) {
			this._appLocalStorage.tokenDetails = tokenDetails
			this._appSessionStorage.removeKey(this._tokenKey)
		} else {
			this._appSessionStorage.tokenDetails = tokenDetails
			this._appLocalStorage.removeKey(this._tokenKey)
		}
	}
	
	public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false)
	public get isLoggedIn(): boolean {
		if (this._cache.hasData(this, this._isLoggedInKey)) {
			return this._cache.getData(this, this._isLoggedInKey)
		}
		return false
	}
	public set isLoggedIn(isLoggedIn: boolean) {
		this._cache.setData(this, this._isLoggedInKey, isLoggedIn)
	}
	
	
	public get user(): UserI {
		if (this._cache.hasData(this, this._userKey)) {
			return this._cache.getData(this, this._userKey)
		}
		if (this.doSaveLastUser && this.isLoggedIn) {
			const value = this._appLocalStorage.user
			if (value) {
				this._cache.setData(this, this._userKey, value)
				this._appSessionStorage.removeKey(this._userKey)
			}
			return value
		}
		const value = this._appSessionStorage.user
		if (value) {
			this._cache.setData(this, this._userKey, value)
			this._appLocalStorage.removeKey(this._userKey)
		}
		return value
	}
	public set user(user: UserI) {
		if (user) {
			this._cache.setData(this, this._userKey, user)
			this.isLoggedIn$.next(true)
			if (this.doSaveLastUser && this.isLoggedIn) {
				this._appLocalStorage.user = user
				this._appSessionStorage.removeKey(this._userKey)
			} else {
				this._appSessionStorage.user = user
				this._appLocalStorage.removeKey(this._userKey)
			}
		} else {
			this._cache.setData(this, this._userKey, null)
			this.isLoggedIn$.next(false)
			this._appSessionStorage.removeKey(this._userKey)
			this._appLocalStorage.removeKey(this._userKey)
		}
	}
	
	
	private _imagesStore: ImagesStore
	public get imagesStore(): ImagesStoreI {
		return this._imagesStore
	}
	
	private _routerLinksStore: RouterLinksStore
	public get routerLinksStore(): RouterLinkStoreI {
		return this._routerLinksStore
	}
	
	private _cache: AppCache
	public get cache(): AppCacheI {
		return this._cache
	}
	
	private _commonCache: CommonCache
	public get commonCache(): CommonCacheI {
		return this._commonCache
	}
	
	private _appLocalStorage: AppLocalStorage
	public get appLocalStorage(): AppLocalStorageI {
		return this._appLocalStorage
	}
	
	private _appSessionStorage: AppSessionStorage
	public get appSessionStorage(): AppSessionStorageI {
		return this._appSessionStorage
	}

	constructor() { }
	
	
	public init(): void {
		if (this._wasInitiated) return
		this._wasInitiated = true
		this._buildDependencies()
		this.getData()
	}
	
	
	private _buildDependencies(): void {
		const injector = this._injectorCreator()
		
		this._imagesStore = injector.get(ImagesStore)
		this._routerLinksStore = injector.get(RouterLinksStore)
		this._cache = injector.get(AppCache)
		this._commonCache = injector.get(CommonCache)
		this._appLocalStorage = injector.get(AppLocalStorage)
		this._appSessionStorage = injector.get(AppSessionStorage)
	}
	
	
	private _injectorCreator(): Injector {
		return Injector.create({
			providers: [
				{
					provide: 'SAVE_LAST_USER_KEY',
					useValue: this._saveLastUserKey,
				},
				{
					provide: 'TOKEN_KEY',
					useValue: this._tokenKey,
				},
				{
					provide: 'USER_KEY',
					useValue: this._userKey,
				},
				{
					provide: 'FAVORITE_CARS_KEY',
					useValue: this._favoriteCarsKey
				},
				{
					provide: ImagesStore,
					useClass: ImagesStore,
					deps: [],
				},
				{
					provide: RouterLinksStore,
					useClass: RouterLinksStore,
					deps: [],
				},
				{
					provide: AppCache,
					useClass: AppCache,
					deps: [],
				},
				{
					provide: CommonCache,
					useClass: CommonCache,
					deps: [],
				},
				{
					provide: AppLocalStorage,
					useClass: AppLocalStorage,
					deps: [
						'SAVE_LAST_USER_KEY',
						'TOKEN_KEY',
						'USER_KEY',
						'FAVORITE_CARS_KEY',
					],
				},
				{
					provide: AppSessionStorage,
					useClass: AppSessionStorage,
					deps: [
						'TOKEN_KEY',
						'USER_KEY',
					],
				},
			],
		});
	}
	
	private getData(): void {
		this._cache.setData(this, this._saveLastUserKey, this._appLocalStorage.doSaveLastUser)
		
		this.isLoggedIn = true
		const tokenDetails: TokenDetailsI = this.tokenDetails
		const user: UserI = this.user
		this.isLoggedIn = false
		
		if (tokenDetails && user) {
			this.isLoggedIn = true
			this._cache.setData(this, this._tokenKey, tokenDetails)
			this._cache.setData(this, this._userKey, user)
		} else {
			this._appLocalStorage.removeKey(this._tokenKey)
			this._appLocalStorage.removeKey(this._userKey)
			this._appSessionStorage.removeKey(this._tokenKey)
			this._appSessionStorage.removeKey(this._userKey)
		}
	}
}
