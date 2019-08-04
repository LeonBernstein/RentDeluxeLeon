using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;

namespace BL.Logic {

	public class OrderLogic : IOrderLogic {

		private readonly IOrderEngine _orderEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;
		private readonly IVehicleLogic _vehicleLogic;

		public OrderLogic(
			IOrderEngine orderEngine,
			IExceptionHandlerLogic exceptionHandlerLogic,
			IVehicleLogic vehicleLogic
		) {
			_orderEngine = orderEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
			_vehicleLogic = vehicleLogic;
		}

		public List<OrderEntity> GetAllOrders() {
			try {
				return _orderEngine.GetAllOrders();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public List<OrderEntity> GetOrdersByUserId(int id) {
			try {
				return _orderEngine.GetOrdersByUserId(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public List<OrderEntity> GetOrdersByVehicleId(int id) {
			try {
				return _orderEngine.GetOrdersByVehicleId(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public OrderEntity GetOrderById(int id) {
			try {
				return _orderEngine.GetOrderById(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public OrderEntity AddOrder(OrderEntity order) {
			try {
				order = _orderEngine.AddOrder(order);
				if (order == null) {
					return null;
				}
				try {
					_vehicleLogic.SetAsUnAvailableAsync(order.VehicleId);
				} catch { }
				return order;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public OrderEntity UpdateOrder(OrderEntity order) {
			try {
				return _orderEngine.UpdateOrder(order);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public OrderEntity SetActualEndDate(int id) {
			try {
				var order = _orderEngine.SetActualEndDate(id);
				if (order == null) {
					return null;
				}
				try {
					_vehicleLogic.SetAsAvailableAsync(order.VehicleId);
				} catch { }
				return order;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public OrderEntity DeleteOrder(int id) {
			try {
				return _orderEngine.DeleteOrder(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public OrderEntity RestoreOrder(int id) {
			try {
				return _orderEngine.RestoreOrder(id);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}
	}
}
