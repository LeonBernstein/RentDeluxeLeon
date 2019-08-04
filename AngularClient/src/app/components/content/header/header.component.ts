import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { ImageI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { ImageTypes } from 'src/app/ts/enums/image-names.enum';
import { CurrentUserService } from 'src/app/ts/services/current-user.service';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { StorageService } from 'src/app/ts/services/storage/storage.service';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImgUploaderComponent } from '../../dialogs/img-uploader/img-uploader.component';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { RouterOutletTypes } from 'src/app/ts/enums/router-outlet-types.enum';
import { RouterLinkI } from 'src/app/ts/interfaces/data-storage.interfaces';
import { UserRoleTypes } from 'src/app/ts/enums/user-role-types.enum';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { animations } from './_header.animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'crd-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [animations.fadeInOut],
})
export class HeaderComponent implements OnInit {
	
	@ViewChild('avatarImg', { static: true }) avatarImg: ElementRef<HTMLImageElement>
	
	public get userName(): string {
		const userName: string = this._CurrentUserService.userFullName
		if (userName) return userName
		return 'אורח'
	}
	public get isLoggedIn(): boolean {
		return this._Storage.isLoggedIn
	}
	
	
	private _logoText: ImageI
	public get logoText(): ImageI {
		return this._logoText
	}
	private _logoGauge: ImageI
	public get logoGauge(): ImageI {
		return this._logoGauge
	}
	private _avatar: ImageI
	public get avatar(): ImageI {
		return this._avatar
	}
	
	
	public readonly mainOutlet: RouterOutletTypes = RouterOutletTypes.main
	public readonly carsOutlet: RouterOutletTypes = RouterOutletTypes.carsManagement
	
	private _routerLinks: RouterLinkI[]
	public get routerLinks(): RouterLinkI[] {
		return this._routerLinks.filter(link => link.path !== 'employees/carsManagement')
	}
	
	public get userRole(): UserRoleTypes {
		return this._CurrentUserService.userRole
	}
	
	public readonly manager: UserRoleTypes = UserRoleTypes.manager
	
	public isShowMenu: boolean = false
	
	
	constructor(
		private _MatDialogsService: MatDialogsService,
		private _Storage: StorageService,
		private _CurrentUserService: CurrentUserService,
		private _Changes: ChangesService,
		private _Http: HttpService,
		private _ChangeDetectorRef: ChangeDetectorRef,
		private _MatDialog: MatDialog,
		public router: Router,
		private _snackBar: MatSnackBar,
	) {
		this._logoText = this._Storage.imagesStore.getImages(ImageTypes.textLogo) as ImageI
		this._logoGauge = this._Storage.imagesStore.getImages(ImageTypes.gaugeLogo) as ImageI
		this._avatar = {...this._Storage.imagesStore.getImages(ImageTypes.defaultAvatar) as ImageI}
	}
	
	ngOnInit(): void {
		this._routerLinks = this._Storage.routerLinksStore.routerLinks
		this._setSubscribers()
		this._handleImageChange()
		this._setEventListeners()
	}
	
	
	public handleLoginState(): void {
		if (this.isLoggedIn) {
			this._Storage.isLoggedIn = false
			this._Storage.doSaveLastUser = false
			this._CurrentUserService.user = null
			this._CurrentUserService.getNonUserToken()
			this.router.navigate(['home'], { state: { isUserChanged: true } } )
			this._Changes.userChange.next()
		} else {
			this._MatDialogsService.openLoginDialog()
		}
	}
	
	
	public openImgUpload(): void {
		if (this.isLoggedIn) {
			this._MatDialog
				.open(ImgUploaderComponent, { data: ImageTypes.avatar })
				.beforeClosed()
				.subscribe(res => {
					if (res) {
						this._Http.PersonsApi.updatePersonAvatar(res)
							.subscribe(r => {
								this._CurrentUserService.user.person.picturePath = r
								this._getUserImage()
								this._snackBar.open('התמונה הועלתה בהצלחה')
							})
					}
				})
		}
	}
	
	
	private _setSubscribers(): void {
		this._Changes.userChange.subscribe(() =>
			this._ChangeDetectorRef.detectChanges()
		)
	}
	
	
	private _setEventListeners(): void {
		const headerElem = <HTMLDivElement>document.getElementsByTagName('crd-header')[0]
		const scrollElem = <HTMLDivElement>document.getElementById('mainAppContainer')
		const source = fromEvent(scrollElem, 'scroll').pipe(debounceTime(250))
		source.subscribe(() => {
			this.isShowMenu = scrollElem.scrollTop > headerElem.offsetHeight
			this._ChangeDetectorRef.detectChanges()
		})
	}
	
	
	private _handleImageChange(): void {
		this._CurrentUserService.isLoggedIn$.subscribe(value => {
			if (value) {
				this._getUserImage()
			} else {
				this.avatarImg.nativeElement.style.transform = 'scale3d(0, 0, 1)'
				setTimeout(() => {
					this._avatar = {...this._Storage.imagesStore.getImages(ImageTypes.defaultAvatar) as ImageI}
					this.avatarImg.nativeElement.style.transform = 'scale3d(1, 1, 1)'
					this._ChangeDetectorRef.detectChanges()
				}, 300)
			}
		});
	}
	
	
	private _getUserImage(): void {
		const userAvatarSrc = this._CurrentUserService.user.person.picturePath
		
		if (userAvatarSrc) {
			const subscriber = Helper.imgDownloader(userAvatarSrc).subscribe(value => {
				if (value) {
					this.avatarImg.nativeElement.style.transform = 'scale3d(0, 0, 1)'
					
					setTimeout(() => {
						this._avatar.src = value
						this._avatar.alt = this._CurrentUserService.userFullName
						this.avatarImg.nativeElement.style.transform = 'scale3d(1, 1, 1)'
						this._ChangeDetectorRef.detectChanges()
					}, 300)
				}
				subscriber.unsubscribe()
			})
		}
	}
}
