using System;
using System.Collections.Generic;
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

	[Route("api/Orders/")]
	[ApiController]
	[Role(new Roles[] { Roles.manager })]
	public class OrdersController : ControllerBase {

		private readonly IOrderLogic _orderLogic;
		private readonly IVehicleLogic _vehicleLogic;

		public OrdersController(
			IOrderLogic orderLogic,
			IVehicleLogic vehicleLogic
		) {
			_orderLogic = orderLogic;
			_vehicleLogic = vehicleLogic;
		}

		[Role(new Roles[] { Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetAllOrders")]
		[ProducesResponseType(typeof(List<IOrder>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllOrderes() {
			try {
				var orders = _orderLogic.GetAllOrders();
				if (orders.Count == 0) {
					return NoContent();
				}
				orders.ForEach(o => {
					if (o.User != null) o.User.Password = "";
				});
				return Ok(orders);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.employee, Roles.manager, Roles.user })]
		[HttpGet]
		[Route("GetOrdersByUserId")]
		[ProducesResponseType(typeof(List<IOrder>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetOrdersByUserId(int userId) {
			try {
				var orders = _orderLogic.GetOrdersByUserId(userId);
				if (orders.Count == 0) {
					return NoContent();
				}
				orders.ForEach(o => {
					if (o.User != null) o.User.Password = "";
				});
				return Ok(orders);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetOrdersByVehicleId")]
		[ProducesResponseType(typeof(List<IOrder>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetOrdersByVehicleId(int vehicleId) {
			try {
				var orders = _orderLogic.GetOrdersByVehicleId(vehicleId);
				if (orders.Count == 0) {
					return NoContent();
				}
				orders.ForEach(o => {
					if (o.User != null) o.User.Password = "";
				});
				return Ok(orders);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetOrderById")]
		[ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetOrderById(int id) {
			try {
				var order = _orderLogic.GetOrderById(id);
				if (order == null) {
					return BadRequest();
				}
				if (order.User != null) {
					order.User.Password = "";
				}
				return Ok(order);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.user })]
		[HttpPost]
		[Route("AddOrder")]
		[ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult AddOrder([FromBody] NewOrderModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				if (!(model.StartDate.ToLocalTime() > DateTime.Now.AddDays(-1)) ||
						!(model.EndDate > model.StartDate)
				) {
					return BadRequest("Inavalid dates range!");
				}
				var requestHeaders = HttpContext.Request.Headers;
				int userId = 0;
				if (requestHeaders.TryGetValue("Authorization", out StringValues token)) {
					userId = JwtService.GetUserIdFromToken(JwtService.DecodeToken(token.ToString()));
					if (userId < 1) return Unauthorized();
				} else {
					return Unauthorized();
				}
				var entity = model.Map<OrderEntity>();
				entity.StartDate = entity.StartDate.ToLocalTime();
				entity.EndDate = entity.EndDate.ToLocalTime();
				entity.UserId = userId;
				var vehicle = _vehicleLogic.GetVehicleById(entity.VehicleId);
				if (vehicle == null || vehicle.CarClass == null) {
					return BadRequest();
				}
				var userRole = JwtService.GetRoleFromToken(JwtService.DecodeToken(token.ToString()));
				if (userRole == Roles.user.GetEnumDescription() &&
					 (vehicle.IsActive == null ||
					 !(bool)vehicle.IsActive ||
					 !vehicle.IsAvailable ||
					 !vehicle.IsProper)
				) {
					return BadRequest();
				}
				entity.Price = (decimal)((entity.EndDate - entity.StartDate).TotalDays * vehicle.CarClass.DailyPrice);
				entity.Price = decimal.Round(entity.Price, 2);
				entity = _orderLogic.AddOrder(entity);
				if (entity == null) {
					throw new Exception("Somthing went wrong while adding model to DB!");
				}
				if (entity.User != null) {
					entity.User.Password = "";
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPut]
		[Route("UpdateOrder")]
		[ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateOrder([FromBody] OrderModel model) {
			try {
				if (model == null) {
					return BadRequest("Body content is not valid!");
				}
				if (!ModelState.IsValid) {
					return BadRequest(ModelState);
				}
				var entity = model.Map<OrderEntity>();
				entity.StartDate = entity.StartDate.ToLocalTime();
				entity.EndDate = entity.EndDate.ToLocalTime();
				if (entity.ActualEndDate != null) {
					entity.ActualEndDate = ((DateTime)entity.ActualEndDate).ToLocalTime();
				}
				entity = _orderLogic.UpdateOrder(entity);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				if (entity.User != null) {
					entity.User.Password = "";
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager, Roles.employee })]
		[HttpPatch]
		[Route("SetActualEndDate")]
		[ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult SetActualEndDate(int id) {
			try {
				var entity = _orderLogic.SetActualEndDate(id);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				var vehicle = _vehicleLogic.GetVehicleById(entity.VehicleId);
				if (vehicle == null || vehicle.CarClass == null || entity.ActualEndDate == null) {
					return BadRequest();
				}
				entity.TotalPrice = entity.Price + (decimal)(((DateTime)entity.ActualEndDate - entity.EndDate).TotalDays * vehicle.CarClass.DelayDailyPrice);
				if (entity.TotalPrice < 0) {
					entity.TotalPrice = entity.Price;
				}
				entity = _orderLogic.UpdateOrder(entity);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				if (entity.User != null) {
					entity.User.Password = "";
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpDelete]
		[Route("DeleteOrder")]
		[ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteOrder(int id) {
			try {
				var entity = _orderLogic.DeleteOrder(id);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				if (entity.User != null) {
					entity.User.Password = "";
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}

		[Role(new Roles[] { Roles.manager })]
		[HttpPatch]
		[Route("RestoreOrder")]
		[ProducesResponseType(typeof(IOrder), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreOrder(int id) {
			try {
				var entity = _orderLogic.RestoreOrder(id);
				if (entity == null) {
					return BadRequest("Somthing went wrong while updating model in DB!");
				}
				if (entity.User != null) {
					entity.User.Password = "";
				}
				return Ok(entity);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}
	}
}