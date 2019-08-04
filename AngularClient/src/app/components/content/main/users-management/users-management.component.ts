import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserI } from 'src/app/ts/interfaces/model.interfaces';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Helper } from 'src/app/ts/classes/infrastructure/helpers';
import { MatPaginator } from '@angular/material/paginator';
import { FilterI } from 'src/app/ts/interfaces/data-structure.interfaces';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'crd-users-management',
	templateUrl: './users-management.component.html',
	styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: false }) private _sort: MatSort
	@ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator

	public get usersColumns(): string[] {
		return ['index', 'userId', 'isActive', 'userName', 'userRole.name', 'person.firstName', 'person.lastName', 'person.idCardNum', 'person.birthday', 'person.gender', 'edit', 'flipActive']
	}
	
	public fastSearch: string = ''
	public showOnlyActive: boolean = true

	private _users: UserI[]
	private _userManagementChangeSub: Subscription

	private _usersDataSource: MatTableDataSource<UserI>
	public get usersDataSource(): MatTableDataSource<UserI> {
		return this._usersDataSource
	}

	constructor(
		private _MatDialogsService: MatDialogsService,
		private _Http: HttpService,
		private _ChangesService: ChangesService,
		public snackBar: MatSnackBar,
	) { }


	ngOnInit() {
		this.getUsers()
		this._setSubscribers()
	}
	
	
	private _setSubscribers(): void {
		this._userManagementChangeSub = this._ChangesService.userManagementChange
			.subscribe(data => {
				this._users.forEach(u => {
					if (u.userId === data.userId) u.assignAllData(data)
				})
				this.applyFilters()
			})
	}
	

	public getUsers(): void {
		this._Http.UsersApi
			.getAllUsers()
			.subscribe(r => {
				if (r && Array.isArray(r)) {
					this._users = new Array<UserI>()
					r.forEach(u => {
						let user = ModelsFactory.createUserModel()
						this._users.push(user.assignAllData(u))
					})
					this._setUsersDataSource()
					this._setFilterPredicate()
					this.applyFilters()
				} else {
					this._MatDialogsService.openErrorDialog("No users in DB!", ErrorTypes.warning)
				}
			})
	}


	public deleteUser(id: number): void {
		this._Http.UsersApi
			.deleteUser(id)
			.subscribe(r => {
				if (r) {
					this._users.forEach(u => {
						if (u.userId === id) u.assignAllData(r)
					})
					this.applyFilters()
					this.snackBar.open('הנתונים נשמרו', 'סגור')
				} else {
					this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
				}
			})
	}

	public restoreUser(id: number): void {
		this._Http.UsersApi
			.restoreUser(id)
			.subscribe(r => {
				if (r) {
					this._users.forEach(u => {
						if (u.userId === id) u.assignAllData(r)
					})
					this.applyFilters()
					this.snackBar.open('הנתונים נשמרו', 'סגור')
				} else {
					this._MatDialogsService.openErrorDialog("Something went wrong!", ErrorTypes.warning)
				}
			})
	}
	
	public applyFilters(): void {
		const filters: FilterI[] = [
			{
				columns: ['isActive'],
				value: this.showOnlyActive,
				filter: (colVal: boolean, filterVal: boolean) => !this.showOnlyActive || colVal === filterVal
			},
			{
				id: 'fastSearch',
				columns: ['userId', 'userName', 'userRole.name', 'person.firstName', 'person.lastName', 'person.idCardNum', 'person.birthday', 'person.gender'],
				value: this.fastSearch,
				filter: (colVal: string, filterVal: string) => {
					const values: string[] = filterVal.split(' ')
					const check = (val: string) => colVal.toString().toLowerCase().includes(val.toString().toLowerCase())
					return values.every(check)
				}
			},
		];
		(<any>this._usersDataSource).filter = filters
		if (this._usersDataSource.paginator) {
			this._usersDataSource.paginator.firstPage()
		}
	}

	private _setUsersDataSource(): void {
		this._usersDataSource = new MatTableDataSource(this._users)
		this._usersDataSource.sortingDataAccessor = Helper.fetchFromObject
		setTimeout(() => {
			this._usersDataSource.sort = this._sort
			this._usersDataSource.paginator = this._paginator
		})
	}

	private _setFilterPredicate(): void {
		(<any>this._usersDataSource).filterPredicate = (data: UserI, filtersJson: FilterI[]): boolean => {
			const matchFilter: Array<boolean> = new Array()
			const filters = filtersJson

			filters.forEach((filter: FilterI) => {
				let result: boolean = false
				for (let i = 0; !result && i < filter.columns.length; i++) {
					let col = filter.columns[i]
					if (col === 'person.firstName' ||
							col ===  'person.lastName'
					) {
						continue
					}
					let val = Helper.fetchFromObject(data, col)
					val = val === null ? '' : val
					if (col === 'person.gender') {
						switch ((<string>val).toLowerCase()) {
							case 'm':
								val = 'זכר'
								break
							case 'f':
								val = 'נקבה'
								break
							default:
								val = 'אחר'
						}
					} else if (col === 'person.birthday') {
						val = new Date(val).toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'})
					}
					result = filter.filter(val, filter.value)
				}
				if (!result && filter.id === 'fastSearch') {
					let val = Helper.fetchFromObject(data, 'person.firstName') + ' ' + Helper.fetchFromObject(data, 'person.lastName')
					val = val === null ? '' : val
					result = filter.filter(val, filter.value)
				}
				matchFilter.push(result)
			})
			return matchFilter.every(Boolean)
		}
	}
	
	ngOnDestroy() {
		if (this._userManagementChangeSub) this._userManagementChangeSub.unsubscribe()
	}
}
