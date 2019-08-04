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

	public class CarClassEngine : ICarClassEngine {

		public List<CarClassEntity> GetAllCarClasses() {
			using (var context = DataAccess.GetDBContext) {
				return context.CarClasses
					.ProjectTo<CarClassEntity>()
					.ToList();
			}
		}

		public CarClassEntity GetCarClassById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.CarClasses
					.Where(c => c.CarClassId == id)
					.ProjectTo<CarClassEntity>()
					.FirstOrDefault();
			}
		}

		public CarClassEntity AddCarClass(CarClassEntity carClass) {
			using (var context = DataAccess.GetDBContext) {
				var carClassElement = Mapper.Map<CarClasses>(carClass);
				context.CarClasses.Add(carClassElement);
				context.SaveChanges();
				return Mapper.Map<CarClassEntity>(carClassElement);
			}
		}

		public CarClassEntity UpdateCarClass(CarClassEntity carClass) {
			using (var context = DataAccess.GetDBContext) {
				var carClassElement = context.CarClasses
					.Where(c => c.CarClassId == carClass.CarClassId)
					.FirstOrDefault();
				if (carClassElement == null) {
					return null;
				}
				carClassElement.Name = carClass.Name;
				carClassElement.DailyPrice = carClass.DailyPrice;
				carClassElement.DelayDailyPrice = carClass.DelayDailyPrice;
				carClassElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<CarClassEntity>(carClassElement);
			}
		}

		public CarClassEntity DeleteCarClass(int id) {
			using (var context = DataAccess.GetDBContext) {
				var carClassElement = context.CarClasses
					.Where(c => c.CarClassId == id)
					.FirstOrDefault();
				if (carClassElement == null) {
					return null;
				}
				carClassElement.IsActive = false;
				carClassElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<CarClassEntity>(carClassElement);
			}
		}

		public CarClassEntity RestoreCarClass(int id) {
			using (var context = DataAccess.GetDBContext) {
				var carClassElement = context.CarClasses
					.Where(c => c.CarClassId == id)
					.FirstOrDefault();
				if (carClassElement == null) {
					return null;
				}
				carClassElement.IsActive = true;
				carClassElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<CarClassEntity>(carClassElement);
			}
		}
	}
}
