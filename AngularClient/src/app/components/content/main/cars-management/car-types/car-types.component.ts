import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleTypeI, VehicleModelI } from 'src/app/ts/interfaces/model.interfaces';
import { Subscription } from 'rxjs';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { FilterI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';

@Component({
	selector: 'crd-car-types',
	templateUrl: './car-types.component.html',
	styleUrls: ['./car-types.component.scss']
})
export class CarTypesComponent implements OnInit, OnDestroy {
	
	@ViewChild(MatSort, { static: false }) private _sort: MatSort
	@ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator

	public get columns(): string[] {
		return ['index', 'vehicleTypeId', 'isActive', 'name', 'edit', 'toggleActive']
	}
	
	public fastSearch: string = ''
	public showOnlyActive: boolean = true
	
	private _entities: VehicleTypeI[]
	private _changeSub: Subscription
	
	private _dataSource: MatTableDataSource<VehicleTypeI>
	public get dataSource(): MatTableDataSource<VehicleTypeI> {
		return this._dataSource
	}

	constructor(
		private _MatDialogsService: MatDialogsService,
		private _Http: HttpService,
		private _ChangesService: ChangesService,
		public snackBar: MatSnackBar,
	) {
		this._entities = new Array<VehicleTypeI>()
	}

	ngOnInit() {
		this.getData()
		this._setSubscribers()
	}
	
	ngOnDestroy() {
		if (this._changeSub) this._changeSub.unsubscribe()
	}
	
	private _setSubscribers(): void {
		this._changeSub = this._ChangesService.carTypeChange
			.subscribe(data => {
				let isNew = true
				this._entities.forEach(x => {
					if (x.vehicleTypeId === data.vehicleTypeId) {
						Object.assign(x, data)
						isNew = false
						return
					}
				})
				if (isNew) {
					const newEntity = ModelsFactory.createVehicleTypeModel()
					Object.assign(newEntity, data)
					this._entities.push(newEntity)
				}
				this.applyFilters()
			})
	}
	
	public getData(): void {
		this._Http.VehicleTypesApi
			.getAllVehicleTypes()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this._entities = new Array<VehicleModelI>()
					r.forEach(x => {
						let entity = ModelsFactory.createVehicleTypeModel()
						this._entities.push(Object.assign(entity, x))
					})
					this._setDataSource()
					this._setFilterPredicate()
					this.applyFilters()
				}
			})
	}
	
	public deleteUser(id: number): void {
		this._Http.VehicleTypesApi
			.deleteVehicleType(id)
			.subscribe(r => {
				if (r) {
					this._entities.forEach(x => {
						if (x.vehicleTypeId === id) Object.assign(x, r)
					})
					this.applyFilters()
					this.snackBar.open('הנתונים נשמרו', 'סגור')
				} else {
					this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
				}
			})
	}

	public restoreUser(id: number): void {
		this._Http.VehicleTypesApi
			.restoreVehicleType(id)
			.subscribe(r => {
				if (r) {
					this._entities.forEach(x => {
						if (x.vehicleTypeId === id) Object.assign(x, r)
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
				columns: ['vehicleTypeId', 'name'],
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
		(<any>this._dataSource).filterPredicate = (data: VehicleTypeI, filtersJson: FilterI[]): boolean => {
			const matchFilter: Array<boolean> = new Array()
			const filters = filtersJson

			filters.forEach((filter: FilterI) => {
				let result: boolean = false
				for (let i = 0; !result && i < filter.columns.length; i++) {
					let col = filter.columns[i]
					let val = Helper.fetchFromObject(data, col)
					val = val === null ? '' : val
					result = filter.filter(val, filter.value)
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
