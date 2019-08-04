import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle, Router, NavigationEnd } from '@angular/router';
import { ChangesService } from '../../services/changes.service';
import { Optional, Injector } from '@angular/core';

interface RouteStorageObject {
	snapshot: ActivatedRouteSnapshot
	handle: DetachedRouteHandle
}

export class CustomReuseStrategy implements RouteReuseStrategy {

	private _isSubscribedToUserChange = false

	/**
	 * Object which will store RouteStorageObjects indexed by keys
	 * The keys will all be a path (as in route.routeConfig.path)
	 * This allows us to see if we've got a route stored for the requested path
	 */
	private _storedRoutes: { [key: string]: RouteStorageObject } = {}



	constructor(
		@Optional() private _ChangesService: ChangesService,
		private _injector: Injector,
	) { }


	/**
	 * Decides when the route should be stored
	 * If the route should be stored, I believe the boolean is indicating to a controller whether or not to fire this.store
	 * _When_ it is called though does not particularly matter, just know that this determines whether or not we store the route
	 * An idea of what to do here: check the route.routeConfig.path to see if it is a path you would like to store
	 * @param route This is, at least as I understand it, the route that the user is currently on, and we would like to know if we want to store it
	 * @returns boolean indicating that we want to (true) or do not want to (false) store that route
	 */
	public shouldDetach(route: ActivatedRouteSnapshot): boolean {
		// let detach: boolean = true;
		// console.log("detaching", route, "return: ", detach);
		// return detach;

		// checks if component is sticky
		return route.data.sticky
	}


	/**
	 * Constructs object of type `RouteStorageObject` to store, and then stores it for later attachment
	 * @param route This is stored for later comparison to requested routes, see `this.shouldAttach`
	 * @param handle Later to be retrieved by this.retrieve, and offered up to whatever controller is using this class
	 */
	public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {


		// checks if component has hooks
		if (handle && (<any>handle).componentRef && (<any>handle).componentRef.instance) {
			const instance: any = (<any>handle).componentRef.instance
			if (instance) {
				// checks for is onNavigationOut hook
				if (instance.onNavigationOut &&
					typeof (instance.onNavigationOut) === 'function'
				) {
					instance.onNavigationOut()
				}
				// checks for is closing hook
				if (instance.isClosing) {
					delete this._storedRoutes[route.routeConfig.path]
					return
				}
			}
		}

		const storedRoute: RouteStorageObject = {
			snapshot: route,
			handle: handle,
		}

		// console.log("store:", storedRoute, "into: ", this._storedRoutes);
		// routes are stored by path - the key is the path name, and the handle is stored under it so that you can only ever have one object stored for a single path
		this._storedRoutes[route.routeConfig.path] = storedRoute;
	}


	/**
	 * Determines whether or not there is a stored route and, if there is, whether or not it should be rendered in place of requested route
	 * @param route The route the user requested
	 * @returns boolean indicating whether or not to render the stored route
	 */
	public shouldAttach(route: ActivatedRouteSnapshot): boolean {

		// check if already subscribed to user changes
		if (!this._isSubscribedToUserChange) {
			// handles missing service case
			if (this._ChangesService) {
				this._subscribeToUserChange()
			} else {
				try {
					this._ChangesService = this._injector.get(ChangesService)
					this._subscribeToUserChange()
				} catch { }
			}
		}


		// this will be true if the route has been stored before
		const canAttach: boolean = !!route.routeConfig && !!this._storedRoutes[route.routeConfig.path]

		// this decides whether the route already stored should be rendered in place of the requested route, and is the return value
		// at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
		// so, if the route.params and route.queryParams also match, then we should reuse the component
		if (canAttach) {
			// let willAttach: boolean = true;
			// console.log("param comparison:");
			// console.log(this.compareObjects(route.params, this._storedRoutes[route.routeConfig.path].snapshot.params));
			// console.log("query param comparison");
			// console.log(this.compareObjects(route.queryParams, this._storedRoutes[route.routeConfig.path].snapshot.queryParams));

			const paramsMatch: boolean = this.compareObjects(route.params, this._storedRoutes[route.routeConfig.path].snapshot.params)
			const queryParamsMatch: boolean = this.compareObjects(route.queryParams, this._storedRoutes[route.routeConfig.path].snapshot.queryParams)

			// console.log("deciding to attach...", route, "does it match?", this._storedRoutes[route.routeConfig.path].snapshot, "return: ", paramsMatch && queryParamsMatch);

			// && route.data.sticky is mine
			return paramsMatch && queryParamsMatch && route.data.sticky
		} else {
			return false
		}
	}


	/**
	 * Finds the locally stored instance of the requested route, if it exists, and returns it
	 * @param route New route the user has requested
	 * @returns DetachedRouteHandle object which can be used to render the component
	 */
	public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

		// return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
		if (!route.routeConfig || !this._storedRoutes[route.routeConfig.path]) return null
		// console.log("retrieving", "return: ", this._storedRoutes[route.routeConfig.path]);

		// shorthand
		const handle: DetachedRouteHandle = this._storedRoutes[route.routeConfig.path].handle

		// checks if component has hooks
		if (handle && (<any>handle).componentRef && (<any>handle).componentRef.instance) {
			const instance: any = (<any>handle).componentRef.instance
			// checks for onNavigationIn hook
			if (instance) {
				if (instance.onNavigationIn &&
					typeof (instance.onNavigationIn) === 'function'
				) {
					instance.onNavigationIn()
				}
			}
		}

		/** returns handle when the route.routeConfig.path is already stored */
		return handle
	}


	/**
	 * Determines whether or not the current route should be reused
	 * @param future The route the user is going to, as triggered by the router
	 * @param curr The route the user is currently on
	 * @returns boolean basically indicating False if the user intends to leave the current route
	 */
	public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		// console.log("deciding to reuse", "future", future.routeConfig, "current", curr.routeConfig, "return: ", future.routeConfig === curr.routeConfig);
		return future.routeConfig === curr.routeConfig
	}


	/**
	 * This nasty bugger finds out whether the objects are _traditionally_ equal to each other, like you might assume someone else would have put this function in vanilla JS already
	 * One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
	 * Another important note is that the method only tells you if `compare` has all equal parameters to `base`, not the other way around
	 * @param base The base object which you would like to compare another object to
	 * @param compare The object to compare to base
	 * @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
	 */
	private compareObjects(base: any, compare: any): boolean {

		// loop through all properties in base object
		for (let baseProperty in base) {

			// determine if comparison object has that property, if not: return false
			if (compare.hasOwnProperty(baseProperty)) {
				switch (typeof base[baseProperty]) {
					// if one is object and other is not: return false
					// if they are both objects, recursively call this comparison function
					case 'object':
						if (typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty])) { return false; } break;
					// if one is function and other is not: return false
					// if both are functions, compare function.toString() results
					case 'function':
						if (typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString()) { return false; } break;
					// otherwise, see if they are equal using coercive comparison
					default:
						if (base[baseProperty] != compare[baseProperty]) { return false; }
				}
			} else {
				return false;
			}
		}

		// returns true only after false HAS NOT BEEN returned through all loops
		return true;
	}

	// removes all stored RouteStorageObjects
	private _subscribeToUserChange(): void {
		this._isSubscribedToUserChange = true
		this._ChangesService.userChange.subscribe(() => {
			let sub = this._ChangesService.router.events.subscribe(e => {
				if (e instanceof NavigationEnd) {
					for (let route in this._storedRoutes) {
						let handle = this._storedRoutes[route].handle
						if (handle && (<any>handle).componentRef && (<any>handle).componentRef.instance) {
							const instance: any = (<any>handle).componentRef.instance
							if (instance) {
								// checks for is onNavigationOut hook
								if (typeof (instance.ngOnDestroy) == 'function') {
									instance.ngOnDestroy()
								}
							}
						}
					}
					this._storedRoutes = {}
					if (sub) sub.unsubscribe()
				}
			})
		})
	}
}
