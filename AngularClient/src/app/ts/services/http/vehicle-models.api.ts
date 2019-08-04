import { VehicleModelsApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModelI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class VehicleModelsApi implements VehicleModelsApiI {
	
	private _controller: string = 'VehicleModels/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllVehicleModels(): Observable<VehicleModelI[]> {
		return this._Http
			.get<VehicleModelI[]>(this._url + 'getAllVehicleModels')
			.pipe(catchError(this._errorHandler))
	}
	
	public getVehicleModelById(id: number): Observable<VehicleModelI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<VehicleModelI>(this._url + 'getVehicleModelById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addVehicleModel(model: VehicleModelI): Observable<VehicleModelI> {
		return this._Http
			.post<VehicleModelI>(this._url + 'addVehicleModel', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public updateVehicleModel(model: VehicleModelI): Observable<VehicleModelI> {
		return this._Http
			.put<VehicleModelI>(this._url + 'updateVehicleModel', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteVehicleModel(id: number): Observable<VehicleModelI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<VehicleModelI>(this._url + 'deleteVehicleModel', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreVehicleModel(id: number): Observable<VehicleModelI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<VehicleModelI>(this._url + 'restoreVehicleModel', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
}
