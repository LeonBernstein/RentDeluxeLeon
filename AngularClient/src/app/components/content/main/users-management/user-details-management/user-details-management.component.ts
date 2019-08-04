import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from 'src/app/ts/interfaces/model.interfaces';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangesService } from 'src/app/ts/services/changes.service';

@Component({
	selector: 'crd-user-details-management',
	templateUrl: './user-details-management.component.html',
	styleUrls: ['./user-details-management.component.scss']
})
export class UserDetailsManagementComponent implements OnInit {

	@ViewChild('userDetailsForm', { static: false }) public userDetailsForm: FormGroupDirective

	public get isDirty(): boolean {
		return this.userDetailsForm.dirty
	}
	public get isDataValid(): boolean {
		return this.userDetailsForm.valid
	}
	public get minDate(): Date {
		return new Date(1900, 0, 1)
	}
	public get maxDate(): Date {
		return new Date()
	}

	public user: UserI

	constructor(
		@Inject('NUMERIC_ONLY') public readonly numericOnly: RegExp,
		private _MatDialogsService: MatDialogsService,
		private _ActivatedRoute: ActivatedRoute,
		private _Http: HttpService,
		public router: Router,
		public snackBar: MatSnackBar,
		private _ChangesService: ChangesService,
	) { }


	ngOnInit() {
		this.getUser(parseInt(this._ActivatedRoute.snapshot.paramMap.get('id')))
	}


	public getUser(id?: number): void {
		if (this.user) id = this.user.userId
		if (id) {
			this._Http.UsersApi
				.getUserById(id)
				.subscribe(r => {
					this.updateModel(r)
				})
		}
	}


	public updateUser(userDetailsForm: NgForm | FormGroupDirective): void {
		if (userDetailsForm.valid && this.user) {
			this._Http.UsersApi
				.updateUser(this.user)
				.subscribe(r => {
					this.updateModel(r)
					this.snackBar.open('הנתונים נשמרו', 'סגור')
					this.userDetailsForm.resetForm(userDetailsForm.control.getRawValue())
					this._ChangesService.userManagementChange.next(this.user)
				})
		}
	}
	
	private updateModel(res: UserI): void {
		if (res) {
			this.user = ModelsFactory.createUserModel()
			this.user.assignAllData(res)
		} else {
			this._MatDialogsService.openErrorDialog("No such user in DB!", ErrorTypes.warning)
		}
	}
	
	public saveData(): void {
		this.userDetailsForm.control.markAllAsTouched()
		this.updateUser(this.userDetailsForm)
	}
}
