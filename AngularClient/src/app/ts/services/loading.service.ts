import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { OnServiceInit } from '../interfaces/services.interfaces';
import { StorageService } from './storage/storage.service';

@Injectable({
	providedIn: 'root'
})
export class LoadingService implements OnServiceInit {
	
	//#region .vars =>
	
	// indicator if the service was initiated
	private _wasInitiated: boolean = false
	// loading screen timeout value
	private _timeoutValue: number = 10000
	// indicator if loading timeout was expired
	private _wasTimeout: boolean = false
	
	// for removing loading images component
	private _isLoadingImages$: Subject<void> = new Subject<void>()
	private _removeLoadingImages: Function
	
	//#endregion .vars ;
	
	
	//#region .props =>
	
	/** Sets main images loader component to ready state. */
	public setLoadingImagesReady(): void {
		if (this._isLoadingImages$.isStopped) return
		
		this._isLoadingImages$.next()
		this._isLoadingImages$.complete()
	}
	
	//#endregion .props ;
	
	
	//#region .ctor =>
	
	constructor(
		private _Storage: StorageService,
	) { }
	
	//#endregion .ctor ;
	
	
	//#region Service_Initialization =>
	
	/**
	 * Main initialization function.
	 * @param {Function} removeLoadingImages component removing callback function.
	 */
	public async init(
		removeLoadingImages: Function
	): Promise<void> {
		if (this._wasInitiated) return
		this._wasInitiated = true
		
		// sets callbacks for later removing of extra components
		this._removeLoadingImages = removeLoadingImages
		
		this._setSubscribers()
		await this._waitForAll()
		if (!(this._wasTimeout)) this._removeLoadingScreen()
	}
	
	
	private _setSubscribers(): void {
		this._isLoadingImages$.subscribe()
	}
	
	
	private _waitForAll(): Promise<void> {
		return new Promise(async resolve => {
			// sets timeout callback incase of an issue with the service
			setTimeout(() => {
				if (!(promises) || promises.includes(false)) {
					console.error('There was an issue with initialization of the app in the loading service.')
					
					this._wasTimeout = true
					this._removeLoadingScreen()
				}
			}, this._timeoutValue /* 10,000 */);
			
			
			var promises = await Promise.all([
				this._waitForImagesLoaderComp()
			]);
			
			await this._waitForImages()
			this._removeLoadingImages()
			return resolve()
		});
	}
	
	//#endregion Service_Initialization ;
	
	
	//#region Service_MainFunctionality =>
	
	private _waitForImagesLoaderComp(): Promise<boolean> {
		// returns promise after images loading component runs setLoadingImagesReady
		return new Promise(resolve => {
			let subscriber: Subscription = this._isLoadingImages$.subscribe(() => {
				subscriber.unsubscribe()
				return resolve()
			});
		});
	}
	
	
	private _waitForImages(): Promise<boolean> {
		// 'src' represents web image source
		// 'alt' represents local image source
		
		return new Promise(resolve => {
			// all DOM images loaded and not loaded yet
			let images: Array<HTMLImageElement> = [].slice.call(document.images)
			 // images array length for ready status checking
			let numOfImages: number = images.length
			// only loaded image's 'alt' value
			let loadedImages: Array<string> = new Array<string>()
			// incase of timeout, images for loop will not resolve
			let wasError: boolean = false
			
			
			// sets timeout incase of an issue with downloading image/s
			setTimeout(() => {
				// checks if there are images that were not loaded yet
				if (!(loadedImages.length === numOfImages)) {
					// set the indicator that there was an error in one of the images so that for loop will not resolve
					wasError = true
					
					// searches for the image/s with issue
					for (let image of images) {
						// get the alt value of an image
						let alt: string = getImageAlt(image)
						
						// checks if that image had in issue with downloading
						if (loadedImages.includes(alt)) continue
						
						// if yes, re-download from local assets
						swapSrcAlt(image, alt)
					}
					return resolve()
				}
				// timeout value {10,000} is divided by 1.3 so it will finish before before global loading service timeout
			}, Math.round(this._timeoutValue / 1.3))
			
			
			for (let image of images) {
				image.onload = (() => {
					// pushes the images alts to array, for future use incase there was an issue with an image
					loadedImages.push(getImageAlt(image))
					
					 // when all images are downloaded and there was no error, return resolve
					if (isDone()) return resolve()
				});
				image.onerror = (() => {
					// get the alt value of an image
					let alt: string = getImageAlt(image)
					
					// if error, re-download from local assets
					swapSrcAlt(image, alt)
					
					// pushes the images alts to array, for future use incase there was an issue with an image
					loadedImages.push(alt)
					
					// when all images are downloaded and there was no error, return resolve
					if (isDone()) return resolve()
				});
				// resets the src so that onload event will fire incase the images were already downloaded before the event listener was set
				image.src = image.attributes.getNamedItem('src').value
			}
			
			const getImageAlt = (image: HTMLImageElement): string => {
				return image.attributes.getNamedItem('alt').value
			}
			
			const isDone = (): boolean => {
				return loadedImages.length === numOfImages && !(wasError)
			}
			
			const swapSrcAlt = (
				image: HTMLImageElement,
				alt: string,
			): void => {
				image.src = 'assets/img/' + alt;
				this._Storage.imagesStore.swapAltWithSrc(alt)
			}
		});
	}
	
	
	private _removeLoadingScreen(): void {
		let loadingScreen = (<HTMLDivElement>document.getElementById("firstLoading"))
		document.getElementsByTagName("crd-root")[0].removeAttribute("style")
		loadingScreen.classList.add('loadingScreenDisappear')
		
		setTimeout(() => {
			loadingScreen.remove()
			document.getElementById("loadingScreenCSS").remove()
		}, 300);
	}
	
	//#endregion Service_MainFunctionality ;
}
