import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserI } from '../../interfaces/model.interfaces';
import { UserApiI } from '../../interfaces/api.interfaces';
import { TokenDetailsI } from '../../interfaces/data-structure.interfaces';


export class UsersApi implements UserApiI {
	
	private _controller: string = 'Users/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
		private _handleErrorNoPopup: any,
	) {
		this._url = this._origin + this._controller
	}
	
	
	public getCurrentUser(token: string): Observable<UserI> {
		const params = new HttpParams().set('token', token)
		return this._Http
			.get<UserI>(this._url + 'GetCurrentUser', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	
	public getUserById(id: number): Observable<UserI> {
		const params = new HttpParams().set('id', id.toString())
		return this._Http
			.get<UserI>(this._url + 'getUserById', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	
	public isUserExistById(userId: number): Observable<boolean> {
		const headers = new HttpHeaders({
			'Accept' : 'auto'
		})
		const params = new HttpParams().set('userId', userId.toString())
		return this._Http
			.get<boolean>(this._url + 'IsUserExistById', { params: params, headers: headers })
			.pipe(catchError(this._errorHandler))
	}
	
	
	public isUserExistByUserName(userName: string): Observable<boolean> {
		const headers = new HttpHeaders({
			'Accept' : 'auto'
		})
		const params = new HttpParams().set('userName', userName)
		return this._Http
			.get<boolean>(this._url + 'isUserExistByUserName', { params: params, headers: headers } )
			.pipe(catchError(this._errorHandler))
	}
	
	
	public registerUser(user: UserI): Observable<{
		tokenDetails: TokenDetailsI,
		user: UserI,
		message?: string,
	}> {
		return this._Http
			.post<{tokenDetails: TokenDetailsI, user: UserI, message?:string}>(this._url + 'registerUser', user)
			.pipe(catchError(this._handleErrorNoPopup))
	}
	
	
	public getAllUsers(): Observable<UserI[]> {
		return this._Http
			.get<UserI[]>(this._url + 'getAllUsers')
			.pipe(catchError(this._errorHandler))
	}
	
	
	public deleteUser(userId: number): Observable<UserI> {
		const params = new HttpParams().set('userId', userId.toString())
		return this._Http
			.delete<UserI>(this._url + 'deleteUser', { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	
	public restoreUser(userId: number): Observable<UserI> {
		const params = new HttpParams().set('userId', userId.toString())
		return this._Http
			.patch<UserI>(this._url + 'restoreUser', {}, { params: params })
			.pipe(catchError(this._errorHandler))
	}
	
	public updateUser(user: UserI): Observable<UserI> {
		return this._Http
			.put<UserI>(this._url + 'updateUser', user)
			.pipe(catchError(this._errorHandler))
	}
}
