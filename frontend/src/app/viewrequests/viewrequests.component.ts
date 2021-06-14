import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ViewreqService } from './viewreq.service';
import * as jwt_decode from 'jwt-decode';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../general.service'
// import { DashboardService } from "../dashboard/dashboard.service";

@Injectable()
@Component({
  selector: 'app-viewrequests',
  templateUrl: './viewrequests.component.html',
  styleUrls: ['./viewrequests.component.css'],
  providers: [ViewreqService]
})
export class ViewrequestsComponent implements OnInit {

  userId
  garageId
  clientId
  serviceRequests   // used to show data in HTML
  requesteddata = []
  error
  msg
  userdata: AngularFirestoreDocument<any> = null;
  users: Observable<AngularFirestoreDocument[]>;
  garage: AngularFirestoreDocument<any> = null;
  vehicles = {};
  message
  action
  username: string = "falana"
  ngOnInit(): void { }

  constructor(private _snackBar: MatSnackBar, private serv: ViewreqService, public general: GeneralService, private router: Router, public db: AngularFirestore) {

    this.userId = jwt_decode(localStorage.getItem('access_token'))['userID'];
    // if ('requesteddata' in localStorage) {
    //   this.requesteddata = JSON.parse(localStorage.getItem('requesteddata'));
    // }
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];

    // not sure what is it for

    // this.serv.getreq(this.userId).subscribe((serviceRequests) => {
    //   if (serviceRequests) {
    //     this.serviceRequests = serviceRequests['serviceRequests']
    //   }
    //   else {
    //     this.error = 'No pending service requests';
    //   }
    // })

    this.general.servReq_subject.subscribe((data) => {
      // console.log(data, "from  generwao")
      this.requesteddata = JSON.parse(data);
    })

    // get realtime value changes from clientgarages 

    // this.garage = db.collection('/clientgarage').doc(this.clientId);
    // this.garage.valueChanges().subscribe(res => {  // subscribe to any changes in clentgarage db
    //   if (res.serviceRequests.length > 0) {    // checks if atleast one request is present and sets service request
    //     this.serviceRequests = res.serviceRequests
    //   }
    //   else {      //  NPSR ( no pending service requests )
    //     this.serviceRequests = "Npsr" 
    //   }
    //   this.general.getuserdata(this.serviceRequests)  // getting userdata for all the requests present in service request
    //     .subscribe((data) => {
    //       if (data['data'] == "npsr") {  // returns NPSR if service requests are empty
    //         this.requesteddata = null;
    //       }
    //       else {
    //         this.requesteddata = data['data']  // sets all the retrieved job data to request data
    //         // localStorage.setItem('requesteddata', JSON.stringify(data['data']))  
    //       }
    //     })
    // });
  }


  public acceptjob(user, i) {   // activate when user accepts a job and shipt a request to accepted req component
    this.serv.acceptedjob(user, this.garageId, this.clientId).subscribe((data) => {
      if (data.msg == 'done') {
        this.message = "Request is accepted"
        this.action = "Accepted succesfully"
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
      }

      if (data.msg == 'already accepted') {
        this.message = "Request has been accepted by someone else"
        this.action = ""
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
      }

      if (data.msg == 'not done') {
        this.message = "some error occured"
        this.action = ""
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
      }
    })
  }

  public rejectjob(user) {  // activate when user reject a job, and removes the job from requested data
    this.serv.rejectedjob(user, this.garageId, this.clientId).subscribe((data) => {
      if (data['msg'] != "done") {
        this.msg = data['msg'];
        this.message = "Unable to reject the Request"
        this.action = ""
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
      } else{
        this.message = "Rejected the Request"
        this.action = "Rejected"
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
      }
    })
  }

}