import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderI, VehicleI, UserI } from 'src/app/ts/interfaces/model.interfaces';
import { FormGroupDirective, NgForm, NgModel } from '@angular/forms';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { CanComponentDeactivate } from 'src/app/ts/interfaces/components.interfaces';

@Component({
	selector: 'app-order-details',
	templateUrl: './order-details.component.html',
	styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false

	private _routeParameterId: number

	@ViewChild('orderForm', { static: false }) public orderForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.orderForm.dirty
	}
	public get isDataValid(): boolean {
		return this.orderForm.valid
	}

	public get minDate(): Date {
		return new Date(1960, 0, 1)
	}

	public model: OrderI
	public cars: VehicleI[]
	public users: UserI[]

	constructor(
		private _MatDialogsService: MatDialogsService,
		private _ActivatedRoute: ActivatedRoute,
		private _Http: HttpService,
		public router: Router,
		public snackBar: MatSnackBar,
		private _ChangesService: ChangesService,
	) {
		this.cars = new Array()
		this.users = new Array()
	}

	ngOnInit() {
		this._routeParameterId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		this.getData()
	}

	public getData() {
		this._Http.OrdersApi.getOrderById(this._routeParameterId)
			.subscribe(r => {
				if (r) {
					this._setModel(r)
				} else {
					this._MatDialogsService.openErrorDialog("Can't retrieve data from DB!", ErrorTypes.warning)
				}
			})
		this._Http.VehiclesApi
			.getAllVehicles()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.cars = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createVehicleModel()
						Object.assign(elem, x)
						this.cars.push(elem)
					})
				}
			})
		this._Http.UsersApi
			.getAllUsers()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this.users = new Array()
					r.forEach(x => {
						let elem = ModelsFactory.createUserModel()
						Object.assign(elem, x)
						this.users.push(elem)
					})
				}
			})
	}

	public saveData() {
		this.orderForm.control.markAllAsTouched()
		if (this.model && this.orderForm.valid) {
			this._Http.OrdersApi
				.updateOrder(this.model)
				.subscribe(res => this.updateData(res))
		}
	}

	private updateData(data: OrderI): void {
		if (data) {
			this.orderForm.resetForm(this.orderForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.orderChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.vehicleId)
				this._routeParameterId = this.model.orderId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}

	private _setModel(model: OrderI): void {
		this.model = ModelsFactory.createOrderModel()
		Object.assign(this.model, model)
	}
	
	public setPrice(formControl: NgModel): void {
		this.model[formControl.name] = isNaN(formControl.control.value) ? 0 : +formControl.control.value
	}
}
