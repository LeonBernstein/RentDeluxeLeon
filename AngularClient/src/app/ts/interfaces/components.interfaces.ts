
export interface CanComponentDeactivate {
	isNavigating: boolean
	isDirty: boolean
	isDataValid: boolean
	saveData(): void
}