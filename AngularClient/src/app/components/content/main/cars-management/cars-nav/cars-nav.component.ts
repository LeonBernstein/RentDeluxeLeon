import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTabNav } from '@angular/material/tabs';
import { RouterLinkI } from 'src/app/ts/interfaces/data-storage.interfaces';
import { UserRoleTypes } from 'src/app/ts/enums/user-role-types.enum';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { CurrentUserService } from 'src/app/ts/services/current-user.service';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { RouterOutletTypes } from 'src/app/ts/enums/router-outlet-types.enum';
import { animations } from './_cars-nav.animations';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'crd-cars-nav',
	templateUrl: './cars-nav.component.html',
	styleUrls: ['./cars-nav.component.scss'],
	animations: [animations.fadeInOut],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsNavComponent implements AfterViewInit, OnInit, OnDestroy {

	// tabsInkFix
	@ViewChild('matCarsNavBar', { static: true }) private _tabs: MatTabNav
	
	public readonly carsOutlet: RouterOutletTypes = RouterOutletTypes.carsManagement

	public userChangeTrigger: boolean = false


	private _routerLinks: RouterLinkI[]
	public get routerLinks(): RouterLinkI[] {
		return this._routerLinks
	}

	private _userRole: UserRoleTypes
	public get userRole(): UserRoleTypes {
		return this._userRole
	}
	
	private _changeSub: Subscription
	private _routerSub: Subscription


	constructor(
		private _Storage: StorageService,
		private _CurrentUserService: CurrentUserService,
		private _Change: ChangesService,
		private changeDetectorRef: ChangeDetectorRef,
		private router: Router,
	) { }


	ngOnInit() {
		this.getUserRole()
		this._routerLinks = this._Storage.routerLinksStore.routerLinks
		this._changeSub = this._Change.userChange
			.subscribe(() => {
				this.userChangeTrigger = true
				this.getUserRole()
				this.changeDetectorRef.markForCheck()
				setTimeout(() => {
					this.userChangeTrigger = false
				}, 500);
			});
		this._routerSub = this.router.events
			.subscribe(e => {
				if (e instanceof NavigationEnd) this.changeDetectorRef.markForCheck()
			})
	}


	ngAfterViewInit() {
		this._tabsInkFix()
	}
	
	ngOnDestroy() {
		if (this._changeSub) this._changeSub.unsubscribe()
		this._routerSub.unsubscribe()
	}
	
	private getUserRole(): void {
		this._userRole = this._CurrentUserService.userRole
	}


	private _tabsInkFix(timeout: number = 15, counter: number = 0, matInkBar?: HTMLElement) {
		if (!matInkBar) {
			matInkBar = <HTMLElement>document.querySelector('#mainTabNavBar mat-ink-bar')
		}
		setTimeout(() => {
			this._tabs.updateActiveLink(this._tabs._elementRef)
			this._tabs.ngAfterContentChecked()

			if (counter < 10 &&
				(!matInkBar ||
					matInkBar.offsetWidth == 0)
			) {
				this._tabsInkFix(500, counter++, matInkBar)
			}
		}, timeout)
	}
}
