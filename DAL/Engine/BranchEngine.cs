using AutoMapper.QueryableExtensions;
using Common.Interfaces.DAL;
using Common.Models;
using DTO;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Engine {

	public class BranchEngine : IBranchEngine {

		public List<BranchEntity> GetAllBranches() {
			using (var context = DataAccess.GetDBContext) {
				return context.Branches
					.ProjectTo<BranchEntity>()
					.ToList();
			}
		}
	}
}
