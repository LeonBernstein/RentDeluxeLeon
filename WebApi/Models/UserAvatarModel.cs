using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WebApi.Attributes;

namespace WebApi.Models {

	public class UserAvatarModel {


		[Required]
		[ImageValidation(3145728, @"/^(jpg|jpeg|tif|tiff|png)$/i")]
		[FromForm(Name="AvatarImage")]
		public IFormFile AvatarImage { get; set; }
	}
}
