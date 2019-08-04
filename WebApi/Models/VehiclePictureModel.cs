using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WebApi.Attributes;

namespace WebApi.Models {

	public class VehiclePictureModel {

		[Required]
		public int VehicleId { get; set; }
		[Required]
		[ImageValidation(3145728, @"/^(jpg|jpeg|tif|tiff|png)$/i")]
		[FromForm(Name = "VehicleImage")]
		public IFormFile VehicleImage { get; set; }
	}
}
