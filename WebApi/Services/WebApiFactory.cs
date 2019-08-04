using Microsoft.AspNetCore.StaticFiles;

namespace WebApi.Services {

	public static class WebApiFactory {

		public static FileExtensionContentTypeProvider GetAppsContentTypeProvider { get => new AppsContentTypeProvider(); }
	}
}
