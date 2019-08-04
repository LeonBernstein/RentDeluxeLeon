import { Injectable } from '@angular/core';
import { OnServiceInit, ChangesServiceI } from '../interfaces/services.interfaces';
import { Subject } from 'rxjs';
import { UserI, CarClassI, VehicleManufacturerI, VehicleModelI, VehicleI, VehicleTypeI, GearTypeI, OrderI } from '../interfaces/model.interfaces';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ChangesService implements OnServiceInit, ChangesServiceI {
	
	private _wasInitiated: boolean = false
	
	private _userChange: Subject<void>
	public get userChange(): Subject<void> {
		return this._userChange
	}
	
	private _userManagementChange: Subject<UserI>
	public get userManagementChange(): Subject<UserI> {
		return this._userManagementChange
	}
	
	private _carClassChange: Subject<CarClassI>
	public get carClassChange(): Subject<CarClassI> {
		return this._carClassChange
	}
	
	private _carManufacturerChange: Subject<VehicleManufacturerI>
	public get carManufacturerChange(): Subject<VehicleManufacturerI> {
		return this._carManufacturerChange
	}
	
	private _carModelChange: Subject<VehicleModelI>
	public get carModelChange(): Subject<VehicleModelI> {
		return this._carModelChange
	}
	
	private _carTypeChange: Subject<VehicleTypeI>
	public get carTypeChange(): Subject<VehicleTypeI> {
		return this._carTypeChange
	}
	
	private _carIndexChange: Subject<VehicleI>
	public get carIndexChange(): Subject<VehicleI> {
		return this._carIndexChange
	}
	
	private _gearTypeChange: Subject<GearTypeI>
	public get gearTypeChange(): Subject<GearTypeI> {
		return this._gearTypeChange
	}
	
	private _orderChange: Subject<OrderI>
	public get orderChange(): Subject<OrderI> {
		return this._orderChange
	}
	
	private _userOrderChange: Subject<OrderI>
	public get userOrderChange(): Subject<OrderI> {
		return this._userOrderChange
	}
	

	constructor(
		public router: Router
	) { }
	
	
	init(): void {
		if (this._wasInitiated) return
		this._wasInitiated = true
		this._userChange = new Subject()
		this._userManagementChange = new Subject()
		this._carClassChange = new Subject()
		this._carManufacturerChange = new Subject()
		this._carModelChange = new Subject()
		this._carTypeChange = new Subject()
		this._carIndexChange = new Subject()
		this._gearTypeChange = new Subject()
		this._orderChange = new Subject()
		this._userOrderChange = new Subject()
	}
}
