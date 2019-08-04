using System;
using System.Collections.Generic;
using Common.Enums;
using Common.Helpers;
using Common.Interfaces.BL;
using Common.Interfaces.Entities;
using Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Attributes;
using WebApi.Models;

namespace WebApi.Controllers {

	[Route("api/GearTypes/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class GearTypesController : ControllerBase {

		private readonly IGearTypeLogic _gearTypeLogic;

		public GearTypesController(
			IGearTypeLogic gearTypeLogic
		) {
			_gearTypeLogic = gearTypeLogic;
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllGearTypes")]
		[ProducesResponseType(typeof(List<IGearType>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllGearTypes() {
			try {
				var gearTypes = _gearTypeLogic.GetAllGearTypes();
				if (gearTypes.Count == 0) {
					return NoContent();
				}
				return Ok(gearTypes);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetGearTypeById")]
		[ProducesResponseType(typeof(IGearType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetGearTypeById(int id) {
			try {
				var gearType = _gearTypeLogic.GetGearTypeById(id);
				if (gearType == null) {
					return BadRequest();
				}
				return Ok(gearType);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPost]
		[Route("AddGearType")]
		[ProducesResponseType(typeof(IGearType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddGearType([FromBody] GearTypeModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<GearTypeEntity>();
				entity = _gearTypeLogic.AddGearType(entity);
				if (entity == null) {
					throw new Exception("Somthing went wrong while adding model to DB!");
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPut]
		[Route("UpdateGearType")]
		[ProducesResponseType(typeof(IGearType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateGearType([FromBody] GearTypeModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<GearTypeEntity>();
				entity = _gearTypeLogic.UpdateGearType(entity);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpDelete]
		[Route("DeleteGearType")]
		[ProducesResponseType(typeof(IGearType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteGearType(int id) {
			try {
				var entity = _gearTypeLogic.DeleteGearType(id);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPatch]
		[Route("RestoreGearType")]
		[ProducesResponseType(typeof(IGearType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreGearType(int id) {
			try {
				var entity = _gearTypeLogic.RestoreGearType(id);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}
	}
}