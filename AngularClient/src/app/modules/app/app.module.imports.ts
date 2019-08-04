
//#region angularModules =>

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing/app-routing.module';

const angularModules = [
	BrowserModule,
	BrowserAnimationsModule,
	AppRoutingModule,
]

//#endregion angularModules ;


//#region myModules =>

import { MyCommonModule } from '../common/common.module';

const myModules = [
	MyCommonModule
]

//#endregion myModules ;


//#region importsList =>

export const importsList = [
	...angularModules,
	...myModules,
]

//#endregion importsList ;
