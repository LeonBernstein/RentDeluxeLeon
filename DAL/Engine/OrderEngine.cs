using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Interfaces.DAL;
using Common.Models;
using DTO;
using DTO.CarRentDeluxeDB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Engine {

	public class OrderEngine : IOrderEngine {

		public List<OrderEntity> GetAllOrders() {
			using (var context = DataAccess.GetDBContext) {
				return context.Orders
					.ProjectTo<OrderEntity>()
					.ToList();
			}
		}

		public List<OrderEntity> GetOrdersByUserId(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.Orders
					.Where(o => o.UserId == id)
					.ProjectTo<OrderEntity>()
					.ToList();
			}
		}

		public List<OrderEntity> GetOrdersByVehicleId(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.Orders
					.Where(o => o.VehicleId == id)
					.ProjectTo<OrderEntity>()
					.ToList();
			}
		}

		public OrderEntity GetOrderById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.Orders
					.Where(o => o.OrderId == id)
					.ProjectTo<OrderEntity>()
					.FirstOrDefault();
			}
		}

		public OrderEntity AddOrder(OrderEntity order) {
			using (var context = DataAccess.GetDBContext) {
				var OrderElement = Mapper.Map<Orders>(order);
				context.Orders.Add(OrderElement);
				context.SaveChanges();
				return context.Orders
					.Where(o => o.OrderId == OrderElement.OrderId)
					.ProjectTo<OrderEntity>()
					.FirstOrDefault();
			}
		}

		public OrderEntity UpdateOrder(OrderEntity order) {
			using (var context = DataAccess.GetDBContext) {
				var OrderElement = context.Orders
					.Where(o => o.OrderId == order.OrderId)
					.FirstOrDefault();
				if (OrderElement == null) {
					return null;
				}
				OrderElement.StartDate = order.StartDate;
				OrderElement.EndDate = order.EndDate;
				OrderElement.ActualEndDate = order.ActualEndDate;
				OrderElement.UserId = order.UserId;
				OrderElement.VehicleId = order.VehicleId;
				OrderElement.Price = order.Price;
				OrderElement.TotalPrice = order.TotalPrice;
				OrderElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Orders
					.Where(o => o.OrderId == OrderElement.OrderId)
					.ProjectTo<OrderEntity>()
					.FirstOrDefault();
			}
		}

		public OrderEntity SetActualEndDate(int id) {
			using (var context = DataAccess.GetDBContext) {
				var OrderElement = context.Orders
					.Where(o => o.OrderId == id)
					.FirstOrDefault();
				if (OrderElement == null) {
					return null;
				}
				var now = DateTime.Now;
				OrderElement.ActualEndDate = now;
				OrderElement.ModifiedDate = now;
				context.SaveChanges();
				return context.Orders
					.Where(o => o.OrderId == OrderElement.OrderId)
					.ProjectTo<OrderEntity>()
					.FirstOrDefault(); ;
			}
		}

		public OrderEntity DeleteOrder(int id) {
			using (var context = DataAccess.GetDBContext) {
				var OrderElement = context.Orders
					.Where(o => o.OrderId == id)
					.FirstOrDefault();
				if (OrderElement == null) {
					return null;
				}
				OrderElement.IsActive = false;
				OrderElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Orders
					.Where(o => o.OrderId == OrderElement.OrderId)
					.ProjectTo<OrderEntity>()
					.FirstOrDefault(); ;
			}
		}

		public OrderEntity RestoreOrder(int id) {
			using (var context = DataAccess.GetDBContext) {
				var OrderElement = context.Orders
					.Where(o => o.OrderId == id)
					.FirstOrDefault();
				if (OrderElement == null) {
					return null;
				}
				OrderElement.IsActive = true;
				OrderElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Orders
					.Where(o => o.OrderId == OrderElement.OrderId)
					.ProjectTo<OrderEntity>()
					.FirstOrDefault(); ;
			}
		}
	}
}
