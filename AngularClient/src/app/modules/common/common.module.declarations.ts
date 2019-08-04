//#region pipes =>

import { LinksFilterPipe } from 'src/app/ts/pipes/links-filter.pipe';
import { GenderHebrewPipe } from 'src/app/ts/pipes/gender-hebrew.pipe';
import { SortPipe } from 'src/app/ts/pipes/sort.pipe';
import { IsActivePipe } from 'src/app/ts/pipes/is-active.pipe';
import { CarNumberPipe } from 'src/app/ts/pipes/car-number.pipe';
import { SelectPipe } from 'src/app/ts/pipes/select.pipe';
import { DatesRangePipe } from 'src/app/ts/pipes/dates-range.pipe';
import { FastSearchPipe } from 'src/app/ts/pipes/fast-search.pipe';


const pipes = [
	LinksFilterPipe,
	GenderHebrewPipe,
	SortPipe,
	IsActivePipe,
	CarNumberPipe,
	SelectPipe,
	DatesRangePipe,
	FastSearchPipe,
]

//#endregion pipes ;


//#region directives =>

import { NumericOnlyDirective } from 'src/app/ts/directives/numeric-only.directive';
import { NumRounderDirective } from 'src/app/ts/directives/num-rounder.directive';
import { NoNegativeNumDirective } from 'src/app/ts/directives/no-negative-num.directive';

const directives = [
	NumericOnlyDirective,
	NumRounderDirective,
	NoNegativeNumDirective,
]

//#endregion directives ;


//#region declarationsList =>

export const declarationsList = [
	...directives,
	...pipes,
]

//#endregion declarationsList ;
