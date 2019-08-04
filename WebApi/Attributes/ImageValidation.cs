using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace WebApi.Attributes {

	public class ImageValidation : ValidationAttribute {

		private bool _sizeError = false;
		private bool _mimeError = false;

		private readonly int _maxSize;
		private readonly string _pattern;


		public ImageValidation(
			int maxSize,
			string pattern
		) {
			_maxSize = maxSize;
			_pattern = pattern;
		}


		public override bool IsValid(object value) {
			try {
				var file = (IFormFile)value;
				if (file.Length > _maxSize) {
					_sizeError = true;
				}
				if (Regex.IsMatch(file.ContentType, _pattern)) {
					_mimeError = true;
				}
				if (_sizeError || _mimeError) return false;
				return true;
			} catch {
				return false;
			}
		}


		public override string FormatErrorMessage(string name) {
			string response = "Error on image upload. ";
			if (_sizeError) response += $"The file, should be no larger then 2Mb. ";
			if (_mimeError) response += $"Image file type is not supported.";
			return response;
		}
	}
}
