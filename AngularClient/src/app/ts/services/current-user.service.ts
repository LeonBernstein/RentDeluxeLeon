import { Injectable } from '@angular/core';

import { HttpService } from './http/http.service';
import { MatDialogsService } from './mat-dialogs.service';
import { StorageService } from './storage/storage.service';
import { ModelsFactory } from '../classes/infrastructure/models-factory';
import { OnServiceInit, CurrentUserI } from '../interfaces/services.interfaces';
import { TokenDetailsI } from '../interfaces/data-structure.interfaces';
import { UserRoleTypes } from '../enums/user-role-types.enum';
import { UserI } from '../interfaces/model.interfaces';
import { BehaviorSubject } from 'rxjs';
import { ChangesService } from './changes.service';
import { CommonCacheTokens } from '../enums/common-cache-tokens.enum';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CurrentUserService implements OnServiceInit, CurrentUserI {
	
	private _wasInitiated: boolean = false
	
	public get user(): UserI {
		return this._Storage.user
	}
	public set user(user: UserI) {
		this._Storage.user = user
	}
	public get userRole(): UserRoleTypes {
		if (this.user &&
				this.user.userRole &&
				this.user.userRole.userRoleId
		) {
			return this.user.userRole.userRoleId
		}
		return UserRoleTypes.nonUser
	}
	public get userFullName(): string {
		const user: UserI = this._Storage.user
		if (user && user.person ) {
			if (user.person.firstName && user.person.lastName) {
				return user.person.firstName + ' ' + user.person.lastName
			}
			if (user.person.firstName) return user.person.firstName
			if (user.person.lastName) return user.person.lastName
		}
		return null
	}
	public get isLoggedIn$(): BehaviorSubject<boolean> {
		return this._Storage.isLoggedIn$
	}

	constructor(
		private _Storage: StorageService,
		private _HttpService: HttpService,
		private _Changes: ChangesService,
		private _router: Router,
	) { }
	
	
	public init(): void {
		if (this._wasInitiated) return
		this._wasInitiated = true
		this._checkUserDetails()
		this._setSubscribers()
	}
	
	private _checkUserDetails(): void {
		const tokenDetails: TokenDetailsI = this._Storage.tokenDetails
		
		setTimeout(() => {
			if (tokenDetails) {
				this._getCurrentUser(tokenDetails)
			} else {
				this.getNonUserToken()
			}
		})
	}
	
	public getNonUserToken(): void {
		this._HttpService.AuthApi
			.getNonUserToken(navigator.userAgent)
			.subscribe(r => this._Storage.tokenDetails = r)
	}
	
	private _getCurrentUser(tokenDetails: TokenDetailsI) {
		this._HttpService.UsersApi
			.getCurrentUser(tokenDetails.token)
			.subscribe(r => {
								if (r) {
									this._Storage.isLoggedIn = true
									const user: UserI = ModelsFactory.createUserModel()
									this.user = user.assignAllData(r)
								} else {
									this.user = null
								}
							})
	}
	
	private _setSubscribers(): void {
		this._Changes.userChange.subscribe(() => {
			if (this.userRole == UserRoleTypes.user) {
				const id = this._Storage.commonCache.getData(CommonCacheTokens.requestedCar)
				if (id) {
					setTimeout(() => { this._router.navigateByUrl('userOrders/' + id) }, 300)
				}
			}
			this._Storage.commonCache.setData(CommonCacheTokens.requestedCar, null)
		})
	}
}
