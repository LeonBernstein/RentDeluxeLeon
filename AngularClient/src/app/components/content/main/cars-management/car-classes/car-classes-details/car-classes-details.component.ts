import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CarClassI } from 'src/app/ts/interfaces/model.interfaces';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { NgForm, FormGroupDirective, NgModel } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/ts/interfaces/components.interfaces';

@Component({
	selector: 'crd-car-classes-details',
	templateUrl: './car-classes-details.component.html',
	styleUrls: ['./car-classes-details.component.scss']
})
export class CarClassesDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false
	
	private _routeParameterId: number

	@ViewChild('carClassForm', { static: false }) public carClassForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.carClassForm.dirty
	}
	public get isDataValid(): boolean {
		return this.carClassForm.valid
	}

	public model: CarClassI

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
		this._routeParameterId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		if (isNaN(this._routeParameterId) && !this.isNavigating) {
			this.model = ModelsFactory.createCarClassModel()
		} else {
			this.getData(this._routeParameterId)
		}
	}

	public getData(id?: number) {
		this._Http.CarClassesApi.getCarClassById(id || this.model.carClassId)
			.subscribe(r => {
				if (r) {
					this._setModel(r)
				} else {
					this._MatDialogsService.openErrorDialog("Can't retrieve data from DB!", ErrorTypes.warning)
				}
			})
	}
	
	public setPrice(formControl: NgModel): void {
		this.model[formControl.name] = isNaN(formControl.control.value) ? 0 : +formControl.control.value
	}
	
	public saveData() {
		this.carClassForm.control.markAllAsTouched()
		if (this.model && this.carClassForm.valid) {
			if (this.model.carClassId) {
				this._Http.CarClassesApi
					.updateCarClass(this.model)
					.subscribe(res => this.updateData(res))
			} else {
				this._Http.CarClassesApi
					.addCarClass(this.model)
					.subscribe(res => this.updateData(res))
			}
		}
	}
	
	private updateData(data: CarClassI): void {
		if (data) {
			this.carClassForm.resetForm(this.carClassForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.carClassChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.carClassId)
				this._routeParameterId = this.model.carClassId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}
	
	private _setModel(model: CarClassI): void {
		this.model = ModelsFactory.createCarClassModel()
		Object.assign(this.model, model)
	}
}
