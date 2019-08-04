import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { VehicleI, VehicleManufacturerI, VehicleModelI, GearTypeI } from 'src/app/ts/interfaces/model.interfaces';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';
import { MatDialog } from '@angular/material/dialog';
import { CarDetailsDialogComponent } from 'src/app/components/dialogs/car-details-dialog/car-details-dialog.component';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { CommonCacheTokens } from 'src/app/ts/enums/common-cache-tokens.enum';
import { Router } from '@angular/router';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'crd-cars-list',
	templateUrl: './cars-list.component.html',
	styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit, OnDestroy {

	public manufacturerFilterValue: number | string
	public modelFilterValue: number | string
	public gearFilterValue: number | string
	public fromYearFilterValue: number | string
	public toYearFilterValue: number | string
	public fastSearchFilterValue: number | string

	private _intervalIndex: number

	public carsList: VehicleI[]
	public favoriteCars: VehicleI[]
	public manufacturers: VehicleManufacturerI[]
	public models: VehicleModelI[]
	public gears: GearTypeI[]

	private _carAvatar: ImageI
	public get carAvatar(): ImageI {
		return this._carAvatar
	}

	public get pictureUrlPrefix(): string {
		return Helper.isProd ? '' : Helper.testUrl
	}

	private _sub: Subscription

	constructor(
		private _Http: HttpService,
		private _Storage: StorageService,
		private _MatDialog: MatDialog,
		private _MatDialogsService: MatDialogsService,
		private _router: Router,
		private _changes: ChangesService,
	) {
		this.carsList = new Array()
		this.favoriteCars = new Array()
		this.manufacturers = new Array()
		this.models = new Array()
		this.gears = new Array()
		this._carAvatar = this._Storage.imagesStore.getImages(ImageTypes.carsAvatar) as ImageI
	}

	ngOnInit() {
		this._getData()
		this._intervalIndex = window.setInterval(() => this._getData(true), 60 * 1000)
		this._setSubscribers()
	}

	ngOnDestroy() {
		window.clearInterval(this._intervalIndex)
		if (this._sub) this._sub.unsubscribe()
	}

	onNavigationIn() {
		this._getData()
	}

	private _getData(onlyCarsFlag: boolean = false) {
		this._Http.VehiclesApi
			.getAllRentableVehicles()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					if (!Helper.objectCompare(r, this.carsList)) {
						this.carsList = new Array()
						r.forEach(c => {
							let car = ModelsFactory.createVehicleModel()
							this.carsList.push(Object.assign(car, c))
						})
						this._getFavoriteCars()
					}
				} else {
					this.carsList = new Array()
					this.favoriteCars = new Array()
				}
			})
		if (onlyCarsFlag) return

		this._Http.VehicleManufacturersApi
			.getAllVehicleManufacturers()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.manufacturers = new Array()
					r.forEach(m => {
						let manufacturer = ModelsFactory.createVehicleManufacturerModel()
						this.manufacturers.push(Object.assign(manufacturer, m))
					})
				}
			})

		this._Http.VehicleModelsApi
			.getAllVehicleModels()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.models = new Array()
					r.forEach(m => {
						let model = ModelsFactory.createVehicleModelModel()
						this.models.push(Object.assign(model, m))
					})
				}
			})

		this._Http.GearTypesApi
			.getAllGearTypes()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.gears = new Array()
					r.forEach(g => {
						let gearType = ModelsFactory.createGearTypeModel()
						this.gears.push(Object.assign(gearType, g))
					})
				}
			})
	}

	private _setSubscribers(): void {
		this._sub = this._changes.userOrderChange
			.subscribe(data => {
				if (data) {
					const i = this.carsList.findIndex(c => c.vehicleId == data.vehicleId)
					if (i >= 0) {
						this.carsList.splice(i, 1)
					}
					const j = this.favoriteCars.findIndex(c => c.vehicleId == data.vehicleId)
					if (j >= 0) {
						this.carsList.splice(j, 1)
					}
				}
			})
	}

	public showCarsDetails(id: number): void {
		this._MatDialog.open(CarDetailsDialogComponent, { data: id })
	}

	public storeCarToFavorite(id: number): void {
		if (this.favoriteCars.find(car => car.vehicleId == id)) return
		const user = this._Storage.user
		if (user && user.userId) {
			this._Storage.appLocalStorage.setFavoriteCars(user.userId, id)
		} else {
			this._Storage.appLocalStorage.setFavoriteCars('unregistered', id)
		}
		this._getFavoriteCars()
	}

	private _getFavoriteCars(): void {
		const user = this._Storage.user
		let ids = new Array()
		if (user && user.userId) {
			ids = this._Storage.appLocalStorage.getFavoriteCars(user.userId)
		} else {
			ids = this._Storage.appLocalStorage.getFavoriteCars('unregistered')
		}
		if (ids && ids.length > 0) {
			this.favoriteCars = new Array()
			this.carsList.forEach(c => {
				if (ids.indexOf(c.vehicleId) != -1) {
					this.favoriteCars.push({ ...c })
				}
			})
		}
	}

	public manufacturerSelectionChange(): void {
		const model = this.models.find(m => m.vehicleModelId == this.modelFilterValue)
		if (!model) return
		if (model.manufacturer.vehicleManufacturerId != this.manufacturerFilterValue) {
			this.modelFilterValue = ""
		}
	}

	public modelSelectionChange(): void {
		const model = this.models.find(m => m.vehicleModelId == this.modelFilterValue)
		if (!model) return
		const manufacturer = this.manufacturers.find(m => m.vehicleManufacturerId == model.manufacturer.vehicleManufacturerId)
		this.manufacturerFilterValue = manufacturer ? manufacturer.vehicleManufacturerId : ""
	}

	public openOrder(id: number): void {
		if (!this._Storage.isLoggedIn) {
			this._Storage.commonCache.setData(CommonCacheTokens.requestedCar, id)
			this._MatDialogsService.openLoginDialog()
		} else {
			this._router.navigateByUrl('userOrders/' + id)
		}
	}
}
