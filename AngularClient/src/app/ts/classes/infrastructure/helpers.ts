import { AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { environment } from '../../../../environments/environment'
import { Observable, timer } from 'rxjs';
import {  map, catchError, switchMap } from 'rxjs/operators';
import { ProviderService } from '../../services/provider.service';

export class Helper {
	
	public static get isProd(): boolean {
		return environment.production
	}
	public static get testUrl(): string {
		return environment.testUrl
	}

	public static get dateNow(): Date {
		return new Date()
	}

	public static encryptPassword(password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			let encryptedPass: string = ''
			try {
				const digestMessage = (message: string): PromiseLike<ArrayBuffer> => {
					const encoder = new TextEncoder()
					const data = encoder.encode(message)
					return window.crypto.subtle.digest('SHA-256', data)
				}

				const hexString = (buffer: ArrayBuffer): string => {
					const byteArray = new Uint8Array(buffer);

					const hexCodes = [...byteArray].map(value => {
						const hexCode = value.toString(16)
						const paddedHexCode = hexCode.padStart(2, '0')
						return paddedHexCode
					});
					return hexCodes.join('')
				}
				digestMessage(password).then(digestValue => {
					encryptedPass = hexString(digestValue)
					return resolve(encryptedPass.toString())
				})
			} catch {
				reject("Can't encrypt given password!")
			}
		});
	}
	
	public static cipher(text: string): string {
		const arr: Uint8Array = new TextEncoder().encode(text)
		let hexSting: string = ''
		arr.forEach(n => hexSting += n.toString(16))
		return hexSting
	}
	
	public static decipher(hexSting: string): string {
		const regExpArr: RegExpMatchArray  = hexSting.match(/.{1,2}/g)
		let arr: number[] = []
		regExpArr.forEach(hex => arr.push(parseInt(hex, 16)))
		const uint8Array: Uint8Array = Uint8Array.from(arr)
		return new TextDecoder().decode(uint8Array)
	}
	
	public static fieldsComparison(
		control1: AbstractControl,
		control2: AbstractControl,
	): ValidatorFn {
		return (): {[key: string]: any} | null => {
			if (!control1 || !control2) return null
			if (control1.pristine || control2.pristine) return null
			return control1.value !== control2.value ? { 'misMatch': true } : null
		}
	}
	
	public static isEmailExist(): AsyncValidatorFn {
		const debounce = (text: string): Observable<boolean> => {
			return timer(1000)
			.pipe(
				switchMap(() => {
					return ProviderService.HttpService.UsersApi
						.isUserExistByUserName(text)
				})
			);
		}
		return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
			return debounce(control.value)
				.pipe(
					map(res => {
						if (typeof res === 'boolean') {
							if (res) return { 'userEmailExists': true}
							return null
						}
						return null
					}),
					catchError(() => [])
				);
		}
	}
	
	
	
	public static imgDownloader(src: string): Observable<string | null> {
		return new Observable(subscriber => {
			var url: string = ''
			if (!Helper.isProd) url += Helper.testUrl
			url += src
			
			const img: HTMLImageElement = new Image()
			img.onload = (() => subscriber.next(url))
			img.onerror = (() => subscriber.next(null))
			
			img.src = url
		});
	}
	
	
	
	public static fetchFromObject(obj: Object, prop: string): any {
		if (obj[prop]) {
			return obj[prop]
			
		} else if (prop.indexOf('.') > -1) {
			let i = prop.indexOf('.')
			return Helper.fetchFromObject(obj[prop.substring(0, i)], prop.substr(i + 1))
			
		} else {
			return false
		}
	}
	
	public static objectCompare(obj1: {} | [], obj2: {} | []): boolean {
		if (Array.isArray(obj1)) {
			if (Array.isArray(obj2) &&
					obj1.length == obj2.length
			) {
				for (let i = 0; i < obj1.length; i++) {
					return Helper.objectCompare(obj1[i], obj2[i])
				}
			} else {
				return false
			}
		} else {
			for (var p in obj1) {
				//Check property exists on both objects
				if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
					return false;
				}
		 
				switch (typeof (obj1[p])) {
					//Deep compare objects
					case 'object':
						if (!Helper.objectCompare(obj1[p], obj2[p])) {
							return false;
						}
						break;
					//Compare function code
					case 'function':
						if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) {
							return false
						};
						break;
					//Compare values
					default:
						if (obj1[p] != obj2[p]) {
							return false;
						}
				}
			}
		 
			//Check object 2 for any extra properties
			for (var p in obj2) {
				if (typeof (obj1[p]) == 'undefined') {
					return false;
				}
			}
			return true;
		}
	}
}