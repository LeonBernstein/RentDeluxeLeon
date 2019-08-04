import { CarClassesApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarClassI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class CarClassesApi implements CarClassesApiI {
	
	private _controller: string = 'CarClasses/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllCarClasses(): Observable<CarClassI[]> {
		return this._Http
			.get<CarClassI[]>(this._url + 'getAllCarClasses')
			.pipe(catchError(this._errorHandler))
	}
	
	public getCarClassById(id: number): Observable<CarClassI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<CarClassI>(this._url + 'getCarClassById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addCarClass(model: CarClassI): Observable<CarClassI> {
		return this._Http
			.post<CarClassI>(this._url + 'addCarClass', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public updateCarClass(model: CarClassI): Observable<CarClassI> {
		return this._Http
			.put<CarClassI>(this._url + 'updateCarClass', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteCarClass(id: number): Observable<CarClassI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<CarClassI>(this._url + 'deleteCarClass', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreCarClass(id: number): Observable<CarClassI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<CarClassI>(this._url + 'restoreCarClass', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
}
