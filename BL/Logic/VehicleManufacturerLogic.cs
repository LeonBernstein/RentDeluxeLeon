using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class VehicleManufacturerLogic : IVehicleManufacturerLogic {

		private readonly IVehicleManufacturerEngine _vehicleManufacturerEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public VehicleManufacturerLogic(
			IVehicleManufacturerEngine vehicleManufacturerEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_vehicleManufacturerEngine = vehicleManufacturerEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<VehicleManufacturerEntity> GetAllVehicleManufacturers() {
			try {
				return _vehicleManufacturerEngine.GetAllVehicleManufacturers();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleManufacturerEntity GetVehicleManufacturerById(int id) {
			try {
				return _vehicleManufacturerEngine.GetVehicleManufacturerById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleManufacturerEntity AddVehicleManufacturer(VehicleManufacturerEntity VehicleManufacturer) {
			try {
				return _vehicleManufacturerEngine.AddVehicleManufacturer(VehicleManufacturer);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleManufacturerEntity UpdateVehicleManufacturer(VehicleManufacturerEntity VehicleManufacturer) {
			try {
				return _vehicleManufacturerEngine.UpdateVehicleManufacturer(VehicleManufacturer);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleManufacturerEntity DeleteVehicleManufacturer(int id) {
			try {
				return _vehicleManufacturerEngine.DeleteVehicleManufacturer(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public VehicleManufacturerEntity RestoreVehicleManufacturer(int id) {
			try {
				return _vehicleManufacturerEngine.RestoreVehicleManufacturer(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
