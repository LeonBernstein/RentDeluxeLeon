using Common.Interfaces;
using Common.Interfaces.BL;

namespace WebApi {
	public class Application : IApplication {

		private readonly IBusinessLogic _businessLogic;

		public Application(
			IBusinessLogic businessLogic
		) {
			_businessLogic = businessLogic;
		}

		public void Init() {
			_businessLogic.Init();
		}
	}
}
