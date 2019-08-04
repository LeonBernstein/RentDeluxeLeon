import { Provider } from '@angular/core';


//#region staticVariables =>

const staticVariables: Provider[] = [
	{
		provide: 'LEONS_EMAIL',
		useValue: 'unlimited.2013@gmail.com'
	},
	{
		provide: 'EMAIL_PATTERN',
		useValue: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	},
	{
		provide: 'PASSWORD_PATTERN',
		useValue: /[0-9a-zA-Z-!#$%^&*@_+|~=?]{6,16}/
	},
	{
		provide: 'ALLOWED_PASS_CHARS',
		useValue: /^[0-9a-zA-Z-!#$%^&*@_+|~=?]+$/
	},
	{
		provide: 'NUMERIC_ONLY',
		useValue: /^[0-9]*$/
	},
	{
		provide: 'ALLOWED_IMAGE_TYPE',
		useValue: /^(jpg|jpeg|tif|tiff|png)$/i
	},
]

//#endregion staticVariables ;


//#region classFactory =>

import { InjectionToken } from '@angular/core';
import { LoginUserData } from 'src/app/ts/classes/data-structures/login.structure';
import { SignUpUserData } from 'src/app/ts/classes/data-structures/sign-up.structure';
import { PersonData } from 'src/app/ts/classes/data-structures/person.structure';
import { SignUpDataI, LoginDataI, PersonDataI } from '../../ts/interfaces/data-structure.interfaces';

export const LOGIN_USER_DATA = new InjectionToken<LoginUserData>('login.user.data')
export const SIGN_UP_USER_DATA = new InjectionToken<SignUpUserData>('sign.up.user.data')
export const PERSON_DATA = new InjectionToken<PersonData>('person.data')

const classFactory: Provider[] = [
	{
		provide: LOGIN_USER_DATA,
		useFactory: (): LoginDataI => new LoginUserData()
	},
	{
		provide: SIGN_UP_USER_DATA,
		useFactory: (): SignUpDataI => new SignUpUserData()
	},
	{
		provide: PERSON_DATA,
		useFactory: (): PersonDataI => new PersonData()
	},
]

//#endregion classFactory ;


//#region angularInfrastructure =>

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/app/ts/services/interceptor.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from 'src/app/ts/classes/infrastructure/custom-reuse-strategy';

const angularInfrastructure: Provider[] = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: InterceptorService,
		multi: true,
	},
	{
		provide: RouteReuseStrategy,
		useClass: CustomReuseStrategy,
	},
]

//#endregion angularInfrastructure ;


//#region angularMaterial =>

import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';


const hebrewRangeLabel = (page: number, pageSize: number, length: number) => {
	if (length === 0 || pageSize === 0) { return `0 מתוך ${length}` }

	length = Math.max(length, 0);

	const startIndex = page * pageSize;

	// If the start index exceeds the list length, do not try and fix the end index to the end.
	const endIndex = startIndex < length ?
		Math.min(startIndex + pageSize, length) :
		startIndex + pageSize;

	return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
}

function getHebrewPaginatorIntl() {
	const paginatorIntl = new MatPaginatorIntl();

	paginatorIntl.itemsPerPageLabel = 'פריטים לעמוד: '
	paginatorIntl.nextPageLabel = 'עמוד הבא'
	paginatorIntl.previousPageLabel = 'עמוד קודם'
	paginatorIntl.firstPageLabel = 'עמוד ראשון'
	paginatorIntl.lastPageLabel = 'עמוד אחרון'
	paginatorIntl.getRangeLabel = hebrewRangeLabel;

	return paginatorIntl;
}

const angularMaterial: Provider[] = [
	{
		provide: MAT_DIALOG_DEFAULT_OPTIONS,
		useValue: <MatDialogConfig>{
			panelClass: 'myMatDialogConfig',
			hasBackdrop: true,
			closeOnNavigation: false,
			disableClose: true,
		}
	},
	{
		provide: MatPaginatorIntl,
		useValue: getHebrewPaginatorIntl(),
	},
]

//#endregion angularMaterial ;



//#region providersList =>

export const providersList: Provider[] = [
	...staticVariables,
	...classFactory,
	...angularInfrastructure,
	...angularMaterial,
]

//#endregion providersList ;
