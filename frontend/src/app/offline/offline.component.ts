import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { RouterModule, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcceptedjobService } from "../acceptedjob/acceptedjob.service";

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css']
})
export class OfflineComponent implements OnInit {
  ngOnInit(): void { }

  jobs = []
  newjob
  cost
  outDate
  inDate = new Date();
  garageId
  clientId
  modeldata

  message
  action

  OwnerAddress
  OwnerPincode
  ownerMobileno
  vehicleOwner
  vehicleModel
  vehicleCompany
  vehicleNumber
  vehicleType
  cc

  constructor(private _snackBar: MatSnackBar, private acc: AcceptedjobService, private router: Router) {
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];
  }

  public removejob(i) {
    this.jobs.splice(i, 1)
  }

  public addjob() {   // recieve new job from HTML and add it in JOBS array
    if (this.newjob != "" && this.newjob != null)
      this.jobs.push(this.newjob)
    this.newjob = "";
  }


  public startjob(ownerMobileno) {   //  update in-out date, price , shows info of  user

    var od = this.outDate.split('T')
    od[0] = od[0].split('-').join(':')
    od[1] = od[1].split(':')
    od[1].push('00')
    od[1] = od[1].join(':')
    var outDate = od.join(':')
    this.outDate = new Date()

    var inDate = this.outDate.getFullYear() + ":" + (this.outDate.getMonth() + 1) + ":" + this.outDate.getDate() + ":" + this.outDate.getHours() + ":" + this.outDate.getMinutes() + ":" + this.outDate.getSeconds()

    var id = inDate + ":" + ownerMobileno

    var newjobs = {}
    for (let i = 0; i < this.jobs.length; i++) {
      newjobs[this.jobs[i]] = false;
    }

    var data = {
      serviceId: id,
      garage: this.garageId,

      vehicleOwner: this.vehicleOwner,
      ownerMobileno: this.ownerMobileno,
      OwnerAddress: this.OwnerAddress,
      OwnerPincode: this.OwnerPincode,

      vehicleNumber: this.vehicleNumber,
      vehicleType: this.vehicleType,
      vehicleModel: this.vehicleModel,
      vehicleCompany: this.vehicleCompany,
      cc: this.cc,
      jobs: newjobs,
      cost: this.cost,

      inDate: inDate,
      outDate: outDate,
      offline: true
    }
    // console.log(data)
    this.acc.offlinejob(data, this.garageId, this.clientId, id).subscribe((msg) => { //push updated data to db and close dialogue
      if (msg.data == "done") {
        this.message = "Job started"
        this.action = "Succesful"
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
        this.router.navigate(['dashboard/ongoingjob']);
      }
      else {
        // car masg  = msg.data = ""
      }
    })


    // ==================== validation snackbar ==========================

    if (this.outDate == null || this.inDate == null) {
      this.message = "InDate/Outdate is Required"
      this.action = ""
      this._snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      return;
    }

    if (this.cost == null || this.cost == null) {
      this.message = "Cost is Required"
      this.action = ""
      this._snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      return;
    }

  }


}
