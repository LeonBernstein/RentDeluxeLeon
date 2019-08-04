using System;
using System.IO;
using System.Threading.Tasks;
using Common.Enums;
using Common.Interfaces.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using WebApi.Attributes;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers {

	[ApiController]
	[Route("api/Persons/")]
	[Role(new Roles[] { Roles.manager })]
	public class PersonController : ControllerBase {

		private readonly IPersonLogic _personLogic;

		public PersonController(
			IPersonLogic personLogic
		) {
			_personLogic = personLogic;
		}

		[Role(new Roles[] { Roles.user, Roles.employee, Roles.manager })]
		[HttpPatch]
		[Route("UpdatePersonAvatar")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> UpdatePersonAvatar([FromForm]UserAvatarModel model) {
			try {
				if (ModelState.IsValid) {
					var requestHeaders = HttpContext.Request.Headers;
					int userId = 0;
					if (requestHeaders.TryGetValue("Authorization", out StringValues token)) {
						userId = JwtService.GetUserIdFromToken(JwtService.DecodeToken(token.ToString()));
						if (userId < 1) return Unauthorized();
					} else {
						return Unauthorized();
					}
					byte[] avatarImage;
					using (var memoryStream = new MemoryStream()) {
						await model.AvatarImage.CopyToAsync(memoryStream);
						avatarImage = memoryStream.ToArray();
					}
					string guid = Guid.NewGuid().ToString();
					string mime = model.AvatarImage.ContentType.Contains("/") ?
						model.AvatarImage.ContentType.Split("/")[1] :
						model.AvatarImage.ContentType;
					string fileName = $"{guid}.{mime}";
					string realPath;
					try {
						realPath = _personLogic.SavePersonsAvatar(fileName, avatarImage, userId);
					} catch (Exception e) {
						return StatusCode(500, e);
					}
					if (string.IsNullOrWhiteSpace(realPath)) return BadRequest();

					return Ok(realPath);
				} else {
					return BadRequest(ModelState);
				}
			} catch (Exception e) {
				return BadRequest(e);
			}
		}
	}
}