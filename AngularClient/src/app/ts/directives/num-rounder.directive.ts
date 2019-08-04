import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[numRounder]'
})
export class NumRounderDirective {

	@HostListener('blur', ['$event']) onblur(e: FocusEvent) {
		if (e.target instanceof HTMLInputElement) {
			e.target.value = Math.floor(+e.target.value).toString()
		}
	}

	constructor() { }

}
