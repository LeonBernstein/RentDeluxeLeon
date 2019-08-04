using Microsoft.AspNetCore.StaticFiles;

namespace WebApi {

	public class AppsContentTypeProvider : FileExtensionContentTypeProvider {

		public AppsContentTypeProvider() {
			Mappings.Add(".webmanifest", $"{AppRoutes.AngularClient}/assets/img/icons/manifest+json");
		}
	}
}
