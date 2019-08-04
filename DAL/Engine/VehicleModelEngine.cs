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

	public class VehicleModelEngine : IVehicleModelEngine {

		public List<VehicleModelEntity> GetAllVehicleModels() {
			using (var context = DataAccess.GetDBContext) {
				return context.VehicleModels
					.ProjectTo<VehicleModelEntity>()
					.ToList();
			}
		}

		public VehicleModelEntity GetVehicleModelById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.VehicleModels
					.Where(m => m.VehicleModelId == id)
					.ProjectTo<VehicleModelEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleModelEntity AddVehicleModel(VehicleModelEntity VehicleModel) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleModelElement = Mapper.Map<VehicleModels>(VehicleModel);
				context.VehicleModels.Add(VehicleModelElement);
				context.SaveChanges();
				return context.VehicleModels
					.Where(v => v.VehicleModelId == VehicleModelElement.VehicleModelId)
					.ProjectTo<VehicleModelEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleModelEntity UpdateVehicleModel(VehicleModelEntity VehicleModel) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleModelElement = context.VehicleModels
					.Where(m => m.VehicleModelId == VehicleModel.VehicleModelId)
					.FirstOrDefault();
				if (VehicleModelElement == null) {
					return null;
				}
				VehicleModelElement.Name = VehicleModel.Name;
				VehicleModelElement.ManufacturerId = VehicleModel.ManufacturerId;
				VehicleModelElement.VehicleTypeId = VehicleModel.VehicleTypeId;
				VehicleModelElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.VehicleModels
					.Where(v => v.VehicleModelId == VehicleModelElement.VehicleModelId)
					.ProjectTo<VehicleModelEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleModelEntity DeleteVehicleModel(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleModelElement = context.VehicleModels
					.Where(m => m.VehicleModelId == id)
					.FirstOrDefault();
				if (VehicleModelElement == null) {
					return null;
				}
				VehicleModelElement.IsActive = false;
				VehicleModelElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.VehicleModels
					.Where(v => v.VehicleModelId == VehicleModelElement.VehicleModelId)
					.ProjectTo<VehicleModelEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleModelEntity RestoreVehicleModel(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleModelElement = context.VehicleModels
					.Where(m => m.VehicleModelId == id)
					.FirstOrDefault();
				if (VehicleModelElement == null) {
					return null;
				}
				VehicleModelElement.IsActive = true;
				VehicleModelElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.VehicleModels
					.Where(v => v.VehicleModelId == VehicleModelElement.VehicleModelId)
					.ProjectTo<VehicleModelEntity>()
					.FirstOrDefault();
			}
		}
	}
}
