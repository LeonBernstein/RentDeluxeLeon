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

	public class GearTypeEngine : IGearTypeEngine {

		public List<GearTypeEntity> GetAllGearTypes() {
			using (var context = DataAccess.GetDBContext) {
				return context.GearTypes
					.ProjectTo<GearTypeEntity>()
					.ToList();
			}
		}

		public GearTypeEntity GetGearTypeById(int id) {
			using (var context = DataAccess.GetDBContext) {
				return context.GearTypes
					.Where(g => g.GearTypeId == id)
					.ProjectTo<GearTypeEntity>()
					.FirstOrDefault();
			}
		}

		public GearTypeEntity AddGearType(GearTypeEntity GearType) {
			using (var context = DataAccess.GetDBContext) {
				var GearTypeElement = Mapper.Map<GearTypes>(GearType);
				context.GearTypes.Add(GearTypeElement);
				context.SaveChanges();
				return Mapper.Map<GearTypeEntity>(GearTypeElement);
			}
		}

		public GearTypeEntity UpdateGearType(GearTypeEntity GearType) {
			using (var context = DataAccess.GetDBContext) {
				var GearTypeElement = context.GearTypes
					.Where(g => g.GearTypeId == GearType.GearTypeId)
					.FirstOrDefault();
				if (GearTypeElement == null) {
					return null;
				}
				GearTypeElement.Name = GearType.Name;
				GearTypeElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<GearTypeEntity>(GearTypeElement);
			}
		}

		public GearTypeEntity DeleteGearType(int id) {
			using (var context = DataAccess.GetDBContext) {
				var GearTypeElement = context.GearTypes
					.Where(g => g.GearTypeId == id)
					.FirstOrDefault();
				if (GearTypeElement == null) {
					return null;
				}
				GearTypeElement.IsActive = false;
				GearTypeElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<GearTypeEntity>(GearTypeElement);
			}
		}

		public GearTypeEntity RestoreGearType(int id) {
			using (var context = DataAccess.GetDBContext) {
				var GearTypeElement = context.GearTypes
					.Where(g => g.GearTypeId == id)
					.FirstOrDefault();
				if (GearTypeElement == null) {
					return null;
				}
				GearTypeElement.IsActive = true;
				GearTypeElement.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<GearTypeEntity>(GearTypeElement);
			}
		}
	}
}
