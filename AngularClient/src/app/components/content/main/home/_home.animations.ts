import {
	trigger,
	transition,
	animate,
	style,
	AnimationTriggerMetadata } from '@angular/animations';

export const animations = {
	fadeInOut: trigger('fadeInOut', [
		transition(':leave', [
			animate('.3s linear',
				style({
					opacity: 0,
				}))
		])
	]) as AnimationTriggerMetadata
}
