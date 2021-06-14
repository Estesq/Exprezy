import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewreqService {

  constructor(private http: HttpClient) { }

  // get data from requested services
  getreq(userId) {
    return this.http.post<any>( environment.serverlink +"/viewreq", { userId: userId })
    // return this.http.post<any>("http://localhost:5000/viewreq", { userId: userId })
  }

  // accepts a job shifts the job from req services to accepted services
  acceptedjob(user, garageId, clientId) {
    return this.http.post<any>(environment.serverlink + "/acceptedjob", { user: user, garageId: garageId, clientId: clientId })
    // return this.http.post<any>("http://localhost:5000/acceptedjob", { user: user, garageId: garageId, clientId: clientId })
  }

  // removes a job from req services to rejected services  
  rejectedjob(user, garageId, clientId) {
    return this.http.post<any>(environment.serverlink + "/rejectedjob", { user: user, garageId: garageId, clientId: clientId })
    // return this.http.post<any>("http://localhost:5000/rejectedjob", { user: user, garageId: garageId, clientId: clientId })
  }
}
