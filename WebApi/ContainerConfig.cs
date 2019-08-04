using Autofac;
using Autofac.Extensions.DependencyInjection;
using Common.Interfaces;
using DAL.Mappers;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;

namespace WebApi {
	public static class ContainerConfig {

		public static IContainer Configure(IServiceCollection services) {
			var builder = new ContainerBuilder();

			builder.Populate(services);

			builder.RegisterAssemblyTypes(Assembly.Load(nameof(BL)))
				.Where(t => t.Name.EndsWith("Logic"))
				.AsImplementedInterfaces()
				.InstancePerLifetimeScope();

			builder.RegisterAssemblyTypes(Assembly.Load(nameof(DAL)))
				.Where(t => t.Name.EndsWith("Engine"))
				.AsImplementedInterfaces()
				.InstancePerLifetimeScope();

			builder.RegisterType<Application>()
				.As<IApplication>()
				.InstancePerLifetimeScope();

			builder.RegisterType<AutoMapperConfig>()
				.As<IAutoMapperConfig>()
				.InstancePerLifetimeScope();

			return builder.Build();
		}
	}
}
