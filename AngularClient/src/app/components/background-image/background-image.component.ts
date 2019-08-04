import { Component } from '@angular/core';

import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';

@Component({
	selector: 'crd-background-image',
	templateUrl: './background-image.component.html',
	styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent {
	
	private _backgroundImage: ImageI
	public get backgroundImage(): ImageI {
		return this._backgroundImage
	}
	
	constructor(
		private _Storage: StorageService,
	) {
		this._backgroundImage = this._Storage.imagesStore.getImages(ImageTypes.background) as ImageI
	}

}
