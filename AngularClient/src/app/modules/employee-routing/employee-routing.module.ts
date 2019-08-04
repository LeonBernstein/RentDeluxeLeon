import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarReturnComponent } from 'src/app/components/content/main/car-return/car-return.component';
import { OrdersListComponent } from 'src/app/components/content/main/orders-list/orders-list.component';
import { CarsManagementComponent } from 'src/app/components/content/main/cars-management/cars-management.component';
import { UsersManagementComponent } from 'src/app/components/content/main/users-management/users-management.component';
import { CarsIndexComponent } from 'src/app/components/content/main/cars-management/cars-index/cars-index.component';
import { CarManufacturersComponent } from 'src/app/components/content/main/cars-management/car-manufacturers/car-manufacturers.component';
import { CarModelsComponent } from 'src/app/components/content/main/cars-management/car-models/car-models.component';
import { CarTypesComponent } from 'src/app/components/content/main/cars-management/car-types/car-types.component';
import { CarClassesComponent } from 'src/app/components/content/main/cars-management/car-classes/car-classes.component';
import { GearTypesComponent } from 'src/app/components/content/main/cars-management/gear-types/gear-types.component';
import { UserDetailsManagementComponent } from 'src/app/components/content/main/users-management/user-details-management/user-details-management.component';
import { CarClassesDetailsComponent } from 'src/app/components/content/main/cars-management/car-classes/car-classes-details/car-classes-details.component';
import { CarManufacturersDetailsComponent } from 'src/app/components/content/main/cars-management/car-manufacturers/car-manufacturers-details/car-manufacturers-details.component';
import { CarModelsDetailsComponent } from 'src/app/components/content/main/cars-management/car-models/car-models-details/car-models-details.component';
import { CarTypesDetailsComponent } from 'src/app/components/content/main/cars-management/car-types/car-types-details/car-types-details.component';
import { CarsDetailsComponent } from 'src/app/components/content/main/cars-management/cars-index/cars-details/cars-details.component';
import { GearTypesDetailsComponent } from 'src/app/components/content/main/cars-management/gear-types/gear-types-details/gear-types-details.component';
import { OrderDetailsComponent } from 'src/app/components/content/main/orders-list/order-details/order-details.component';

export const employeeRoutingComponents = [
	CarReturnComponent,
	OrdersListComponent,
	CarsManagementComponent,
	UsersManagementComponent,
	CarsIndexComponent,
	CarManufacturersComponent,
	CarModelsComponent,
	CarTypesComponent,
	CarClassesComponent,
	GearTypesComponent,
	UserDetailsManagementComponent,
	CarClassesDetailsComponent,
	CarManufacturersDetailsComponent,
	CarModelsDetailsComponent,
	CarTypesDetailsComponent,
	CarsDetailsComponent,
	GearTypesDetailsComponent,
	OrderDetailsComponent,
]

import { AuthGuard } from 'src/app/ts/services/auth.guard';
import { UserRoleTypes } from 'src/app/ts/enums/user-role-types.enum';
import { CanDeactivateGuard } from 'src/app/ts/services/can-deactivate.guard';

const routes: Routes = [
	{
		path: 'carReturn',
		component: CarReturnComponent,
		canActivate: [AuthGuard],
		data: {
			sticky: true,
			state: 'carReturn',
			roles: [UserRoleTypes.employee, UserRoleTypes.manager]
		}
	},
	{
		path: 'ordersList',
		component: OrdersListComponent,
		canActivate: [AuthGuard],
		data: {
			sticky: true,
			state: 'ordersList',
			roles: [UserRoleTypes.manager]
		}
	},
	{
		path: 'ordersList/:id',
		component: OrderDetailsComponent,
		canActivate: [AuthGuard],
		canDeactivate: [CanDeactivateGuard],
		data: {
			sticky: false,
			state: 'orderDetails',
			roles: [UserRoleTypes.manager]
		}
	},
	{
		path: 'carsManagement',
		component: CarsManagementComponent,
		canActivate: [AuthGuard],
		data: {
			state: 'carsManagement',
			roles: [UserRoleTypes.manager]
		},
		children: [
			{
				path: '',
				redirectTo: 'carsIndex',
				pathMatch: 'full',
			},
			{
				path: 'carsIndex',
				component: CarsIndexComponent,
				data: {
					sticky: true,
					state: 'carsIndex'
				},
			},
			{
				path: 'carsIndex/:id',
				component: CarsDetailsComponent,
				canDeactivate: [CanDeactivateGuard],
				data: {
					sticky: false,
					state: 'carsDetails'
				},
			},
			{
				path: 'carManufacturers',
				component: CarManufacturersComponent,
				data: {
					sticky: true,
					state: 'carManufacturers'
				},
			},
			{
				path: 'carManufacturers/:id',
				component: CarManufacturersDetailsComponent,
				canDeactivate: [CanDeactivateGuard],
				data: {
					sticky: false,
					state: 'carManufacturersDetails'
				},
			},
			{
				path: 'carModels',
				component: CarModelsComponent,
				data: {
					sticky: true,
					state: 'carModels'
				},
			},
			{
				path: 'carModels/:id',
				component: CarModelsDetailsComponent,
				canDeactivate: [CanDeactivateGuard],
				data: {
					sticky: false,
					state: 'carModelsDetails'
				},
			},
			{
				path: 'carTypes',
				component: CarTypesComponent,
				data: {
					sticky: true,
					state: 'carTypes'
				},
			},
			{
				path: 'carTypes/:id',
				component: CarTypesDetailsComponent,
				canDeactivate: [CanDeactivateGuard],
				data: {
					sticky: false,
					state: 'carTypesDetails'
				},
			},
			{
				path: 'carClasses',
				component: CarClassesComponent,
				data: {
					sticky: true,
					state: 'carClasses'
				},
			},
			{
				path: 'carClasses/:id',
				component: CarClassesDetailsComponent,
				canDeactivate: [CanDeactivateGuard],
				data: {
					sticky: false,
					state: 'carClassesDetails'
				},
			},
			{
				path: 'gearTypes',
				component: GearTypesComponent,
				data: {
					sticky: true,
					state: 'gearTypes'
				},
			},
			{
				path: 'gearTypes/:id',
				component: GearTypesDetailsComponent,
				canDeactivate: [CanDeactivateGuard],
				data: {
					sticky: false,
					state: 'gearTypesDetails'
				},
			},
		]
	},
	{
		path: 'usersManagement',
		component: UsersManagementComponent,
		canActivate: [AuthGuard],
		data: {
			sticky: true,
			state: 'usersManagement',
			roles: [UserRoleTypes.manager]
		}
	},
	{
		path: 'usersManagement/:id',
		component: UserDetailsManagementComponent,
		canActivate: [AuthGuard],
		canDeactivate: [CanDeactivateGuard],
		data: {
			sticky: false,
			state: 'userDetailsManagement',
			roles: [UserRoleTypes.manager]
		}
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EmployeeRoutingModule { }
