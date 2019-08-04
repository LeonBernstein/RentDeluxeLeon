import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';

@Component({
	selector: 'crd-img-uploader',
	templateUrl: './img-uploader.component.html',
	styleUrls: ['./img-uploader.component.scss']
})
export class ImgUploaderComponent {
	
	public readonly avatarImage: ImageTypes = ImageTypes.avatar
	public readonly carsAvatar: ImageTypes = ImageTypes.carsAvatar
	
	public file: File
	
	public isSizeError: boolean = false
	public isTypeError: boolean = false
	
	constructor(
		@Inject(MAT_DIALOG_DATA) public imgType: ImageTypes,
		@Inject('ALLOWED_IMAGE_TYPE') private _imageTypeRegex: RegExp,
		private _dialogRef: MatDialogRef<ImgUploaderComponent>,
	) { }
	
	
	public closeThisDialog(file?: File): void {
		this._dialogRef.close(file)
	}
	
	
	public handleImage(event: Event): void {
		let input = <HTMLInputElement>event.target
		if (input.files && input.files.item(0)) {
			this.isSizeError = false
			this.isTypeError = false
			let file: File = input.files.item(0)
			if (file.size > 2097152) {
				this.isSizeError = true
			}
			let type = file.type
			if (type.includes("/")) {
				type = type.split("/")[1]
			}
			if (!this._imageTypeRegex.test(type)) {
				this.isTypeError = true
			}
			if (this.isSizeError || this.isTypeError) return
			this.file = file
		}
	}
	
	
	public handleNewImage(imgBlob: Blob): void {
		const file: any = imgBlob
		file.lastModifiedDate = this.file.lastModified
		file.name = this.file.name
		this.closeThisDialog(file)
	}
}
