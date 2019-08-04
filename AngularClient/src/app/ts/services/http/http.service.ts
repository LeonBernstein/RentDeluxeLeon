import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';

import { OnServiceInit, HttpI } from '../../interfaces/services.interfaces';
import { AuthApi } from "./auth.api";
import { UsersApi } from './users.api';
import { Helper } from '../../classes/infrastructure/helpers';
import { PersonsApi } from './persons.api';
import { BranchesApiI, CarClassesApiI, GearTypesApiI, OrdersApiI, VehiclesApiI, VehicleTypesApiI, VehicleModelsApiI, VehicleManufacturersApiI } from '../../interfaces/api.interfaces';
import { BranchesApi } from './branches.api';
import { CarClassesApi } from './car-classes.api';
import { GearTypesApi } from './gear-types.api';
import { OrdersApi } from './orders.api';
import { VehiclesApi } from './vehicle.api';
import { VehicleTypesApi } from './vehicle-types.api';
import { VehicleModelsApi } from './vehicle-models.api';
import { VehicleManufacturersApi } from './vehicle-manufacturer.api';

@Injectable({
	providedIn: 'root'
})
export class HttpService implements OnServiceInit, HttpI {
	
	private _wasInitiated: boolean = false
	
	private _apiOrigin: string = ''
	
	private _httpErrorSubject: Subject<HttpErrorResponse>
	public get httpErrorSubject(): Subject<HttpErrorResponse> {
		return this._httpErrorSubject
	}
	
	
	private _AuthApi: AuthApi
	public get AuthApi(): AuthApi { return this._AuthApi }
	
	private _UsersApi: UsersApi
	public get UsersApi(): UsersApi { return this._UsersApi }
	
	private _PersonsApi: PersonsApi
	public get PersonsApi(): PersonsApi { return this._PersonsApi }
	
	private _BranchesApi: BranchesApiI
	public get BranchesApi(): BranchesApiI { return this._BranchesApi }
	
	private _CarClassesApi: CarClassesApiI
	public get CarClassesApi(): CarClassesApiI { return this._CarClassesApi }
	
	private _GearTypesApi: GearTypesApiI
	public get GearTypesApi(): GearTypesApiI { return this._GearTypesApi }
	
	private _OrdersApi: OrdersApiI
	public get OrdersApi(): OrdersApiI { return this._OrdersApi }
	
	private _VehiclesApi: VehiclesApiI
	public get VehiclesApi(): VehiclesApiI { return this._VehiclesApi }
	
	private _VehicleTypesApi: VehicleTypesApiI
	public get VehicleTypesApi(): VehicleTypesApiI { return this._VehicleTypesApi }
	
	private _VehicleModelsApi: VehicleModelsApiI
	public get VehicleModelsApi(): VehicleModelsApiI { return this._VehicleModelsApi }
	
	private _VehicleManufacturersApi: VehicleManufacturersApiI
	public get VehicleManufacturersApi(): VehicleManufacturersApiI { return this._VehicleManufacturersApi }
	
	
	constructor(
		private _Http: HttpClient,
	) { }
	
	
	public init(): void {
		if (this._wasInitiated) return
		this._wasInitiated = true
		this._httpErrorSubject = new Subject<HttpErrorResponse>()
		this._resolveOrigin()
		this._buildDependencies()
	}
	
	
	private _resolveOrigin(): void {
		this._apiOrigin = Helper.isProd ? window.location.origin : Helper.testUrl
		this._apiOrigin += '/api/'
	}
	
	
	private _buildDependencies(): void {
		const injector = this._injectorCreator()
		this._AuthApi = injector.get(AuthApi)
		this._UsersApi = injector.get(UsersApi)
		this._PersonsApi = injector.get(PersonsApi)
		this._BranchesApi = injector.get(BranchesApi)
		this._CarClassesApi = injector.get(CarClassesApi)
		this._GearTypesApi = injector.get(GearTypesApi)
		this._OrdersApi = injector.get(OrdersApi)
		this._VehiclesApi = injector.get(VehiclesApi)
		this._VehicleTypesApi = injector.get(VehicleTypesApi)
		this._VehicleModelsApi = injector.get(VehicleModelsApi)
		this._VehicleManufacturersApi = injector.get(VehicleManufacturersApi)
	}
	
	
	private _injectorCreator(): Injector {
		return Injector.create({
			providers: [
				{
					provide: 'ORIGIN',
					useValue: this._apiOrigin,
				},
				{
					provide: 'HTTP',
					useValue: this._Http
				},
				{
					provide: 'ERROR_HANDLER',
					useValue: this._handleError.bind(this)
				},
				{
					provide: 'ERROR_HANDLER_NO_POPUP',
					useValue: this._handleErrorNoPopup.bind(this)
				},
				{
					provide: AuthApi,
					useClass: AuthApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER', 'ERROR_HANDLER_NO_POPUP'],
				},
				{
					provide: UsersApi,
					useClass: UsersApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER', 'ERROR_HANDLER_NO_POPUP'],
				},
				{
					provide: PersonsApi,
					useClass: PersonsApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: BranchesApi,
					useClass: BranchesApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: CarClassesApi,
					useClass: CarClassesApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: GearTypesApi,
					useClass: GearTypesApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: OrdersApi,
					useClass: OrdersApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: VehiclesApi,
					useClass: VehiclesApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: VehicleTypesApi,
					useClass: VehicleTypesApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: VehicleModelsApi,
					useClass: VehicleModelsApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
				{
					provide: VehicleManufacturersApi,
					useClass: VehicleManufacturersApi,
					deps: ['ORIGIN', 'HTTP', 'ERROR_HANDLER'],
				},
			],
		});
	}
	
	
	private _handleError(e: HttpErrorResponse, showPopup: boolean = true): Observable<never> {
		if (e.error instanceof ErrorEvent) {
			if (!Helper.isProd) {
				console.error('An error occurred:', e.error.message)
			}
		} else if (e.error instanceof ProgressEvent) {
			if (!Helper.isProd) {
				console.error(`Can't connect to backend api!`)
			}
		} else {
			if (!Helper.isProd) {
				let err = `Backend returned code: ${e.status}`
				if (typeof(e.error) === 'string') {
					err += `, message: ${e.error}`
				} else if (e.error.message) {
					err += `, message: ${e.error.message}`
				}
				console.error(err)
			}
		}
		if (showPopup) {
			this._httpErrorSubject.next(e)
		}
		return throwError(e)
	}
	
	private _handleErrorNoPopup(e: HttpErrorResponse): Observable<never> {
		return this._handleError(e, false)
	}
}
