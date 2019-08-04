using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;

namespace Common.Helpers {
	public static class AttributeExtractor {

		public static string GetEnumDescription<T>(this T e) where T : IConvertible {
			if (e is Enum) {
				Type type = e.GetType();
				Array values = Enum.GetValues(type);

				foreach (int val in values) {
					if (val == e.ToInt32(CultureInfo.InvariantCulture)) {
						var memInfo = type.GetMember(type.GetEnumName(val));

						if (memInfo[0]
								.GetCustomAttributes(typeof(DescriptionAttribute), false)
								.FirstOrDefault() is DescriptionAttribute descriptionAttribute) {
							return descriptionAttribute.Description;
						}
					}
				}
			}
			return ""; // could also return null
		}
	}
}
