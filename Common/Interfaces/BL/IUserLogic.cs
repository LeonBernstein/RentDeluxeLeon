using Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Interfaces.BL {

	public interface IUserLogic {

		bool IsUserValid(string userName, string password);
		UserEntity GetUser(int userId);
		UserEntity GetUser(string userName);
		UserEntity DeleteUser(int userId);
		UserEntity RestoreUser(int userId);
		UserEntity UpdateUser(UserEntity user);
		List<UserEntity> GetAllUsers();
		Task<List<UserEntity>> GetAllUsersAsync();
		bool IsUserExist(string userName);
		bool IsUserExist(int userId);
		UserEntity AddUser(UserEntity user);
		int GetPersonsId(int userId);
		void ClearUsersCache();
	}
}
