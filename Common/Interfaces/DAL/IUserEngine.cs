using System.Collections.Generic;
using Common.Models;

namespace Common.Interfaces.DAL {

	public interface IUserEngine {

		UserEntity GetUser(int userId);
		UserEntity GetUser(string userName);
		List<UserEntity> GetAllUsers();
		int AddUser(UserEntity user);
		UserEntity DeleteUser(int userId);
		UserEntity RestoreUser(int userId);
		UserEntity UpdateUser(UserEntity user);
		bool IsUserExistInCache(int userId);
		bool IsUserExistInCache(string userName);
		string GetUserPasswordFromCache(string userName);
		UserEntity GetUserFromCache(int userId);
		UserEntity GetUserFromCache(string userName);
		List<UserEntity> GetAllUsersFromCache();
		int GetPersonsIdFromCache(int userId);
		void AddUserToCache(UserEntity user);
		void AddUsersListToCache(List<UserEntity> users);
		void OverrideUsersCache(List<UserEntity> users);
		void ClrearUsersCache();
	}
}
