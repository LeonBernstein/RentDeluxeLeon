import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderI } from 'src/app/ts/interfaces/model.interfaces';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { CurrentUserService } from 'src/app/ts/services/current-user.service';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { FilterI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { OrderReturnConfirmComponent } from 'src/app/components/dialogs/order-return-confirm/order-return-confirm.component';

@Component({
	selector: 'crd-car-return',
	templateUrl: './car-return.component.html',
	styleUrls: ['./car-return.component.scss']
})
export class CarReturnComponent implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: false }) private _sort: MatSort
	@ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator

	public get columns(): string[] {
		return ['orderId', 'vehicle.vehicleNumber', 'user.person.firstName', 'user.person.lastName', 'user.person.idCardNum', 'startDate', 'endDate', 'actualEndDate', 'vehicle.model.name', 'vehicle.model.manufacturer.name', 'price', 'totalPrice', 'return']
	}

	public fastSearch: string = ''
	public showOnlyActive: boolean = true

	private _entities: OrderI[]
	private _changeSub: Subscription

	private _dataSource: MatTableDataSource<OrderI>
	public get dataSource(): MatTableDataSource<OrderI> {
		return this._dataSource
	}

	constructor(
		private _MatDialogsService: MatDialogsService,
		private _Http: HttpService,
		private _ChangesService: ChangesService,
		public snackBar: MatSnackBar,
		private _dialog: MatDialog,
	) { }


	ngOnInit() {
		this.getData()
		this._setSubscribers()
	}

	ngOnDestroy() {
		if (this._changeSub) this._changeSub.unsubscribe()
	}

	public getData(): void {
		this._Http.OrdersApi
			.getAllOrders()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this._entities = new Array<OrderI>()
					r.forEach(x => {
						if (x.isActive) {
							let entity = ModelsFactory.createVehicleModel()
							this._entities.push(Object.assign(entity, x))
						}
					})
					this._setDataSource()
					this._setFilterPredicate()
					this.applyFilters()
				}
			})
	}

	private _setSubscribers(): void {
		this._changeSub = this._ChangesService.orderChange
			.subscribe(data => {
				this._entities.forEach(x => {
					if (x.orderId === data.orderId) {
						Object.assign(x, data)
					}
				})
				this.applyFilters()
			})
	}

	public returnOrder(id: number): void {
		const order = this._entities.find(e => e.orderId == id)
		this._dialog
			.open(OrderReturnConfirmComponent, { data: order })
			.beforeClosed()
			.subscribe(r => {
				if (r) {
					this._Http.OrdersApi
						.setActualEndDate(id)
						.subscribe(r => {
							if (r) {
								this._entities.forEach(x => {
									if (x.orderId === id) Object.assign(x, r)
								})
								this.applyFilters()
								this.snackBar.open('הנתונים נשמרו', 'סגור')
							} else {
								this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
							}
						})
				}
			})
	}

	public applyFilters(): void {
		const filters: FilterI[] = [
			{
				id: 'fastSearch',
				columns: ['orderId', 'vehicle.vehicleNumber', 'user.person.firstName', 'user.person.lastName', 'user.person.idCardNum', 'startDate', 'endDate', 'actualEndDate', 'vehicle.model.name', 'vehicle.model.manufacturer.name', 'price', 'totalPrice'],
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
		(<any>this._dataSource).filterPredicate = (data: OrderI, filtersJson: FilterI[]): boolean => {
			const matchFilter: Array<boolean> = new Array()
			const filters = filtersJson

			filters.forEach((filter: FilterI) => {
				let result: boolean = false
				for (let i = 0; !result && i < filter.columns.length; i++) {
					let col = filter.columns[i]
					if (col == 'user.person.firstName' ||
							col == 'user.person.lastName'
					) {
						continue;
					}
					let val = Helper.fetchFromObject(data, col)
					val = val === null ? '' : val
					if (val && (col == 'startDate' || col == 'endDate' || col == 'actualEndDate')) {
						val = new Date(val).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
					}
					let searchVal = filter.value
					if (val && col == 'vehicle.vehicleNumber' && typeof (searchVal) == 'string') {
						searchVal = searchVal.replace(/-/g, '')
					}
					result = filter.filter(val, searchVal)
				}
				if (!result && filter.id === 'fastSearch') {
					let val = Helper.fetchFromObject(data, 'user.person.firstName') + ' ' + Helper.fetchFromObject(data, 'user.person.lastName')
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
