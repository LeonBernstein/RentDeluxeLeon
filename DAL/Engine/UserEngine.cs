using AutoMapper.QueryableExtensions;
using AutoMapper;
using Common.Models;
using DTO;
using DTO.Cache.Models;
using System.Linq;
using System.Collections.Generic;
using DTO.CarRentDeluxeDB;
using Microsoft.EntityFrameworkCore;
using Common.Interfaces.DAL;
using System;

namespace DAL.Engine {

	public class UserEngine : IUserEngine {

		public UserEntity GetUser(int userId) {
			using (var context = DataAccess.GetDBContext) {
				return context.Users
					.Where(u => u.UserId == userId)
					.ProjectTo<UserEntity>()
					.FirstOrDefault();
			}
		}

		public UserEntity GetUser(string userName) {
			using (var context = DataAccess.GetDBContext) {
				return context.Users
					.Where(u => u.UserName.ToLower() == userName.ToLower())
					.ProjectTo<UserEntity>()
					.FirstOrDefault();
			}
		}

		public List<UserEntity> GetAllUsers() {
			using (var context = DataAccess.GetDBContext) {
				return context.Users
					.ProjectTo<UserEntity>()
					.ToList();
			}
		}

		public int AddUser(UserEntity user) {
			using (var context = DataAccess.GetDBContext) {
				var userRow = Mapper.Map<Users>(user);
				context.Users.Add(userRow);
				context.SaveChanges();
				return userRow.UserId;
			}
		}

		public UserEntity DeleteUser(int userId) {
			using (var context = DataAccess.GetDBContext) {
				var user = context.Users
					.Where(u => u.UserId == userId)
					.Include(u => u.Person)
					.Include(u => u.UserRole)
					.FirstOrDefault();
				if (user == null) {
					return null;
				}
				user.IsActive = false;
				user.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<UserEntity>(user);
			}
		}

		public UserEntity RestoreUser(int userId) {
			using (var context = DataAccess.GetDBContext) {
				var user = context.Users
					.Where(u => u.UserId == userId)
					.Include(u => u.Person)
					.Include(u => u.UserRole)
					.FirstOrDefault();
				if (user == null) {
					return null;
				}
				user.IsActive = true;
				user.ModifiedDate = DateTime.Now;
				context.SaveChanges();
				return Mapper.Map<UserEntity>(user);
			}
		}

		public UserEntity UpdateUser(UserEntity user) {
			using (var context = DataAccess.GetDBContext) {
				var tableUser = context.Users
					.Where(u => u.UserId == user.UserId)
					.Include(u => u.Person)
					.Include(u => u.UserRole)
					.FirstOrDefault();
				if (tableUser == null) {
					return null;
				}
				tableUser.UserRoleId = user.UserRoleId;
				tableUser.Person.FirstName = user.Person.FirstName;
				tableUser.Person.LastName = user.Person.LastName;
				tableUser.Person.IdCardNum = user.Person.IdCardNum;
				tableUser.Person.Birthday = user.Person.Birthday;
				tableUser.Person.Gender = user.Person.Gender.ToString();
				var now = DateTime.Now;
				tableUser.ModifiedDate = now;
				tableUser.Person.ModifiedDate = now;
				context.SaveChanges();
				user = Mapper.Map<UserEntity>(tableUser);
				var userRole = context.UserRoles.Where(r => r.UserRoleId == user.UserRoleId).First();
				user.UserRole = Mapper.Map<UserRoleEntity>(userRole);
				return user;
			}
		}


		public bool IsUserExistInCache(int userId) {
			using (var context = DataAccess.GetCacheDBContext) {
				return context.Users
					.Where(u => u.UserId == userId)
					.Any();
			}
		}

		public bool IsUserExistInCache(string userName) {
			using (var context = DataAccess.GetCacheDBContext) {
				return context.Users
					.Where(u => u.UserName.ToLower() == userName.ToLower())
					.Any();
			}
		}

		public string GetUserPasswordFromCache(string userName) {
			using (var context = DataAccess.GetCacheDBContext) {
				return context.Users
					.Where(u => u.UserName.ToLower() == userName.ToLower())
					.Select(u => u.Password)
					.FirstOrDefault();
			}
		}

		public UserEntity GetUserFromCache(int userId) {
			using (var context = DataAccess.GetCacheDBContext) {
				return Mapper.Map<UserEntity>(context.Users
					.Where(u => u.UserId == userId)
					.FirstOrDefault());
			}
		}

		public UserEntity GetUserFromCache(string userName) {
			using (var context = DataAccess.GetCacheDBContext) {
				return Mapper.Map<UserEntity>(context.Users
					.Where(u => u.UserName.ToLower() == userName.ToLower())
					.FirstOrDefault());
			}
		}

		public List<UserEntity> GetAllUsersFromCache() {
			using (var context = DataAccess.GetCacheDBContext) {
				return Mapper.Map<List<UserEntity>>(context.Users);
			}
		}

		public int GetPersonsIdFromCache(int userId) {
			using (var context = DataAccess.GetCacheDBContext) {
				return context.Users
					.Where(u => u.UserId == userId)
					.Select(u => u.Person.PersonId)
					.FirstOrDefault();
			}
		}

		public void AddUserToCache(UserEntity user) {
			using (var context = DataAccess.GetCacheDBContext) {
				context.Users
					.Add(Mapper.Map<UserModel>(user));
			}
		}

		public void AddUsersListToCache(List<UserEntity> users) {
			using (var context = DataAccess.GetCacheDBContext) {
				context.Users = context.Users
					.Concat(Mapper.Map<List<UserModel>>(users))
					.ToList();
			}
		}

		public void OverrideUsersCache(List<UserEntity> users) {
			using (var context = DataAccess.GetCacheDBContext) {
				context.Users = Mapper.Map<List<UserModel>>(users);
			}
		}

		public void ClrearUsersCache() {
			using (var context = DataAccess.GetCacheDBContext) {
				context.Users = new List<UserModel>();
			}
		}
	}
}
