import {
	trigger,
	transition,
	animate,
	style,
	AnimationTriggerMetadata } from '@angular/animations';

export const animations = {
	fadeInOut: trigger('fadeInOut', [
		transition(':enter', [
			style({
				opacity: 0,
			}),
			animate('.2s linear',
				style({
					opacity: 1,
				}))
		]),
		transition(':leave', [
			animate('.2s linear',
				style({
					opacity: 0,
				}))
		])
	]) as AnimationTriggerMetadata
}
