import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CarClassI } from 'src/app/ts/interfaces/model.interfaces';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FilterI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';

@Component({
	selector: 'crd-car-classes',
	templateUrl: './car-classes.component.html',
	styleUrls: ['./car-classes.component.scss']
})
export class CarClassesComponent implements OnInit, OnDestroy {
	
	@ViewChild(MatSort, { static: false }) private _sort: MatSort
	@ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator
	
	public get columns(): string[] {
		return ['index', 'carClassId', 'isActive', 'name','dailyPrice', 'delayDailyPrice', 'edit', 'toggleActive']
	}
	
	public fastSearch: string = ''
	public showOnlyActive: boolean = true
	
	
	private _entities: CarClassI[]
	private _changeSub: Subscription
	
	private _dataSource: MatTableDataSource<CarClassI>
	public get dataSource(): MatTableDataSource<CarClassI> {
		return this._dataSource
	}

	constructor(
		private _MatDialogsService: MatDialogsService,
		private _Http: HttpService,
		private _ChangesService: ChangesService,
		public snackBar: MatSnackBar,
	) {
		this._entities = new Array<CarClassI>()
	}

	ngOnInit() {
		this.getData()
		this._setSubscribers()
	}
	
	ngOnDestroy() {
		if (this._changeSub) this._changeSub.unsubscribe()
	}
	
	private _setSubscribers(): void {
		this._changeSub = this._ChangesService.carClassChange
			.subscribe(data => {
				let isNew = true
				this._entities.forEach(x => {
					if (x.carClassId === data.carClassId) {
						Object.assign(x, data)
						isNew = false
						return
					}
				})
				if (isNew) {
					const newEntity = ModelsFactory.createCarClassModel()
					Object.assign(newEntity, data)
					this._entities.push(newEntity)
				}
				this.applyFilters()
			})
	}
	
	public getData(): void {
		this._Http.CarClassesApi
			.getAllCarClasses()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this._entities = new Array<CarClassI>()
					r.forEach(x => {
						let entity = ModelsFactory.createCarClassModel()
						this._entities.push(Object.assign(entity, x))
					})
					this._setDataSource()
					this._setFilterPredicate()
					this.applyFilters()
				}
			})
	}
	
	public deleteUser(id: number): void {
		this._Http.CarClassesApi
			.deleteCarClass(id)
			.subscribe(r => {
				if (r) {
					this._entities.forEach(x => {
						if (x.carClassId === id) Object.assign(x, r)
					})
					this.applyFilters()
					this.snackBar.open('הנתונים נשמרו', 'סגור')
				} else {
					this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
				}
			})
	}

	public restoreUser(id: number): void {
		this._Http.CarClassesApi
			.restoreCarClass(id)
			.subscribe(r => {
				if (r) {
					this._entities.forEach(x => {
						if (x.carClassId === id) Object.assign(x, r)
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
				columns: ['carClassId', 'name', 'dailyPrice', 'delayDailyPrice'],
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
		(<any>this._dataSource).filterPredicate = (data: CarClassI, filtersJson: FilterI[]): boolean => {
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
