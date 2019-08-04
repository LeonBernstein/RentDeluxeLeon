import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, DoCheck, OnDestroy, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import Cropper from 'cropperjs'
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'crd-image-cropper',
	templateUrl: './image-cropper.component.html',
	styleUrls: ['./image-cropper.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class ImageCropperComponent implements OnChanges, OnDestroy {

	@Input('file') private _file: File
	@Input('imgType') public imgType: ImageTypes
	@Output() public close: EventEmitter<void>
	@Output() public newImage: EventEmitter<Blob>
	@ViewChild('img', { static: true }) private _img: ElementRef<HTMLImageElement>

	public imgSrc: string | ArrayBuffer = ""

	public cropper: Cropper
	
	
	constructor(
		private _snackBar: MatSnackBar
	) {
		this.close = new EventEmitter()
		this.newImage = new EventEmitter()
	}
	
	
	ngOnChanges(changes: SimpleChanges) {
		if (changes._file) this._setCropper()
	}
	
	
	ngOnDestroy() {
		this.cropper.destroy()
	}
	
	
	public closeDialog(): void {
		this.close.emit()
	}
	
	
	public emitNewImage(): void {
		this._snackBar.open('מעלה תמונה...', 'סגור', { duration: 60 })
		this.cropper
			.getCroppedCanvas({
				maxWidth: 800,
				maxHeight: 800,
				imageSmoothingEnabled: true,
			})
			.toBlob(blob => {
				this.newImage.emit(blob)
			}, this._file.type)
	}

	
	private _setCropper(): void {
		const reader = new FileReader()
		
		reader.onload = e => {
			if (e.target && (<FileReader>e.target).result) {
				this.imgSrc = (<FileReader>e.target).result
				if (this.cropper) {
					this.cropper.replace(this.imgSrc as string)
				} else {
					setTimeout(() => {
						this.cropper = new Cropper(this._img.nativeElement, {
							aspectRatio: this.imgType === ImageTypes.avatar ? 1 / 1 : NaN,
							background: false,
							autoCropArea: 1,
							movable: false,
							rotatable: false,
							scalable: false,
							zoomable: false,
							zoomOnTouch: false,
							zoomOnWheel: false,
						})
					})
				}
			}
		}
		reader.readAsDataURL(this._file)
	}
}
