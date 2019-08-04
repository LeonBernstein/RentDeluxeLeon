using Common.Interfaces.BL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebApi.Controllers {

	[Route("api/Administrative/")]
	[ApiController]
	[AllowAnonymous]
	public class AdministrativeController : ControllerBase {

		private readonly IBusinessLogic _BusinessLogic;

		private readonly string _key = "qHoEQ3JIk2bL4fPIkWkFHtNrG0nSFfvC";

		public AdministrativeController(
			IBusinessLogic BusinessLogic
			) {
			_BusinessLogic = BusinessLogic;
		}

		[Route("ClearAllCache")]
		[HttpPut]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status403Forbidden)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult ClearAllCache(string key) {
			try {
				if (key is string) {
					if (key == _key) {
						_BusinessLogic.ClreaAllCache();
						return Ok("Ok");
					} else {
						return Forbid();
					}
				} else {
					return BadRequest();
				}
			} catch {
				return StatusCode(500);
			}
		}


		[Route("FillCache")]
		[HttpPut]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status403Forbidden)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult FillCache(string key) {
			try {
				if (key is string) {
					if (key == _key) {
						_BusinessLogic.FillCache();
						return Ok("Ok");
					} else {
						return Forbid();
					}
				} else {
					return BadRequest();
				}
			} catch {
				return StatusCode(500);
			}
		}
	}
}
