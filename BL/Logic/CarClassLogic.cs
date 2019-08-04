using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class CarClassLogic : ICarClassLogic {

		private readonly ICarClassEngine _carClassEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public CarClassLogic(
			ICarClassEngine carClassEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_carClassEngine = carClassEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<CarClassEntity> GetAllCarClasses() {
			try {
				return _carClassEngine.GetAllCarClasses();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public CarClassEntity GetCarClassById(int id) {
			try {
				return _carClassEngine.GetCarClassById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public CarClassEntity AddCarClass(CarClassEntity carClass) {
			try {
				return _carClassEngine.AddCarClass(carClass);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public CarClassEntity UpdateCarClass(CarClassEntity carClass) {
			try {
				return _carClassEngine.UpdateCarClass(carClass);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public CarClassEntity DeleteCarClass(int id) {
			try {
				return _carClassEngine.DeleteCarClass(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public CarClassEntity RestoreCarClass(int id) {
			try {
				return _carClassEngine.RestoreCarClass(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
