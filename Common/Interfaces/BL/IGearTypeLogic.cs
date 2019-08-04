using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.BL {

	public interface IGearTypeLogic {

		List<GearTypeEntity> GetAllGearTypes();
		GearTypeEntity GetGearTypeById(int id);
		GearTypeEntity AddGearType(GearTypeEntity gearType);
		GearTypeEntity UpdateGearType(GearTypeEntity gearType);
		GearTypeEntity DeleteGearType(int id);
		GearTypeEntity RestoreGearType(int id);
	}
}
