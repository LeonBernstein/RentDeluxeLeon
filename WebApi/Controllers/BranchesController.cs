using System;
using System.Collections.Generic;
using Common.Enums;
using Common.Interfaces.BL;
using Common.Interfaces.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Attributes;

namespace WebApi.Controllers {

	[Route("api/Branches/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class BranchesController : ControllerBase {

		private readonly IBranchLogic _branchLogic;

		public BranchesController(
			IBranchLogic branchLogic
		) {
			_branchLogic = branchLogic;
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetAllBranches")]
		[ProducesResponseType(typeof(List<IBranch>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllBranches() {
			try {
				var branches = _branchLogic.GetAllBranches();
				if (branches.Count == 0) {
					return NoContent();
				}
				return Ok(branches);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}
	}
}