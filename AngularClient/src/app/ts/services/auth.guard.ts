import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';
import { UserRoleTypes } from '../enums/user-role-types.enum';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	public get currentUserRole(): UserRoleTypes {
		return this._CurrentUserService.userRole
	}
	
	constructor(
		private _CurrentUserService: CurrentUserService,
		private _router: Router
	) { }
	
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (next.data.roles.includes(this.currentUserRole)) {
			return true
		} else {
			this._router.navigate(['home'], { state: { isUserChanged: true } } )
			return false
		}
	}
}
