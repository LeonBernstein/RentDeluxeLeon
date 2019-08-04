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

	[Route("api/VehicleManufacturers/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class VehicleManufacturersController : ControllerBase {

		private readonly IVehicleManufacturerLogic _vehicleManufacturerLogic;

		public VehicleManufacturersController(
			IVehicleManufacturerLogic vehicleManufacturerLogic
		) {
			_vehicleManufacturerLogic = vehicleManufacturerLogic;
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllVehicleManufacturers")]
		[ProducesResponseType(typeof(List<IVehicleManufacturer>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllVehicleManufacturers() {
			try {
				var vehicleManufactureres = _vehicleManufacturerLogic.GetAllVehicleManufacturers();
				if (vehicleManufactureres.Count == 0) {
					return NoContent();
				}
				return Ok(vehicleManufactureres);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetVehicleManufacturerById")]
		[ProducesResponseType(typeof(IVehicleManufacturer), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetVehicleManufacturerById(int id) {
			try {
				var vehicleManufacturer = _vehicleManufacturerLogic.GetVehicleManufacturerById(id);
				if (vehicleManufacturer == null) {
					return BadRequest();
				}
				return Ok(vehicleManufacturer);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPost]
		[Route("AddVehicleManufacturer")]
		[ProducesResponseType(typeof(IVehicleManufacturer), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddVehicleManufacturer([FromBody] VehicleManufacturerModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleManufacturerEntity>();
				entity = _vehicleManufacturerLogic.AddVehicleManufacturer(entity);
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
		[Route("UpdateVehicleManufacturer")]
		[ProducesResponseType(typeof(IVehicleManufacturer), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateVehicleManufacturer([FromBody] VehicleManufacturerModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleManufacturerEntity>();
				entity = _vehicleManufacturerLogic.UpdateVehicleManufacturer(entity);
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
		[Route("DeleteVehicleManufacturer")]
		[ProducesResponseType(typeof(IVehicleManufacturer), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteVehicleManufacturer(int id) {
			try {
				var entity = _vehicleManufacturerLogic.DeleteVehicleManufacturer(id);
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
		[Route("RestoreVehicleManufacturer")]
		[ProducesResponseType(typeof(IVehicleManufacturer), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreVehicleManufacturer(int id) {
			try {
				var entity = _vehicleManufacturerLogic.RestoreVehicleManufacturer(id);
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