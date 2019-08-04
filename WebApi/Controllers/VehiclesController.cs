using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Common.Enums;
using Common.Helpers;
using Common.Interfaces.BL;
using Common.Interfaces.Entities;
using Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using WebApi.Attributes;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers {

	[Route("api/Vehicles/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class VehiclesController : ControllerBase {

		private readonly IVehicleLogic _vehicleLogic;

		public VehiclesController(
			IVehicleLogic vehicleLogic
		) {
			_vehicleLogic = vehicleLogic;
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetAllVehicles")]
		[ProducesResponseType(typeof(List<IVehicle>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllVehicles() {
			try {
				var vehicles = _vehicleLogic.GetAllVehicles();
				if (vehicles.Count == 0) {
					return NoContent();
				}
				return Ok(vehicles);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllRentableVehicles")]
		[ProducesResponseType(typeof(List<IVehicle>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllRentableVehicles() {
			try {
				var vehicles = _vehicleLogic.GetAllRentableVehicles();
				if (vehicles.Count == 0) {
					return NoContent();
				}
				return Ok(vehicles);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetVehicleById")]
		[ProducesResponseType(typeof(IVehicle), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetVehicleById(int id) {
			try {
				var vehicle = _vehicleLogic.GetVehicleById(id);
				if (vehicle == null) {
					return BadRequest();
				}
				var requestHeaders = HttpContext.Request.Headers;
				if (requestHeaders.TryGetValue("Authorization", out StringValues token)) {
					var userRole = JwtService.GetRoleFromToken(JwtService.DecodeToken(token.ToString()));
					if (userRole == Roles.user.GetEnumDescription() &&
					 (vehicle.IsActive == null ||
					 !(bool)vehicle.IsActive ||
					 !vehicle.IsAvailable ||
					 !vehicle.IsProper)
				) {
						return BadRequest();
					}
				} else {
					return Unauthorized();
				}
				return Ok(vehicle);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPost]
		[Route("AddVehicle")]
		[ProducesResponseType(typeof(IVehicle), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddVehicle([FromBody] VehicleModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleEntity>();
				entity.ManufactureDate = entity.ManufactureDate.ToLocalTime();
				entity = _vehicleLogic.AddVehicle(entity);
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
		[Route("UpdateVehicle")]
		[ProducesResponseType(typeof(IVehicle), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateVehicle([FromBody] VehicleModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<VehicleEntity>();
				entity.ManufactureDate = entity.ManufactureDate.ToLocalTime();
				entity = _vehicleLogic.UpdateVehicle(entity);
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
		[Route("DeleteVehicle")]
		[ProducesResponseType(typeof(IVehicle), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteVehicle(int id) {
			try {
				var entity = _vehicleLogic.DeleteVehicle(id);
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
		[Route("RestoreVehicle")]
		[ProducesResponseType(typeof(IVehicle), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreVehicle(int id) {
			try {
				var entity = _vehicleLogic.RestoreVehicle(id);
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
		[Route("UpdateVehiclesPicturePath")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> UpdateVehiclesPicturePath([FromForm]VehiclePictureModel model) {
			try {
				if (ModelState.IsValid) {
					byte[] vehicleImage;
					using (var memoryStream = new MemoryStream()) {
						await model.VehicleImage.CopyToAsync(memoryStream);
						vehicleImage = memoryStream.ToArray();
					}
					string guid = Guid.NewGuid().ToString();
					string mime = model.VehicleImage.ContentType.Contains("/") ?
						model.VehicleImage.ContentType.Split("/")[1] :
						model.VehicleImage.ContentType;
					string fileName = $"{guid}.{mime}";
					string realPath;
					try {
						realPath = _vehicleLogic.SaveVehiclesPicturePath(fileName, vehicleImage, model.VehicleId);
					} catch (Exception e) {
						return StatusCode(500, e);
					}
					if (string.IsNullOrWhiteSpace(realPath)) return BadRequest();

					return Ok(realPath);
				} else {
					return BadRequest(ModelState);
				}
			} catch (Exception e) {
				return BadRequest(e);
			}
		}
	}
}