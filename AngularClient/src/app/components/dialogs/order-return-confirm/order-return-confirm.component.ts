import { Component, OnInit, Inject } from '@angular/core';
import { OrderI } from 'src/app/ts/interfaces/model.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-order-return-confirm',
	templateUrl: './order-return-confirm.component.html',
	styleUrls: ['./order-return-confirm.component.scss']
})
export class OrderReturnConfirmComponent implements OnInit {

	public totalPrice: number
	public lateDays: number

	constructor(
		@Inject(MAT_DIALOG_DATA) public order: OrderI,
		private _dialogRef: MatDialogRef<OrderReturnConfirmComponent>,
	) { }

	ngOnInit() {
		let dateNow = new Date()
		dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
		this.totalPrice = this.order.price
		let endDate = this.order.endDate
		if (!(endDate instanceof Date)) {
			endDate = new Date(endDate)
		}
		if (dateNow > endDate) {
			this.lateDays = (new Date(dateNow.getTime() - endDate.getTime())).getUTCDate() - 1
			this.totalPrice += this.order.vehicle.carClass.delayDailyPrice * this.lateDays
		}
		// this.lateDays = 5
		// this.totalPrice += this.order.vehicle.carClass.delayDailyPrice * this.lateDays
	}

	public closeDialog(agree: boolean): void {
		this._dialogRef.close(agree)
	}
}
