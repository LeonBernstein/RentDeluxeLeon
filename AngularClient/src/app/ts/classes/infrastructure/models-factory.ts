import { Person } from '../models/person.model';
import { PersonI, UserRoleI, UserI, GpsCoordinatesI, AddressI, BranchI, GearTypeI, CarClassI, VehicleManufacturerI, VehicleModelI, VehicleTypeI, VehicleI, OrderI } from '../../interfaces/model.interfaces';
import { UserRole } from '../models/user-role.model';
import { User } from '../models/user.model';
import { GpsCoordinates } from '../models/gps-coordinates.model';
import { Address } from '../models/address.model';
import { Branch } from '../models/branch.model';
import { GearType } from '../models/gear-type.model';
import { CarClass } from '../models/car-class.model';
import { VehicleManufacturer } from '../models/vehicle-manufacturer.model';
import { VehicleModel } from '../models/vehicle-model.model';
import { VehicleType } from '../models/vehicle-type.model';
import { Vehicle } from '../models/vehicle.model';
import { Order } from '../models/order.model';

export class ModelsFactory {
	
	public static createPersonModel = (): PersonI => new Person()
	public static createUserRoleModel = (): UserRoleI => new UserRole()
	public static createUserModel = (): UserI => new User(
		ModelsFactory.createUserRoleModel(),
		ModelsFactory.createPersonModel(),
	)
	public static createGpsCoordinatesModel = (): GpsCoordinatesI => new GpsCoordinates()
	public static createAddressModel = (): AddressI => new Address(
		ModelsFactory.createGpsCoordinatesModel()
	)
	public static createBranchModel = (): BranchI => new Branch(
		ModelsFactory.createAddressModel()
	)
	public static createGearTypeModel = (): GearTypeI => new GearType()
	public static createCarClassModel = (): CarClassI => new CarClass()
	public static createVehicleManufacturerModel = (): VehicleManufacturerI => new VehicleManufacturer()
	public static createVehicleModelModel = (): VehicleModelI => new VehicleModel(
		ModelsFactory.createVehicleManufacturerModel(),
		ModelsFactory.createVehicleTypeModel(),
	)
	public static createVehicleTypeModel = (): VehicleTypeI => new VehicleType()
	public static createVehicleModel = (): VehicleI => new Vehicle(
		ModelsFactory.createBranchModel(),
		ModelsFactory.createCarClassModel(),
		ModelsFactory.createGearTypeModel(),
		ModelsFactory.createVehicleModelModel(),
	)
	public static createOrderModel = (): OrderI => new Order(
		ModelsFactory.createUserModel(),
		ModelsFactory.createVehicleModel(),
	)
}