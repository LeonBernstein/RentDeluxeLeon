import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { VehicleI } from 'src/app/ts/interfaces/model.interfaces';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { CommonCacheTokens } from 'src/app/ts/enums/common-cache-tokens.enum';
import { Router } from '@angular/router';

@Component({
	selector: 'app-car-details-dialog',
	templateUrl: './car-details-dialog.component.html',
	styleUrls: ['./car-details-dialog.component.scss']
})
export class CarDetailsDialogComponent implements OnInit {
	
	public showDetails: boolean = true
	
	public car: VehicleI
	
	private _redLocationMark: ImageI
	public get redLocationMark(): ImageI {
		return this._redLocationMark
	}
	
	private _carAvatar: ImageI
	public get carAvatar(): ImageI {
		return this._carAvatar
	}

	public get pictureUrlPrefix(): string {
		return Helper.isProd ? '' : Helper.testUrl
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: number,
		private _dialogRef: MatDialogRef<CarDetailsDialogComponent>,
		private _Http: HttpService,
		private _Storage: StorageService,
		private _MatDialogsService: MatDialogsService,
		private _router: Router,
	) {
		this._carAvatar = this._Storage.imagesStore.getImages(ImageTypes.carsAvatar) as ImageI
		this._redLocationMark = this._Storage.imagesStore.getImages(ImageTypes.redLocationMark) as ImageI
	}

	ngOnInit() {
		this._getCarsData()
	}

	private _getCarsData(): void {
		if (this.data && typeof (this.data) == 'number') {
			this._Http.VehiclesApi
				.getVehicleById(this.data)
				.subscribe(r => {
					if (r) {
						this.car = ModelsFactory.createVehicleModel()
						Object.assign(this.car, r)
					}
				})
		} else {
			console.error("Cars details dialog component didn't get an valid vehicle id!")
			this._dialogRef.close()
		}
	}
	
	public openLocation(): void {
		window.open(`https://www.google.com.sa/maps/search/${this.car.atBranch.address.gpsCoordinates.latitude},${this.car.atBranch.address.gpsCoordinates.longitude}`, '_blank')
	}
	
	public closeDialog(): void {
		this._dialogRef.close()
	}
	
	public openOrder(): void {
		if (!this._Storage.isLoggedIn) {
			this._Storage.commonCache.setData(CommonCacheTokens.requestedCar, this.car.vehicleId)
			this._MatDialogsService.openLoginDialog()
		} else {
			this._router.navigateByUrl('userOrders/' + this.car.vehicleId)
		}
	}
}
