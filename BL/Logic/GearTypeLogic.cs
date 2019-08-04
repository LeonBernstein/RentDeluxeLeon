using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class GearTypeLogic : IGearTypeLogic {

		private readonly IGearTypeEngine _gearTypeEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public GearTypeLogic(
			IGearTypeEngine gearTypeEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_gearTypeEngine = gearTypeEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<GearTypeEntity> GetAllGearTypes() {
			try {
				return _gearTypeEngine.GetAllGearTypes();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public GearTypeEntity GetGearTypeById(int id) {
			try {
				return _gearTypeEngine.GetGearTypeById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public GearTypeEntity AddGearType(GearTypeEntity GearType) {
			try {
				return _gearTypeEngine.AddGearType(GearType);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public GearTypeEntity UpdateGearType(GearTypeEntity GearType) {
			try {
				return _gearTypeEngine.UpdateGearType(GearType);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public GearTypeEntity DeleteGearType(int id) {
			try {
				return _gearTypeEngine.DeleteGearType(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public GearTypeEntity RestoreGearType(int id) {
			try {
				return _gearTypeEngine.RestoreGearType(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
