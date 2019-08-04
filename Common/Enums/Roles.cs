using System.ComponentModel;

namespace Common.Enums {

	public enum Roles {

		[Description("nonUser")]
		nonUser = 1,

		[Description("user")]
		user,

		[Description("employee")]
		employee,

		[Description("manager")]
		manager
	}
}
