using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.BL {

	public interface IBranchLogic {

		List<BranchEntity> GetAllBranches();
	}
}
