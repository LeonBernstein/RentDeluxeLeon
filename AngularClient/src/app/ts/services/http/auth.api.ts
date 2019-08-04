import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TokenDetailsI } from '../../interfaces/data-structure.interfaces';
import { UserI } from '../../interfaces/model.interfaces';
import { AuthApiI } from '../../interfaces/api.interfaces';

export class AuthApi implements AuthApiI {
	
	private _controller: string = 'Auth/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
		private _handleErrorNoPopup: any,
	) {
		this._url = this._origin + this._controller
	}
	
	
	public getNonUserToken(userAgent: string): Observable<TokenDetailsI> {
		let params = new HttpParams().set('userAgent', userAgent)
		return this._Http
			.get<TokenDetailsI>(this._url + 'GetNonUserToken', {params: params})
			.pipe(catchError(this._errorHandler))
	}
	
	
	public login(
		userName: string,
		password: string,
	): Observable<{
		tokenDetails: TokenDetailsI,
		user: UserI,
		message?: string,
	}> {
		const params = new HttpParams()
			.set('userName', userName)
			.set('password', password)
		return this._Http
			.get<{tokenDetails: TokenDetailsI, user: UserI}>(this._url + 'Login', {params: params} )
			.pipe(catchError(this._handleErrorNoPopup))
	}
}
