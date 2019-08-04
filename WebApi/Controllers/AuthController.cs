using System;
using BL.Services;
using Common.Enums;
using Common.Structs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Attributes;
using WebApi.Services;

namespace WebApi.Controllers {

	[Route("api/Auth/")]
	[ApiController]
	public class AuthController : ControllerBase {

		[AllowAnonymous]
		[HttpGet]
		[Route("GetNonUserToken")]
		[ProducesResponseType(typeof(JwtTokenStruct), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult GetNonUserToken(string userAgent) {
			JwtTokenStruct token;
			try {
				if (string.IsNullOrWhiteSpace(userAgent)) return BadRequest();
				token = JwtService.GenerateToken(userAgent);
				if (token.token == null) {
					throw new Exception();
				}
			} catch {
				return BadRequest();
			}
			return Ok(token);
		}


		[Role(new Roles[] { Roles.nonUser, Roles.user, Roles.employee, Roles.manager })]
		[HttpGet]
		[Route("Login")]
		[ProducesResponseType(typeof(LoginResponseStruct), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public IActionResult Login(string userName, string password) {
			LoginResponseStruct loginResponse = new LoginResponseStruct();
			try {
				var userLogic = BLFactoryService.GetUserLogic;
				if (userLogic.IsUserExist(userName) &&
						userLogic.IsUserValid(userName, password)
				) {
					var user = userLogic.GetUser(userName);
					user.Password = "";
					loginResponse.TokenDetails = JwtService.GenerateToken(user);
					loginResponse.User = user;
				} else {
					return Unauthorized("InvalidUserDetails");
				}
			} catch (SystemException e) {
				return StatusCode(500, e);
			} catch (Exception) {
				return BadRequest();
			}
			return Ok(loginResponse);
		}
	}
}