import { NgModule } from '@angular/core';
import { providersList } from './common.module.providers';
import { declarationsList } from './common.module.declarations';
import { importsList } from './common.module.imports';

const exportsList: any = [
	...declarationsList,
	...importsList,
	// ...providersList,
]

@NgModule({
	declarations: declarationsList,
	imports: importsList,
	providers: providersList,
	exports: exportsList
})
export class MyCommonModule { }
