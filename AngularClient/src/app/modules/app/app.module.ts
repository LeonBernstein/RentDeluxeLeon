import { NgModule } from '@angular/core';

import { declarationsList, dialogComponents } from './app.module.declarations';
import { importsList } from './app.module.imports';
import { providersList } from './app.module.providers';
import { bootstrapList } from './app.module.bootstrap';

import { registerLocaleData } from '@angular/common';
import localHe from '@angular/common/locales/he';



@NgModule({
	declarations: declarationsList,
	entryComponents: dialogComponents,
	imports: importsList,
	providers: providersList,
	bootstrap: bootstrapList
})
export class AppModule {
	
	constructor() {
		registerLocaleData(localHe, 'he')
	}
}
