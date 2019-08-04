import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../classes/infrastructure/helpers';

@Pipe({
	name: 'selectFilter'
})
export class SelectPipe implements PipeTransform {

	transform(objects: any[], value: string | number, args: string | string[]): any {
		if (!value || !args || !objects || !Array.isArray(objects)) return objects
		
		if (!Array.isArray(args)) {
			const tmp = args
			args = new Array()
			args[0] = tmp
		}
		
		args.forEach(x => {
			objects = objects.filter(o => {
				let val = Helper.fetchFromObject(o, x)
				val = val ? val : ""
				return val.toString() == value.toString()
			})
		})
		return objects
	}

}
