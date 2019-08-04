import { Component, Inject, OnInit, ApplicationRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { HttpStatuses } from 'src/app/ts/enums/http-statuses.enum';
import { DialogComponents } from 'src/app/ts/enums/dialog-components.enum';
import { ErrorDialogDataI } from 'src/app/ts/interfaces/data-structure.interfaces';

@Component({
	selector: 'crd-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
	
	public get errorTitle(): string {
		switch (this._errorType) {
			case this.infoErrorType:
				return 'שים לב.'
			case this.warningErrorType:
				return 'הזהרהה'
			default:
				return 'שגיאה\xa0\xa0: ('
		}
	}
	
	public isDetailsOpen: boolean = false
	public flipIsDetailsOpen(): void {
		this.isDetailsOpen = !this.isDetailsOpen
		this._changeDetectorRef.detectChanges()
	}
	
	
	private _errorType: ErrorTypes
	public get errorType(): ErrorTypes {
		return this._errorType
	}
	public readonly infoErrorType: ErrorTypes =  ErrorTypes.info
	public readonly warningErrorType: ErrorTypes = ErrorTypes.warning
	public readonly criticalErrorType: ErrorTypes = ErrorTypes.critical
	public readonly httpErrorType: ErrorTypes = ErrorTypes.http
	
	private _httpStatus: HttpStatuses
	public get httpStatus(): HttpStatuses {
		return this._httpStatus
	}
	public readonly httpStatus400: HttpStatuses =  HttpStatuses.status400
	public readonly httpStatus401: HttpStatuses =  HttpStatuses.status401
	public readonly httpStatus404: HttpStatuses =  HttpStatuses.status404
	public readonly httpStatus500: HttpStatuses =  HttpStatuses.status500
	
	
	private _error: Error | HttpErrorResponse
	public get error() {
		if (this._error instanceof Error) return null
		return this._error
	}
	
	
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: ErrorDialogDataI,
		private _dialogRef: MatDialogRef<ErrorComponent>,
		private _changeDetectorRef: ChangeDetectorRef,
		private _applicationRef: ApplicationRef
	) { }
	
	
	ngOnInit() {
		this._parseData()
	}
	
	ngOnDestroy() {
		if (this._errorType === this.criticalErrorType) {
			setTimeout(() => this.data.subject.next(
				{
					component: DialogComponents.error,
					params: [this._error, this._errorType]
				}
			))
		}
	}
	
	
	private _parseData() {
		this._errorType = this.data.errorType
		if (this.data.error instanceof HttpErrorResponse) {
			this._error = this.data.error
			this._httpStatus = this.data.error.status
			this._errorType = this.httpErrorType
			
		} else if (this.data.error instanceof Error) {
			this._error = this.data.error
			
			if (typeof(this.data.errorType) !== 'undefined') {
				this._errorType = this.data.errorType
			} else {
				this._errorType = this.infoErrorType
			}
		} else if (typeof(this.data.error) === 'string') {
			this._error = new Error(this.data.error)
			
		} else {
			this.closeThisDialog()
		}
	}
	
	
	public getCommonText(): string {
		if (this._errorType === ErrorTypes.http) {
			switch (this._httpStatus) {
				case HttpStatuses.status400:
					return 'בוצע בקשה לא תקינה'
				case HttpStatuses.status401:
					return 'לא מורשה'
				case HttpStatuses.status404:
					return 'משאב לא נמצא'
				case HttpStatuses.status500:
					return 'שגיאת שרת, אנא נסה שוב מאוחר יותר'
				default:
					return ''
			}
		} else {
			return this._error.message
		}
	}
	
	
	public closeThisDialog(): void {
		setTimeout(() => {
			this._dialogRef.close()
			setTimeout(() => { this._applicationRef.tick() })
		})
	}
	
	public reloadSite(): void {
		location.reload()
	}
	
	public openLoginComponent(): void {
		this._dialogRef.close()
		this.data.subject.next(DialogComponents.login)
	}
}
