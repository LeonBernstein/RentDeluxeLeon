import {
	trigger,
	animate,
	group,
	style,
	query,
	transition,
	AnimationTriggerMetadata,
} from '@angular/animations';

const time: number = 300
export const firstState: string = 'firstState'
export const secondState: string = 'secondState'

export const animations = {
	routerFade: trigger('routerFade', [
		transition('firstState <=> secondState', [
			style({
				position: 'relative',
			}),
			query(':enter, :leave', [
				style({
					position: 'absolute',
					width: '100%',
					height: '100%',
				})
			],
			{ optional: true }),
			query(':enter', [
				style({
					opacity: 0,
				})
			],
			{ optional: true }),
			group([
				query(':enter', [
					animate(time + 'ms ' + time + 'ms ease-out',
						style({
							opacity: 1,
						})
					)
				],
				{ optional: true }),
				query(':leave', [
					animate(time + 'ms ease-out',
						style({
							opacity: 0,
						})
					)
				],
				{ optional: true })
			])
		])
	]) as AnimationTriggerMetadata
}
