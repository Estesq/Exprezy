import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcceptedjobService {
  constructor(private http: HttpClient) { }

  // getreq(userId) {
  //   // return this.http.post<any>(environment.serverlink + "/viewreq", { userId: userId })
  // return this.http.post<any>("http://localhost:5000/viewreq", { userId: userId })
  // }


  //start a job by creating a service ID 
  // creates the job in service collection
  //shift the jobs from accepted job to ongong services
  //sets the status in user db as a ongoing
  jobstart(jobdata, garageId, clientId, id) {
    return this.http.post<any>(environment.serverlink + "/jobstarted", { jobdata: jobdata, garageId:garageId, clientId:clientId, id: id })
    // return this.http.post<any>("http://localhost:5000/jobstarted", { jobdata: jobdata, garageId: garageId, clientId: clientId, id: id })
  }

  offlinejob(jobdata, garageId, clientId, id) {
    return this.http.post<any>(environment.serverlink + "/offlinejob", { jobdata: jobdata, garageId:garageId, clientId:clientId, id: id })
    // return this.http.post<any>("http://localhost:5000/offlinejob", { jobdata: jobdata, garageId: garageId, clientId: clientId, id: id })
  }
}