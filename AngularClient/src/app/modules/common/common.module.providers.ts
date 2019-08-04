import { Provider } from '@angular/core';


//#region providersList =>

import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDateFormats, DateAdapter } from '@angular/material/core';
import { MyDateAdapter } from 'src/app/ts/classes/infrastructure/my-date-adapter';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

const MY_DATE_FORMAT = <MatDateFormats>{
	parse: {
		dateInput: { year: 'numeric', month: 'short', day: 'numeric' }
	},
	display: {
		dateInput: 'input',
		monthYearLabel: 'input',
		dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
		monthYearA11yLabel: { year: 'numeric', month: 'long' },
	}
}

const MY_SNACK_BAR_DEFAULT_OPTIONS = <MatSnackBarConfig> {
	duration: 5000,
	panelClass: 'mySnackBar',
}

export const angularMaterial: Provider[] = [
	{
		provide: MAT_DATE_LOCALE,
		useValue: 'he'
	},
	{
		provide: DateAdapter,
		useClass: MyDateAdapter,
		deps: [MAT_DATE_LOCALE]
	},
	{
		provide: MAT_DATE_FORMATS,
		useValue: MY_DATE_FORMAT,
	},
	{
		provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
		useValue: MY_SNACK_BAR_DEFAULT_OPTIONS
	}
]

//#endregion providersList ;



//#region providersList =>

export const providersList: Provider[] = [
	...angularMaterial,
]

//#endregion providersList ;