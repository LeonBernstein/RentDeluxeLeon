using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IBranchEngine {

		List<BranchEntity> GetAllBranches();
	}
}
