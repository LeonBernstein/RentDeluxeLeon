import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../classes/infrastructure/helpers';

@Pipe({
	name: 'fastSearch'
})
export class FastSearchPipe implements PipeTransform {

	transform(objects: any[], value: string ,args: string[]): any {
		if (!objects || !value || !args || !Array.isArray(objects) || !Array.isArray(args)) return objects
		
		const fastFilter = (objVal: string, filterVal: string) => {
			const values: string[] = filterVal.split(' ')
			const check = (val: string) => objVal.toString().toLowerCase().includes(val.toString().toLowerCase())
			return values.every(check)
		}
		
		objects = objects.filter(x => {
			let result = false
			for (let i = 0; !result && i < args.length; i++) {
				let val = Helper.fetchFromObject(x, args[i])
				val = val ? val : ''
				let date = new Date(val)
				if (date.toString() != 'Invalid Date') {
					val = date.getFullYear().toString()
				}
				result = fastFilter(val, value)
			}
			return result
		})
		
		return objects
	}

}
