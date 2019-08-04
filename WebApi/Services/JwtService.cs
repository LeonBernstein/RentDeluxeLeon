using Common.Structs;
using Common.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace WebApi.Services {

	public static class JwtService {

		private static readonly string _thisApp = "Car_Rent_Deluxe";
		private static readonly string _secureKey = "eaQRTRexC09ffKPOcw9nVzxikSDaYCt6";


		public static JwtTokenStruct GenerateToken(string userId) {
			var claims = CreateClaimsList(userId);
			var signingKey = CreateSigningKey();
			var issuedAt = DateTime.UtcNow;
			var token = CreateToken(issuedAt, claims, signingKey);

			return CreateTokenStruct(token, issuedAt);
		}


		public static JwtTokenStruct GenerateToken(UserEntity user) {
			var claims = CreateClaimsList(user);
			var signingKey = CreateSigningKey();
			var issuedAt = DateTime.UtcNow;
			var token = CreateToken(issuedAt, claims, signingKey);

			return CreateTokenStruct(token, issuedAt);
		}


		public static JwtTokenStruct GenerateToken(JwtSecurityToken token) {
			var issuedAt = DateTime.UtcNow;
			var claims = token.Claims.Where(c => c.Type != "aud").ToList();
			var signingKey = CreateSigningKey();
			var newToken = CreateToken(issuedAt, claims, signingKey);

			return CreateTokenStruct(newToken, issuedAt);
		}


		public static JwtSecurityToken DecodeToken(string token) {
			var tokenValidationParameters = new TokenValidationParameters() {
				ValidAudiences = new string[] { _thisApp, },
				ValidIssuers = new string[] { _thisApp, },
				ValidateLifetime = true,
				IssuerSigningKey = CreateSigningKey()
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken validatedToken;
			try {
				token = token.Split(" ")[1];
				tokenHandler.ValidateToken(token, tokenValidationParameters, out validatedToken);
			} catch {
				return null;
			}
			return validatedToken as JwtSecurityToken;
		}


		public static string GetRoleFromToken(JwtSecurityToken token) {
			UserIdentityStruct userIdentity = new UserIdentityStruct();
			try {
				return token.Claims.FirstOrDefault(c => c.Type == nameof(userIdentity.role)).Value;
			} catch {
				return null;
			}
		}


		public static int GetUserIdFromToken(JwtSecurityToken token) {
			UserIdentityStruct userIdentity = new UserIdentityStruct();
			try {
				return int.Parse(token.Claims.FirstOrDefault(c => c.Type == nameof(userIdentity.userId)).Value);
			} catch {
				return 0;
			}
		}


		private static List<Claim> CreateClaimsList(string userId) {
			UserIdentityStruct userIdentity = new UserIdentityStruct {
				role = "nonUser"
			};
			return new List<Claim> {
				new Claim(JwtRegisteredClaimNames.Sub, userId.Replace(" ", string.Empty)),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(nameof(userIdentity.role), userIdentity.role),
			};
		}


		private static List<Claim> CreateClaimsList(UserEntity user) {
			UserIdentityStruct userIdentity = new UserIdentityStruct {
				userId = user.UserId.ToString(),
				userName = user.UserName,
				role = user.UserRole.SystemName
			};
			return new List<Claim> {
				new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(nameof(userIdentity.userId), userIdentity.userId),
				new Claim(nameof(userIdentity.userName), userIdentity.userName),
				new Claim(nameof(userIdentity.role), userIdentity.role)
			};
		}


		private static SymmetricSecurityKey CreateSigningKey() {
			return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
		}


		private static JwtSecurityToken CreateToken(
			DateTime issuedAt,
			List<Claim> claims,
			SymmetricSecurityKey signingKey
		) {
			return new JwtSecurityToken(
				issuer: _thisApp,
				audience: _thisApp,
				expires: issuedAt.AddMonths(1),
				claims: claims,
				signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
			);
		}


		private static JwtTokenStruct CreateTokenStruct(
			JwtSecurityToken token,
			DateTime issuedAt
		) {
			return new JwtTokenStruct {
				token = $"Bearer {new JwtSecurityTokenHandler().WriteToken(token)}",
				issuedAt = issuedAt.AddTicks(-(issuedAt.Ticks % TimeSpan.TicksPerSecond)),
				expiration = token.ValidTo
			};
		}
	}
}
