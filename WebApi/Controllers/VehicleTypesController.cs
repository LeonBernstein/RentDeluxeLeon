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

	[Route("api/VehicleTypes/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class VehicleTypesController : ControllerBase {

		private readonly IVehicleTypeLogic _vehicleTypeLogic;

		public VehicleTypesController(
			IVehicleTypeLogic vehicleTypeLogic
		) {
			_vehicleTypeLogic = vehicleTypeLogic;
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllVehicleTypes")]
		[ProducesResponseType(typeof(List<IVehicleType>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllVehicleTypes() {
			try {
				var vehicleTypes = _vehicleTypeLogic.GetAllVehicleTypes();
				if (vehicleTypes.Count == 0) {
					return NoContent();
				}
				return Ok(vehicleTypes);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetVehicleTypeById")]
		[ProducesResponseType(typeof(IVehicleType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetVehicleTypeById(int id) {
			try {
				var vehicleType = _vehicleTypeLogic.GetVehicleTypeById(id);
				if (vehicleType == null) {
					return BadRequest();
				}
				return Ok(vehicleType);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPost]
		[Route("AddVehicleType")]
		[ProducesResponseType(typeof(IVehicleType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddVehicleType([FromBody] VehicleTypeModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleTypeEntity>();
				entity = _vehicleTypeLogic.AddVehicleType(entity);
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
		[Route("UpdateVehicleType")]
		[ProducesResponseType(typeof(IVehicleType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateVehicleType([FromBody] VehicleTypeModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleTypeEntity>();
				entity = _vehicleTypeLogic.UpdateVehicleType(entity);
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
		[Route("DeleteVehicleType")]
		[ProducesResponseType(typeof(IVehicleType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteVehicleType(int id) {
			try {
				var entity = _vehicleTypeLogic.DeleteVehicleType(id);
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
		[Route("RestoreVehicleType")]
		[ProducesResponseType(typeof(IVehicleType), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreVehicleType(int id) {
			try {
				var entity = _vehicleTypeLogic.RestoreVehicleType(id);
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