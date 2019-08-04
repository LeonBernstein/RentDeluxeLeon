import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { GearTypeI } from 'src/app/ts/interfaces/model.interfaces';
import { MatDialogsService } from 'src/app/ts/services/mat-dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/ts/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangesService } from 'src/app/ts/services/changes.service';
import { ModelsFactory } from 'src/app/ts/classes/infrastructure/models-factory';
import { ErrorTypes } from 'src/app/ts/enums/error-types.enum';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/ts/interfaces/components.interfaces';

@Component({
	selector: 'crd-gear-types-details',
	templateUrl: './gear-types-details.component.html',
	styleUrls: ['./gear-types-details.component.scss']
})
export class GearTypesDetailsComponent implements OnInit, CanComponentDeactivate {
	
	public isNavigating: boolean = false
	
	private _routeParameterId: number

	@ViewChild('gearTypeForm', { static: false }) public gearTypeForm: FormGroupDirective | NgForm

	public get isDirty(): boolean {
		return this.gearTypeForm.dirty
	}
	public get isDataValid(): boolean {
		return this.gearTypeForm.valid
	}

	public model: GearTypeI

	constructor(
		@Inject('NUMERIC_ONLY') public readonly numericOnly: RegExp,
		private _MatDialogsService: MatDialogsService,
		private _ActivatedRoute: ActivatedRoute,
		private _Http: HttpService,
		public router: Router,
		public snackBar: MatSnackBar,
		private _ChangesService: ChangesService,
	) { }

	ngOnInit() {
		this._routeParameterId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('id'))
		if (isNaN(this._routeParameterId)) {
			this.model = ModelsFactory.createGearTypeModel()
		} else {
			this.getData(this._routeParameterId)
		}
	}

	public getData(id?: number) {
		this._Http.GearTypesApi.getGearTypeById(id || this.model.gearTypeId)
			.subscribe(r => {
				if (r) {
					this._setModel(r)
				} else {
					this._MatDialogsService.openErrorDialog("Can't retrieve data from DB!", ErrorTypes.warning)
				}
			})
	}

	public saveData() {
		this.gearTypeForm.control.markAllAsTouched()
		if (this.model && this.gearTypeForm.valid) {
			if (this.model.gearTypeId) {
				this._Http.GearTypesApi
					.updateGearType(this.model)
					.subscribe(res => this.updateData(res))
			} else {
				this._Http.GearTypesApi
					.addGearType(this.model)
					.subscribe(res => this.updateData(res))
			}
		}
	}

	private updateData(data: GearTypeI): void {
		if (data) {
			this.gearTypeForm.resetForm(this.gearTypeForm.control.getRawValue())
			this._setModel(data)
			this.snackBar.open('הנתונים נשמרו', 'סגור')
			this._ChangesService.gearTypeChange.next(this.model)
			if (isNaN(this._routeParameterId) && !this.isNavigating) {
				this.router.navigateByUrl(this.router.url.slice(0, -3) + this.model.gearTypeId)
				this._routeParameterId = this.model.gearTypeId
			}
		} else {
			this._MatDialogsService.openErrorDialog("Data server error!", ErrorTypes.warning)
		}
	}

	private _setModel(model: GearTypeI): void {
		this.model = ModelsFactory.createGearTypeModel()
		Object.assign(this.model, model)
	}
}
