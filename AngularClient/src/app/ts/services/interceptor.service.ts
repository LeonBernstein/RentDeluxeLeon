import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage/storage.service';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

	constructor(
		private _Storage: StorageService,
	) { }


	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this._Storage.tokenDetails ? this._Storage.tokenDetails.token : null
		
		if (token) req = req.clone({ setHeaders: { Authorization: token } })
		
		if (!req.headers.has('Content-Type')) {
			 req = req.clone({ setHeaders: {'Content-Type': 'application/json'} })
		}
		
		if (!req.headers.has('Accept')) {
			req = req.clone({ setHeaders: {'Accept': 'application/json'} })
		}
		
		if (req.headers.has('Content-Type') &&
				req.headers.get('Content-Type') === 'auto'
		) {
			req = req.clone({ headers: req.headers.delete('Content-Type', 'auto') })
		}
		
		if (req.headers.has('Accept') &&
				req.headers.get('Accept') === 'auto'
		) {
			req = req.clone({ headers: req.headers.delete('Accept', 'auto') })
		}
		
		req = req.clone({ setHeaders: { 'TimezoneOffset': new Date().getTimezoneOffset().toString() } })
		
		return next.handle(req).pipe(
			map((event: HttpResponse<any>) => {
				if (event instanceof HttpResponse) {
					if (event.headers.has('Authorization'))
						this._Storage.tokenDetails = JSON.parse(event.headers.get('Authorization'))
				}
				return event
			})
		)
	}
}
