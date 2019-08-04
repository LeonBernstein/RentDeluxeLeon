import { Provider } from '@angular/core';


//#region servicesList =>

const servicesList: Provider[] = []

//#endregion servicesList ;


//#region providersList =>

export const providersList: Provider[] = [
	...servicesList,
]

//#endregion providersList ;
