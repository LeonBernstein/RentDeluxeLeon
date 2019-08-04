import { Component, OnInit } from '@angular/core';
import { RouterLinkI } from 'src/app/ts/interfaces/data-storage.interfaces';
import { CurrentUserService } from 'src/app/ts/services/current-user.service';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { UserRoleTypes } from 'src/app/ts/enums/user-role-types.enum';
import { Router } from '@angular/router';
import { RouterOutletTypes } from 'src/app/ts/enums/router-outlet-types.enum';

@Component({
	selector: 'crd-employee-home',
	templateUrl: './employee-home.component.html',
	styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {
	
	public readonly mainOutlet: RouterOutletTypes = RouterOutletTypes.main
	public readonly carsOutlet: RouterOutletTypes = RouterOutletTypes.carsManagement
	
	private _routerLinks: RouterLinkI[]
	public get routerLinks(): RouterLinkI[] {
		return this._routerLinks
	}
	
	public get userRole(): UserRoleTypes {
		return this._CurrentUserService.userRole
	}

	constructor(
		private _Storage: StorageService,
		private _CurrentUserService: CurrentUserService,
		public router: Router,
	) { }

	ngOnInit() {
		this._routerLinks = this._Storage.routerLinksStore.routerLinks
	}
}
