using Newtonsoft.Json;
using System.IO;

namespace DTO {
	public static class ConnectionStringer {
		public static string ConstuctString(string contextName) {
			using (StreamReader r = new StreamReader("appsettings.json")) {
				string json = r.ReadToEnd();
				dynamic items = JsonConvert.DeserializeObject(json);
				dynamic context = items.ConnectionStrings[contextName];
				string connectionStr = $"Server={context.Server};Database={context.Database};Trusted_Connection={context.Trusted_Connection};Integrated Security={context.Integrated_Security};";
				if (!string.IsNullOrWhiteSpace(context.UserName) &&
						!string.IsNullOrWhiteSpace(context.Password)
				) {
					connectionStr += $"User Id={context.UserName};Password={context.Password};";
				}
				return connectionStr;
			}
		}
	}
}
