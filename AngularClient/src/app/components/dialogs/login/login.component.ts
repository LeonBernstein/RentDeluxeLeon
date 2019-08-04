import { Component, OnDestroy, OnInit, Inject, ApplicationRef, Optional, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { DialogComponents } from 'src/app/ts/enums/dialog-components.enum';
import { LoginDataI, DialogDataI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { LOGIN_USER_DATA } from 'src/app/modules/app/app.module.providers';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { UserI } from 'src/app/ts/interfaces/model.interfaces';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { LoaderComponent } from '../loader/loader.component';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { Router } from '@angular/router';


@Component({
	selector: 'crd-dialog-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
	
	public isWrongDetails: boolean = false
	
	
	constructor(
		@Inject(MAT_DIALOG_DATA) private _data: DialogDataI,
		@Inject(LOGIN_USER_DATA) public loginUserData: LoginDataI,
		@Inject('EMAIL_PATTERN') public readonly emailPattern: RegExp,
		private _MatDialog: MatDialog,
		private _dialogRef: MatDialogRef<LoginComponent>,
		private _Storage: StorageService,
		private _HttpService: HttpService,
		private _Changes: ChangesService,
		private _ApplicationRef: ApplicationRef,
		private _ngZone: NgZone,
		private _router: Router,
	) { }
	
	
	ngOnInit() {
		if (this._Storage.cache.hasData(this, 0)) {
			this._getDataFromCache()
		} else {
			this._setDefaultValues()
			this._storeDataToCache()
		}
	}
	
	
	ngOnDestroy() {
		this._storeDataToCache()
	}
	
	
	public async onSubmit(form: NgForm): Promise<void> {
		let wasError: boolean = false
		this._storeDataToCache()
		
		if (form.form.status === 'INVALID') return
		
		const userName = this.loginUserData.email
		const password = await Helper.encryptPassword(this.loginUserData.password)
			.catch(e => {
				wasError = true
				this._dialogRef.close()
				this._data.subject.next({
					component: DialogComponents.error,
					params: [e, ErrorTypes.critical]
				});
			});
		
		if (wasError || !userName || !password) return
		
		const loaderId: string = this._MatDialog.open(LoaderComponent).id
		
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		this._HttpService.AuthApi.login(userName, password)
			.subscribe(r => {
				this._Storage.doSaveLastUser = this.loginUserData.stayLoggedIn
				this._Storage.isLoggedIn = true
				this._Storage.tokenDetails = r.tokenDetails
				
				const user: UserI = ModelsFactory.createUserModel()
				this._Storage.user = user.assignAllData(r.user)
				
				
				this._dialogRef.close()
				this._Changes.userChange.next()
				this._ngZone.run(() =>
					setTimeout(() => this._ApplicationRef.tick())
				)
				const dialogRef = this._MatDialog.getDialogById(loaderId)
				if (dialogRef) dialogRef.close()
				
				this._router.navigate(['home'], { state: { isUserChanged: true } } )
				
			}, e => {
				if (e instanceof HttpErrorResponse &&
						e.status === 401
				) {
					this.isWrongDetails = true
					this._ngZone.run(() =>
					setTimeout(() => this._ApplicationRef.tick())
				)
				} else {
					this._dialogRef.close()
					this._data.subject.next({
						component: DialogComponents.error,
						params: [e, ErrorTypes.http]
					});
					this._ngZone.run(() =>
					setTimeout(() => this._ApplicationRef.tick())
				)
				}
				const dialogRef = this._MatDialog.getDialogById(loaderId)
				if (dialogRef) dialogRef.close()
			});
	}
	
	
	public openSignUpDialog(): void {
		this._dialogRef.close()
		this._data.subject.next(DialogComponents.signUp)
	}
	
	public openForgotPassDialog(): void {
		this._dialogRef.close()
		this._data.subject.next(DialogComponents.forgotPass)
	}
	
	public closeThisDialog(): void {
		this._dialogRef.close()
	}
	
	
	private _storeDataToCache(): void {
		this._Storage.cache.setData(this, 0, this.loginUserData)
	}
	
	private _getDataFromCache(): void {
		const data: any = this._Storage.cache.getData(this, 0)
		if (data) {
			this.loginUserData.assignAllData(data)
		}
	}
	
	private _setDefaultValues(): void {
		this.loginUserData.email = ""
		this.loginUserData.password = ""
		this.loginUserData.stayLoggedIn = true
	}
}
