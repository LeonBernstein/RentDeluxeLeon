using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.BL {

	public interface ICarClassLogic {

		List<CarClassEntity> GetAllCarClasses();
		CarClassEntity GetCarClassById(int id);
		CarClassEntity AddCarClass(CarClassEntity carClass);
		CarClassEntity UpdateCarClass(CarClassEntity carClass);
		CarClassEntity DeleteCarClass(int id);
		CarClassEntity RestoreCarClass(int id);
	}
}
