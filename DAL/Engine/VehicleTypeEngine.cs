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

	public class VehicleTypeEngine : IVehicleTypeEngine {

		public List<VehicleTypeEntity> GetAllVehicleTypes() {
			using (var context = DataAccess.GetDBContext) {
				return context.VehicleTypes
					.ProjectTo<VehicleTypeEntity>()
					.ToList();
			}
		}

		public VehicleTypeEntity GetVehicleTypeById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.VehicleTypes
					.Where(v => v.VehicleTypeId == id)
					.ProjectTo<VehicleTypeEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleTypeEntity AddVehicleType(VehicleTypeEntity VehicleType) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleTypeElement = Mapper.Map<VehicleTypes>(VehicleType);
				context.VehicleTypes.Add(VehicleTypeElement);
				context.SaveChanges();
				return Mapper.Map<VehicleTypeEntity>(VehicleTypeElement);
			}
		}

		public VehicleTypeEntity UpdateVehicleType(VehicleTypeEntity VehicleType) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleTypeElement = context.VehicleTypes
					.Where(v => v.VehicleTypeId == VehicleType.VehicleTypeId)
					.FirstOrDefault();
				if (VehicleTypeElement == null) {
					return null;
				}
				VehicleTypeElement.Name = VehicleType.Name;
				VehicleTypeElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<VehicleTypeEntity>(VehicleTypeElement);
			}
		}

		public VehicleTypeEntity DeleteVehicleType(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleTypeElement = context.VehicleTypes
					.Where(v => v.VehicleTypeId == id)
					.FirstOrDefault();
				if (VehicleTypeElement == null) {
					return null;
				}
				VehicleTypeElement.IsActive = false;
				VehicleTypeElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<VehicleTypeEntity>(VehicleTypeElement);
			}
		}

		public VehicleTypeEntity RestoreVehicleType(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleTypeElement = context.VehicleTypes
					.Where(v => v.VehicleTypeId == id)
					.FirstOrDefault();
				if (VehicleTypeElement == null) {
					return null;
				}
				VehicleTypeElement.IsActive = true;
				VehicleTypeElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<VehicleTypeEntity>(VehicleTypeElement);
			}
		}
	}
}
