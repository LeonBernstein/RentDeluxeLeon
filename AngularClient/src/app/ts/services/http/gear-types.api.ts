import { GearTypesApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GearTypeI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class GearTypesApi implements GearTypesApiI {
	
	private _controller: string = 'GearTypes/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllGearTypes(): Observable<GearTypeI[]> {
		return this._Http
			.get<GearTypeI[]>(this._url + 'getAllGearTypes')
			.pipe(catchError(this._errorHandler))
	}
	
	public getGearTypeById(id: number): Observable<GearTypeI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<GearTypeI>(this._url + 'getGearTypeById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addGearType(model: GearTypeI): Observable<GearTypeI> {
		return this._Http
			.post<GearTypeI>(this._url + 'addGearType', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public updateGearType(model: GearTypeI): Observable<GearTypeI> {
		return this._Http
			.put<GearTypeI>(this._url + 'updateGearType', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteGearType(id: number): Observable<GearTypeI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<GearTypeI>(this._url + 'deleteGearType', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreGearType(id: number): Observable<GearTypeI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<GearTypeI>(this._url + 'restoreGearType', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
}