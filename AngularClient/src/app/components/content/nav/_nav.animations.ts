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
			animate('.3s linear',
				style({
					opacity: .6,
				}))
		]),
		transition(':leave', [
			animate('.3s linear',
				style({
					opacity: 0,
				}))
		])
	]) as AnimationTriggerMetadata
}
