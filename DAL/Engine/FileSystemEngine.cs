using Common.Interfaces.DAL;
using DTO;
using System;
using System.IO;

namespace DAL.Engine {

	public class FileSystemEngine : IFileSystemEngine {

		public void DataLogger(string fileName, string[] data, string subFolder = "") {
			if (string.IsNullOrWhiteSpace(fileName) || data.Length == 0) return;

			FileNameHelper(ref fileName);
			SubFolderHelper(ref subFolder);

			using (var context = DataAccess.GetFileSystemContext) {
				try {
					string path = context.UserFolder + context.AppFolderName + @"\ErrorLogs" + subFolder;
					if (!Directory.Exists(path)) Directory.CreateDirectory(path);
					path += fileName;
					using (var textWriter = new StreamWriter(path)) {
						foreach (var line in data) {
							textWriter.WriteLine(line);
						}
					}
				} catch {
					try {
						string path = context.AppsRootFolder + @"\ErrorLogs" + subFolder;
						if (!Directory.Exists(path)) Directory.CreateDirectory(path);
						path += fileName;

						using (var textWriter = new StreamWriter(path)) {
							foreach (var line in data) {
								textWriter.WriteLine(line);
							}
						}
					} catch { }
				}
			}
			void FileNameHelper(ref string f) {
				if (!f.StartsWith(@"\")) f = @"\" + f;
				if (!f.EndsWith(".txt")) f += ".txt";
			}
			void SubFolderHelper(ref string s) {
				if (!string.IsNullOrWhiteSpace(s)) {
					if (!s.StartsWith(@"\")) s = @"\" + s;
				}
			}
		}


		public string ImageWriter(string fileName, byte[] file, string relativeFolder) {
			if (string.IsNullOrWhiteSpace(fileName) ||
					file.Length == 0 ||
					string.IsNullOrWhiteSpace(relativeFolder)
			) {
				return "";
			}
			RelativeFolderHelper(ref relativeFolder);
			string fullPath = relativeFolder + fileName;
			try {
				if (!Directory.Exists(relativeFolder)) Directory.CreateDirectory(relativeFolder);
				if (File.Exists(fullPath)) throw new Exception($"File: {fullPath} already exist!");
				File.WriteAllBytes(fullPath, file);
				return fullPath;
			} catch (Exception e) {
				throw e;
			}

			void RelativeFolderHelper(ref string s) {
				if (!string.IsNullOrWhiteSpace(s)) {
					if (!s.EndsWith(@"\")) s = @"\" + s;
				}
			}
		}
	}
}
