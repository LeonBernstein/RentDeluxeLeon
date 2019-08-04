
//#region angularModules =>

import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from "../employee-routing/employee-routing.module";

const angularModules = [
	CommonModule,
	EmployeeRoutingModule,
]

//#endregion angularModules ;


//#region myModules =>

import { MyCommonModule } from '../common/common.module';

const myModules = [
	MyCommonModule,
]

//#endregion myModules ;


//#region importsList =>

export const importsList = [
	...angularModules,
	...myModules,
]

//#endregion importsList ;
