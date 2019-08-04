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

	[Route("api/VehicleModels/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class VehicleModelsController : ControllerBase {

		private readonly IVehicleModelLogic _vehicleModelLogic;

		public VehicleModelsController(
			IVehicleModelLogic vehicleModelLogic
		) {
			_vehicleModelLogic = vehicleModelLogic;
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllVehicleModels")]
		[ProducesResponseType(typeof(List<IVehicleModel>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllVehicleModels() {
			try {
				var vehicleModeles = _vehicleModelLogic.GetAllVehicleModels();
				if (vehicleModeles.Count == 0) {
					return NoContent();
				}
				return Ok(vehicleModeles);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetVehicleModelById")]
		[ProducesResponseType(typeof(IVehicleModel), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetVehicleModelById(int id) {
			try {
				var vehicleModele = _vehicleModelLogic.GetVehicleModelById(id);
				if (vehicleModele == null) {
					return BadRequest();
				}
				return Ok(vehicleModele);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPost]
		[Route("AddVehicleModel")]
		[ProducesResponseType(typeof(IVehicleModel), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddVehicleModel([FromBody] VehicleModelModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleModelEntity>();
				entity = _vehicleModelLogic.AddVehicleModel(entity);
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
		[Route("UpdateVehicleModel")]
		[ProducesResponseType(typeof(IVehicleModel), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateVehicleModel([FromBody] VehicleModelModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleModelEntity>();
				entity = _vehicleModelLogic.UpdateVehicleModel(entity);
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
		[Route("DeleteVehicleModel")]
		[ProducesResponseType(typeof(IVehicleModel), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteVehicleModel(int id) {
			try {
				var entity = _vehicleModelLogic.DeleteVehicleModel(id);
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
		[Route("RestoreVehicleModel")]
		[ProducesResponseType(typeof(IVehicleModel), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreVehicleModel(int id) {
			try {
				var entity = _vehicleModelLogic.RestoreVehicleModel(id);
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