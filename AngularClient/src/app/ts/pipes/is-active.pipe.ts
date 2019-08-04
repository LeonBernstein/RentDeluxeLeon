import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

	transform(value: any[]): any {
		return value.filter(val => val.isActive)
	}
}
