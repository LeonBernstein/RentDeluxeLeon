using Microsoft.EntityFrameworkCore;

namespace DTO.CarRentDeluxeDB {
	public partial class CarRentDeluxeDBContext : DbContext {
		public CarRentDeluxeDBContext() {
		}

		public CarRentDeluxeDBContext(DbContextOptions<CarRentDeluxeDBContext> options)
				: base(options) {
		}

		public virtual DbSet<Addresses> Addresses { get; set; }
		public virtual DbSet<Branches> Branches { get; set; }
		public virtual DbSet<CarClasses> CarClasses { get; set; }
		public virtual DbSet<GearTypes> GearTypes { get; set; }
		public virtual DbSet<GpsCoordinates> GpsCoordinates { get; set; }
		public virtual DbSet<Orders> Orders { get; set; }
		public virtual DbSet<Persons> Persons { get; set; }
		public virtual DbSet<UserRoles> UserRoles { get; set; }
		public virtual DbSet<Users> Users { get; set; }
		public virtual DbSet<VehicleManufacturers> VehicleManufacturers { get; set; }
		public virtual DbSet<VehicleModels> VehicleModels { get; set; }
		public virtual DbSet<VehicleTypes> VehicleTypes { get; set; }
		public virtual DbSet<Vehicles> Vehicles { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
			if (!optionsBuilder.IsConfigured) {
				optionsBuilder.UseSqlServer(ConnectionStringer.ConstuctString("CarRentDeluxeDBContext"));
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

			modelBuilder.Entity<Addresses>(entity => {
				entity.HasKey(e => e.AddressId);

				entity.ToTable("Addresses", "Location");

				entity.Property(e => e.AddressId).HasColumnName("AddressID");

				entity.Property(e => e.City)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Entrance).HasMaxLength(1);

				entity.Property(e => e.GpsCoordinatesId).HasColumnName("GpsCoordinatesID");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.Property(e => e.State)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.Street).HasMaxLength(32);

				entity.HasOne(d => d.GpsCoordinates)
						.WithMany(p => p.Addresses)
						.HasForeignKey(d => d.GpsCoordinatesId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Addresses_Addresses");
			});

			modelBuilder.Entity<Branches>(entity => {
				entity.HasKey(e => e.BranchId);

				entity.ToTable("Branches", "Branch");

				entity.Property(e => e.BranchId).HasColumnName("BranchID");

				entity.Property(e => e.AddressId).HasColumnName("AddressID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.HasOne(d => d.Address)
						.WithMany(p => p.Branches)
						.HasForeignKey(d => d.AddressId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Branches_Addresses");
			});

			modelBuilder.Entity<CarClasses>(entity => {
				entity.HasKey(e => e.CarClassId);

				entity.ToTable("CarClasses", "Vehicle");

				entity.Property(e => e.CarClassId).HasColumnName("CarClassID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");
			});

			modelBuilder.Entity<GearTypes>(entity => {
				entity.HasKey(e => e.GearTypeId);

				entity.ToTable("GearTypes", "Vehicle");

				entity.Property(e => e.GearTypeId).HasColumnName("GearTypeID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");
			});

			modelBuilder.Entity<GpsCoordinates>(entity => {
				entity.ToTable("GpsCoordinates", "Location");

				entity.Property(e => e.GpsCoordinatesId).HasColumnName("GpsCoordinatesID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");

				entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");
			});

			modelBuilder.Entity<Orders>(entity => {
				entity.HasKey(e => e.OrderId);

				entity.ToTable("Orders", "Order");

				entity.Property(e => e.OrderId).HasColumnName("OrderID");

				entity.Property(e => e.ActualEndDate).HasColumnType("date");

				entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

				entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.EndDate).HasColumnType("date");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.Property(e => e.StartDate).HasColumnType("date");

				entity.Property(e => e.UserId).HasColumnName("UserId");

				entity.Property(e => e.VehicleId).HasColumnName("VehicleID");

				entity.HasOne(d => d.User)
						.WithMany(p => p.Orders)
						.HasForeignKey(d => d.UserId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Orders_Users");

				entity.HasOne(d => d.Vehicle)
						.WithMany(p => p.Orders)
						.HasForeignKey(d => d.VehicleId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Orders_Vehicles");
			});

			modelBuilder.Entity<Persons>(entity => {
				entity.HasKey(e => e.PersonId);

				entity.ToTable("Persons", "Person");

				entity.Property(e => e.PersonId).HasColumnName("PersonID");

				entity.Property(e => e.Birthday).HasColumnType("date");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Email)
						.IsRequired()
						.HasMaxLength(256);

				entity.Property(e => e.FirstName)
						.IsRequired()
						.HasMaxLength(64);

				entity.Property(e => e.Gender)
						.IsRequired()
						.HasMaxLength(1)
						.IsUnicode(false);

				entity.Property(e => e.IdCardNum)
						.IsRequired()
						.HasMaxLength(16);

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.LastName)
						.IsRequired()
						.HasMaxLength(64);

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.PicturePath).HasMaxLength(256);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");
			});

			modelBuilder.Entity<UserRoles>(entity => {
				entity.HasKey(e => e.UserRoleId);

				entity.ToTable("UserRoles", "User");

				entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.Property(e => e.SystemName)
						.IsRequired()
						.HasMaxLength(16)
						.IsUnicode(false);
			});

			modelBuilder.Entity<Users>(entity => {
				entity.HasKey(e => e.UserId);

				entity.ToTable("Users", "User");

				entity.Property(e => e.UserId).HasColumnName("UserID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Password)
						.IsRequired()
						.HasMaxLength(64)
						.IsUnicode(false);

				entity.Property(e => e.PersonId).HasColumnName("PersonID");

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.Property(e => e.UserName)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

				entity.HasOne(d => d.Person)
						.WithMany(p => p.Users)
						.HasForeignKey(d => d.PersonId)
						.HasConstraintName("FK_Users_Persons");

				entity.HasOne(d => d.UserRole)
						.WithMany(p => p.Users)
						.HasForeignKey(d => d.UserRoleId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Users_UserRoles");
			});

			modelBuilder.Entity<VehicleManufacturers>(entity => {
				entity.HasKey(e => e.VehicleManufacturerId)
						.HasName("PK_Manufacturers");

				entity.ToTable("VehicleManufacturers", "Vehicle");

				entity.Property(e => e.VehicleManufacturerId).HasColumnName("VehicleManufacturerID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");
			});

			modelBuilder.Entity<VehicleModels>(entity => {
				entity.HasKey(e => e.VehicleModelId)
						.HasName("PK_Models");

				entity.ToTable("VehicleModels", "Vehicle");

				entity.Property(e => e.VehicleModelId).HasColumnName("VehicleModelID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");


				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ManufacturerId).HasColumnName("ManufacturerID");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.Property(e => e.VehicleTypeId).HasColumnName("VehicleTypeID");

				entity.HasOne(d => d.Manufacturer)
						.WithMany(p => p.VehicleModels)
						.HasForeignKey(d => d.ManufacturerId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Models_VehicleManufacturers");

				entity.HasOne(d => d.VehicleType)
						.WithMany(p => p.VehicleModels)
						.HasForeignKey(d => d.VehicleTypeId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Models_VehicleTypes");
			});

			modelBuilder.Entity<VehicleTypes>(entity => {
				entity.HasKey(e => e.VehicleTypeId);

				entity.ToTable("VehicleTypes", "Vehicle");

				entity.Property(e => e.VehicleTypeId).HasColumnName("VehicleTypeID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.Name)
						.IsRequired()
						.HasMaxLength(32);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");
			});

			modelBuilder.Entity<Vehicles>(entity => {
				entity.HasKey(e => e.VehicleId);

				entity.ToTable("Vehicles", "Vehicle");

				entity.Property(e => e.VehicleId).HasColumnName("VehicleID");

				entity.Property(e => e.AtBranchId).HasColumnName("AtBranchID");

				entity.Property(e => e.CarClassId).HasColumnName("CarClassID");

				entity.Property(e => e.CreatedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.GearTypeId).HasColumnName("GearTypeID");

				entity.Property(e => e.IsActive)
						.IsRequired()
						.HasDefaultValueSql("((1))");

				entity.Property(e => e.ManufactureDate).HasColumnType("date");

				entity.Property(e => e.ModelId).HasColumnName("ModelID");

				entity.Property(e => e.ModifiedDate)
						.HasColumnType("datetime")
						.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.PicturePath)
						.HasMaxLength(256);

				entity.Property(e => e.RowGuid)
						.HasColumnName("RowGUID")
						.HasDefaultValueSql("(newid())");

				entity.Property(e => e.VehicleNumber)
						.IsRequired()
						.HasMaxLength(16);

				entity.HasOne(d => d.AtBranch)
						.WithMany(p => p.Vehicles)
						.HasForeignKey(d => d.AtBranchId)
						.HasConstraintName("FK_Vehicles_Branches");

				entity.HasOne(d => d.CarClass)
						.WithMany(p => p.Vehicles)
						.HasForeignKey(d => d.CarClassId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Vehicles_CarClasses");

				entity.HasOne(d => d.GearType)
						.WithMany(p => p.Vehicles)
						.HasForeignKey(d => d.GearTypeId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Vehicles_GearTypes");

				entity.HasOne(d => d.Model)
						.WithMany(p => p.Vehicles)
						.HasForeignKey(d => d.ModelId)
						.OnDelete(DeleteBehavior.ClientSetNull)
						.HasConstraintName("FK_Vehicles_Models");
			});
		}
	}
}
