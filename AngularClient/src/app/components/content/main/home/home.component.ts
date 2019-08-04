import { Component } from '@angular/core';
import { UserRoleTypes } from 'src/app/ts/enums/user-role-types.enum';
import { CurrentUserService } from 'src/app/ts/services/current-user.service';
import { animations } from './_home.animations';

@Component({
	selector: 'crd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [animations.fadeInOut],
})
export class HomeComponent {

	public readonly nonUser: UserRoleTypes = UserRoleTypes.nonUser
	public readonly user: UserRoleTypes = UserRoleTypes.user
	public readonly employee: UserRoleTypes = UserRoleTypes.employee
	public readonly manager: UserRoleTypes = UserRoleTypes.manager


	public get userType(): UserRoleTypes {
		return this._CurrentUserService.userRole
	}


	constructor(
		private _CurrentUserService: CurrentUserService,
	) { }

}
