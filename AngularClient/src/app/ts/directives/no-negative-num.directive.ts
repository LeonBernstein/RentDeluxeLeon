import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[noNegativeNum]'
})
export class NoNegativeNumDirective {
	
	@HostListener('change', ['$event']) onchange(e: Event) {
		if (e.target instanceof HTMLInputElement &&
			+e.target.value < 0
	) {
		e.target.value = (0).toString()
	}
	}

	constructor() { }
}
