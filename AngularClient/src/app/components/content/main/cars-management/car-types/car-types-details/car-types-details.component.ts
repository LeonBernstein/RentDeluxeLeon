import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { VehicleTypeI } from 'src/app/ts/interfaces/model.interfaces';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/ts/interfaces/components.interfaces';

@Component({
	selector: 'crd-car-types-details',
	templateUrl: './car-types-details.component.html',
	styleUrls: ['./car-types-details.component.scss']
})
export class CarTypesDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false
	
	private _routeParameterId: number

	@ViewChild('carTypeForm', { static: false }) public carTypeForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.carTypeForm.dirty
	}
	public get isDataValid(): boolean {
		return this.carTypeForm.valid
	}

	public model: VehicleTypeI

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
		this._routeParameterId  = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		if (isNaN(this._routeParameterId)) {
			this.model = ModelsFactory.createVehicleTypeModel()
		} else {
			this.getData(this._routeParameterId)
		}
	}

	public getData(id?: number) {
		this._Http.VehicleTypesApi.getVehicleTypeById(id || this.model.vehicleTypeId)
			.subscribe(r => {
				if (r) {
					this._setModel(r)
				} else {
					this._MatDialogsService.openErrorDialog("Can't retrieve data from DB!", ErrorTypes.warning)
				}
			})
	}
	
	public saveData() {
		this.carTypeForm.control.markAllAsTouched()
		if (this.model && this.carTypeForm.valid) {
			if (this.model.vehicleTypeId) {
				this._Http.VehicleTypesApi
					.updateVehicleType(this.model)
					.subscribe(res => this.updateData(res))
			} else {
				this._Http.VehicleTypesApi
					.addVehicleType(this.model)
					.subscribe(res => this.updateData(res))
			}
		}
	}
	
	private updateData(data: VehicleTypeI): void {
		if (data) {
			this.carTypeForm.resetForm(this.carTypeForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.carTypeChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.vehicleTypeId)
				this._routeParameterId = this.model.vehicleTypeId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}
	
	private _setModel(model: VehicleTypeI): void {
		this.model = ModelsFactory.createVehicleTypeModel()
		Object.assign(this.model, model)
	}
}
