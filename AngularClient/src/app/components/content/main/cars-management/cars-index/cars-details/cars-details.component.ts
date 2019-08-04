import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { VehicleI, BranchI, CarClassI, GearTypeI, VehicleModelI } from 'src/app/ts/interfaces/model.interfaces';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';
import { MatDialog } from '@angular/material/dialog';
import { ImgUploaderComponent } from 'src/app/components/dialogs/img-uploader/img-uploader.component';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { CanComponentDeactivate } from 'src/app/ts/interfaces/components.interfaces';

@Component({
	selector: 'crd-cars-details',
	templateUrl: './cars-details.component.html',
	styleUrls: ['./cars-details.component.scss']
})
export class CarsDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false

	private _routeParameterId: number
	public get isExistingCar(): boolean {
		return !isNaN(this.model.vehicleId)
	}

	@ViewChild('carForm', { static: false }) public carForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.carForm.dirty
	}
	public get isDataValid(): boolean {
		return this.carForm.valid
	}

	public get minDate(): Date {
		return new Date(1960, 0, 1)
	}
	public get maxDate(): Date {
		return new Date()
	}

	private _carAvatar: ImageI
	public get carAvatar(): ImageI {
		return this._carAvatar
	}

	public get pictureUrl(): string {
		if (!this.model.picturePath) return ''
		if (!Helper.isProd) {
			return Helper.testUrl + this.model.picturePath
		}
		return this.model.picturePath
	}

	public model: VehicleI
	public branches: BranchI[]
	public carClasses: CarClassI[]
	public gearTypes: GearTypeI[]
	public carModels: VehicleModelI[]

	constructor(
		@Inject('NUMERIC_ONLY') public readonly numericOnly: RegExp,
		private _MatDialogsService: MatDialogsService,
		private _ActivatedRoute: ActivatedRoute,
		private _Http: HttpService,
		public router: Router,
		public snackBar: MatSnackBar,
		private _ChangesService: ChangesService,
		private _Storage: StorageService,
		private _MatDialog: MatDialog,
	) {
		this.branches = new Array()
		this.carClasses = new Array()
		this.gearTypes = new Array()
		this.carModels = new Array()
		this._carAvatar = this._Storage.imagesStore.getImages(ImageTypes.carsAvatar) as ImageI
	}

	ngOnInit() {
		this._routeParameterId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		if (isNaN(this._routeParameterId)) {
			this.model = ModelsFactory.createVehicleModel()
			this.model.isProper = true
			this.model.isAvailable = true
		} else {
			this.getData(this._routeParameterId)
		}
		this._getSelectOptions()
	}

	public getData(id?: number) {
		this._Http.VehiclesApi.getVehicleById(id || this.model.vehicleId)
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
		this._Http.BranchesApi
			.getAllBranches()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.branches = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createBranchModel()
						Object.assign(elem, x)
						this.branches.push(elem)
					})
				}
			})
		this._Http.CarClassesApi
			.getAllCarClasses()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.carClasses = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createCarClassModel()
						Object.assign(elem, x)
						this.carClasses.push(elem)
					})
				}
			})
		this._Http.GearTypesApi
			.getAllGearTypes()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.gearTypes = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createGearTypeModel()
						Object.assign(elem, x)
						this.gearTypes.push(elem)
					})
				}
			})
		this._Http.VehicleModelsApi
			.getAllVehicleModels()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.carModels = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createVehicleModelModel()
						Object.assign(elem, x)
						this.carModels.push(elem)
					})
				}
			})
	}

	public saveData() {
		this.carForm.control.markAllAsTouched()
		if (this.model && this.carForm.valid) {
			if (this.model.vehicleId) {
				this._Http.VehiclesApi
					.updateVehicle(this.model)
					.subscribe(res => this.updateData(res))
			} else {
				this._Http.VehiclesApi
					.addVehicle(this.model)
					.subscribe(res => this.updateData(res))
			}
		}
	}

	private updateData(data: VehicleI): void {
		if (data) {
			this.carForm.resetForm(this.carForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.carIndexChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.vehicleId)
				this._routeParameterId = this.model.vehicleId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}

	private _setModel(model: VehicleI): void {
		this.model = ModelsFactory.createVehicleModel()
		Object.assign(this.model, model)
	}

	public openImgUpload(): void {
		this._MatDialog
			.open(ImgUploaderComponent, { data: ImageTypes.carsAvatar })
			.beforeClosed()
			.subscribe(res => {
				if (res) {
					this._Http.VehiclesApi.updateVehiclesPicturePath(this.model.vehicleId, res)
						.subscribe(r => {
							this.model.picturePath = r
							this._ChangesService.carIndexChange.next(this.model)
						})
				}
			})
	}
}
