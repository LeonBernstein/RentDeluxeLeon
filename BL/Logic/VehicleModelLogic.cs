using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class VehicleModelLogic : IVehicleModelLogic {

		private readonly IVehicleModelEngine _vehicleModelEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public VehicleModelLogic(
			IVehicleModelEngine vehicleModelEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_vehicleModelEngine = vehicleModelEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<VehicleModelEntity> GetAllVehicleModels() {
			try {
				return _vehicleModelEngine.GetAllVehicleModels();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleModelEntity GetVehicleModelById(int id) {
			try {
				return _vehicleModelEngine.GetVehicleModelById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleModelEntity AddVehicleModel(VehicleModelEntity VehicleModel) {
			try {
				return _vehicleModelEngine.AddVehicleModel(VehicleModel);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleModelEntity UpdateVehicleModel(VehicleModelEntity VehicleModel) {
			try {
				return _vehicleModelEngine.UpdateVehicleModel(VehicleModel);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleModelEntity DeleteVehicleModel(int id) {
			try {
				return _vehicleModelEngine.DeleteVehicleModel(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleModelEntity RestoreVehicleModel(int id) {
			try {
				return _vehicleModelEngine.RestoreVehicleModel(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
