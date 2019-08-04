using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class BranchLogic : IBranchLogic {

		private readonly IBranchEngine _branchEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public BranchLogic(
			IBranchEngine branchEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_branchEngine = branchEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public List<BranchEntity> GetAllBranches() {
			try {
				return _branchEngine.GetAllBranches();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
