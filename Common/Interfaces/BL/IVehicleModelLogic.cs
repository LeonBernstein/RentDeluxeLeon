﻿using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.BL {

	public interface IVehicleModelLogic {

		List<VehicleModelEntity> GetAllVehicleModels();
		VehicleModelEntity GetVehicleModelById(int id);
		VehicleModelEntity AddVehicleModel(VehicleModelEntity vehicleModel);
		VehicleModelEntity UpdateVehicleModel(VehicleModelEntity vehicleModel);
		VehicleModelEntity DeleteVehicleModel(int id);
		VehicleModelEntity RestoreVehicleModel(int id);
	}
}
