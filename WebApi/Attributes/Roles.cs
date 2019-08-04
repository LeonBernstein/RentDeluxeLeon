using Common.Enums;
using Common.Helpers;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using Common.Interfaces.Entities;

namespace WebApi.Attributes {
	public class Role : Attribute, IRole, IFilterMetadata {

		private readonly string[] _roles;

		public string[] Roles { get => _roles; }

		public Role(Roles role) {
			_roles = new string[] { role.GetEnumDescription() };
		}

		public Role(Roles[] roles) {
			var roleNames = new List<string>();
			foreach (var role in roles) {
				roleNames.Add(role.GetEnumDescription());
			}
			_roles = roleNames.ToArray();
		}
	}
}
