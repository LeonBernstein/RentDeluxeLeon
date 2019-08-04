import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { VehicleManufacturerI } from 'src/app/ts/interfaces/model.interfaces';
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
	selector: 'crd-car-manufacturers-details',
	templateUrl: './car-manufacturers-details.component.html',
	styleUrls: ['./car-manufacturers-details.component.scss']
})
export class CarManufacturersDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false

	private _routeParameterId: number

	@ViewChild('carManufacturerForm', { static: false }) public carManufacturerForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.carManufacturerForm.dirty
	}
	public get isDataValid(): boolean {
		return this.carManufacturerForm.valid
	}
	
	public model: VehicleManufacturerI

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
			this.model = ModelsFactory.createVehicleManufacturerModel()
		} else {
			this.getData(this._routeParameterId)
		}
	}

	public getData(id?: number) {
		this._Http.VehicleManufacturersApi.getVehicleManufacturerById(id || this.model.vehicleManufacturerId)
			.subscribe(r => {
				if (r) {
					this._setModel(r)
				} else {
					this._MatDialogsService.openErrorDialog("Can't retrieve data from DB!", ErrorTypes.warning)
				}
			})
	}
	
	public saveData() {
		this.carManufacturerForm.control.markAllAsTouched()
		if (this.model && this.carManufacturerForm.valid) {
			if (this.model.vehicleManufacturerId) {
				this._Http.VehicleManufacturersApi
					.updateVehicleManufacturer(this.model)
					.subscribe(res => this.updateData(res))
			} else {
				this._Http.VehicleManufacturersApi
					.addVehicleManufacturer(this.model)
					.subscribe(res => this.updateData(res))
			}
		}
	}
	
	private updateData(data: VehicleManufacturerI): void {
		if (data) {
			this.carManufacturerForm.resetForm(this.carManufacturerForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.carManufacturerChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.vehicleManufacturerId)
				this._routeParameterId = this.model.vehicleManufacturerId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}
	
	private _setModel(model: VehicleManufacturerI): void {
		this.model = ModelsFactory.createVehicleManufacturerModel()
		Object.assign(this.model, model)
	}
}
