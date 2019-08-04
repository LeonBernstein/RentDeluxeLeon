using Autofac;
using Autofac.Extensions.DependencyInjection;
using Common.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;
using System;
using System.IO;
using WebApi.MiddleWares;
using WebApi.Services;

namespace WebApi {
	public class Startup {

		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		private readonly string _allowSpecificOrigins = "_allowSpecificOrigins";


		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public IServiceProvider ConfigureServices(IServiceCollection services) {
			services.AddCors(options => {
				options.AddPolicy(_allowSpecificOrigins,
				builder => {
				builder
					.WithOrigins(
					"https://localhost:4200",
					"https://127.0.0.1:6613")
					.WithHeaders(
						HeaderNames.Authorization,
						HeaderNames.ContentType,
						HeaderNames.Accept,
						"TimezoneOffset")
					.WithExposedHeaders(
						HeaderNames.Authorization)
					.WithMethods("GET", "POST", "PUT", "PATCH", "DELETE");
				});
			});

			services.AddMvc(options => {
				options.Filters.Add(new UserAuthorizationFilter());
			}).AddControllersAsServices()
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration => {
				configuration.RootPath = AppRoutes.AngularClient;
			});

			var containerBuilder = ContainerConfig.Configure(services);

			using (var scope = containerBuilder.BeginLifetimeScope()) {
				var app = scope.Resolve<IApplication>();
				app.Init();
			}
			return new AutofacServiceProvider(containerBuilder);
		}



		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseCors(_allowSpecificOrigins);
			} else {
				// app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			
			app.UseStaticFiles(new StaticFileOptions {
				FileProvider = new PhysicalFileProvider(
						Path.Combine(Directory.GetCurrentDirectory(), AppRoutes.Bucket)),
				RequestPath = "/Bucket"
			});
			
			app.UseSpaStaticFiles(new StaticFileOptions() {
				ContentTypeProvider = WebApiFactory.GetAppsContentTypeProvider,
			});

			app.UseMvc(routes => {
				routes.MapRoute(
					name: "default",
					template: "api/{*.}",
					defaults: new { controller = "Error" }
				);
			});

			app.UseSpa(spa => {
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = AppRoutes.AngularClient;
			});
		}
	}
}
