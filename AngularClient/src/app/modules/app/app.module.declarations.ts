
//#region pipes =>

import { DropFirstPipe } from 'src/app/ts/pipes/drop-first.pipe';

const pipes = [
	DropFirstPipe,
]

//#endregion pipes ;



//#region directives =>

const directives = []

//#endregion directives ;




//#region components =>

import { AppComponent } from '../../components/app.component';
import { ImagesLoaderComponent } from 'src/app/components/images-loader/images-loader.component';
import { BackgroundImageComponent } from 'src/app/components/background-image/background-image.component';
import { ContentComponent } from 'src/app/components/content/content.component';
import { HeaderComponent } from 'src/app/components/content/header/header.component';
import { NavComponent } from 'src/app/components/content/nav/nav.component';
import { MainComponent } from 'src/app/components/content/main/main.component';
import { CommonHomePageComponent } from 'src/app/components/content/main/home/common-home-page/common-home-page.component';
import { HomeContactInfoComponent } from 'src/app/components/content/main/home/home-contact-info/home-contact-info.component';
import { EmployeeHomeComponent } from 'src/app/components/content/main/home/employee-home/employee-home.component';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

const components = [
	AppComponent,
	ImagesLoaderComponent,
	BackgroundImageComponent,
	ContentComponent,
	HeaderComponent,
	NavComponent,
	MainComponent,
	CommonHomePageComponent,
	HomeContactInfoComponent,
	EmployeeHomeComponent,
	ImageCropperComponent,
]

//#endregion components ;



//#region dialogComponents =>

import { LoginComponent } from 'src/app/components/dialogs/login/login.component';
import { SignUpComponent } from 'src/app/components/dialogs/signUp/signUp.component';
import { ForgotPassComponent } from 'src/app/components/dialogs/forgotPass/forgotPass.component';
import { PersonalDetailsComponent } from 'src/app/components/dialogs/personal-details/personal-details.component';
import { ErrorComponent } from 'src/app/components/dialogs/error/error.component';
import { SaveConfirmComponent } from 'src/app/components/dialogs/save-confirm/save-confirm.component';
import { LoaderComponent } from 'src/app/components/dialogs/loader/loader.component';
import { ImgUploaderComponent } from 'src/app/components/dialogs/img-uploader/img-uploader.component';
import { CarDetailsDialogComponent } from 'src/app/components/dialogs/car-details-dialog/car-details-dialog.component';
import { OrderReturnConfirmComponent } from 'src/app/components/dialogs/order-return-confirm/order-return-confirm.component';

export const dialogComponents = [
	LoginComponent,
	SignUpComponent,
	ForgotPassComponent,
	PersonalDetailsComponent,
	ErrorComponent,
	LoaderComponent,
	ImgUploaderComponent,
	SaveConfirmComponent,
	CarDetailsDialogComponent,
	OrderReturnConfirmComponent,
]

//#endregion dialogComponents ;



//#region routingComponents =>

import { appRoutingComponents } from '../app-routing/app-routing.module';

const routingComponents = [...appRoutingComponents]

//#endregion routingComponents ;




//#region declarationsList =>

export const declarationsList = [
	...pipes,
	...directives,
	...components,
	...dialogComponents,
	...routingComponents,
]

//#endregion declarationsList ;
