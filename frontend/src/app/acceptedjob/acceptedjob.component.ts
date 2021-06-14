import { Component, OnInit, Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { RouterModule, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GeneralService } from '../general.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AcceptedjobService } from './acceptedjob.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobcardComponent } from '../jobcard/jobcard.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
@Component({
  selector: 'app-acceptedjob',
  templateUrl: './acceptedjob.component.html',
  styleUrls: ['./acceptedjob.component.css'],
  providers: [ AcceptedjobService]
})
export class AcceptedjobComponent implements OnInit {
  ngOnInit(): void { }
  userId
  garageId
  clientId
  serviceRequests
  acceptedservices_data
  jobcardvar: Observable<AngularFirestoreDocument>;
  error
  msg
  userdata: AngularFirestoreDocument<any> = null;
  users: Observable<AngularFirestoreDocument[]>;
  garage: AngularFirestoreDocument<any> = null;
  vehicles = {};
  username
  message
  action

  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog, public general: GeneralService, private router: Router, public db: AngularFirestore, private acc: AcceptedjobService) {
    
    this.userId = jwt_decode(localStorage.getItem('access_token'))['userID'];
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];

    // this.acc.getreq(this.userId).subscribe((serviceRequests) => {
    //   if (serviceRequests) {
    //     this.serviceRequests = serviceRequests['acceptedServices']
    //   }
    //   else {
    //     this.error = 'No pending service requests';
    //   }
    // })


    this.general.accServ_subject.subscribe((data) => {
      // console.log(data, "from generwao")
      this.acceptedservices_data = JSON.parse(data);
  })


    // this.garage = db.collection('/clientgarage').doc(this.clientId);
    // this.garage.valueChanges().subscribe(res => {    // subscribe to any changes in clentgarage db
    //   if (res.acceptedServices.length > 0) {       // checks if atleast one request is present and sets service request
    //     this.serviceRequests = res.acceptedServices
    //   }
    //   else {
    //     this.serviceRequests = "Npsr"    //  NPSR ( no pending service requests )
    //   }
    //   this.general.getuserdata(this.serviceRequests)   // getting userdata for all the requests present in service request
    //     .subscribe((data) => {
    //       if (data['data'] == "npsr") {   // returns NPSR if service requests are empty
    //         this.requesteddata = null;
    //       }
    //       else {
    //         this.requesteddata = data['data'];   // sets all the retrieved job data to request data
    //         this.jobcardvar = this.requesteddata
    //       }
    //     })
    // });


  }

  startjob(id) {   // for updating the details of jobcard 
    let x = id.id.split("_")
    const dialogRef = this.dialog.open(JobcardComponent, {  // opens the 'jobcard' compnent to add new jobs and update in price
      width: '500px',
      data: {
        id: id,
        mobilenumber: x[0],
        vehicleno: x[1]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}