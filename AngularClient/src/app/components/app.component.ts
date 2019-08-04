import { Component } from '@angular/core';

import { LoadingService } from '../ts/services/loading.service'
import { HttpService } from "../ts/services/http/http.service";
import { CurrentUserService } from '../ts/services/current-user.service';
import { StorageService } from '../ts/services/storage/storage.service';
import { MatDialogsService } from '../ts/services/mat-dialogs.service';
import { ProviderService } from '../ts/services/provider.service';
import { ChangesService } from '../ts/services/changes.service';

@Component({
	selector: 'crd-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	
	private _isLoadingImages: boolean = true
	public get isLoadingImages(): boolean {
		return this._isLoadingImages
	}
	
	
	constructor(
		private _ChangesService: ChangesService,
		private _HttpService: HttpService,
		private _MatDialogsService: MatDialogsService,
		private _StorageService: StorageService,
		private _ProviderService: ProviderService,
		private _CurrentUserService: CurrentUserService,
		private _LoadingService: LoadingService,
	) {
		this._ChangesService.init()
		this._HttpService.init()
		this._MatDialogsService.init()
		this._StorageService.init()
		this._ProviderService.init(this._HttpService)
		this._CurrentUserService.init()
		this._LoadingService.init(this._removeLoadingImages.bind(this))
	}
	
	
	private _removeLoadingImages(): void {
		this._isLoadingImages = false
	}
}
