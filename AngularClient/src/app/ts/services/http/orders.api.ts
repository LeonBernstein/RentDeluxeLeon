import { OrdersApiI } from '../../interfaces/api.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';

export class OrdersApi implements OrdersApiI {
	
	private _controller: string = 'Orders/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllOrders(): Observable<OrderI[]> {
		return this._Http
			.get<OrderI[]>(this._url + 'getAllOrders')
			.pipe(catchError(this._errorHandler))
	}
	
	public getOrdersByUserId(userId: number): Observable<OrderI[]> {
		const params = new HttpParams().set('userId', userId.toString())
		return this._Http
			.get<OrderI[]>(this._url + 'getOrdersByUserId', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public getOrdersByVehicleId(vehicleId: number): Observable<OrderI[]> {
		const params = new HttpParams().set('vehicleId', vehicleId.toString())
		return this._Http
			.get<OrderI[]>(this._url + 'getOrdersByVehicleId', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	
	public getOrderById(id: number): Observable<OrderI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<OrderI>(this._url + 'getOrderById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public addOrder(model: OrderI): Observable<OrderI> {
		return this._Http
			.post<OrderI>(this._url + 'addOrder', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public setActualEndDate(id: number): Observable<OrderI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<OrderI>(this._url + 'setActualEndDate', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public updateOrder(model: OrderI): Observable<OrderI> {
		return this._Http
			.put<OrderI>(this._url + 'updateOrder', model)
			.pipe(catchError(this._errorHandler))
	}
	
	public deleteOrder(id: number): Observable<OrderI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.delete<OrderI>(this._url + 'deleteOrder', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public restoreOrder(id: number): Observable<OrderI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.patch<OrderI>(this._url + 'restoreOrder', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
}
