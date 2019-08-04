import { Component, Inject, OnDestroy, OnInit, ApplicationRef, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogDataI, PersonDataI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { PERSON_DATA } from 'src/app/modules/app/app.module.providers';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { DialogComponents } from 'src/app/ts/enums/dialog-components.enum';
import { NgForm } from '@angular/forms';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { CommonCacheTokens } from 'src/app/ts/enums/common-cache-tokens.enum';
import { UserI } from 'src/app/ts/interfaces/model.interfaces';
import { LoaderComponent } from '../loader/loader.component';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { Router } from '@angular/router';

@Component({
	selector: 'crd-personal-details',
	templateUrl: './personal-details.component.html',
	styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnDestroy, OnInit {
	
	public get minDate(): Date {
		return new Date(1900, 0, 1)
	}
	public get maxDate(): Date {
		return new Date()
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) private _data: DialogDataI,
		@Inject(PERSON_DATA) public personData: PersonDataI,
		@Inject('NUMERIC_ONLY') public readonly numericOnly: RegExp,
		private _MatDialog: MatDialog,
		private _dialogRef: MatDialogRef<PersonalDetailsComponent>,
		private _Storage: StorageService,
		private _HttpService: HttpService,
		private _Changes: ChangesService,
		private _ApplicationRef: ApplicationRef,
		private _ngZone: NgZone,
		private _router: Router,
	) { }
	
	
	ngOnInit() {
		if (this._Storage.cache.hasData(this, 0))
			this._getDataFromCache()
	}
	
	
	ngOnDestroy() {
		this._storeDataToCache()
	}
	
	
	public goBack() {
		this.closeThisDialog()
		this._data.subject.next(DialogComponents.signUp)
	}
	
	
	public async onSubmit(form: NgForm): Promise<void> {
		let wasError: boolean = false
		this._storeDataToCache()
		
		if (form.form.status === 'INVALID') return
		
		if (this.personData.firstName &&
				this.personData.lastName &&
				this.personData.idCardNum &&
				this.personData.gender &&
				this._Storage.commonCache.hasData(CommonCacheTokens.fullUserDetails)
		) {
			const loaderId: string = this._MatDialog.open(LoaderComponent).id
			const user: UserI = <UserI>this._Storage.commonCache.getData(CommonCacheTokens.fullUserDetails)
			user.person.assignAllData(this.personData);
			
			(<string | void>user.password) = await Helper.encryptPassword(user.password)
				.catch(e => {
					wasError = true
					this._dialogRef.close()
					this._data.subject.next({
						component: DialogComponents.error,
						params: [e, ErrorTypes.critical]
					});
				});
			
			if (wasError) return
			
			this._HttpService.UsersApi.isUserExistByUserName(user.userName)
				.subscribe(r => {
					if (typeof r === 'boolean' && r) {
						this.goBack()
						this._data.subject.next({
							component: DialogComponents.error,
							params: ['כתובת המייל שהוזנה כבר קיימת במערכת.', ErrorTypes.warning]
						});
					} else {
						this._HttpService.UsersApi.registerUser(user)
						.subscribe(async r => {
							this._Storage.doSaveLastUser = this._Storage.commonCache.getData(CommonCacheTokens.stayLoggedIng)
							this._Storage.isLoggedIn = true
							this._Storage.tokenDetails = r.tokenDetails
							
							const loggedInUser: UserI = ModelsFactory.createUserModel()
							this._Storage.user = loggedInUser.assignAllData(r.user)
							
							await new Promise(resolve => setTimeout(resolve, 1000))
							
							this.closeThisDialog()
							this._Changes.userChange.next()
							this._ngZone.run(() =>
								setTimeout(() => this._ApplicationRef.tick())
							)
							const dialogRef = this._MatDialog.getDialogById(loaderId)
							if (dialogRef) dialogRef.close()
							
							this._router.navigate(['home'], { state: { isUserChanged: true } } )
							
						}, async e => {
							await new Promise(resolve => setTimeout(resolve, 1000))
							
							this._data.subject.next({
								component: DialogComponents.error,
								params: [e, ErrorTypes.http]
							});
					
							const dialogRef = this._MatDialog.getDialogById(loaderId)
							if (dialogRef) dialogRef.close()
							this._ngZone.run(() =>
								setTimeout(() => this._ApplicationRef.tick())
							)
						});
					}
				});
		} else {
			this.closeThisDialog()
			this._data.subject.next({
				component: DialogComponents.error,
				params: ['שגיאה בוולדיציה, נסה שנית!', ErrorTypes.warning]
			});
		}
	}
	
	
	public closeThisDialog(): void {
		this._dialogRef.close()
	}
	
	
	private _getDataFromCache(): void {
		const data: any = this._Storage.cache.getData(this, 0)
		if (data)
			this.personData.assignAllData(data)
	}
	
	
	private _storeDataToCache(): void {
		this._Storage.cache.setData(this, 0, this.personData)
	}
}
