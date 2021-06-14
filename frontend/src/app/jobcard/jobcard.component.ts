import { Component, OnInit, Inject } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { RouterModule, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { GeneralService } from '../general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AcceptedjobService } from '../acceptedjob/acceptedjob.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css'],
  providers: [AcceptedjobService]
})
export class JobcardComponent implements OnInit {
  ngOnInit(): void { }

  jobs
  newjob
  cost
  outDate
  inDate = new Date();
  garageId
  clientId
  modeldata
  message
  action

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private acc: AcceptedjobService, public dialog: MatDialog, private dialogRef: MatDialogRef<JobcardComponent>) {
    this.jobs = data.id.requestedservice.job;
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];
    this.modeldata = data;
  }

  public removejob(i) {
    this.jobs.splice(i, 1)
  }

  public addjob() {   // recieve new job from HTML and add it in JOBS array
    if (this.newjob != "" && this.newjob != null)
      this.jobs.push(this.newjob)
    this.newjob = "";
  }

  public startjob(userid) {   //  update in-out date, price , shows info of  user

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

    this.outDate = new Date(this.outDate);
    var outDate = this.outDate.getFullYear() + ":" + (this.outDate.getMonth() + 1) + ":" + this.outDate.getDate() + ":" + this.outDate.getHours() + ":" + this.outDate.getMinutes() + ":" + this.outDate.getSeconds()
    this.outDate = new Date()

    var inDate = this.outDate.getFullYear() + ":" + (this.outDate.getMonth() + 1) + ":" + this.outDate.getDate() + ":" + this.outDate.getHours() + ":" + this.outDate.getMinutes() + ":" + this.outDate.getSeconds()
    var id = inDate + ":" + userid.split('_')[0]
    var newjobs = {}
    for (let i = 0; i < this.jobs.length; i++) {
      newjobs[this.jobs[i]] = false;
    }
    var data = {
      cc: this.modeldata.id.vehicle.cc,
      garage: this.garageId,
      vehicleCompany: this.modeldata.id.vehicle.company,
      ownerMobileno: this.modeldata.mobilenumber,
      vehicleNumber: this.modeldata.vehicleno,
      vehicleOwner: this.modeldata.id.name,
      vehicleType: this.modeldata.id.vehicle.type,
      vehicleModel: this.modeldata.id.vehicle.model,
      inDate: this.inDate,
      outDate: this.outDate,
      jobs: newjobs,
      cost: this.cost,
      serviceId: id,
      offline: false
    }
    this.acc.jobstart(data, this.garageId, this.clientId, id).subscribe((msg) => { //push updated data to db and close dialogue
      if (msg.data == "done") {
        this.dialogRef.close();
        this.message = "Job started"
        this.action = "Succesful"
        this._snackBar.open(this.message, this.action, {
          duration: 2000,
        });
      }
      else {
        // car masg  = msg.data = ""
      }
    })

  }

}