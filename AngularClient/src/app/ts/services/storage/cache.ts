import { AppCacheI } from '../../interfaces/data-storage.interfaces';

export class AppCache implements AppCacheI {
	
	private _cache: Object = {}
	
	
	constructor() { }
	
	
	public getData(
		objectSender: object,
		dataIndex: number | string,
	): any {
		try {
			return this._cache[objectSender.constructor.name][dataIndex]
		} catch {
			console.error("Error at AppCache, data doesn't exist for the following parameters:", [
				{objectSender: objectSender},
				{dataIndex: dataIndex},
			]);
		}
	}
	
	
	public setData(
		objectSender: object,
		dataIndex: number | string,
		data: any,
	): void {
		try {
			if (!this._cache[objectSender.constructor.name]) {
				this._cache[objectSender.constructor.name] = []
			}
			this._cache[objectSender.constructor.name][dataIndex] = data
		} catch {
			console.error("Error at AppCache, couldn't write to cache with given parameters:", [
				{objectSender: objectSender},
				{dataIndex: dataIndex},
				{data: data},
			]);
		}
	}
	
	
	public hasData(
		objectSender: object,
		dataIndex: number | string,
	): boolean {
		try {
			if (this._cache[objectSender.constructor.name] &&
					this._cache[objectSender.constructor.name][dataIndex]) {
				return true
			}
			return false
		} catch {
			console.error("Error at AppCache, can't verify data with:", [
				{objectSender: objectSender},
				{dataIndex: dataIndex},
			]);
			return false
		}
	}
}
