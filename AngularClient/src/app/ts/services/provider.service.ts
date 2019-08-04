import { Injectable } from '@angular/core';
import { HttpI, OnServiceInit } from '../interfaces/services.interfaces';

@Injectable({
	providedIn: 'root'
})
export class ProviderService implements OnServiceInit {
	
	private _wasInitiated: boolean = false
	
	private static _HttpService: HttpI
	public static get HttpService(): HttpI {
		return ProviderService._HttpService
	}

	constructor() { }
	
	
	init(http : HttpI): void {
		if (this._wasInitiated) return
		this._wasInitiated = true
		ProviderService._HttpService = http
	}
}
