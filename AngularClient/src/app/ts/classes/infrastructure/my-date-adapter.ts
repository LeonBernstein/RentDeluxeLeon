import { NativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { Inject } from '@angular/core';

export class MyDateAdapter extends NativeDateAdapter {
	
	
	constructor(
		@Inject(MAT_DATE_LOCALE) local: string,
	) {
		super(local, new Platform())
	}
	
	format(date: Date, displayFormat: Object): string {
		if (displayFormat === "input") {
			const day = date.getDate()
			const month = date.getMonth() + 1
			const year = date.getFullYear()
			return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year
		} else {
			return date.toLocaleDateString()
		}
	}
	
	private _to2digit(n: number) {
		return ('00' + n).slice(-2);
	}
	
	parse(value: any): Date | null {
		try {
			if (value && typeof(value) === 'string') {
				const dateArr: string[] = value.replace(/[/.-]/g, ' ').split(' ')
				return new Date(+dateArr[2], +dateArr[1]-1, +dateArr[0])
			}
			const timestamp = typeof value === 'number' ? value : Date.parse(value)
			return isNaN(timestamp) ? null : new Date(timestamp)
		} catch {
			return null
		}
	}
}