
//#region directives =>

const directives = []

//#endregion directives ;


//#region components =>

import { CarsNavComponent } from 'src/app/components/content/main/cars-management/cars-nav/cars-nav.component';

const components = [
	CarsNavComponent
]

//#endregion components ;


//#region routingComponents =>

import { employeeRoutingComponents } from '../employee-routing/employee-routing.module';

const routingComponents = [...employeeRoutingComponents]

//#endregion routingComponents ;


//#region declarationsList =>

export const declarationsList = [
	...components,
	...directives,
	...routingComponents,
]

//#endregion declarationsList ;