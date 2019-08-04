import { UserI } from './model.interfaces';
import { ImageTypes } from '../enums/image-names.enum';
import { DialogComponents } from '../enums/dialog-components.enum';
import { ErrorTypes } from '../enums/error-types.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface TokenDetailsI {
	token: string
	issuedAt: Date
	expiration: Date
}

export interface LoginResponse {
	tokenDetails: TokenDetailsI
	user: UserI
	message: string
}

export interface LoginDataI {
	email: string
	password: string
	stayLoggedIn: boolean
	
	assignAllData(data: Object): LoginDataI
}

export interface SignUpDataI extends LoginDataI {
	rePassword: string
	
	assignAllData(data: Object): SignUpDataI
}

export interface ImageI {
	name: ImageTypes
	src: string
	alt: string
}

type ErrorParams = [Error | HttpErrorResponse | string, ErrorTypes?]

export interface DialogSubjectI {
	component: DialogComponents,
	params?: Error | HttpErrorResponse | string | ErrorParams | ImageTypes | any
}

export interface DialogDataI {
	subject: Subject<DialogComponents | DialogSubjectI>
}

export interface ErrorDialogDataI extends DialogDataI {
	error: Error | HttpErrorResponse | string,
	errorType?: ErrorTypes
}

export interface PersonDataI {
	firstName: string
	lastName: string
	gender: string
	birthday: Date
	idCardNum: string
	
	assignAllData(data: Object): PersonDataI
}

export interface FilterI {
	id?: string
	columns: string[]
	value: any
	filter(colVal: any, filterVal: any): boolean
}
