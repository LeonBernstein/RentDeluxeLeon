using Common.Interfaces.Entities;

namespace Common.Structs {

	public struct LoginResponseStruct {

		public JwtTokenStruct TokenDetails { get; set; }
		public IUser User { get; set; }
		public string Message { get; set; }
	}
}
