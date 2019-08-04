import { Component, Inject, OnDestroy, OnInit, ApplicationRef, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { DialogComponents } from 'src/app/ts/enums/dialog-components.enum';
import { SIGN_UP_USER_DATA } from 'src/app/modules/app/app.module.providers';
import { SignUpDataI, DialogDataI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { CommonCacheTokens } from 'src/app/ts/enums/common-cache-tokens.enum';
import { UserI } from 'src/app/ts/interfaces/model.interfaces';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { LoaderComponent } from '../loader/loader.component';

@Component({
	selector: 'crd-dialog-signUp',
	templateUrl: './signUp.component.html',
	styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnDestroy, OnInit {
	
	public get email(): AbstractControl {
		return this._signUpForm.get('email')
	}
	public get password(): AbstractControl {
		return this._signUpForm.get('password')
	}
	public get rePassword(): AbstractControl {
		return this._signUpForm.get('rePassword')
	}
	
	private _signUpForm: FormGroup = this._formBuilder.group({
		email: ['',
			[
				Validators.required,
				Validators.pattern(this.emailPattern),
			], Helper.isEmailExist()],
		password: ['',
			[
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(16),
				Validators.pattern(this.allowedPassChars)
			]],
		rePassword: ['',
			[
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(16),
				Validators.pattern(this.allowedPassChars)
			]],
		stayLoggedIn: [true],
	})
	public get signUpForm(): FormGroup {
		return this._signUpForm
	}
	
	
	constructor(
		@Inject(MAT_DIALOG_DATA) private _data: DialogDataI,
		@Inject(SIGN_UP_USER_DATA) private _signUpData: SignUpDataI,
		@Inject('EMAIL_PATTERN') public readonly emailPattern: RegExp,
		@Inject('PASSWORD_PATTERN') public readonly passwordPattern: RegExp,
		@Inject('ALLOWED_PASS_CHARS') public readonly allowedPassChars: RegExp,
		private _MatDialog: MatDialog,
		private _formBuilder: FormBuilder,
		private _dialogRef: MatDialogRef<SignUpComponent>,
		private _Storage: StorageService,
		private _ApplicationRef: ApplicationRef,
		private _ngZone: NgZone,
	) { }
	
	
	ngOnInit() {
		const passwordComparison: ValidatorFn = Helper.fieldsComparison(this.password, this.rePassword)
		this._signUpForm.setValidators([passwordComparison])
		if (this._Storage.cache.hasData(this, 0)) this._getDataFromCache()
	}
	
	
	ngOnDestroy() {
		this._storeDataToCache()
	}
	
	
	public async onSubmit(): Promise<void> {
		if (this._signUpForm.status === 'VALID') {
			if (this.emailPattern.test(this._signUpForm.value.email) &&
					this.passwordPattern.test(this._signUpForm.value.password) &&
					this.passwordPattern.test(this._signUpForm.value.rePassword) &&
					this._signUpForm.value.password === this._signUpForm.value.rePassword
			) {
				const user: UserI = ModelsFactory.createUserModel()
				user.userName = this._signUpForm.value.email
				user.password = this._signUpForm.value.password
				
				this._Storage.commonCache.setData(CommonCacheTokens.fullUserDetails, user)
				this._Storage.commonCache.setData(CommonCacheTokens.stayLoggedIng,this._signUpForm.value.stayLoggedIn)
				
				this._dialogRef.close()
				
				this._data.subject.next(DialogComponents.personalDetails)
			} else {
				this._dialogRef.close()
				this._data.subject.next({
					component: DialogComponents.error,
					params: ['שגיאה בוולדיציה, נסה שנית!', ErrorTypes.warning]
				});
			}
		} else if (this._signUpForm.status === 'PENDING') {
			this._signUpForm.statusChanges.subscribe(async status => {
				if (status === 'VALID') this.onSubmit()
				
				await new Promise(resolve => setTimeout(resolve, 500))
			
				const dialogRef = this._MatDialog.getDialogById(loaderId)
				if (dialogRef) dialogRef.close()
				this._ngZone.run(() =>
					setTimeout(() => this._ApplicationRef.tick())
				)
			})
			var loaderId: string = this._MatDialog.open(LoaderComponent).id
		}
	}
	
	public openLoginDialog(): void {
		this._dialogRef.close()
		this._data.subject.next(DialogComponents.login)
	}
	
	public closeThisDialog(): void {
		this._dialogRef.close()
	}
	
	
	private _getDataFromCache(): void {
		const data: any = this._Storage.cache.getData(this, 0)
		if (data) {
			this._signUpData.assignAllData(data)
			this.signUpForm.setValue(data)
		}
	}
	
	private _storeDataToCache(): void {
		this._signUpData.assignAllData(this.signUpForm.value)
		this._Storage.cache.setData(this, 0, this._signUpData)
	}
}
