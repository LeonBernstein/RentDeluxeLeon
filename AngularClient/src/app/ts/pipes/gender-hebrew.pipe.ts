import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'genderHebrew'
})
export class GenderHebrewPipe implements PipeTransform {

	transform(letter: string): string {
		if (letter === 'm') return 'זכר'
		if (letter === 'f') return 'נקבה'
		return "אחר";
	}

}
