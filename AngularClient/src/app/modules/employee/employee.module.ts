import { NgModule } from '@angular/core';

import { declarationsList } from './employee.module.declarations';
import { providersList } from './employee.module.providers';
import { importsList } from './employee.module.imports';


@NgModule({
	imports : importsList,
	declarations: declarationsList,
	providers: providersList,
})
export class EmployeeModule { }
