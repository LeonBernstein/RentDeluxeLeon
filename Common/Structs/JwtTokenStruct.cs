using System;

namespace Common.Structs {

	public struct JwtTokenStruct {

		public string token;
		public DateTime issuedAt;
		public DateTime expiration;
	}
}
