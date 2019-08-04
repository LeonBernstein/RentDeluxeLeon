import { ImageI } from '../../../interfaces/data-structure.interfaces'
import { ImageTypes } from '../../../enums/image-names.enum';
import { ImagesStoreI } from 'src/app/ts/interfaces/data-storage.interfaces';

export class ImagesStore implements ImagesStoreI {
	
	constructor() { }
	
	private _images: Array<ImageI> = [
		{
			name: ImageTypes.background,
			src: 'https://lh5.googleusercontent.com/Fa34nnEwhfQVthWCe0CyTL7KKtMpxTJk5ah_LF6mNzx85DvWBnkrScfxey4=w2400',
			alt: 'backgrounds/BG-Red-Black-Vector-1920W.jpg',
		},
		{
			name: ImageTypes.textLogo,
			src: 'https://lh4.googleusercontent.com/sTlak0rdJzILR4erWhrt8eS52eJjrjovx8FzGzGKlex9fOPXCDDvHDDmXC4=w2400',
			alt: 'logo/logo-white@0,25x.png',
		},
		{
			name: ImageTypes.gaugeLogo,
			src: 'https://lh4.googleusercontent.com/8RCVjCL-Gf6pNtkLke6cVzY2sDAAj6u0oUuAARG576S6jxwdH2Y801QKtME=w2400',
			alt: 'logo/logo-gauge.png',
		},
		{
			name: ImageTypes.defaultAvatar,
			src: 'https://lh3.googleusercontent.com/uRAVzShyVTKoEuW16jqizybaTZk4k49qbeh52DQWQJjdZTDwqu5V7-RlI_0=w2400',
			alt: 'avatars/defaultAvatar.png'
		},
		{
			name: ImageTypes.homePageCar,
			src: 'https://lh6.googleusercontent.com/pI-CXHnoO3qsd2OWLlZL-Lqax-ic_lepxU1PCn8dY4vmPSaxK7Lhq6duXVM=w2400',
			alt: 'cars/Dodge-Charger-SRT.png'
		},
		{
			name: ImageTypes.carsAvatar,
			src: 'https://lh3.googleusercontent.com/TfjKoH5nRKWX-8IeJJjil1y3Zm-tiD6xog7Qokf4miZCVSvLdNHbPv6-ayM=w2400',
			alt: 'cars/cars-avatar.png'
		},
		{
			name: ImageTypes.redLocationMark,
			src: 'https://lh6.googleusercontent.com/gI1OCanoN_COoDmp4Mk8UEHBuJEO2Q5BbFIfLidBJMI5GW_dvDv_GcpOhJM=w2400',
			alt: 'red-location-mark.png'
		},
	]
	
	public getImages(names: ImageTypes | ImageTypes[]): ImageI | ImageI[] {
		if (names == ImageTypes.all) return this._images
		let images = this._images.filter(image => {
			if (Array.isArray(names) &&
					names.includes(image.name) ||
					names == image.name
			) {
				return image
			}
		})
		return images.length > 1 ? images : images[0]
	}
	
	
	public swapAltWithSrc(imgIdentifier: string | ImageTypes): void {
		let img: ImageI = this._images.find(img =>
			img.alt == imgIdentifier ||
			img.name == imgIdentifier ||
			img.src == imgIdentifier
		)
		if (img) {
			img.src = 'assets/img/' + img.alt
		} else {
			console.error(`Images store can't "swapAltWithSrc" by identifier: ${imgIdentifier}!`)
		}
	}
}