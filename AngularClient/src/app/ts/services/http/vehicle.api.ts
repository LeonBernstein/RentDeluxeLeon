import { VehiclesApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class VehiclesApi implements VehiclesApiI {
	
	private _controller: string = 'Vehicles/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllVehicles(): Observable<VehicleI[]> {
		return this._Http
			.get<VehicleI[]>(this._url + 'getAllVehicles')
			.pipe(catchError(this._errorHandler))
	}
	
	public getAllRentableVehicles(): Observable<VehicleI[]> {
		return this._Http
			.get<VehicleI[]>(this._url + 'getAllRentableVehicles')
			.pipe(catchError(this._errorHandler))
	}
	
	public getVehicleById(id: number): Observable<VehicleI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<VehicleI>(this._url + 'getVehicleById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addVehicle(model: VehicleI): Observable<VehicleI> {
		return this._Http
			.post<VehicleI>(this._url + 'addVehicle', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public updateVehicle(model: VehicleI): Observable<VehicleI> {
		return this._Http
			.put<VehicleI>(this._url + 'updateVehicle', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteVehicle(id: number): Observable<VehicleI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<VehicleI>(this._url + 'deleteVehicle', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreVehicle(id: number): Observable<VehicleI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<VehicleI>(this._url + 'restoreVehicle', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public updateVehiclesPicturePath(id: number, img: File): Observable<string> {
		const headers = new HttpHeaders({
			'Content-Type': 'auto',
		})
		const formData = new FormData()
		formData.append('VehicleId', id.toString())
		formData.append('VehicleImage', img, img.name)
		return this._Http
			.patch<string>(this._url + 'updateVehiclesPicturePath', formData, { headers: headers })
			.pipe(catchError(this._errorHandler))
	}
}
