using AutoMapper;
using Common.Interfaces;
using Common.Models;
using DTO.Cache.Models;
using DTO.CarRentDeluxeDB;
using System.Linq;

namespace DAL.Mappers {

	public class AutoMapperConfig : IAutoMapperConfig {

		public void Init() {
			Mapper.Initialize(cfg => {
				UserMappers(cfg);
				UserRolesMapper(cfg);
				PersonMappers(cfg);
				AdressMappers(cfg);
				BranchMappers(cfg);
				CarClassMappers(cfg);
				GearTypesMappers(cfg);
				GpsCoordinatesMappers(cfg);
				OrderMappers(cfg);
				VehicleMappers(cfg);
				VehicleManufacturerMappers(cfg);
				VehicleModelMappers(cfg);
				VehicleTypeMappers(cfg);
			});
			Mapper.AssertConfigurationIsValid();
		}

		private void UserMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<Users, UserEntity>();
			cfg.CreateMap<UserModel, UserEntity>();
			cfg.CreateMap<UserEntity, UserModel>();
			cfg.CreateMap<UserEntity, Users>();
		}

		private void UserRolesMapper(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<UserRoles, UserRoleEntity>();
			cfg.CreateMap<UserRoleModel, UserRoleEntity>();
			cfg.CreateMap<UserRoleEntity, UserRoleModel>();
			cfg.CreateMap<UserEntity, UserRoles>();
		}

		private void PersonMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<Persons, PersonEntity>()
				.ForMember(dst => dst.Gender, opt =>
					opt.MapFrom(src => src.Gender.First()));

			cfg.CreateMap<PersonModel, PersonEntity>();
			cfg.CreateMap<PersonEntity, PersonModel>();
			cfg.CreateMap<PersonEntity, Persons>();
		}

		private void AdressMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<Addresses, AddressEntity>();
			cfg.CreateMap<AddressEntity, Addresses>();
		}

		private void BranchMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<Branches, BranchEntity>();
			cfg.CreateMap<BranchEntity, Branches>();
		}

		private void CarClassMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<CarClasses, CarClassEntity>();
			cfg.CreateMap<CarClassEntity, CarClasses>();
		}

		private void GearTypesMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<GearTypes, GearTypeEntity>();
			cfg.CreateMap<GearTypeEntity, GearTypes>();
		}

		private void GpsCoordinatesMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<GpsCoordinates, GpsCoordinatesEntity>();
			cfg.CreateMap<GpsCoordinatesEntity, GpsCoordinates>();
		}

		private void OrderMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<Orders, OrderEntity>();
			cfg.CreateMap<OrderEntity, Orders>();
		}

		private void VehicleMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<Vehicles, VehicleEntity>();
			cfg.CreateMap<VehicleEntity, Vehicles>();
		}

		private void VehicleManufacturerMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<VehicleManufacturers, VehicleManufacturerEntity>();
			cfg.CreateMap<VehicleManufacturerEntity, VehicleManufacturers>();
		}

		private void VehicleModelMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<VehicleModels, VehicleModelEntity>();
			cfg.CreateMap<VehicleModelEntity, VehicleModels>();
		}

		private void VehicleTypeMappers(IMapperConfigurationExpression cfg) {
			cfg.CreateMap<VehicleTypes, VehicleTypeEntity>();
			cfg.CreateMap<VehicleTypeEntity, VehicleTypes>();
		}
	}
}
