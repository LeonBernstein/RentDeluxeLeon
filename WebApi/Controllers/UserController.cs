using BL.Services;
using Common.Enums;
using Common.Helpers;
using Common.Structs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Attributes;
using WebApi.Models;
using WebApi.Services;
using Common.Models;
using System;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using Common.Interfaces.BL;
using Common.Interfaces.Entities;

namespace WebApi.Controllers {

	[ApiController]
	[Route("api/Users/")]
	[Role(new Roles[] { Roles.manager })]
	public class UsersController : Controller {

		private readonly IUserLogic _UserLogic;

		public UsersController(
			IUserLogic UserLogic
		) {
			_UserLogic = UserLogic;
		}


		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("GetCurrentUser")]
		[ProducesResponseType(typeof(IUser), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetCurrentUser(string token) {
			try {
				var validatedToken = JwtService.DecodeToken(token);
				if (validatedToken == null) return Unauthorized("Unauthorized");
				var userId = JwtService.GetUserIdFromToken(validatedToken);
				if (userId == 0) {
					var role = JwtService.GetRoleFromToken(validatedToken);
					if (role == Roles.nonUser.GetEnumDescription()) {
						return NoContent();
					} else {
						return Unauthorized("Unauthorized");
					}
				} 
				try {
					var user = BLFactoryService.GetUserLogic.GetUser(userId);
					if (user == null) return Unauthorized("Unauthorized");
					user.Password = "";
					return Ok(user);
				} catch (Exception e) {
					return StatusCode(500, e);
				}
			} catch (Exception e) {
				return BadRequest(e);
			}
		}


		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetUserById")]
		[ProducesResponseType(typeof(IUser), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetUserById(int id) {
			try {
				var user = _UserLogic.GetUser(id);
				if (user == null) {
					return BadRequest();
				}
				user.Password = "";
				return Ok(user);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("IsUserExistById")]
		[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult IsUserExistById(int userId) {
			try {
				return Ok(_UserLogic.IsUserExist(userId));
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("IsUserExistByUserName")]
		[ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult IsUserExistByUserName(string userName) {
			try {
				return Ok(_UserLogic.IsUserExist(userName));
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpPost]
		[Route("RegisterUser")]
		[ProducesResponseType(typeof(LoginResponseStruct), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RegisterUser([FromBody] NewUserModel userModel) {
			LoginResponseStruct loginResponse = new LoginResponseStruct();
			try {
				if (ModelState.IsValid) {
					if (_UserLogic.IsUserExist(userModel.UserName)) {
						return BadRequest("User with this user name already exist.");
					}
					if (HttpContext.Request.Headers.TryGetValue("TimezoneOffset", out StringValues timezoneOffset)) {
						if (int.TryParse(timezoneOffset.ToString(), out int offset)) {
							UserEntity user = userModel.Map<UserEntity>();
							user.Person = userModel.Person.Map<PersonEntity>();
							user = PrepareUser(user, offset);
							user = _UserLogic.AddUser(user);
							user.Password = "";
							loginResponse.TokenDetails = JwtService.GenerateToken(user);
							loginResponse.User = user;
							return Ok(loginResponse);
						} else {
							return BadRequest("Header TimezoneOffset is not typeof number.");
						}
					} else {
						return BadRequest("Header must container TimezoneOffset.");
					}
				} else {
					return BadRequest(ModelState);
				}
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.manager })]
		[HttpGet]
		[Route("GetAllUsers")]
		[ProducesResponseType(typeof(List<UserEntity>), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult GetAllUsers() {
			try {
				var users = _UserLogic.GetAllUsers();
				users.ForEach(u => {
					u.Password = "";
				});
				return Ok(users);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.manager })]
		[HttpDelete]
		[Route("DeleteUser")]
		[ProducesResponseType(typeof(UserEntity), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult DeleteUser(int userId) {
			try {
				var user = _UserLogic.DeleteUser(userId);
				if (user == null) {
					return BadRequest();
				}
				user.Password = "";
				return Ok(user);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.manager })]
		[HttpPatch]
		[Route("RestoreUser")]
		[ProducesResponseType(typeof(UserEntity), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult RestoreUser(int userId) {
			try {
				var user = _UserLogic.RestoreUser(userId);
				if (user == null) {
					return BadRequest();
				}
				user.Password = "";
				return Ok(user);
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		[Role(new Roles[] { Roles.manager })]
		[HttpPut]
		[Route("UpdateUser")]
		[ProducesResponseType(typeof(UserEntity), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult UpdateUser([FromBody] UserModel userModel) {
			try {
				if (ModelState.IsValid) {
					if (HttpContext.Request.Headers.TryGetValue("TimezoneOffset", out StringValues timezoneOffset)) {
						if (int.TryParse(timezoneOffset.ToString(), out int offset)) {
							UserEntity user = userModel.Map<UserEntity>();
							user.Person = userModel.Person.Map<PersonEntity>();
							if (user.Person.Birthday != null) {
								user.Person.Birthday = ((DateTime)user.Person.Birthday).AddMinutes(-offset).TruncateToDayStart();
							}
							user = _UserLogic.UpdateUser(user);
							if (user == null) {
								return BadRequest();
							}
							user.Password = "";
							return Ok(user);
						} else {
							return BadRequest("Header TimezoneOffset is not typeof number.");
						}
					} else {
						return BadRequest("Header must container TimezoneOffset.");
					}
				} else {
					return BadRequest(ModelState);
				}
			} catch (Exception e) {
				return StatusCode(500, e);
			}
		}


		private UserEntity PrepareUser(UserEntity user, int timezoneOffset) {
			if (user.UserRoleId == 0) user.UserRoleId = (int)Roles.user;
			user.UserName = user.UserName.ToLower();
			user.Person.IsActive = true;
			user.Person.Email = user.UserName;
			if (user.Person.Birthday != null) {
				user.Person.Birthday = ((DateTime)user.Person.Birthday).AddMinutes(-timezoneOffset).TruncateToDayStart();
			}
			user.IsActive = true;
			return user;
		}
	}
}