using Common.Interfaces.DAL;
using DTO;
using System;
using System.Linq;

namespace DAL.Engine {

	public class PersonEngine : IPersonEngine {

		public void UpdatePersonsImagePath(int personId, string path) {
			using (var context = DataAccess.GetDBContext) {
				var user = context.Persons
					.Where(p => p.PersonId == personId)
					.First();
				user.PicturePath = path;
				user.ModifiedDate = DateTime.Now;

				context.SaveChanges();
			}
		}

		public void UpdatePersonsImagePathInCache(int personId, string path) {
			using (var context = DataAccess.GetCacheDBContext) {
				context.Users
					.Where(u => u.Person.PersonId == personId)
					.First()
					.Person
					.PicturePath = path;
			}
		}
	}
}
