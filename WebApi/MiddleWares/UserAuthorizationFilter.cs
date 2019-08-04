using BL.Services;
using Common.Enums;
using Common.Helpers;
using Common.Interfaces.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Services;


namespace WebApi.MiddleWares {
	public class UserAuthorizationFilter : Attribute, IAsyncAuthorizationFilter {

		private readonly Encoding utf8Encoding = new UTF8Encoding();
		private string currentTokenRole;


		public Task OnAuthorizationAsync(AuthorizationFilterContext context) {
			if (context.Filters.Any(f => f is IAllowAnonymousFilter)) {
				return Task.FromResult(0);
			}

			var request = context.HttpContext.Request;
			var response = context.HttpContext.Response;

			if (request.Headers.TryGetValue("Authorization", out StringValues token)) {
				try {
					JwtSecurityToken validToken = JwtService.DecodeToken(token.ToString());

					if (validToken != null) {
						AttachUpdatedTokenToHeader(response, validToken);

						if (!IsAuthorized(context, validToken) ||
								!IsUserActive(validToken)
						) {
							setUnauthorized();
						}
					} else {
						setUnauthorized();
					}
				} catch {
					setUnauthorized();
				}
			} else {
				setUnauthorized();
			}

			void setUnauthorized() {
				SetUnauthorized(response);
			}

			return Task.FromResult(0);
		}


		private bool IsAuthorized(AuthorizationFilterContext context, JwtSecurityToken validToken) {
			currentTokenRole = JwtService.GetRoleFromToken(validToken);
			var roles = new List<string>();
			var roleFilters = context.Filters.Where(f => f is IRole).OfType<IRole>().ToList();
			roleFilters.ForEach(f => { roles = roles.Concat(f.Roles).ToList(); });
			return roles.Any(r => r == currentTokenRole);
		}


		private bool IsUserActive(JwtSecurityToken validToken) {
			if (currentTokenRole == Roles.nonUser.GetEnumDescription()) return true;
			int userId = JwtService.GetUserIdFromToken(validToken);
			if (userId > 0) {
				var user = BLFactoryService.GetUserLogic.GetUser(userId);
				return (user.IsActive &&
								currentTokenRole != null &&
								user.UserRole.SystemName == currentTokenRole);
			} else {
				return false;
			}
		}


		private void AttachUpdatedTokenToHeader(HttpResponse response, JwtSecurityToken validToken) {
			string tokenStr = JsonConvert.SerializeObject(JwtService.GenerateToken(validToken));
			response.Headers.Add("Authorization", tokenStr);
		}


		private void SetUnauthorized(HttpResponse response) {
			response.StatusCode = 401;
			using (var writer = new StreamWriter(response.Body, utf8Encoding)) {
				writer.Write("Unauthorized");
			}
		}
	}
}
