import { UserRoleTypes } from '../enums/user-role-types.enum';

export interface PersonI {
	personId: number
	firstName: string
	lastName: string
	gender: string
	birthday: Date
	idCardNum: string
	email: string
	picturePath: string
	isActive: boolean
	assignAllData(data: Object): PersonI
}

export interface UserRoleI {
	userRoleId: number
	systemName: string
	name: string
	isActive: boolean
	roleType: UserRoleTypes
}

export interface UserI {
	userId: number
	userName: string
	userRole: UserRoleI
	person: PersonI
	isActive: boolean
	password: string
	userRoleId: UserRoleTypes
	assignAllData(data: Object): UserI
}

export interface GpsCoordinatesI {
	gpsCoordinatesId: number
	latitude: number
	longitude: number
	isActive: boolean
}

export interface AddressI {
	addressId: number
	state: string
	city: string
	street: number
	homeNumber: number
	apartmentNumber: number
	entrance: string
	zipCode: number
	gpsCoordinatesId: number
	isActive: boolean
	gpsCoordinates: GpsCoordinatesI
}

export interface BranchI {
	branchId: number
	name: string
	addressId: number
	isActive: boolean
	address: AddressI
}

export interface CarClassI {
	carClassId: number
	name: string
	dailyPrice: number
	delayDailyPrice: number
	isActive: boolean
}

export interface GearTypeI {
	gearTypeId: number
	name: string
	isActive: boolean
}

export interface VehicleTypeI {
	vehicleTypeId: number
	name: string
	isActive: boolean
}

export interface VehicleManufacturerI {
	vehicleManufacturerId: number
	name: string
	isActive: boolean
}

export interface VehicleModelI {
	vehicleModelId: number
	name: string
	manufacturerId: number
	vehicleTypeId: number
	isActive: boolean
	manufacturer: VehicleManufacturerI
	vehicleType: VehicleTypeI
}

export interface VehicleI {
	vehicleId: number
	vehicleNumber: string
	manufactureDate: Date
	mileage: number
	isProper: boolean
	isAvailable: boolean
	atBranchId: number
	carClassId: number
	gearTypeId: number
	modelId: number
	picturePath: string
	isActive: boolean
	atBranch: BranchI
	carClass: CarClassI
	gearType: GearTypeI
	model: VehicleModelI
}

export interface OrderI {
	orderId: number
	startDate: Date
	endDate: Date
	actualEndDate: Date
	price: number
	totalPrice: number
	userId: number
	vehicleId: number
	isActive: boolean
	user: UserI
	vehicle: VehicleI
}
