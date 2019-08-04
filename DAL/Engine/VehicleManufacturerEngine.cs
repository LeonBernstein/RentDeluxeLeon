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

	public class VehicleManufacturerEngine : IVehicleManufacturerEngine {

		public List<VehicleManufacturerEntity> GetAllVehicleManufacturers() {
			using (var context = DataAccess.GetDBContext) {
				return context.VehicleManufacturers
					.ProjectTo<VehicleManufacturerEntity>()
					.ToList();
			}
		}

		public VehicleManufacturerEntity GetVehicleManufacturerById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.VehicleManufacturers
					.Where(m => m.VehicleManufacturerId == id)
					.ProjectTo<VehicleManufacturerEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleManufacturerEntity AddVehicleManufacturer(VehicleManufacturerEntity VehicleManufacturer) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleManufacturerElement = Mapper.Map<VehicleManufacturers>(VehicleManufacturer);
				context.VehicleManufacturers.Add(VehicleManufacturerElement);
				context.SaveChanges();
				return Mapper.Map<VehicleManufacturerEntity>(VehicleManufacturerElement);
			}
		}

		public VehicleManufacturerEntity UpdateVehicleManufacturer(VehicleManufacturerEntity VehicleManufacturer) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleManufacturerElement = context.VehicleManufacturers
					.Where(m => m.VehicleManufacturerId == VehicleManufacturer.VehicleManufacturerId)
					.FirstOrDefault();
				if (VehicleManufacturerElement == null) {
					return null;
				}
				VehicleManufacturerElement.Name = VehicleManufacturer.Name;
				VehicleManufacturerElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<VehicleManufacturerEntity>(VehicleManufacturerElement);
			}
		}

		public VehicleManufacturerEntity DeleteVehicleManufacturer(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleManufacturerElement = context.VehicleManufacturers
					.Where(m => m.VehicleManufacturerId == id)
					.FirstOrDefault();
				if (VehicleManufacturerElement == null) {
					return null;
				}
				VehicleManufacturerElement.IsActive = false;
				VehicleManufacturerElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<VehicleManufacturerEntity>(VehicleManufacturerElement);
			}
		}

		public VehicleManufacturerEntity RestoreVehicleManufacturer(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleManufacturerElement = context.VehicleManufacturers
					.Where(m => m.VehicleManufacturerId == id)
					.FirstOrDefault();
				if (VehicleManufacturerElement == null) {
					return null;
				}
				VehicleManufacturerElement.IsActive = true;
				VehicleManufacturerElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<VehicleManufacturerEntity>(VehicleManufacturerElement);
			}
		}
	}
}
