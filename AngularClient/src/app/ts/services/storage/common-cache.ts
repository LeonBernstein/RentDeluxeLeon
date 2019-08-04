import { CommonCacheI } from '../../interfaces/data-storage.interfaces';
import { CommonCacheTokens } from '../../enums/common-cache-tokens.enum';

export class CommonCache implements CommonCacheI {
	
	private _cache: Object = {}
	
	
	constructor() { }
	
	
	public getData(
		cacheToken: CommonCacheTokens,
	): any {
		try {
			return this._cache[cacheToken]
		} catch {
			console.error("Error at CommonCache, data doesn't exist for the following parameters:", {cacheToken: cacheToken});
		}
	}
	
	
	public setData(
		cacheToken: CommonCacheTokens,
		data: any,
	): void {
		try {
			this._cache[cacheToken] = data
		} catch {
			console.error("Error at CommonCache, couldn't write to cache with given parameters:", [
				{cacheToken: cacheToken},
				{data: data},
			]);
		}
	}
	
	
	public hasData(cacheToken: CommonCacheTokens): boolean {
		try {
			return this._cache[cacheToken] ? true : false
		} catch {
			console.error("Error at CommonCache, can't verify data with:", {cacheToken: cacheToken})
			return false
		}
	}
}
