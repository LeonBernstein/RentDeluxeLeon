using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class VehicleTypeLogic : IVehicleTypeLogic {

		private readonly IVehicleTypeEngine _vehicleTypeEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public VehicleTypeLogic(
			IVehicleTypeEngine vehicleTypeEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_vehicleTypeEngine = vehicleTypeEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<VehicleTypeEntity> GetAllVehicleTypes() {
			try {
				return _vehicleTypeEngine.GetAllVehicleTypes();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleTypeEntity GetVehicleTypeById(int id) {
			try {
				return _vehicleTypeEngine.GetVehicleTypeById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleTypeEntity AddVehicleType(VehicleTypeEntity VehicleType) {
			try {
				return _vehicleTypeEngine.AddVehicleType(VehicleType);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleTypeEntity UpdateVehicleType(VehicleTypeEntity VehicleType) {
			try {
				return _vehicleTypeEngine.UpdateVehicleType(VehicleType);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleTypeEntity DeleteVehicleType(int id) {
			try {
				return _vehicleTypeEngine.DeleteVehicleType(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleTypeEntity RestoreVehicleType(int id) {
			try {
				return _vehicleTypeEngine.RestoreVehicleType(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
