import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'crd-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
	
	private _timeOutIndex: number
	private _seconds: number
	
	constructor(
		@Optional() @Inject(MAT_DIALOG_DATA) private _data: { time: number },
		private _dialogRef: MatDialogRef<LoaderComponent>,
	) { }
	
	
	ngOnInit() {
		this._dialogRef.disableClose = true
		this._dialogRef.removePanelClass('myMatDialogConfig')
		this._dialogRef.addPanelClass('loaderDialogConfig')
		this._seconds = this._data && this._data.time || 15
		this._closeOnTimeOut()
	}
	
	private _closeOnTimeOut(): void {
		this._timeOutIndex = window.setTimeout(() => {
			this._dialogRef.close()
		}, this._seconds  * 1000)
	}
	
	
	ngOnDestroy(): void {
		window.clearTimeout(this._timeOutIndex)
	}
}
