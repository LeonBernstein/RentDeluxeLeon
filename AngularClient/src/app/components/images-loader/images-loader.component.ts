import { AfterViewInit, Component } from '@angular/core';

import { LoadingService } from 'src/app/ts/services/loading.service';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces'
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';

@Component({
	selector: 'crd-images-loader',
	templateUrl: './images-loader.component.html',
	styleUrls: ['./images-loader.component.scss']
})
export class ImagesLoaderComponent implements AfterViewInit {
	
	private readonly _imagesUrls: ImageI[]
	
	
	constructor(
		private _LoadingService: LoadingService,
		private _Storage: StorageService,
	) {
		this._imagesUrls = this._Storage.imagesStore.getImages(ImageTypes.all) as ImageI[]
	}
	
	
	ngAfterViewInit() {
		this._LoadingService.setLoadingImagesReady()
	}
	
	
	public get imagesUrls(): Array<ImageI> {
		return this._imagesUrls;
	}
}
