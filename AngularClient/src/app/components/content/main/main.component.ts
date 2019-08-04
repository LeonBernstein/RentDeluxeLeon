import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { animations, firstState, secondState } from './_main.animations';


@Component({
	selector: 'crd-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	animations: [animations.routerFade],
})
export class MainComponent {
	
	private _animationState: string
	private _currentRouteState: string
	

	constructor() { }
	
	
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
}
