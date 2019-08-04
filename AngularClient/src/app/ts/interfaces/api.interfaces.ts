import { Observable } from 'rxjs';
import { TokenDetailsI } from './data-structure.interfaces';
import { UserI, BranchI, CarClassI, GearTypeI, VehicleManufacturerI, VehicleModelI, VehicleTypeI, VehicleI, OrderI } from './model.interfaces';

export interface AuthApiI {
	getNonUserToken(userAgent: string): Observable<TokenDetailsI>
	login(
		userName: string,
		password: string,
	): Observable<{
		tokenDetails: TokenDetailsI,
		user: UserI,
		message?: string,
	}>
}

export interface UserApiI {
	getCurrentUser(token: string): Observable<UserI>
	getUserById(id: number): Observable<UserI>
	isUserExistById(userId: number): Observable<boolean>
	isUserExistByUserName(userName: string): Observable<boolean>
	registerUser(user: UserI): Observable<{
		tokenDetails: TokenDetailsI,
		user: UserI,
		message?: string,
	}>
	getAllUsers(): Observable<UserI[]>
	deleteUser(userId: number): Observable<UserI>
	restoreUser(userId: number): Observable<UserI>
	updateUser(user: UserI): Observable<UserI>
}

export interface PersonsApiI {
	updatePersonAvatar(image: File): Observable<string>
}

export interface BranchesApiI {
	getAllBranches(): Observable<BranchI[]>
}

export interface CarClassesApiI {
	getAllCarClasses(): Observable<CarClassI[]>
	getCarClassById(id: number): Observable<CarClassI>
	addCarClass(model: CarClassI): Observable<CarClassI>
	updateCarClass(model: CarClassI): Observable<CarClassI>
	deleteCarClass(id: number): Observable<CarClassI>
	restoreCarClass(id: number): Observable<CarClassI>
}

export interface GearTypesApiI {
	getAllGearTypes(): Observable<GearTypeI[]>
	getGearTypeById(id: number): Observable<GearTypeI>
	addGearType(model: GearTypeI): Observable<GearTypeI>
	updateGearType(model: GearTypeI): Observable<GearTypeI>
	deleteGearType(id: number): Observable<GearTypeI>
	restoreGearType(id: number): Observable<GearTypeI>
}

export interface VehicleManufacturersApiI {
	getAllVehicleManufacturers(): Observable<VehicleManufacturerI[]>
	getVehicleManufacturerById(id: number): Observable<VehicleManufacturerI>
	addVehicleManufacturer(model: VehicleManufacturerI): Observable<VehicleManufacturerI>
	updateVehicleManufacturer(model: VehicleManufacturerI): Observable<VehicleManufacturerI>
	deleteVehicleManufacturer(id: number): Observable<VehicleManufacturerI>
	restoreVehicleManufacturer(id: number): Observable<VehicleManufacturerI>
}

export interface VehicleModelsApiI {
	getAllVehicleModels(): Observable<VehicleModelI[]>
	getVehicleModelById(id: number): Observable<VehicleModelI>
	addVehicleModel(model: VehicleModelI): Observable<VehicleModelI>
	updateVehicleModel(model: VehicleModelI): Observable<VehicleModelI>
	deleteVehicleModel(id: number): Observable<VehicleModelI>
	restoreVehicleModel(id: number): Observable<VehicleModelI>
}

export interface VehicleTypesApiI {
	getAllVehicleTypes(): Observable<VehicleTypeI[]>
	getVehicleTypeById(id: number): Observable<VehicleTypeI>
	addVehicleType(model: VehicleTypeI): Observable<VehicleTypeI>
	updateVehicleType(model: VehicleTypeI): Observable<VehicleTypeI>
	deleteVehicleType(id: number): Observable<VehicleTypeI>
	restoreVehicleType(id: number): Observable<VehicleTypeI>
}

export interface VehiclesApiI {
	getAllVehicles(): Observable<VehicleI[]>
	getAllRentableVehicles(): Observable<VehicleI[]>
	getVehicleById(id: number): Observable<VehicleI>
	addVehicle(model: VehicleI): Observable<VehicleI>
	updateVehicle(model: VehicleI): Observable<VehicleI>
	deleteVehicle(id: number): Observable<VehicleI>
	restoreVehicle(id: number): Observable<VehicleI>
	updateVehiclesPicturePath(id: number, img: File): Observable<string>
}

export interface OrdersApiI {
	getAllOrders(): Observable<OrderI[]>
	getOrdersByUserId(userId: number): Observable<OrderI[]>
	getOrdersByVehicleId(vehicleId: number): Observable<OrderI[]>
	getOrderById(id: number): Observable<OrderI>
	addOrder(model: OrderI): Observable<OrderI>
	setActualEndDate(id: number): Observable<OrderI>
	updateOrder(model: OrderI): Observable<OrderI>
	deleteOrder(id: number): Observable<OrderI>
	restoreOrder(id: number): Observable<OrderI>
}
