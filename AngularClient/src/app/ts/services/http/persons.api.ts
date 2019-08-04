import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PersonsApiI } from '../../interfaces/api.interfaces';


export class PersonsApi implements PersonsApiI {
	
	private _controller: string = 'Persons/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public updatePersonAvatar(image: File): Observable<string> {
		const headers = new HttpHeaders({
			'Content-Type': 'auto',
		})
		const formData = new FormData()
		formData.append('avatarImage', image, image.name)
		return this._Http
			.patch<string>(this._url + 'updatePersonAvatar', formData, { headers: headers })
			.pipe(catchError(this._errorHandler))
	}
}