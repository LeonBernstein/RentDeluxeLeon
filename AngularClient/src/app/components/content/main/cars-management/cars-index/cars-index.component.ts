import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleI } from 'src/app/ts/interfaces/model.interfaces';
import { Subscription } from 'rxjs';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { FilterI, ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';

@Component({
	selector: 'crd-cars-index',
	templateUrl: './cars-index.component.html',
	styleUrls: ['./cars-index.component.scss']
})
export class CarsIndexComponent implements OnInit, OnDestroy {
	
	@ViewChild(MatSort, { static: false }) private _sort: MatSort
	@ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator

	public get columns(): string[] {
		return ['index', 'vehicleId', 'isActive', 'picturePath', 'vehicleNumber', 'manufactureDate', 'mileage', 'isProper', 'isAvailable', 'model.name', 'model.manufacturer.name', 'model.vehicleType.name', 'carClass.name', 'gearType.name', 'atBranch.name', 'edit', 'toggleActive']
	}
	
	public fastSearch: string = ''
	public showOnlyActive: boolean = true
	
	private _entities: VehicleI[]
	private _changeSub: Subscription
	
	private _dataSource: MatTableDataSource<VehicleI>
	public get dataSource(): MatTableDataSource<VehicleI> {
		return this._dataSource
	}
	
	private _carAvatar: ImageI
	public get carAvatar(): ImageI {
		return this._carAvatar
	}
	
	public get pictureUrlPrefix(): string {
		return Helper.isProd ? '' : Helper.testUrl
	}

	constructor(
		private _MatDialogsService: MatDialogsService,
		private _Http: HttpService,
		private _ChangesService: ChangesService,
		public snackBar: MatSnackBar,
		private _Storage: StorageService,
	) {
		this._entities = new Array<VehicleI>()
		this._carAvatar = this._Storage.imagesStore.getImages(ImageTypes.carsAvatar) as ImageI
	}

	ngOnInit() {
		this.getData()
		this._setSubscribers()
	}
	
	ngOnDestroy() {
		if (this._changeSub) this._changeSub.unsubscribe()
	}
	
	private _setSubscribers(): void {
		this._changeSub = this._ChangesService.carIndexChange
			.subscribe(data => {
				let isNew = true
				this._entities.forEach(x => {
					if (x.vehicleId === data.vehicleId) {
						Object.assign(x, data)
						isNew = false
						return
					}
				})
				if (isNew) {
					const newEntity = ModelsFactory.createVehicleModel()
					Object.assign(newEntity, data)
					this._entities.push(newEntity)
				}
				this.applyFilters()
			})
	}
	
	public getData(): void {
		this._Http.VehiclesApi
			.getAllVehicles()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this._entities = new Array<VehicleI>()
					r.forEach(x => {
						let entity = ModelsFactory.createVehicleModel()
						this._entities.push(Object.assign(entity, x))
					})
					this._setDataSource()
					this._setFilterPredicate()
					this.applyFilters()
				}
			})
	}
	
	public deleteCar(id: number): void {
		this._Http.VehiclesApi
			.deleteVehicle(id)
			.subscribe(r => {
				if (r) {
					this._entities.forEach(x => {
						if (x.vehicleId === id) Object.assign(x, r)
					})
					this.applyFilters()
					this.snackBar.open('הנתונים נשמרו', 'סגור')
				} else {
					this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
				}
			})
	}

	public restoreCar(id: number): void {
		this._Http.VehiclesApi
			.restoreVehicle(id)
			.subscribe(r => {
				if (r) {
					this._entities.forEach(x => {
						if (x.vehicleId === id) Object.assign(x, r)
					})
					this.applyFilters()
					this.snackBar.open('הנתונים נשמרו', 'סגור')
				} else {
					this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
				}
			})
	}
	
	public applyFilters(): void {
		const filters: FilterI[] = [
			{
				columns: ['isActive'],
				value: this.showOnlyActive,
				filter: (colVal: boolean, filterVal: boolean) =>  !this.showOnlyActive || colVal === filterVal
			},
			{
				id: 'fastSearch',
				columns: ['vehicleId', 'vehicleNumber', 'manufactureDate', 'mileage', 'isProper', 'isAvailable', 'model.name', 'model.manufacturer.name', 'model.vehicleType.name', 'carClass.name', 'gearType.name', 'atBranch.name'],
				value: this.fastSearch,
				filter: (colVal: string, filterVal: string) => {
					const values: string[] = filterVal.split(' ')
					const check = (val: string) => colVal.toString().toLowerCase().includes(val.toString().toLowerCase())
					return values.every(check)
				}
			},
		];
		(<any>this._dataSource).filter = filters
		if (this._dataSource.paginator) {
			this._dataSource.paginator.firstPage()
		}
	}
	
	private _setFilterPredicate(): void {
		(<any>this._dataSource).filterPredicate = (data: VehicleI, filtersJson: FilterI[]): boolean => {
			const matchFilter: Array<boolean> = new Array()
			const filters = filtersJson

			filters.forEach((filter: FilterI) => {
				let result: boolean = false
				for (let i = 0; !result && i < filter.columns.length; i++) {
					let col = filter.columns[i]
					let val = Helper.fetchFromObject(data, col)
					val = val === null ? '' : val
					if (col == 'manufactureDate' && val) {
						val = new Date(val).toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'})
					}
					let searchVal = filter.value
					if (val && col == 'vehicleNumber' && typeof (searchVal) == 'string') {
						searchVal = searchVal.replace(/-/g, '')
					}
					result = filter.filter(val, searchVal)
				}
				matchFilter.push(result)
			})
			return matchFilter.every(Boolean)
		}
	}
	
	private _setDataSource(): void {
		this._dataSource = new MatTableDataSource(this._entities)
		this._dataSource.sortingDataAccessor = Helper.fetchFromObject
		setTimeout(() => {
			this._dataSource.sort = this._sort
			this._dataSource.paginator = this._paginator
		})
	}
}
