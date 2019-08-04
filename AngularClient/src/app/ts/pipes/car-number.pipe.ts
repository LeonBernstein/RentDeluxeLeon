import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'carNumber'
})
export class CarNumberPipe implements PipeTransform {

	transform(value: string): any {
		if (value.length == 7) {
			value = [value.slice(0, 2), "-", value.slice(2, 5), "-", value.slice(5)].join('')
		} else if (value.length == 8) {
			value = [value.slice(0, 3), "-", value.slice(3, 5), "-", value.slice(5)].join('')
		}
		return value
	}

}
