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

	[Route("api/CarClasses/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class CarClassesController : ControllerBase {

		private readonly ICarClassLogic _carClassLogic;

		public CarClassesController(
			ICarClassLogic carClassLogic
		) {
			_carClassLogic = carClassLogic;
		}

		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllCarClasses")]
		[ProducesResponseType(typeof(List<ICarClass>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllCarClasses() {
			try {
				var carClasses = _carClassLogic.GetAllCarClasses();
				if (carClasses.Count == 0) {
					return NoContent();
				}
				return Ok(carClasses);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetCarClassById")]
		[ProducesResponseType(typeof(ICarClass), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetCarClassById(int id) {
			try {
				var carClass = _carClassLogic.GetCarClassById(id);
				if (carClass == null) {
					return BadRequest();
				}
				return Ok(carClass);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPost]
		[Route("AddCarClass")]
		[ProducesResponseType(typeof(ICarClass), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddCarClass([FromBody] CarClassModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<CarClassEntity>();
				entity = _carClassLogic.AddCarClass(entity);
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
		[Route("UpdateCarClass")]
		[ProducesResponseType(typeof(ICarClass), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateCarClass([FromBody] CarClassModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<CarClassEntity>();
				entity = _carClassLogic.UpdateCarClass(entity);
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
		[Route("DeleteCarClass")]
		[ProducesResponseType(typeof(ICarClass), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteCarClass(int id) {
			try {
				var entity = _carClassLogic.DeleteCarClass(id);
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
		[Route("RestoreCarClass")]
		[ProducesResponseType(typeof(ICarClass), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreCarClass(int id) {
			try {
				var entity = _carClassLogic.RestoreCarClass(id);
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