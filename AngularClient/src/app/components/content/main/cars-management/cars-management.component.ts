import { Component, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { animations, firstState, secondState } from './_cars-management.animations';

@Component({
	selector: 'crd-cars-management',
	templateUrl: './cars-management.component.html',
	styleUrls: ['./cars-management.component.scss'],
	animations: [animations.routerFade],
})
export class CarsManagementComponent implements OnDestroy {
	
	private readonly _lastRouteIndex: number = 0
	private _subscriber: Subscription
	private _lastRoute: string
	
	private _animationState: string
	private _currentRouteState: string

	constructor(
		private _StorageService: StorageService,
		private _Router: Router,
	) {
		this._getDataFromCache()
		this._subscribeToRouter()
	}
	
	
	public getStates(outlet: RouterOutlet): any {
		const triggerState = (): void => {
			this._animationState = this._animationState === firstState ? secondState : firstState
		}
		const newState = outlet && outlet.activatedRouteData && outlet.activatedRouteData.state
		
		if (!newState) {
			return undefined
		
		} else if (!this._currentRouteState) {
			this._currentRouteState = newState
			this._animationState = firstState
			
		} else if (this._currentRouteState != newState) {
			this._currentRouteState = newState
			triggerState.call(this)
		}
		return this._animationState
	}
	
	
	private _getDataFromCache(): void {
		if (this._StorageService.cache.hasData(this, this._lastRouteIndex)) {
			this._lastRoute = this._StorageService.cache.getData(this, this._lastRouteIndex)
		} else {
			this._lastRoute = this._Router.url
		}
	}
	
	
	private _handleCurrentRoute(): void {
		if (this._lastRoute) {
			this._Router.navigate([this._lastRoute])
		}
	}
	
	
	private _subscribeToRouter(): void {
		this._subscriber = this._Router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				if (e.url === '/employees/carsManagement') {
					this._handleCurrentRoute()
				} else {
					this._lastRoute = e.urlAfterRedirects
				}
			}
		})
	}
	
	
	ngOnDestroy() {
		if (this._subscriber) this._subscriber.unsubscribe()
		this._StorageService.cache.setData(this, this._lastRouteIndex, this._lastRoute)
	}
}
