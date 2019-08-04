using Common.Interfaces;
using Common.Interfaces.DAL;

namespace DAL {
	public class DataLayerEngine : IDataLayerEngine {

		private readonly IAutoMapperConfig _autoMapperConfig;

		public DataLayerEngine(IAutoMapperConfig autoMapperConfig) {
			_autoMapperConfig = autoMapperConfig;
		}

		public void Init() {
			_autoMapperConfig.Init();
		}
	}
}
