import { VehicleManufacturersApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleManufacturerI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class VehicleManufacturersApi implements VehicleManufacturersApiI {
	
	private _controller: string = 'VehicleManufacturers/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllVehicleManufacturers(): Observable<VehicleManufacturerI[]> {
		return this._Http
			.get<VehicleManufacturerI[]>(this._url + 'getAllVehicleManufacturers')
			.pipe(catchError(this._errorHandler))
	}
	
	public getVehicleManufacturerById(id: number): Observable<VehicleManufacturerI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<VehicleManufacturerI>(this._url + 'getVehicleManufacturerById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addVehicleManufacturer(model: VehicleManufacturerI): Observable<VehicleManufacturerI> {
		return this._Http
			.post<VehicleManufacturerI>(this._url + 'addVehicleManufacturer', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public updateVehicleManufacturer(model: VehicleManufacturerI): Observable<VehicleManufacturerI> {
		return this._Http
			.put<VehicleManufacturerI>(this._url + 'updateVehicleManufacturer', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteVehicleManufacturer(id: number): Observable<VehicleManufacturerI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<VehicleManufacturerI>(this._url + 'deleteVehicleManufacturer', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreVehicleManufacturer(id: number): Observable<VehicleManufacturerI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<VehicleManufacturerI>(this._url + 'restoreVehicleManufacturer', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
}
