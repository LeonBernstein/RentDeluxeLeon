import { Component } from '@angular/core';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';

@Component({
	selector: 'crd-common-home-page',
	templateUrl: './common-home-page.component.html',
	styleUrls: ['./common-home-page.component.scss']
})
export class CommonHomePageComponent {
	
	private _homePageCar: ImageI
	public get homePageCar(): ImageI {
		return this._homePageCar
	}

	constructor(
		private _Storage: StorageService
	) {
		this._homePageCar = this._Storage.imagesStore.getImages(ImageTypes.homePageCar) as ImageI
	}

}
