import { Directive, HostListener, Inject } from '@angular/core';

@Directive({
	selector: '[numericOnly]'
})
export class NumericOnlyDirective {

	@HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
		if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: Ctrl+C
			(e.keyCode == 67 && e.ctrlKey === true) ||
			// Allow: Ctrl+V
			(e.keyCode == 86 && e.ctrlKey === true) ||
			// Allow: Ctrl+X
			(e.keyCode == 88 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)
		) {
			// let it happen, don't do anything
			return
		}
		if (this.numericOnly.test(e.key))
			return
		else
			e.preventDefault()
	}

	constructor(
		@Inject('NUMERIC_ONLY') public readonly numericOnly: RegExp,
	) { }

}
