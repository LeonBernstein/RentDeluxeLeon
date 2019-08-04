using Common.Interfaces.BL;
using Common.Interfaces.DAL;
using Common.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Logic {

	public class UserLogic : IUserLogic {

		private readonly IUserEngine _userEngine;
		private readonly IExceptionHandlerLogic _exceptionHandlerLogic;

		public UserLogic(
			IUserEngine userEngine,
			IExceptionHandlerLogic exceptionHandlerLogic
		) {
			_userEngine = userEngine;
			_exceptionHandlerLogic = exceptionHandlerLogic;
		}

		public bool IsUserValid(string userName, string password) {
			try {
				if (!_userEngine.IsUserExistInCache(userName)) RePullUsers();
				string truePassword = _userEngine.GetUserPasswordFromCache(userName);
				if (!_userEngine.GetUserFromCache(userName).IsActive) return false;
				return string.IsNullOrWhiteSpace(truePassword) ? false : truePassword.Trim(' ') == password;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserEntity GetUser(int userId) {
			try {
				if (!_userEngine.IsUserExistInCache(userId)) RePullUsers();
				return _userEngine.GetUserFromCache(userId) ?? null;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserEntity GetUser(string userName) {
			try {
				if (!_userEngine.IsUserExistInCache(userName)) RePullUsers();
				return _userEngine.GetUserFromCache(userName) ?? null;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserEntity DeleteUser(int userId) {
			try {
				var user = _userEngine.DeleteUser(userId);
				if (user == null) {
					return null;
				}
				RePullUsers();
				return user;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserEntity RestoreUser(int userId) {
			try {
				var user = _userEngine.RestoreUser(userId);
				if (user == null) {
					return null;
				}
				RePullUsers();
				return user;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserEntity UpdateUser(UserEntity user) {
			try {
				var updatedUser = _userEngine.UpdateUser(user);
				if (updatedUser == null) {
					return null;
				}
				RePullUsers();
				return updatedUser;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public List<UserEntity> GetAllUsers() {
			try {
				var users = _userEngine.GetAllUsersFromCache();
				if (users.Count > 0) {
					return users;
				}
				users = _userEngine.GetAllUsers();
				if (users.Count == 0) {
					throw new Exception("No users in DB!");
				}
				Task.Run(() => {
					_userEngine.OverrideUsersCache(users);
				});
				return users;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public async Task<List<UserEntity>> GetAllUsersAsync() {
			try {
				return await Task.Run(() => GetAllUsers());
			} catch (Exception e) {
				throw e;
			}
		}

		public bool IsUserExist(int userId) {
			try {
				if (!_userEngine.IsUserExistInCache(userId))  RePullUsers();
				return _userEngine.IsUserExistInCache(userId);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public bool IsUserExist(string userName) {
			try {
				if (!_userEngine.IsUserExistInCache(userName)) RePullUsers();
				return _userEngine.IsUserExistInCache(userName);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public void ClearUsersCache() {
			try {
				_userEngine.ClrearUsersCache();
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public UserEntity AddUser(UserEntity user) {
			try {
				int userId = _userEngine.AddUser(user);
				user = _userEngine.GetUser(userId);
				if (user == null) throw new Exception("Error while writing a new user to DB.");
				_userEngine.AddUserToCache(user);
				return user;
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		public int GetPersonsId(int userId) {
			try {
				int personsId = _userEngine.GetPersonsIdFromCache(userId);
				if (personsId == 0) RePullUsers();
				return _userEngine.GetPersonsIdFromCache(userId);
			} catch (Exception e) {
				_exceptionHandlerLogic.LogExceptionAsync(e);
				throw e;
			}
		}

		private void RePullUsers() {
			var users = _userEngine.GetAllUsers();
			if (users.Count == 0) {
				throw new Exception("No users in DB!");
			}
			_userEngine.OverrideUsersCache(users);
		}
	}
}
