
//#region angularModules =>

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const angularModules = [
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
]

//#endregion angularModules ;


//#region angularMaterialsModules =>

import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

const angularMaterialsModules = [
	MatTabsModule,
	MatDialogModule,
	MatInputModule,
	MatCheckboxModule,
	MatButtonModule,
	MatDatepickerModule,
	MatRadioModule,
	MatNativeDateModule,
	MatIconModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatSelectModule,
	MatMenuModule,
	MatSnackBarModule,
	MatTooltipModule,
]

//#endregion angularMaterialsModules ;


//#region importsList =>

export const importsList = [
	...angularModules,
	...angularMaterialsModules,
]

//#endregion importsList ;