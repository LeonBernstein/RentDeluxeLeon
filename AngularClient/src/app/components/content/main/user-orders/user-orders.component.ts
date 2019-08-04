import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderI } from 'src/app/ts/interfaces/model.interfaces';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { CurrentUserService } from 'src/app/ts/services/current-user.service';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';

@Component({
	selector: 'crd-user-orders',
	templateUrl: './user-orders.component.html',
	styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
	
	@ViewChild(MatSort, { static: false }) private _sort: MatSort
	@ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator
	
	public get columns(): string[] {
		return ['orderId', 'vehicle.vehicleNumber', 'startDate', 'endDate', 'actualEndDate', 'vehicle.model.name', 'vehicle.model.manufacturer.name', 'price', 'totalPrice']
	}
	
	private _entities: OrderI[]
	private _changeSub: Subscription
	
	private _dataSource: MatTableDataSource<OrderI>
	public get dataSource(): MatTableDataSource<OrderI> {
		return this._dataSource
	}

	constructor(
		private _Http: HttpService,
		private _ChangesService: ChangesService,
		private _CurrentUser: CurrentUserService
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
			.getOrdersByUserId(this._CurrentUser.user.userId)
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
				}
			})
	}
	
	private _setSubscribers(): void {
		this._changeSub = this._ChangesService.userOrderChange
			.subscribe(data => {
				const newEntity = ModelsFactory.createOrderModel()
				Object.assign(newEntity, data)
				if (!this._entities) {
					this._entities = new Array()
				}
				this._entities.push(newEntity)
				this._setDataSource()
			})
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
