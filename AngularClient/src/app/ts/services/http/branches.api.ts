import { HttpClient } from '@angular/common/http';
import { BranchesApiI } from '../../interfaces/api.interfaces';
import { BranchI } from '../../interfaces/model.interfaces';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class BranchesApi implements BranchesApiI {
	
	private _controller: string = 'Branches/'
	private _url: string
	
	constructor(
		private _origin: string = '',
		private _Http: HttpClient,
		private _errorHandler: any,
	) {
		this._url = this._origin + this._controller
	}
	
	public getAllBranches(): Observable<BranchI[]> {
		return this._Http
			.get<BranchI[]>(this._url + 'getAllBranches')
			.pipe(catchError(this._errorHandler))
	}
}
