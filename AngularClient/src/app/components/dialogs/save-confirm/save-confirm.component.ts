import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanComponentDeactivate } from 'src/app/ts/interfaces/components.interfaces';

@Component({
	selector: 'crd-save-confirm',
	templateUrl: './save-confirm.component.html',
	styleUrls: ['./save-confirm.component.scss']
})
export class SaveConfirmComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public component: CanComponentDeactivate,
		private _dialogRef: MatDialogRef<SaveConfirmComponent>,
	) { }
	
	
	public saveData(): void {
		this.component.isNavigating = true
		this.component.saveData()
		this.closeDialog(true)
	}
	

	public closeDialog(canDeactivate: boolean): void {
		this._dialogRef.close(canDeactivate)
	}
}
