import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VehicleI, OrderI } from 'src/app/ts/interfaces/model.interfaces';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { MatDialog } from '@angular/material/dialog';
import { CarDetailsDialogComponent } from 'src/app/components/dialogs/car-details-dialog/car-details-dialog.component';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'crd-user-order-details',
	templateUrl: './user-order-details.component.html',
	styleUrls: ['./user-order-details.component.scss']
})
export class UserOrderDetailsComponent implements OnInit, OnDestroy {
	
	@ViewChild('numOfDays', { static: false }) private _numOfDays: ElementRef<HTMLInputElement>
	public get days(): number {
		return this._numOfDays ? +this._numOfDays.nativeElement.value : 0
	}
	public set days(days: number) {
		if (this._numOfDays) this._numOfDays.nativeElement.value = days.toString()
	}
	
	public get dateNow(): Date {
		return new Date()
	}
	
	private _routeParameterId: number
	
	public car: VehicleI
	
	public order: OrderI
	
	private _carAvatar: ImageI
	public get carAvatar(): ImageI {
		return this._carAvatar
	}

	public get pictureUrlPrefix(): string {
		return Helper.isProd ? '' : Helper.testUrl
	}

	constructor(
		private _Http: HttpService,
		private _Storage: StorageService,
		public router: Router,
		private _ActivatedRoute: ActivatedRoute,
		private _MatDialog: MatDialog,
		private _Changes: ChangesService,
		private _snackBar: MatSnackBar,
	) {
		this._carAvatar = this._Storage.imagesStore.getImages(ImageTypes.carsAvatar) as ImageI
	}

	ngOnInit() {
		this._routeParameterId  = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		this.order = ModelsFactory.createOrderModel()
		this._getCarsData()
	}
	
	ngOnDestroy() {
		this._Storage.cache.setData(this, this._routeParameterId, this.days)
	}

	private _getCarsData(): void {
		if (this._routeParameterId && typeof (this._routeParameterId) == 'number') {
			this._Http.VehiclesApi
				.getVehicleById(this._routeParameterId)
				.subscribe(r => {
					if (r) {
						this.car = ModelsFactory.createVehicleModel()
						Object.assign(this.car, r)
						
						if (this._Storage.cache.hasData(this, this._routeParameterId)) {
							setTimeout(() => {
								this.days = this._Storage.cache.getData(this, this._routeParameterId)
							})
						}
					}
				})
		} else {
			console.error("User Order component didn't get an valid vehicle id!")
		}
	}
	
	public sendOrder(): void {
		const date = this.dateNow
		this.order.vehicleId = this.car.vehicleId
		this.order.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
		this.order.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + this.days)
		this._Http.OrdersApi
		.addOrder(this.order)
		.subscribe(r => {
			if (r) {
				Object.assign(this.order, r)
				this._Changes.userOrderChange.next(this.order)
				this._snackBar.open('ההזמנה בוצעה בהצלחה', 'סגור', { duration: 15 })
				this.router.navigateByUrl('userOrders')
			}
		})
	}
	
	public showCarsDetails(): void {
		this._MatDialog.open(CarDetailsDialogComponent, { data: this.car.vehicleId })
	}
}
