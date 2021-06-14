import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OngoingserviceComponent } from '../ongoingservice.component'
import { from } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { GeneralService } from '../../general.service'

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.css'],
  providers: [OngoingserviceComponent]
})
export class BottomsheetComponent implements OnInit {
  ngOnInit(): void { }
  userId
  garageId
  clientId
  datatoshow
  outdate
  message
  event
  serviceid
  item = []
  jobdone = []
  datajob
  tpstring
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>, private general: GeneralService) {

    this.userId = jwt_decode(localStorage.getItem('access_token'))['userID'];
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];
    this.datajob = data.jobs
    this.datatoshow = Object.keys(data.jobs);
    this.outdate = data.outdate
    this.serviceid = data.serviceId
  }

  toggle(event, item) {
    if (event.checked)
      this.item.push(item)
    else {
      this.item.splice(this.item.indexOf(item), 1)
    }
  }

  public update(message, outdate1) {
    this.general.jobupdate(message, outdate1, this.item, this.serviceid, this.clientId)
      .subscribe((data) => {
        this.tpstring = "trying"
        if (data.msg == "done")
          this._bottomSheetRef.dismiss({ item: this.item, message: this.message, outdate: outdate1, serviceId: this.serviceid });

          // on else snackbar tobbe added
      })
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
