import { VehicleTypesApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleTypeI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class VehicleTypesApi implements VehicleTypesApiI {
	
	private _controller: string = 'VehicleTypes/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllVehicleTypes(): Observable<VehicleTypeI[]> {
		return this._Http
			.get<VehicleTypeI[]>(this._url + 'getAllVehicleTypes')
			.pipe(catchError(this._errorHandler))
	}
	
	public getVehicleTypeById(id: number): Observable<VehicleTypeI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<VehicleTypeI>(this._url + 'getVehicleTypeById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addVehicleType(model: VehicleTypeI): Observable<VehicleTypeI> {
		return this._Http
			.post<VehicleTypeI>(this._url + 'addVehicleType', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public updateVehicleType(model: VehicleTypeI): Observable<VehicleTypeI> {
		return this._Http
			.put<VehicleTypeI>(this._url + 'updateVehicleType', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteVehicleType(id: number): Observable<VehicleTypeI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<VehicleTypeI>(this._url + 'deleteVehicleType', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreVehicleType(id: number): Observable<VehicleTypeI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<VehicleTypeI>(this._url + 'restoreVehicleType', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
}
