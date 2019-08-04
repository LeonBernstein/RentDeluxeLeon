import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CanComponentDeactivate } from '../interfaces/components.interfaces';
import { SaveConfirmComponent } from 'src/app/components/dialogs/save-confirm/save-confirm.component';


@Injectable({
	providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

	constructor(
		private _MatDialog: MatDialog,
		private router: Router
	) { }

	canDeactivate(
		component: CanComponentDeactivate,
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | boolean {
		const isUserChanges: boolean =
			this.router.getCurrentNavigation().extras &&
			this.router.getCurrentNavigation().extras.state &&
			this.router.getCurrentNavigation().extras.state.isUserChanged

		if (component.isDirty &&
			!isUserChanges
		) {
			return this._MatDialog.open(SaveConfirmComponent, { data: component }).beforeClosed()
		} else {
			return true
		}
	}
}
