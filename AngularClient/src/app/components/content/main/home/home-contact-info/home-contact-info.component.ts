import { Component, Inject } from '@angular/core';

@Component({
	selector: 'crd-home-contact-info',
	templateUrl: './home-contact-info.component.html',
	styleUrls: ['./home-contact-info.component.scss']
})
export class HomeContactInfoComponent {
	
	constructor(
		@Inject('LEONS_EMAIL') public readonly leonsEmail: string,
	) { }

}
