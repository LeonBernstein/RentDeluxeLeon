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

	public class VehicleEngine : IVehicleEngine {

		public List<VehicleEntity> GetAllVehicles() {
			using (var context = DataAccess.GetDBContext) {
				return context.Vehicles
					.ProjectTo<VehicleEntity>()
					.ToList();
			}
		}

		public List<VehicleEntity> GetAllRentableVehicles() {
			using (var context = DataAccess.GetDBContext) {
				return context.Vehicles
					.Where(v =>
						v.IsActive == true &&
						v.IsAvailable &&
						v.IsProper)
					.ProjectTo<VehicleEntity>()
					.ToList();
			}
		}

		public VehicleEntity GetVehicleById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.Vehicles
					.Where(v => v.VehicleId == id)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault();
			}
		}

		public VehicleEntity AddVehicle(VehicleEntity Vehicle) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleElement = Mapper.Map<Vehicles>(Vehicle);
				context.Vehicles.Add(VehicleElement);
				context.SaveChanges();
				return context.Vehicles
					.Where(v => v.VehicleId == VehicleElement.VehicleId)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault(); ;
			}
		}

		public VehicleEntity UpdateVehicle(VehicleEntity Vehicle) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleElement = context.Vehicles
					.Where(v => v.VehicleId == Vehicle.VehicleId)
					.FirstOrDefault();
				if (VehicleElement == null) {
					return null;
				}
				VehicleElement.VehicleNumber = Vehicle.VehicleNumber;
				VehicleElement.ManufactureDate = Vehicle.ManufactureDate;
				VehicleElement.Mileage = Vehicle.Mileage;
				VehicleElement.IsProper = Vehicle.IsProper;
				VehicleElement.IsAvailable = Vehicle.IsAvailable;
				VehicleElement.AtBranchId = Vehicle.AtBranchId;
				VehicleElement.CarClassId = Vehicle.CarClassId;
				VehicleElement.GearTypeId = Vehicle.GearTypeId;
				VehicleElement.ModelId = Vehicle.ModelId;
				VehicleElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Vehicles
					.Where(v => v.VehicleId == VehicleElement.VehicleId)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault(); ;
			}
		}

		public VehicleEntity SetAsAvailable(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleElement = context.Vehicles
					.Where(v => v.VehicleId == id)
					.FirstOrDefault();
				if (VehicleElement == null) {
					return null;
				}
				VehicleElement.IsAvailable = true;
				VehicleElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Vehicles
					.Where(v => v.VehicleId == VehicleElement.VehicleId)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault(); ;
			}
		}

		public VehicleEntity SetAsUnAvailable(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleElement = context.Vehicles
					.Where(v => v.VehicleId == id)
					.FirstOrDefault();
				if (VehicleElement == null) {
					return null;
				}
				VehicleElement.IsAvailable = false;
				VehicleElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Vehicles
					.Where(v => v.VehicleId == VehicleElement.VehicleId)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault(); ;
			}
		}

		public VehicleEntity DeleteVehicle(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleElement = context.Vehicles
					.Where(v => v.VehicleId == id)
					.FirstOrDefault();
				if (VehicleElement == null) {
					return null;
				}
				VehicleElement.IsActive = false;
				VehicleElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Vehicles
					.Where(v => v.VehicleId == VehicleElement.VehicleId)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault(); ;
			}
		}

		public VehicleEntity RestoreVehicle(int id) {
			using (var context = DataAccess.GetDBContext) {
				var VehicleElement = context.Vehicles
					.Where(v => v.VehicleId == id)
					.FirstOrDefault();
				if (VehicleElement == null) {
					return null;
				}
				VehicleElement.IsActive = true;
				VehicleElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return context.Vehicles
					.Where(v => v.VehicleId == VehicleElement.VehicleId)
					.ProjectTo<VehicleEntity>()
					.FirstOrDefault(); ;
			}
		}

		public void UpdateVehiclesPicturePath(int id, string path) {
			using (var context = DataAccess.GetDBContext) {
				var vehicle = context.Vehicles
					.Where(v => v.VehicleId == id)
					.First();
				vehicle.PicturePath = path;
				vehicle.ModifiedDate = DateTime.Now;
				context.SaveChanges();
			}
		}
	}
}
