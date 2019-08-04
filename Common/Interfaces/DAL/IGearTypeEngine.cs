using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IGearTypeEngine {

		List<GearTypeEntity> GetAllGearTypes();
		GearTypeEntity GetGearTypeById(int id);
		GearTypeEntity AddGearType(GearTypeEntity gearType);
		GearTypeEntity UpdateGearType(GearTypeEntity gearType);
		GearTypeEntity DeleteGearType(int id);
		GearTypeEntity RestoreGearType(int id);
	}
}
