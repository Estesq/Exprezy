import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component'
import { DeliverService } from './deliver.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ongoingservice',
  templateUrl: './ongoingservice.component.html',
  styleUrls: ['./ongoingservice.component.css'],
  providers: [ DeliverService]
})
export class OngoingserviceComponent implements OnInit {
  ngOnInit(): void { }

  userId
  garageId
  clientId
  userdata: AngularFirestoreDocument<any> = null;
  users: Observable<AngularFirestoreDocument[]>;
  garage: AngularFirestoreDocument<any> = null;
  // garage: AngularFirestoreDocument<any> = null;
  ongoingservice
  ongoingservice_data
  jobcardvar: Observable<AngularFirestoreDocument>;
  message
  action

  constructor(private _snackBar: MatSnackBar,private del: DeliverService, public general: GeneralService, private router: Router, public db: AngularFirestore, private _bottomSheet: MatBottomSheet) {

    this.userId = jwt_decode(localStorage.getItem('access_token'))['userID'];
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];


    this.general.ongServ_subject.subscribe((data) => {
      // console.log(data, "from generwao")
      this.ongoingservice_data = JSON.parse(data);
  })

    // this.garage = db.collection('/clientgarage').doc(this.clientId);
    // this.garage.valueChanges().subscribe(res => {  // subscribe to any changes in clentgarage db
    //   if (res.ongoingServices.length > 0) {     // checks if atleast one request is present and sets service request
    //     this.ongoingservice = res.ongoingServices
    //   }
    //   else {   //  NPSR ( no pending service requests )
    //     this.ongoingservice = "Npsr"
    //   }
    //   this.general.getongoingservicedata(this.ongoingservice)  // getting userdata for all the requests present in service request
    //     .subscribe((data) => {
    //       if (data['data'] == "npsr") {  // returns NPSR if service requests are empty
    //         this.requesteddata = null;
    //       }
    //       else {
    //         this.requesteddata = data['data'];   // sets all the retrieved job data to request data
    //       }
    //     })
    // });
  }

  updateservice(jobs, outDate, serviceId) {  // open bottom sheet for updating completed jobs and leaving message for client
    const bottomSheetRef = this._bottomSheet.open(BottomsheetComponent, {
      data: {
        jobs: jobs,
        outdate: outDate,
        serviceId: serviceId
      }
    });

    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {  // on dismissal of bottom sheet data from bottom sheet is upadted into ongoing component

      this.ongoingservice_data.forEach((data) => {
        if (data['serviceId'] == dataFromChild.serviceId) {
          if (dataFromChild.message != null && dataFromChild.message != "")
            data['message'] = dataFromChild.message
          data['outDate'] = dataFromChild.outdate
          for (let index = 0; index < dataFromChild.item.length; index++) {
            const element = dataFromChild.item[index];
            data['jobs'][element] = true;
          }
        }
      })
    });
  }

  deliver(key) {   // after completing all jobs user can deliver a bike
    if (Object.values(key.jobs).includes(false)) {
      // console.log("snackbar time !!! job is not cpmplete")
      this.message = "Jobs are incomplete"
      this.action = "Dismiss"
      this._snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }
    else {
      this.del.deliver(key, this.clientId, this.garageId)   // respected serviceid is put in completed service in db
        .subscribe((data) => {
          // console.log("indatde else", data)
          this.message = "Job completed"
          this.action = "Congratulations"
          this._snackBar.open(this.message, this.action, {
            duration: 2000,
          });
        })
    }
  }
}