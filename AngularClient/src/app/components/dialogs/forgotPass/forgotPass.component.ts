import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogComponents } from 'src/app/ts/enums/dialog-components.enum';
import { DialogDataI } from 'src/app/ts/interfaces/data-structure.interfaces';


@Component({
	selector: 'crd-forgotPass',
	templateUrl: './forgotPass.component.html',
	styleUrls: ['./forgotPass.component.scss']
})
export class ForgotPassComponent {
	
	
	constructor(
		@Inject(MAT_DIALOG_DATA) private _data: DialogDataI,
		@Inject('LEONS_EMAIL') public readonly leonsEmail: string,
		private _dialogRef: MatDialogRef<ForgotPassComponent>,
	) {	}
	
	
	public openLoginDialog(): void {
		this._dialogRef.close()
		this._data.subject.next(DialogComponents.login)
	}
	
	public openSignUpDialog(): void {
		this._dialogRef.close()
		this._data.subject.next(DialogComponents.signUp)
	}
	
	public closeThisDialog(): void {
		this._dialogRef.close()
	}
}
