import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogsI, OnServiceInit } from '../interfaces/services.interfaces';
import { LoginComponent } from 'src/app/components/dialogs/login/login.component';
import { SignUpComponent } from 'src/app/components/dialogs/signUp/signUp.component';
import { ForgotPassComponent } from 'src/app/components/dialogs/forgotPass/forgotPass.component';
import { DialogComponents } from '../enums/dialog-components.enum';
import { ErrorComponent } from 'src/app/components/dialogs/error/error.component';
import { ErrorTypes } from '../enums/error-types.enum';
import { PersonalDetailsComponent } from 'src/app/components/dialogs/personal-details/personal-details.component';
import { DialogSubjectI, ErrorDialogDataI, DialogDataI } from '../interfaces/data-structure.interfaces';
import { Subject } from 'rxjs';
import { HttpService } from './http/http.service';


@Injectable({
	providedIn: 'root'
})
export class MatDialogsService implements MatDialogsI, OnServiceInit {
	
	private _wasInitiated: boolean = false
	
	private _dialogSubject: Subject<DialogComponents | DialogSubjectI> = new Subject()
	public get dialogSubject(): Subject<DialogComponents | DialogSubjectI> {
		return this._dialogSubject
	}
	
	
	constructor(
		private _MatDialog: MatDialog,
		private _Http: HttpService,
	) { }
	
	
	init(): void {
		if (this._wasInitiated) return
		this._wasInitiated = true
		this._subscribe()
	}
	
	private _subscribe(): void {
		this._dialogSubject
			.subscribe(value => this._openDialogByValue(value))
		this._Http.httpErrorSubject
			.subscribe(e => this.openErrorDialog(e, ErrorTypes.http))
	}
	
	
	
	public openLoginDialog(): void {
		this._dialogSubject.next(DialogComponents.login)
	}
	
	
	public openSignUpDialog(): void {
		this._dialogSubject.next(DialogComponents.signUp)
	}
	
	
	public openForgotPassDialog(): void {
		this._dialogSubject.next(DialogComponents.forgotPass)
	}
	
	public openPersonalDetails(): void {
		this._dialogSubject.next(DialogComponents.personalDetails)
	}
	
	
	public openErrorDialog(
		error: any,
		errorType?: ErrorTypes,
	): void {
		this._dialogSubject.next(
			{
				component: DialogComponents.error,
				params: [error, errorType]
			});
	}
	
	
	private _openDialogByValue(
		value: DialogComponents | DialogSubjectI
	): void {
		if (value instanceof Object) {
			var params = value.params
			var component = value.component
		}
		let data = { data: <DialogDataI>{ subject: this.dialogSubject } }
		switch (component || value) {
			case DialogComponents.login:
				this._MatDialog.open(
					LoginComponent, data)
				break;
			case DialogComponents.signUp:
				this._MatDialog.open(
					SignUpComponent, data)
				break;
			case DialogComponents.forgotPass:
				this._MatDialog.open(
					ForgotPassComponent, data)
				break;
			case DialogComponents.personalDetails:
				this._MatDialog.open(
					PersonalDetailsComponent, data)
				break;
			case DialogComponents.error:
				if (Array.isArray(params)) {
					(<ErrorDialogDataI>data.data).error = params[0];
					(<ErrorDialogDataI>data.data).errorType = params[1];
					this._MatDialog.open(ErrorComponent, data)
					
				} else if (params) {
					(<ErrorDialogDataI>data.data).error = params;
					this._MatDialog.open(ErrorComponent, data)
				}
				break;
			default:
				return;
		}
	}
}
