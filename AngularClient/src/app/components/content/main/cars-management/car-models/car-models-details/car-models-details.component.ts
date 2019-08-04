import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { VehicleModelI, VehicleManufacturerI, VehicleTypeI } from 'src/app/ts/interfaces/model.interfaces';
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
	selector: 'crd-car-models-details',
	templateUrl: './car-models-details.component.html',
	styleUrls: ['./car-models-details.component.scss']
})
export class CarModelsDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false

	private _routeParameterId: number

	@ViewChild('carModelForm', { static: false }) public carModelForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.carModelForm.dirty
	}
	public get isDataValid(): boolean {
		return this.carModelForm.valid
	}

	public model: VehicleModelI
	public manufacturers: VehicleManufacturerI[]
	public vehicleTypes: VehicleTypeI[]

	constructor(
		@Inject('NUMERIC_ONLY') public readonly numericOnly: RegExp,
		private _MatDialogsService: MatDialogsService,
		private _ActivatedRoute: ActivatedRoute,
		private _Http: HttpService,
		public router: Router,
		public snackBar: MatSnackBar,
		private _ChangesService: ChangesService,
	) {
		this.manufacturers = new Array()
		this.vehicleTypes = new Array()
	}

	ngOnInit() {
		this._routeParameterId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		if (isNaN(this._routeParameterId)) {
			this.model = ModelsFactory.createVehicleModelModel()
		} else {
			this.getData(this._routeParameterId)
		}
		this._getSelectOptions()
	}

	public getData(id?: number) {
		this._Http.VehicleModelsApi.getVehicleModelById(id || this.model.vehicleModelId)
			.subscribe(r => {
				if (r) {
					this._setModel(r)
				} else {
					this._MatDialogsService.openErrorDialog("Can't retrieve data from DB!", ErrorTypes.warning)
				}
			})
		if (!id) this._getSelectOptions()
	}

	private _getSelectOptions(): void {
		this._Http.VehicleManufacturersApi
			.getAllVehicleManufacturers()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.manufacturers = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createVehicleManufacturerModel()
						Object.assign(elem, x)
						this.manufacturers.push(elem)
					})
				}
			})
		this._Http.VehicleTypesApi
			.getAllVehicleTypes()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.vehicleTypes = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createVehicleTypeModel()
						Object.assign(elem, x)
						this.vehicleTypes.push(elem)
					})
				}
			})
	}

	public saveData() {
		this.carModelForm.control.markAllAsTouched()
		if (this.model && this.carModelForm.valid) {
			if (this.model.vehicleModelId) {
				this._Http.VehicleModelsApi
					.updateVehicleModel(this.model)
					.subscribe(res => this.updateData(res))
			} else {
				this._Http.VehicleModelsApi
					.addVehicleModel(this.model)
					.subscribe(res => this.updateData(res))
			}
		}
	}

	private updateData(data: VehicleModelI): void {
		if (data) {
			this.carModelForm.resetForm(this.carModelForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.carModelChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.vehicleModelId)
				this._routeParameterId = this.model.vehicleModelId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}

	private _setModel(model: VehicleModelI): void {
		this.model = ModelsFactory.createVehicleModelModel()
		Object.assign(this.model, model)
	}
}
