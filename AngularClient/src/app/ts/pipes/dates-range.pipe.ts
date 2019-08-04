import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../classes/infrastructure/helpers';

@Pipe({
	name: 'datesRange'
})
export class DatesRangePipe implements PipeTransform {

	transform(
		value: any[],
		fromYear: number,
		toYear: number,
		args: string
	): any {
		if (fromYear && !isNaN(fromYear) && fromYear.toString().length == 4) {
			value = value.filter(x => {
				let val = Helper.fetchFromObject(x, args)
				if (!val) return false
				if (val instanceof Date) {
					val = +val.getFullYear()
				} else if (typeof (val) == 'string') {
					let date = new Date(val)
					val = +date.getFullYear()
				} else {
					return false
				}
				return val >= fromYear
			})
		}
		if (toYear && !isNaN(toYear) && toYear.toString().length == 4) {
			value = value.filter(x => {
				let val = Helper.fetchFromObject(x, args)
				if (!val) return false
				if (val instanceof Date) {
					val = +val.getFullYear()
				} else if (typeof (val) == 'string') {
					let date = new Date(val)
					val = +date.getFullYear()
				} else {
					return false
				}
				return val <= toYear
			})
		}
		return value
	}

}
