import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../classes/infrastructure/helpers';

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {

	transform(value: any, arg: string | string[], order = 'asc'): any {
		const groupBy = (arr: any[], property: string) => {
			return arr.reduce((memo, x) => {
				let val = Helper.fetchFromObject(x, property)
				if (!memo[val]) {
					memo[val] = [];
				}
				memo[val].push(x);
				return memo;
			}, {});
		}
		const compareValues = (key: string, order='asc') => {
			return function(a: any, b: any) {
				a = Helper.fetchFromObject(a, key)
				b = Helper.fetchFromObject(b, key)
				
				if (!a || !b) {
					return 0
				}
		
				const varA = (typeof a === 'string') ?
					a.toUpperCase() : a;
				const varB = (typeof b === 'string') ?
					b.toUpperCase() : b;
		
				let comparison = 0;
				if (varA > varB) {
					comparison = 1;
				} else if (varA < varB) {
					comparison = -1;
				}
				return (
					(order == 'desc') ? (comparison * -1) : comparison
				)
			}
		}
		if (Array.isArray(value) &&
			 typeof(value[0]) != 'object'
		) {
			return value.sort()
			
		} else if (Array.isArray(value) &&
							 typeof(value[0]) == 'object'
		) {
			if (Array.isArray(arg)) {
				let compare = compareValues(arg[1], order)
				value = value.sort(compare)
				let arrays: any[] = groupBy(value, arg[1])
				value = []
				for (let arr in arrays) {
					compare = compareValues(arg[0], order)
					let newArr = arrays[arr].sort(compare)
					value = value.concat(newArr)
				}
			} else {
				const compare = compareValues(arg, order)
				value = value.sort(compare)
			}
		}
		return value
	}

}
