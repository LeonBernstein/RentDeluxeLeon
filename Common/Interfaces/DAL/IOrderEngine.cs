using Common.Models;
using System.Collections.Generic;

namespace Common.Interfaces.DAL {

	public interface IOrderEngine {

		List<OrderEntity> GetAllOrders();
		List<OrderEntity> GetOrdersByUserId(int id);
		List<OrderEntity> GetOrdersByVehicleId(int id);
		OrderEntity GetOrderById(int id);
		OrderEntity AddOrder(OrderEntity order);
		OrderEntity UpdateOrder(OrderEntity order);
		OrderEntity SetActualEndDate(int id);
		OrderEntity DeleteOrder(int id);
		OrderEntity RestoreOrder(int id);
	}
}
