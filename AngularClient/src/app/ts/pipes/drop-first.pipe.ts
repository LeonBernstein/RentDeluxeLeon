import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dropFirst'
})
export class DropFirstPipe implements PipeTransform {

	transform(arr: any[]): any[] {
		arr.shift()
		return arr
	}

}
