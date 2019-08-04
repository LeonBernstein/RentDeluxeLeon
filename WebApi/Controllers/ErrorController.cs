using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers {

	[ApiController]
	[Route("api/{*.}")]
	[AllowAnonymous]
	public class ErrorController : ControllerBase {

		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Get() {
			return NotFound(new {
				title = "Not Found",
				status = 404,
				message = "Invalid Api Request"
			});
		}
	}
}