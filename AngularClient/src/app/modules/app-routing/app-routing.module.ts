import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { HomeComponent } from 'src/app/components/content/main/home/home.component';
import { CarsListComponent } from 'src/app/components/content/main/cars-list/cars-list.component';
import { UserOrdersComponent } from 'src/app/components/content/main/user-orders/user-orders.component';
import { UserOrderDetailsComponent } from 'src/app/components/content/main/user-orders/user-order-details/user-order-details.component';

export const appRoutingComponents = [
	HomeComponent,
	CarsListComponent,
	UserOrdersComponent,
	UserOrderDetailsComponent,
]

import { UserRoleTypes } from 'src/app/ts/enums/user-role-types.enum';
import { AuthGuard } from 'src/app/ts/services/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
		data: {
			sticky: true,
			state: 'home'
		},
	},
	{
		path: 'carsList',
		component: CarsListComponent,
		canActivate: [AuthGuard],
		data: {
			sticky: true,
			state: 'carsList',
			roles: [UserRoleTypes.user, UserRoleTypes.nonUser],
		},
	},
	{
		path: 'userOrders',
		component: UserOrdersComponent,
		canActivate: [AuthGuard],
		data: {
			sticky: true,
			state: 'userOrders',
			roles: [UserRoleTypes.user]
		},
	},
	{
		path: 'userOrders/:id',
		component: UserOrderDetailsComponent,
		canActivate: [AuthGuard],
		data: {
			sticky: false,
			state: 'userOrderDetails',
			roles: [UserRoleTypes.user]
		},
	},
	{
		path: 'employees',
		loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule)
	},
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes,
			{ preloadingStrategy: PreloadAllModules }
		)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
